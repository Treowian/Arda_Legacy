// js/core/save.js
import { gameState, initialState } from './state.js';

export function saveGame() {
    gameState.meta.last_save_time = Date.now();
    localStorage.setItem('tolkien_incremental_save', JSON.stringify(gameState));
}

export function loadGame() {
    const saved = localStorage.getItem('tolkien_incremental_save');
    if (saved) {
        const parsed = JSON.parse(saved);
        Object.assign(gameState, parsed);
    }
}

export function triggerPrestige() {
    // Calcul du score de base
    const score = (gameState.resources.renom * 2) + (gameState.resources.savoir * 5);
    
    // 🔴 CORRECTION : Application d'une racine carrée (Math.sqrt) pour éviter l'inflation infinie
    const baseEclats = score / 1000;
    const newEclats = Math.floor(Math.sqrt(baseEclats));
    
    const eclatsCumules = (gameState.meta.prestige_eclats || 0) + newEclats;
    const redemption = gameState.meta.redemption_achieved;

    // Reset profond de l'état pour éviter les fuites de mémoire
    Object.assign(gameState, JSON.parse(JSON.stringify(initialState)));
    
    // Conservation stricte des métadonnées
    gameState.meta.prestige_eclats = eclatsCumules;
    gameState.meta.redemption_achieved = redemption;
    gameState.meta.current_age += 1;
    
    saveGame();
    window.location.reload();
}

export function hardReset() {
    if (confirm("Effacer toute l'histoire de votre domaine ? Cette action est irréversible.")) {
        localStorage.removeItem('tolkien_incremental_save');
        window.location.reload();
    }
}