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
    // 1. Calcul des éclats avec amortisseur (Racine carrée) pour éviter l'inflation
    const score = (gameState.resources.renom * 2) + (gameState.resources.savoir * 5);
    const baseEclats = score / 1000;
    const newEclats = Math.floor(Math.sqrt(baseEclats));
    
    // 🔴 2. On sauvegarde TOUTES les métadonnées AVANT d'écraser l'état
    const eclatsCumules = (gameState.meta.prestige_eclats || 0) + newEclats;
    const redemption = gameState.meta.redemption_achieved;
    const nextAge = gameState.meta.current_age + 1; // On calcule le prochain Âge correctement

    // 3. Reset profond de l'état (tout repasse à 0 / Âge 1)
    Object.assign(gameState, JSON.parse(JSON.stringify(initialState)));
    
    // 🔴 4. On réinjecte les métadonnées sauvegardées
    gameState.meta.prestige_eclats = eclatsCumules;
    gameState.meta.redemption_achieved = redemption;
    gameState.meta.current_age = nextAge; 
    
    saveGame();
    window.location.reload();
}

export function hardReset() {
    if (confirm("Effacer toute l'histoire de votre domaine ? Cette action est irréversible.")) {
        // 🔴 Le Baiser de la Mort : on écrase la mémoire vive avant de détruire le fichier
        // Ainsi, si l'auto-save se déclenche pendant le rechargement, elle sauvegardera du vide.
        Object.assign(gameState, JSON.parse(JSON.stringify(initialState)));
        
        localStorage.removeItem('tolkien_incremental_save');
        window.location.reload();
    }
}