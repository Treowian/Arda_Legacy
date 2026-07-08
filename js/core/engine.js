// js/core/engine.js
import { gameState } from './state.js';
import { updateUI, addChronicle } from '../ui/dom.js';
import { EVENTS } from '../data/events.js';
import { BUILDINGS } from '../data/buildings.js';
import { saveGame } from './save.js';

let gameLoop;
const TICK_RATE = 10000; 

export function initEngine() {
    console.log("⚙️ Moteur temporel démarré...");
    simulateOfflineProgress(); 
    gameLoop = setInterval(gameTick, TICK_RATE);
}

function simulateOfflineProgress() {
    if (!gameState.meta.last_save_time) return;
    
    const now = Date.now();
    const diff = now - gameState.meta.last_save_time;
    const missedTicks = Math.floor(diff / TICK_RATE);
    
    if (missedTicks > 0) {
        const safeTicks = Math.min(missedTicks, 4320);
        const isCapped = missedTicks > 4320;
        
        const richesBefore = gameState.resources.richesse;
        const savoirBefore = gameState.resources.savoir;
        
        for(let i = 0; i < safeTicks; i++) {
            if (!gameState.state.is_victory) {
                gameState.state.current_year += 1;
                processModifiers(); // On gère le temps des malus même hors ligne
                processCouncilLogic(); 
                processEconomy();
            }
        }
        
        const richesGained = Math.floor(gameState.resources.richesse - richesBefore);
        const savoirGained = Math.floor(gameState.resources.savoir - savoirBefore);
        
        let msg = `Vous êtes de retour !\n\n`;
        if (isCapped) {
            msg += `⏳ Vos entrepôts ont débordé (Limite de 12h d'absence atteinte).\n`;
        }
        msg += `Pendant ce temps (${safeTicks} années), votre royaume a généré :\n+ ${richesGained} Richesse\n+ ${savoirGained} Savoir`;
        
        alert(msg);
        addChronicle(`<em>Votre règne reprend. ${safeTicks} années se sont écoulées en votre absence.</em>`);
        
        updateUI();
        saveGame();
    }
}

function gameTick() {
    if (gameState.state.is_paused || gameState.state.is_victory) return;

    gameState.state.current_year += 1;
    
    processModifiers();
    processCouncilLogic(); 
    processEconomy();

    if (Math.random() < 0.15) spawnEvent();

    updateUI();
    saveGame();
}

// 🆕 FONCTION DE GESTION DU TEMPS DES MODIFICATEURS
function processModifiers() {
    if (!gameState.state.active_modifiers) gameState.state.active_modifiers = [];
    
    if (gameState.state.active_modifiers.length > 0) {
        // Réduit la durée de 1 an
        gameState.state.active_modifiers.forEach(mod => mod.duration -= 1);
        
        // Log la fin d'un malus pour informer le joueur
        gameState.state.active_modifiers.forEach(mod => {
            if (mod.duration === 0) {
                addChronicle(`✨ <em>La malédiction "${mod.label}" s'est enfin dissipée.</em>`);
            }
        });

        // Nettoie ceux qui sont arrivés à 0
        gameState.state.active_modifiers = gameState.state.active_modifiers.filter(mod => mod.duration > 0);
    }
}

function processCouncilLogic() {
    if (!gameState.state.council_active) {
        gameState.state.council_active = { senechal: true, batisseur: true, heraut: true };
    }

    if (gameState.council.senechal && gameState.state.council_active.senechal) {
        if (gameState.state.shadow_level >= 70 && gameState.state.active_focus !== 'frontalier') {
            gameState.state.active_focus = 'frontalier';
            addChronicle("📜 <em>Le Sénéchal ordonne le Focus Frontalier pour contrer la menace de l'Ombre.</em>");
        } else if (gameState.state.shadow_level <= 30 && gameState.state.active_focus !== 'agricole') {
            gameState.state.active_focus = 'agricole';
            addChronicle("📜 <em>Le Sénéchal ré-alloue les bras de votre peuple vers le Focus Agricole.</em>");
        }
    }

    if (gameState.council.heraut && gameState.state.council_active.heraut) {
        for(let i = 0; i < 10; i++) {
            if (gameState.state.is_twilight) {
                gameState.resources.espoir += 3;
                gameState.resources.renom += 1;
            } else {
                if (gameState.state.active_focus === 'agricole') {
                    gameState.resources.richesse += 2;
                } else {
                    gameState.resources.espoir += 2;
                }
            }
        }
    }

    if (gameState.council.batisseur && gameState.state.council_active.batisseur && !gameState.state.is_twilight) {
        const prioritizedBuildings = [...BUILDINGS].reverse();
        
        prioritizedBuildings.forEach(b => {
            const owned = gameState.buildings[b.id] || 0;
            let canAffordSafe = true;

            for (const [res, baseValue] of Object.entries(b.baseCost)) {
                const cost = Math.floor(baseValue * Math.pow(b.multiplier, owned));
                if (gameState.resources[res] < (cost * 3)) canAffordSafe = false;
            }

            if (canAffordSafe && b.isVisible(gameState)) {
                for (const [res, baseValue] of Object.entries(b.baseCost)) {
                    const cost = Math.floor(baseValue * Math.pow(b.multiplier, owned));
                    gameState.resources[res] -= cost;
                }
                gameState.buildings[b.id]++;
                console.log(`🔨 Le Bâtisseur a privilégié : ${b.name}`);
            }
        });
    }
}

function processEconomy() {
    const prestigeBonus = 1 + ((gameState.meta.prestige_eclats || 0) * 0.05);
    const redemptionBonus = gameState.meta.redemption_achieved ? 1.5 : 1.0;
    const multiplier = (gameState.state.bonus_multiplicateur || 1.0) * prestigeBonus * redemptionBonus;

    // 🆕 CALCUL DES MALUS DE PRODUCTION ACTIFS
    let malusRichesse = 1.0;
    let malusEspoir = 1.0;
    
    if (gameState.state.active_modifiers) {
        gameState.state.active_modifiers.forEach(mod => {
            if (mod.target === 'richesse') malusRichesse *= mod.power;
            if (mod.target === 'espoir') malusEspoir *= mod.power;
        });
    }

    if (gameState.state.shadow_level >= 100 && !gameState.state.is_twilight) {
        gameState.state.is_twilight = true;
        addChronicle("<strong>[LE CRÉPUSCULE]</strong> L'Ombre a englouti vos terres.");
    }
    if (gameState.state.is_twilight && gameState.state.shadow_level <= 0) {
        gameState.state.is_twilight = false;
        gameState.meta.redemption_achieved = true;
        addChronicle("<strong>[EUCATASTROPHE]</strong> Vous avez purgé l'Ombre ! Bénédiction active.");
    }
    
    // Le renom n'est pas soumis aux malus économiques
    if (gameState.state.shadow_level >= 80 && gameState.resources.espoir >= 500) {
        gameState.resources.renom += 5 * multiplier;
    }

    if (gameState.state.is_twilight) {
        gameState.resources.richesse -= 50; 
        gameState.resources.espoir -= 5;
        gameState.population.hommes -= 1;
    } else {
        if (gameState.resources.espoir > 200) gameState.population.hommes += 0.5 * multiplier;
        if (gameState.resources.espoir > 1000) gameState.population.hommes += 1.5 * multiplier;
        
        let bonusAgricole = gameState.state.active_focus === 'agricole' ? 1.2 : 1.0;
        if (gameState.state.active_focus === 'frontalier') gameState.state.shadow_level -= 0.5;

        const auraEspoir = Math.max(0, Math.log10(Math.max(1, gameState.resources.espoir) / 1000) * 0.15);
        gameState.state.shadow_level -= auraEspoir * multiplier;

        // 🆕 APPLICATION DES MALUS SUR LA POPULATION
        gameState.resources.richesse += (gameState.population.hommes * 0.1) * multiplier * bonusAgricole * malusRichesse;
        gameState.resources.savoir += (gameState.population.elfes * 0.1) * multiplier;
        
        BUILDINGS.forEach(b => {
            const owned = gameState.buildings[b.id] || 0;
            if (owned > 0) {
                if (b.id === 'nains') gameState.state.shadow_level += (0.5 * owned);
                if (b.id === 'ents') gameState.state.shadow_level -= (1.0 * owned);
                if (b.production) {
                    for (const [res, amount] of Object.entries(b.production)) {
                        let finalAmount = (amount * owned) * multiplier;
                        
                        // 🆕 APPLICATION DES MALUS SUR LES BÂTIMENTS
                        if (res === 'richesse') finalAmount *= malusRichesse;
                        if (res === 'espoir') finalAmount *= malusEspoir;
                        
                        if (gameState.resources[res] !== undefined) gameState.resources[res] += finalAmount;
                        if (gameState.population[res] !== undefined) gameState.population[res] += finalAmount;
                    }
                }
            }
        });
        gameState.resources.espoir -= 0.5; 
    }
    
    gameState.resources.richesse = Math.max(0, gameState.resources.richesse);
    gameState.resources.espoir = Math.max(0, gameState.resources.espoir);
    gameState.population.hommes = Math.max(0, gameState.population.hommes);
    gameState.population.elfes = Math.max(0, gameState.population.elfes);
    gameState.state.shadow_level = Math.max(0, Math.min(100, gameState.state.shadow_level));
}

export function spawnEvent() {
    const validEvents = EVENTS.filter(event => {
        if (!event.repeatable && gameState.state.resolved_events.includes(event.id)) return false;
        try { return event.condition(gameState); } catch (e) { return false; }
    });

    if (validEvents.length > 0) {
        const randomIndex = Math.floor(Math.random() * validEvents.length);
        const eventId = validEvents[randomIndex].id;
        
        gameState.state.pending_events.push(eventId);
        addChronicle(`📜 <em>Un messager arrive. Une décision requiert votre attention !</em>`);
    }
}
