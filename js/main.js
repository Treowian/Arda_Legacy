// js/main.js
import { gameState } from './core/state.js';
import { loadGame } from './core/save.js';
import { initUI } from './ui/dom.js';
import { initEngine } from './core/engine.js';
import { initActions } from './ui/actions.js';
import { initProjects } from './ui/projects.js';
import { renderBuildings } from './ui/buildings.js';
import { initDebug } from './ui/debug.js';
import { initModal } from './ui/modal.js'; // 🆕 Importation de l'init de la modale

// Rendre accessible globalement pour les manipulations directes via F12
window.gameState = gameState;

document.addEventListener('DOMContentLoaded', () => {
    loadGame();       
    initUI();         
    initActions();    
    initProjects();   
    renderBuildings(); 
    initModal();      // 🆕 Raccorde le clic sur le bouton Messager
    initDebug();      
    initEngine();     
});
