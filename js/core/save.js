// js/core/save.js
import { gameState } from './state.js';

// Clé secrète sous laquelle le jeu sera rangé dans le navigateur
const SAVE_KEY = 'arda_legacy_save';

export function saveGame() {
    // On transforme tout ton univers en une chaîne de texte compacte
    const dataToSave = JSON.stringify(gameState);
    localStorage.setItem(SAVE_KEY, dataToSave);
}

export function loadGame() {
    const savedData = localStorage.getItem(SAVE_KEY);
    if (savedData) {
        try {
            const parsed = JSON.parse(savedData);
            // On fusionne doucement les données sauvegardées avec l'état de base
            Object.assign(gameState.meta, parsed.meta);
            Object.assign(gameState.state, parsed.state);
            Object.assign(gameState.resources, parsed.resources);
            Object.assign(gameState.population, parsed.population);
            
            // ✨ LA CORRECTION EST ICI : On force la fin de la pause au démarrage
            gameState.state.is_paused = false;
            
            console.log("📂 Partie chargée avec succès !");
        } catch (e) {
            console.error("Erreur lors du chargement de la sauvegarde", e);
        }
    } else {
        console.log("🌱 Nouvelle partie commencée.");
    }
}

// Fonction bonus si tu veux créer un bouton "Recommencer" plus tard
export function resetGame() {
    localStorage.removeItem(SAVE_KEY);
    location.reload(); // Recharge la page
}
