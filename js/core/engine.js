// js/core/engine.js
import { gameState } from './state.js';
import { updateUI, addChronicle } from '../ui/dom.js';
import { triggerEvent } from '../ui/modal.js';
import { EVENTS } from '../data/events.js';
import { BUILDINGS } from '../data/buildings.js';
import { saveGame } from './save.js';

let gameLoop;
const TICK_RATE = 10000; // 10 secondes par année (Pacing de vrai Idle Game)

export function initEngine() {
    console.log("⚙️ Moteur temporel démarré...");
    gameLoop = setInterval(gameTick, TICK_RATE);
}

function gameTick() {
    if (gameState.state.is_paused || gameState.state.is_victory) return;

    gameState.state.current_year += 1;
    
    // Bonus de Prestige (New Game +) : +5% de prod par Éclat de Silmaril
    const prestigeBonus = 1 + ((gameState.meta.prestige_eclats || 0) * 0.05);
    // Bonus de Rédemption (Si le joueur a purgé l'Ombre)
    const redemptionBonus = gameState.meta.redemption_achieved ? 1.5 : 1.0;
    
    const multiplier = (gameState.state.bonus_multiplicateur || 1.0) * prestigeBonus * redemptionBonus;

    // --- 1. GESTION DE L'OMBRE ET DU CRÉPUSCULE ---
    if (gameState.state.shadow_level >= 100 && !gameState.state.is_twilight) {
        gameState.state.is_twilight = true;
        addChronicle("<strong>[LE CRÉPUSCULE]</strong> L'Ombre a englouti vos terres. Vos revenus de Richesse s'effondrent.");
    }

    // MÉCANIQUE DE RÉDEMPTION : Si en crépuscule on ramène l'ombre à 0
    if (gameState.state.is_twilight && gameState.state.shadow_level <= 0) {
        gameState.state.is_twilight = false;
        gameState.meta.redemption_achieved = true;
        addChronicle("<strong>[EUCATASTROPHE]</strong> La lumière perce les ténèbres ! Vous avez purgé l'Ombre. Âge d'Or de la Rédemption actif !");
    }

    // MÉCANIQUE DE DÉFIANCE : Haute Ombre + Haut Espoir = Gloire
    if (gameState.state.shadow_level >= 80 && gameState.resources.espoir >= 500) {
        gameState.resources.renom += 5 * multiplier;
    }

    // --- 2. PRODUCTION ÉCONOMIQUE ---
    if (gameState.state.is_twilight) {
        gameState.resources.richesse -= 50; // L'économie brûle
        gameState.resources.espoir -= 5;
    } else {
        // Base passive
        gameState.resources.richesse += (gameState.population.hommes * 0.1) * multiplier;
        gameState.resources.savoir += (gameState.population.elfes * 0.1) * multiplier;
        
        // Bâtiments
        BUILDINGS.forEach(b => {
            const owned = gameState.buildings[b.id];
            if (owned > 0) {
                // Effets spéciaux d'enclaves
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
        
        gameState.resources.espoir -= 0.5; // Usure normale du temps
    }
    
    // --- 3. SÉCURITÉS ET LIMITES ---
    gameState.resources.richesse = Math.max(0, gameState.resources.richesse);
    gameState.resources.espoir = Math.max(0, gameState.resources.espoir);
    gameState.state.shadow_level = Math.max(0, Math.min(100, gameState.state.shadow_level));

    // --- 4. ÉVÉNEMENTS ---
    if (Math.random() < 0.15) spawnEvent();

    updateUI();
    saveGame();
}

function spawnEvent() {
    const validEvents = EVENTS.filter(event => {
        if (!event.repeatable && gameState.state.resolved_events.includes(event.id)) return false;
        try { return event.condition(gameState); } catch (e) { return false; }
    });

    if (validEvents.length > 0) {
        const randomIndex = Math.floor(Math.random() * validEvents.length);
        triggerEvent(validEvents[randomIndex]);
    }
}
