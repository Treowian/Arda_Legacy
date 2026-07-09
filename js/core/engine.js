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
                processModifiers(); 
                processCouncilLogic(); 
                processEconomy();
            }
        }
        
        const richesGained = Math.floor(gameState.resources.richesse - richesBefore);
        const savoirGained = Math.floor(gameState.resources.savoir - savoirBefore);
        
        let msg = `Vous êtes de retour !\n\n`;
        if (isCapped) msg += `⏳ Vos entrepôts ont débordé (Limite de 12h atteinte).\n`;
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

function processModifiers() {
    if (!gameState.state.active_modifiers) gameState.state.active_modifiers = [];
    
    if (gameState.state.active_modifiers.length > 0) {
        gameState.state.active_modifiers.forEach(mod => mod.duration -= 1);
        gameState.state.active_modifiers.forEach(mod => {
            if (mod.duration === 0) {
                addChronicle(`✨ <em>La malédiction "${mod.label}" s'est dissipée.</em>`);
            }
        });
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
            addChronicle("📜 <em>Le Sénéchal ordonne le Focus Frontalier pour contrer la menace.</em>");
        } else if (gameState.state.shadow_level <= 30 && gameState.state.active_focus !== 'agricole') {
            gameState.state.active_focus = 'agricole';
            addChronicle("📜 <em>Le Sénéchal ré-alloue les bras vers le Focus Agricole.</em>");
        }
    }

    if (gameState.council.heraut && gameState.state.council_active.heraut) {
        for(let i = 0; i < 10; i++) {
            if (gameState.state.is_twilight) {
                gameState.resources.espoir += 3;
                gameState.resources.renom += 1;
            } else {
                if (gameState.state.active_focus === 'agricole') gameState.resources.richesse += 2;
                else gameState.resources.espoir += 2;
            }
        }
    }

    if (gameState.council.batisseur && gameState.state.council_active.batisseur && !gameState.state.is_twilight) {
        // 🔵 CORRECTION : Documenté. On reverse l'array pour prioriser les bâtiments haut-tiers (ROI).
        const prioritizedBuildings = [...BUILDINGS].reverse();
        
        prioritizedBuildings.forEach(b => {
            const owned = gameState.buildings[b.id] || 0;
            let canAffordSafe = true;

            for (const [res, baseValue] of Object.entries(b.baseCost)) {
                const cost = Math.floor(baseValue * Math.pow(b.multiplier, owned));
                if (gameState.resources[res] < (cost * 3)) canAffordSafe = false;
            }

            // 🔴 CORRECTION IA SUICIDAIRE : Ne pas acheter de Nains si l'Ombre est déjà menaçante
            if (b.id === 'nains' && gameState.state.shadow_level > 50) return;

            if (canAffordSafe && b.isVisible(gameState)) {
                for (const [res, baseValue] of Object.entries(b.baseCost)) {
                    const cost = Math.floor(baseValue * Math.pow(b.multiplier, owned));
                    gameState.resources[res] -= cost;
                }
                gameState.buildings[b.id]++;
            }
        });
    }
}

function processEconomy() {
    const prestigeBonus = 1 + ((gameState.meta.prestige_eclats || 0) * 0.05);
    const redemptionBonus = gameState.meta.redemption_achieved ? 1.5 : 1.0;
    const multiplier = (gameState.state.bonus_multiplicateur || 1.0) * prestigeBonus * redemptionBonus;

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
    
    if (gameState.state.shadow_level >= 80 && gameState.resources.espoir >= 500) {
        gameState.resources.renom += 5 * multiplier;
    }

    // 🔴 CORRECTION SOFTLOCK : Ces mécaniques opèrent MAINTENANT indépendamment de is_twilight
    if (gameState.state.active_focus === 'frontalier') gameState.state.shadow_level -= 0.5;
    const auraEspoir = Math.max(0, Math.log10(Math.max(1, gameState.resources.espoir) / 1000) * 0.15);
    gameState.state.shadow_level -= auraEspoir * multiplier;

    // Calcul des effets des bâtiments sur l'Ombre (actifs même en Crépuscule)
    BUILDINGS.forEach(b => {
        const owned = gameState.buildings[b.id] || 0;
        if (owned > 0) {
            if (b.id === 'nains') gameState.state.shadow_level += (0.5 * owned);
            if (b.id === 'ents') gameState.state.shadow_level -= (1.0 * owned);
        }
    });

    if (gameState.state.is_twilight) {
        gameState.resources.richesse -= 50; 
        gameState.resources.espoir -= 5;
        gameState.population.hommes -= 1;
    } else {
        if (gameState.resources.espoir > 200) gameState.population.hommes += 0.5 * multiplier;
        if (gameState.resources.espoir > 1000) gameState.population.hommes += 1.5 * multiplier;
        
        let bonusAgricole = gameState.state.active_focus === 'agricole' ? 1.2 : 1.0;

        gameState.resources.richesse += (gameState.population.hommes * 0.1) * multiplier * bonusAgricole * malusRichesse;
        gameState.resources.savoir += (gameState.population.elfes * 0.1) * multiplier;
        
        BUILDINGS.forEach(b => {
            const owned = gameState.buildings[b.id] || 0;
            if (owned > 0 && b.production) {
                for (const [res, amount] of Object.entries(b.production)) {
                    let finalAmount = (amount * owned) * multiplier;
                    if (res === 'richesse') finalAmount *= malusRichesse;
                    if (res === 'espoir') finalAmount *= malusEspoir;
                    
                    if (gameState.resources[res] !== undefined) gameState.resources[res] += finalAmount;
                    if (gameState.population[res] !== undefined) gameState.population[res] += finalAmount;
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

// Variable globale pour garder en mémoire l'heure du dernier clic
let lastClickTime = 0;

// Limite stricte : 100 ms entre chaque clic (soit 10 clics maximum par seconde)
const CLICK_COOLDOWN = 100; 

export function handleManualClick() {
    // 🔴 1. Bouclier Anti-Spam (Throttling)
    const now = Date.now();
    if (now - lastClickTime < CLICK_COOLDOWN) {
        return; // Ignore silencieusement le clic si le joueur va trop vite
    }
    lastClickTime = now;

    // 🔴 2. Ta logique originelle (intacte)
    if (gameState.state.is_paused) return;
    
    const baseValue = 2;
    const scaling = gameState.population.hommes * 0.05; // Le clic scale avec la population
    const totalGain = baseValue + scaling;

    if (gameState.state.active_focus === 'agricole') {
        gameState.resources.richesse += totalGain;
    } else {
        gameState.resources.espoir += totalGain;
        // On s'assure que l'Ombre ne descend pas sous 0
        gameState.state.shadow_level = Math.max(0, gameState.state.shadow_level - 0.1);
    }
    
    updateUI();
}

export function spawnEvent() {
    // 🔴 CORRECTION : On bloque la génération si le joueur a déjà 4 événements en attente
    if (gameState.state.pending_events.length >= 4) return;

    const validEvents = EVENTS.filter(event => {
        if (!event.repeatable && gameState.state.resolved_events.includes(event.id)) return false;
        try { return event.condition(gameState); } catch (e) { return false; }
    });

    if (validEvents.length > 0) {
        const randomIndex = Math.floor(Math.random() * validEvents.length);
        const eventId = validEvents[randomIndex].id;
        
        // 🛡️ Petite sécurité bonus : on évite d'avoir deux fois le même événement dans la file
        if (!gameState.state.pending_events.includes(eventId)) {
            gameState.state.pending_events.push(eventId);
            
            // J'ai profité pour corriger l'orthographe ici aussi au cas où !
            import('../ui/dom.js').then(module => {
                module.addChronicle(`📜 <em>Un messager arrive. Un événement requiert votre attention !</em>`);
            });
        }
    }
}