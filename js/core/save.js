// js/core/save.js
import { gameState, setGameState, CONFIG } from './state.js';

export function saveGame() {
    gameState.meta.last_saved_at = Date.now();
    try {
        localStorage.setItem(CONFIG.SAVE_KEY, JSON.stringify(gameState));
    } catch (e) {
        console.error("🔴 Erreur critique lors de la sauvegarde locale :", e);
    }
}

export function loadGame() {
    try {
        const savedData = localStorage.getItem(CONFIG.SAVE_KEY);
        if (savedData) {
            const parsed = JSON.parse(savedData);
            
            // Fusion défensive (Deep Merge manuel sécurisé)
            setGameState({
                meta: { ...gameState.meta, ...(parsed.meta || {}) },
                state: { ...gameState.state, ...(parsed.state || {}) },
                resources: { ...gameState.resources, ...(parsed.resources || {}) },
                population: { ...gameState.population, ...(parsed.population || {}) }
            });
            
            console.log("🟢 Sauvegarde chargée avec succès.");
        } else {
            console.log("🔵 Nouvelle partie initialisée.");
        }
    } catch (e) {
        console.warn("🟡 Sauvegarde corrompue ou introuvable. Écrasement par défaut.", e);
    }
}