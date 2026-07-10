// js/core/engine.js
import { gameState } from './state.js';
import { updateUI, addChronicle } from '../ui/dom.js';
import { EVENTS } from '../data/events.js';
import { BUILDINGS } from '../data/buildings.js';
import { saveGame } from './save.js';

let gameLoop;
// 1000ms = 1 seconde = 1 année en jeu (standard pour les jeux incrémentaux)
const TICK_RATE = 1000; 

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
        const safeTicks = Math.min(missedTicks, 4320); // Cap de sécurité (ex: 12h)
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
        if (isCapped) msg += `⏳ Vos entrepôts ont débordé (Limite de temps atteinte).\n`;
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
    // Garde-fou de sécurité
    if (!gameState.state.council_active) {
        gameState.state.council_active = { senechal: false, batisseur: false, heraut: false };
    }

    // --- LOGIQUE DU SÉNÉCHAL ---
    if (gameState.council.senechal && gameState.state.council_active.senechal) {
        if (gameState.state.shadow_level >= 50 && gameState.state.active_focus !== 'frontalier') {
            gameState.state.active_focus = 'frontalier';
            addChronicle("📜 <em>Le Sénéchal décrète un Focus Frontalier face à la menace de l'Ombre.</em>");
            updateUI(); // Force la mise à jour visuelle des boutons radio
        } else if (gameState.state.shadow_level <= 30 && gameState.state.active_focus !== 'agricole') {
            gameState.state.active_focus = 'agricole';
            addChronicle("🌾 <em>Le Sénéchal relance l'économie via un Focus Agricole.</em>");
            updateUI(); // Force la mise à jour visuelle des boutons radio
        }
    }

    // --- LOGIQUE DU HÉRAUT ---
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

    // --- LOGIQUE DU BÂTISSEUR ---
    if (gameState.council.batisseur && gameState.state.council_active.batisseur && !gameState.state.is_twilight) {
        // On reverse l'array pour prioriser les bâtiments haut-tiers (meilleur retour sur investissement).
        const prioritizedBuildings = [...BUILDINGS].reverse();
        
        prioritizedBuildings.forEach(b => {
            const owned = gameState.buildings[b.id] || 0;
            let canAffordSafe = true;

            // 🔴 CIBLAGE STRICT POUR L'ACHAT AUTOMATIQUE
            for (const [res, baseValue] of Object.entries(b.baseCost)) {
                const cost = Math.floor(baseValue * Math.pow(b.multiplier, owned));
                
                const currentAmount = (res === 'hommes' || res === 'elfes') 
                    ? (gameState.population[res] || 0) 
                    : (gameState.resources[res] || 0);

                // Le Bâtisseur garde une marge de sécurité (achète seulement s'il a 3x le prix)
                if (currentAmount < (cost * 3)) canAffordSafe = false;
            }

            // Ne pas acheter d'avant-postes nains si l'Ombre est déjà menaçante
            if (b.id === 'nains' && gameState.state.shadow_level > 50) return;

            if (canAffordSafe && b.isVisible(gameState)) {
                // 🔴 DÉDUCTION STRICTE POUR LE PAIEMENT AUTOMATIQUE
                for (const [res, baseValue] of Object.entries(b.baseCost)) {
                    const cost = Math.floor(baseValue * Math.pow(b.multiplier, owned));
                    
                    if (res === 'hommes' || res === 'elfes') {
                        gameState.population[res] -= cost;
                    } else {
                        gameState.resources[res] -= cost;
                    }
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

    // Focus et Aura d'Espoir repoussent passivement l'Ombre
    if (gameState.state.active_focus === 'frontalier') gameState.state.shadow_level -= 0.5;
    const auraEspoir = Math.max(0, Math.log10(Math.max(1, gameState.resources.espoir) / 1000) * 0.15);
    gameState.state.shadow_level -= auraEspoir * multiplier;

    // Calcul des effets des bâtiments sur l'Ombre
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
                    
                    // 🔴 CIBLAGE STRICT DE LA PRODUCTION
                    if (res === 'hommes' || res === 'elfes') {
                        gameState.population[res] += finalAmount;
                    } else {
                        gameState.resources[res] += finalAmount;
                    }
                }
            }
        });
        gameState.resources.espoir -= 0.5; 
    }
    
    // Bornage des valeurs pour empêcher le négatif
    gameState.resources.richesse = Math.max(0, gameState.resources.richesse);
    gameState.resources.espoir = Math.max(0, gameState.resources.espoir);
    gameState.population.hommes = Math.max(0, gameState.population.hommes);
    gameState.population.elfes = Math.max(0, gameState.population.elfes);
    gameState.state.shadow_level = Math.max(0, Math.min(100, gameState.state.shadow_level));
}

// Variable globale pour traquer le temps du dernier clic
let lastClickTime = 0;
// Limite stricte : 100ms entre chaque clic (Max 10 clics / seconde)
const CLICK_COOLDOWN = 100; 

export function handleManualClick() {
    const now = Date.now();
    if (now - lastClickTime < CLICK_COOLDOWN) {
        return; 
    }
    lastClickTime = now;

    if (gameState.state.is_paused) return;
    
    const baseValue = 2;
    const scaling = gameState.population.hommes * 0.05; 
    const totalGain = baseValue + scaling;

    if (gameState.state.active_focus === 'agricole') {
        gameState.resources.richesse += totalGain;
    } else {
        gameState.resources.espoir += totalGain;
        gameState.state.shadow_level = Math.max(0, gameState.state.shadow_level - 0.1);
    }
    
    updateUI();
}

export function spawnEvent() {
    if (gameState.state.pending_events.length >= 4) return;

    const validEvents = EVENTS.filter(event => {
        if (!event.repeatable && gameState.state.resolved_events.includes(event.id)) return false;
        try { return event.condition(gameState); } catch (e) { return false; }
    });

    if (validEvents.length > 0) {
        const randomIndex = Math.floor(Math.random() * validEvents.length);
        const eventId = validEvents[randomIndex].id;
        
        if (!gameState.state.pending_events.includes(eventId)) {
            gameState.state.pending_events.push(eventId);
            import('../ui/dom.js').then(module => {
                module.addChronicle(`📜 <em>Un messager arrive. Un événement requiert votre attention !</em>`);
            });
        }
    }
}