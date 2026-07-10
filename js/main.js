// js/main.js
import { gameState } from './core/state.js';
import { loadGame, triggerPrestige } from './core/save.js'; // 🔴 Importation du Prestige
import { initUI } from './ui/dom.js';
import { initEngine } from './core/engine.js';
import { initActions } from './ui/actions.js';
import { initDebug } from './ui/debug.js';
import { initModal } from './ui/modal.js';

// Rendre accessible globalement pour les manipulations directes via F12
window.gameState = gameState;

document.addEventListener('DOMContentLoaded', () => {
    console.log("🌿 Initialisation du Royaume...");
    
    // 1. Initialisation des modules existants (épurée des conflits)
    loadGame();       
    initUI();         
    initActions();    
    initModal();      
    initDebug();      
    initEngine();     

    // ==========================================
    // 🔴 GESTION DU NEW GAME + (PRESTIGE)
    // ==========================================
    const btnPrestige = document.getElementById('btn-prestige');
    if (btnPrestige) {
        btnPrestige.addEventListener('click', () => {
            // On délègue toute la logique lourde au fichier save.js
            // C'est lui qui va calculer les éclats, écraser l'état et recharger la page
            triggerPrestige();
        });
    }
});