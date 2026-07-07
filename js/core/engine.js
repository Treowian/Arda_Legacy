// js/core/engine.js
import { gameState } from './state.js';
import { updateUI, addChronicle } from '../ui/dom.js';
import { triggerEvent } from '../ui/modal.js';
import { EVENTS } from '../data/events.js';
import { BUILDINGS } from '../data/buildings.js';
import { saveGame } from './save.js';

let gameLoop;
const TICK_RATE = 10000; // Une année passe toutes les 10 secondes

export function initEngine() {
    console.log("⚙️ Moteur temporel démarré...");
    gameLoop = setInterval(gameTick, TICK_RATE);
}

function gameTick() {
    if (gameState.state.is_paused || gameState.state.is_victory) return;

    gameState.state.current_year += 1;
    
    // Multiplicateurs permanents : +5% par Éclat de Silmaril (Prestige)
    const prestigeBonus = 1 + ((gameState.meta.prestige_eclats || 0) * 0.05);
    // Multiplicateur permanent de Rédemption (+50% si tu as sauvé ton royaume du Crépuscule)
    const redemptionBonus = gameState.meta.redemption_achieved ? 1.5 : 1.0;
    
    const multiplier = (gameState.state.bonus_multiplicateur || 1.0) * prestigeBonus * redemptionBonus;

    // --- 1. SYSTÈME D'OMBRE ET DE CRÉPUSCULE ---
    if (gameState.state.shadow_level >= 100 && !gameState.state.is_twilight) {
        gameState.state.is_twilight = true;
        addChronicle("<strong>[LE CRÉPUSCULE]</strong> L'Ombre a englouti vos terres. Vos revenus de Richesse s'effondrent, l'exil ou la résistance commencent.");
    }

    // VOIE DE LA PURGE / RÉDEMPTION (Eucatastrophe)
    if (gameState.state.is_twilight && gameState.state.shadow_level <= 0) {
        gameState.state.is_twilight = false;
        gameState.meta.redemption_achieved = true;
        addChronicle("<strong>[EUCATASTROPHE]</strong> La lumière triomphe ! L'Ombre a été totalement purgée de vos terres. Bénédiction de la Rédemption active (+50% de production permanente) !");
    }

    // PARADOXE DE LA DÉFIANCE : Haute Ombre + Haut Espoir = Gain de Renom Héroïque
    if (gameState.state.shadow_level >= 80 && gameState.resources.espoir >= 500) {
        gameState.resources.renom += 5 * multiplier;
    }

    // --- 2. CALCULS ÉCONOMIQUES DE L'ANNER ---
    if (gameState.state.is_twilight) {
        gameState.resources.richesse -= 50; // Les routes brûlent, l'or est perdu
        gameState.resources.espoir -= 5;
    } else {
        // Production de la population de base
        gameState.resources.richesse += (gameState.population.hommes * 0.1) * multiplier;
        gameState.resources.savoir += (gameState.population.elfes * 0.1) * multiplier;
        
        // Production passive des infrastructures et des enclaves alliées
        BUILDINGS.forEach(b => {
            const owned = gameState.buildings[b.id];
            if (owned > 0) {
                // Effets passifs sur les jauges d'alignement (Nains et Ents)
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
        
        gameState.resources.espoir -= 0.5; // Érosion naturelle de l'esprit
    }
    
    // --- 3. SÉCURITÉS MATHÉMATIQUES ---
    gameState.resources.richesse = Math.max(0, gameState.resources.richesse);
    gameState.resources.espoir = Math.max(0, gameState.resources.espoir);
    gameState.state.shadow_level = Math.max(0, Math.min(100, gameState.state.shadow_level));

    // --- 4. POP-UP D'ÉVÉNEMENT (15% de chances) ---
    if (Math.random() < 0.15) {
        spawnEvent();
    }

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
