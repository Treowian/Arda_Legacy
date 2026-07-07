// js/core/engine.js
import { saveGame } from './save.js';
import { gameState } from './state.js';
import { updateUI } from '../ui/dom.js';
import { triggerEvent } from '../ui/modal.js';
import { EVENTS } from '../data/events.js'; // Importation de tes 165 événements !

let gameLoop;
// 1 tick = 1 année dans le jeu. Ici réglé sur 5 secondes réelles (5000 ms).
const TICK_RATE = 5000; 

export function initEngine() {
    console.log("⚙️ Moteur temporel démarré...");
    // On lance la boucle infinie du jeu
    gameLoop = setInterval(gameTick, TICK_RATE);
}

function gameTick() {
    // 1. ARRÊT SUR IMAGE : Si une modale est ouverte, on fige le temps.
    if (gameState.state.is_paused) return;

    // 2. LE TEMPS PASSE
    gameState.state.current_year += 1;

    // 3. PRODUCTION PASSIVE
    // On récupère le multiplicateur (qui passe à 1.5 si le bouton "Inspirer" a déclenché l'Âge d'Or)
    const multiplier = gameState.state.bonus_multiplicateur || 1.0;
    
    // Les Hommes produisent un peu de richesse, les Elfes un peu de Savoir.
    gameState.resources.richesse += (gameState.population.hommes * 0.1) * multiplier;
    gameState.resources.savoir += (gameState.population.elfes * 0.1) * multiplier;
    
    // L'Ombre ronge doucement l'Espoir à chaque tour (-0.5 par année)
    gameState.resources.espoir -= 0.5; 
    
    // Sécurité défensive : L'espoir et les ressources ne tombent jamais sous zéro
    gameState.resources.espoir = Math.max(0, gameState.resources.espoir);

    // 4. LE SPAWNER D'ÉVÉNEMENTS
    // À chaque tick (chaque année), il y a 35% de chance qu'un événement se produise.
    if (Math.random() < 0.15) {
        spawnEvent();
    }

    // 5. MISE À JOUR VISUELLE
    updateUI();

    // Sauvegarde automatique à la fin de chaque tour
saveGame();
}

function spawnEvent() {
    // A. On filtre la base de données pour ne garder que les événements "jouables" maintenant
    const validEvents = EVENTS.filter(event => {
        // Règle 1 : Si l'événement est unique (non-répétable) et déjà joué, on l'élimine.
        if (!event.repeatable && gameState.state.resolved_events.includes(event.id)) {
            return false;
        }
        
        // Règle 2 : Le joueur remplit-il les conditions d'âge, de richesse, d'ombre ?
        try {
            return event.condition(gameState);
        } catch (error) {
            console.error(`Erreur sur l'évaluation de l'événement ${event.id}:`, error);
            return false;
        }
    });

    // B. S'il reste des événements valides dans le tamis, on en tire un au hasard !
    if (validEvents.length > 0) {
        const randomIndex = Math.floor(Math.random() * validEvents.length);
        const chosenEvent = validEvents[randomIndex];
        
        // C. On envoie l'événement choisi à l'interface (la modale)
        triggerEvent(chosenEvent);
    }
}
