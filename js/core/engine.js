// js/core/engine.js
import { gameState } from './state.js';
import { updateUI, addChronicle } from '../ui/dom.js';
import { triggerEvent } from '../ui/modal.js';
import { EVENTS } from '../data/events.js';
import { BUILDINGS } from '../data/buildings.js';
import { saveGame } from './save.js';

let gameLoop;
const TICK_RATE = 10000; 

export function initEngine() {
    gameLoop = setInterval(gameTick, TICK_RATE);
}

function gameTick() {
    if (gameState.state.is_paused || gameState.state.is_victory) return;

    gameState.state.current_year += 1;
    
    const prestigeBonus = 1 + ((gameState.meta.prestige_eclats || 0) * 0.05);
    const redemptionBonus = gameState.meta.redemption_achieved ? 1.5 : 1.0;
    const multiplier = (gameState.state.bonus_multiplicateur || 1.0) * prestigeBonus * redemptionBonus;

    // --- 1. CRÉPUSCULE ET DÉFIANCE ---
    if (gameState.state.shadow_level >= 100 && !gameState.state.is_twilight) {
        gameState.state.is_twilight = true;
        addChronicle("<strong>[LE CRÉPUSCULE]</strong> L'Ombre a englouti vos terres. Vos revenus s'effondrent.");
    }
    if (gameState.state.is_twilight && gameState.state.shadow_level <= 0) {
        gameState.state.is_twilight = false;
        gameState.meta.redemption_achieved = true;
        addChronicle("<strong>[EUCATASTROPHE]</strong> Vous avez purgé l'Ombre ! Bénédiction active (+50%).");
    }
    if (gameState.state.shadow_level >= 80 && gameState.resources.espoir >= 500) {
        gameState.resources.renom += 5 * multiplier;
    }

    // --- 2. PRODUCTION ET DÉMOGRAPHIE ---
    if (gameState.state.is_twilight) {
        gameState.resources.richesse -= 50; 
        gameState.resources.espoir -= 5;
        gameState.population.hommes -= 1; // L'Ombre tue la population
    } else {
        // Démographie basée sur l'Espoir
        if (gameState.resources.espoir > 200) gameState.population.hommes += 0.5 * multiplier;
        if (gameState.resources.espoir > 1000) gameState.population.hommes += 1.5 * multiplier;
        
        // Passif des Décrets (Focus)
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
    gameState.state.shadow_level = Math.max(0, Math.min(100, gameState.state.shadow_level));

    if (Math.random() < 0.15) spawnEvent();
    updateUI();
    saveGame();
}

export function spawnEvent() {
    const validEvents = EVENTS.filter(event => {
        if (!event.repeatable && gameState.state.resolved_events.includes(event.id)) return false;
        try { return event.condition(gameState); } catch (e) { return false; }
    });
    if (validEvents.length > 0) {
        const randomIndex = Math.floor(Math.random() * validEvents.length);
        triggerEvent(validEvents[randomIndex]);
    }
}
