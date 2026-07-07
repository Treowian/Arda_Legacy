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
            
            gameState.state.is_paused = false; // Sécurité anti-softlock
        } catch (e) {
            console.error("Erreur de chargement", e);
        }
    }
}

// 🆕 LA MÉCANIQUE DE PRESTIGE (New Game +)
export function triggerPrestige(score) {
    // 1. On calcule et on garde les Éclats de Silmaril
    const eclatsGagnes = Math.floor(score / 1000);
    const totalEclats = (gameState.meta.prestige_eclats || 0) + eclatsGagnes;
    
    // 2. On efface la sauvegarde physique
    localStorage.removeItem(SAVE_KEY);
    
    // 3. On crée une sauvegarde "fantôme" qui ne contient QUE le prestige
    const newGamePlusData = {
        meta: { current_age: 1, legacies: [], prestige_eclats: totalEclats, redemption_achieved: false }
    };
    localStorage.setItem(SAVE_KEY, JSON.stringify(newGamePlusData));
    
    // 4. On recharge le jeu
    location.reload();
}
