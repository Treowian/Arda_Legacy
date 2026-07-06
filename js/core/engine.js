// js/core/engine.js
import { gameState, CONFIG } from './state.js';
import { saveGame } from './save.js';
import { updateUI } from '../ui/dom.js';
import { EVENTS } from '../data/events.js';
import { triggerEvent } from '../ui/modal.js';

let engineInterval;

export function initEngine() {
    console.log("Moteur démarré. Ère Tolkiénienne enclenchée.");
    
    // Rattrapage temporel si le joueur était hors-ligne
    calculateOfflineProgress();
    
    // Lancement de la boucle temporelle (tourne chaque seconde)
    engineInterval = setInterval(gameLoop, 1000);
}

function gameLoop() {
    // 🔴 Bloquant : Si un événement narratif attend une réponse, le temps s'arrête.
    if (gameState.state.is_paused) return;

    const now = Date.now();
    const deltaMs = now - gameState.meta.last_saved_at;

    // Le moteur n'agit que si un "Tick" complet est passé
    if (deltaMs >= CONFIG.TICK_RATE_MS) {
        const ticksElapsed = Math.floor(deltaMs / CONFIG.TICK_RATE_MS);
        
        processTicks(ticksElapsed);
        
        // On conserve le reliquat de millisecondes pour ne pas perdre de temps
        gameState.meta.last_saved_at = now - (deltaMs % CONFIG.TICK_RATE_MS);
        
        // Vérification des événements à intervalles réguliers (ex: 1 tick sur 10)
        // L'utilisation du modulo permet de cadencer l'apparition des pop-ups
        if (Math.floor(now / CONFIG.TICK_RATE_MS) % 10 === 0) { 
            checkForEvents();
        }

        // Sauvegarde et mise à jour de l'UI uniquement lors d'un tick effectif
        saveGame();
        updateUI();
    }
}

function calculateOfflineProgress() {
    const now = Date.now();
    const deltaMs = now - gameState.meta.last_saved_at;
    const ticksElapsed = Math.floor(deltaMs / CONFIG.TICK_RATE_MS);
    
    if (ticksElapsed > 0) {
        processTicks(ticksElapsed);
        console.log(`${ticksElapsed} mois simulés en hors-ligne.`);
    }
}

function processTicks(ticks) {
    // Formules mathématiques de production passive
    // TODO: Extraire ces taux fixes vers un fichier js/data/rates.js pour équilibrage futur
    const baseRichesse = gameState.population.hommes * 0.1;
    let focusModifier = gameState.state.active_focus === 'agricole' ? 1.5 : 1.0;

    gameState.resources.richesse += (baseRichesse * focusModifier) * ticks;
    
    // Avancée du temps (ex: 10 ticks = 1 an in-game)
    gameState.state.current_year += (ticks / 10);
    
    // L'Ombre progresse inexorablement (Soft Enrage)
    gameState.state.shadow_level += 0.05 * ticks;

    // Hard cap pour éviter de casser l'UI ou les mathématiques
    if (gameState.state.shadow_level > 100) {
        gameState.state.shadow_level = 100;
    }
}

function checkForEvents() {
    // Ne rien faire si le jeu est déjà en pause (sécurité anti-empilement de modales)
    if (gameState.state.is_paused) return;

    // Filtrer le dictionnaire pour trouver les événements éligibles
    const availableEvents = EVENTS.filter(ev => ev.condition(gameState));
    
    if (availableEvents.length > 0) {
        // RNG (Random Number Generator) de base pour piocher un événement
        const randomIndex = Math.floor(Math.random() * availableEvents.length);
        triggerEvent(availableEvents[randomIndex]);
    }
}