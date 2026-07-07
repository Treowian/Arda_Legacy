// js/core/save.js
import { gameState } from './state.js';

const SAVE_KEY = 'arda_legacy_save';

export function saveGame() {
    // 🆕 On enregistre l'heure exacte à la milliseconde près avant de sauvegarder
    gameState.meta.last_save_time = Date.now();
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
            
            gameState.state.is_paused = false;
        } catch (e) {
            console.error("Erreur de chargement", e);
        }
    }
}

export function triggerPrestige(score) {
    const eclatsGagnes = Math.floor(score / 1000);
    const totalEclats = (gameState.meta.prestige_eclats || 0) + eclatsGagnes;
    
    localStorage.removeItem(SAVE_KEY);
    
    const newGamePlusData = {
        meta: { 
            current_age: 1, 
            legacies: [], 
            prestige_eclats: totalEclats, 
            redemption_achieved: false,
            last_save_time: Date.now()
        }
    };
    localStorage.setItem(SAVE_KEY, JSON.stringify(newGamePlusData));
    location.reload();
}
