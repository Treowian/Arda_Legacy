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
        const safeTicks = Math.min(missedTicks, 60480);
        const richesBefore = gameState.resources.richesse;
        const savoirBefore = gameState.resources.savoir;
        
        for(let i = 0; i < safeTicks; i++) {
            if (!gameState.state.is_victory) {
                gameState.state.current_year += 1;
                processCouncilLogic(); // 🆕 Les intendants bossent aussi hors-ligne !
                processEconomy();
            }
        }
        
        const richesGained = Math.floor(gameState.resources.richesse - richesBefore);
        const savoirGained = Math.floor(gameState.resources.savoir - savoirBefore);
        
        alert(`Vous êtes de retour !\nPendant votre absence (${safeTicks} années se sont écoulées), votre royaume a généré :\n+ ${richesGained} Richesse\n+ ${savoirGained} Savoir`);
        addChronicle(`<em>Votre règne reprend. ${safeTicks} années se sont écoulées en votre absence.</em>`);
        
        updateUI();
        saveGame();
    }
}

function gameTick() {
    if (gameState.state.is_paused || gameState.state.is_victory) return;

    gameState.state.current_year += 1;
    
    processCouncilLogic(); // 🆕 Traitement des automatisations du Conseil
    processEconomy();

    if (Math.random() < 0.15) spawnEvent();

    updateUI();
    saveGame();
}

// 🆕 LOGIQUE D'AUTOMATISATION DES INTENDANTS
function processCouncilLogic() {
    // 1. LE SÉNÉCHAL (Gestion des Décrets)
    if (gameState.council.senechal) {
        if (gameState.state.shadow_level >= 70 && gameState.state.active_focus !== 'frontalier') {
            gameState.state.active_focus = 'frontalier';
            addChronicle("Entity : 📜 <em>Le Sénéchal ordonne le Focus Frontalier pour contrer la menace de l'Ombre.</em>");
        } else if (gameState.state.shadow_level <= 30 && gameState.state.active_focus !== 'agricole') {
            gameState.state.active_focus = 'agricole';
            addChronicle("Entity : 📜 <em>Le Sénéchal ré-alloue les bras de votre peuple vers le Focus Agricole.</em>");
        }
    }

    // 2. LE HÉRAUT (Inspiration Passive)
    if (gameState.council.heraut) {
        // Simule 10 clics d'inspiration sur l'année qui vient de passer
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

    // 3. LE MAÎTRE BÂTISSEUR (Achat Auto Sécurisé)
    if (gameState.council.batisseur && !gameState.state.is_twilight) {
        BUILDINGS.forEach(b => {
            const owned = gameState.buildings[b.id] || 0;
            let canAffordSafe = true;

            // Calculer les coûts actuels avec la formule exponentielle
            for (const [res, baseValue] of Object.entries(b.baseCost)) {
                const cost = Math.floor(baseValue * Math.pow(b.multiplier, owned));
                // RÈGLE D'OR : N'achète que si le joueur possède au moins 3 FOIS le coût requis
                if (gameState.resources[res] < (cost * 3)) canAffordSafe = false;
            }

            if (canAffordSafe && b.isVisible(gameState)) {
                // Déduction des ressources
                for (const [res, baseValue] of Object.entries(b.baseCost)) {
                    const cost = Math.floor(baseValue * Math.pow(b.multiplier, owned));
                    gameState.resources[res] -= cost;
                }
                gameState.buildings[b.id]++;
                console.log(`🔨 Le Conseil (Bâtisseur) a étendu votre infrastructure : ${b.name}`);
            }
        });
    }
}

function processEconomy() {
    const prestigeBonus = 1 + ((gameState.meta.prestige_eclats || 0) * 0.05);
    const redemptionBonus = gameState.meta.redemption_achieved ? 1.5 : 1.0;
    const multiplier = (gameState.state.bonus_multiplicateur || 1.0) * prestigeBonus * redemptionBonus;

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

    if (gameState.state.is_twilight) {
        gameState.resources.richesse -= 50; 
        gameState.resources.espoir -= 5;
        gameState.population.hommes -= 1;
    } else {
        if (gameState.resources.espoir > 200) gameState.population.hommes += 0.5 * multiplier;
        if (gameState.resources.espoir > 1000) gameState.population.hommes += 1.5 * multiplier;
        
        let bonusAgricole = gameState.state.active_focus === 'agricole' ? 1.2 : 1.0;
        if (gameState.state.active_focus === 'frontalier') gameState.state.shadow_level -= 0.5;

        gameState.resources.richesse += (gameState.population.hommes * 0.1) * multiplier * bonusAgricole;
        gameState.resources.savoir += (gameState.population.elfes * 0.1) * multiplier;
        
        BUILDINGS.forEach(b => {
            const owned = gameState.buildings[b.id] || 0;
            if (owned > 0) {
                if (b.id === 'nains') gameState.state.shadow_level += (0.5 * owned);
                if (b.id === 'ents') gameState.state.shadow_level -= (1.0 * owned);
                if (b.production) {
                    for (const [res, amount] of Object.entries(b.production)) {
                        if (gameState.resources[res] !== undefined) gameState.resources[res] += (amount * owned) * multiplier;
                        if (gameState.population[res] !== undefined) gameState.population[res] += (amount * owned) * multiplier;
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
