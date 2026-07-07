// js/core/save.js
import { gameState } from './state.js';

const SAVE_KEY = 'arda_legacy_save';

export function saveGame() {
    const dataToSave = JSON.stringify(gameState);
    localStorage.setItem(SAVE_KEY, dataToSave);
}

export function loadGame() {
    const savedData = localStorage.getItem(SAVE_KEY);
    if (savedData) {
        try {
            const parsed = JSON.parse(savedData);
            Object.assign(gameState.meta, parsed.meta);
            Object.assign(gameState.state, parsed.state);
            Object.assign(gameState.resources, parsed.resources);
            Object.assign(gameState.population, parsed.population);
            Object.assign(gameState.buildings, parsed.buildings);
            
            // Sécurité anti-softlock au démarrage
            gameState.state.is_paused = false;
        } catch (e) {
            console.error("Erreur de chargement de la sauvegarde", e);
        }
    }
}

// Mécanique de réinitialisation cosmologique (Prestige)
export function triggerPrestige(score) {
    // Calcul des Éclats de Silmaril gagnés (1 par tranche de 1000 points de score)
    const eclatsGagnes = Math.floor(score / 1000);
    const totalEclats = (gameState.meta.prestige_eclats || 0) + eclatsGagnes;
    
    // On rase l'ancienne sauvegarde
    localStorage.removeItem(SAVE_KEY);
    
    // On injecte les données permanentes du NG+
    const newGamePlusData = {
        meta: { 
            current_age: 1, 
            legacies: [], 
            prestige_eclats: totalEclats, 
            redemption_achieved: false 
        }
    };
    localStorage.setItem(SAVE_KEY, JSON.stringify(newGamePlusData));
    
    // On recharge l'onglet pour appliquer le boost
    location.reload();
}
