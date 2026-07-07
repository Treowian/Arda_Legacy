// js/core/engine.js
import { gameState } from './state.js';
import { updateUI, addChronicle } from '../ui/dom.js';
import { triggerEvent } from '../ui/modal.js';
import { EVENTS } from '../data/events.js';
import { saveGame } from './save.js';

let gameLoop;
const TICK_RATE = 5000; 

export function initEngine() {
    console.log("⚙️ Moteur temporel démarré...");
    gameLoop = setInterval(gameTick, TICK_RATE);
}

function gameTick() {
    if (gameState.state.is_paused || gameState.state.is_victory) return;

    gameState.state.current_year += 1;
    const multiplier = gameState.state.bonus_multiplicateur || 1.0;
    
    // GESTION DU CRÉPUSCULE
    if (gameState.state.shadow_level >= 100 && !gameState.state.is_twilight) {
        triggerTwilight();
    }

    if (gameState.state.is_twilight) {
        // En Crépuscule, la Richesse s'effondre, l'Espoir baisse plus vite
        gameState.resources.richesse -= 2 * multiplier;
        gameState.resources.espoir -= 1.5;
    } else {
        // Production normale
        gameState.resources.richesse += (gameState.population.hommes * 0.1) * multiplier;
        gameState.resources.savoir += (gameState.population.elfes * 0.1) * multiplier;
        gameState.resources.espoir -= 0.5; // Baisse naturelle
    }
    
    // Sécurités mathématiques
    gameState.resources.richesse = Math.max(0, gameState.resources.richesse);
    gameState.resources.espoir = Math.max(0, gameState.resources.espoir);

    // Spawner (15% de chances par an)
    if (Math.random() < 0.15) {
        spawnEvent();
    }

    updateUI();
    saveGame(); // Sauvegarde automatique
}

function triggerTwilight() {
    gameState.state.is_twilight = true;
    addChronicle("<strong>[LE CRÉPUSCULE]</strong> L'Ombre a englouti vos terres. Vos ressources s'effondrent, votre seul but est désormais la survie et l'exil.");
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
