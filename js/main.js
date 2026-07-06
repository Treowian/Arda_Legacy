// js/main.js
import { loadGame } from './core/save.js';
import { initUI } from './ui/dom.js';
import { initEngine } from './core/engine.js';

// Importe la nouvelle fonction
import { initActions } from './ui/actions.js'; 

document.addEventListener('DOMContentLoaded', () => {
    loadGame();
    initUI();
    
    // Initialise le bouton d'action
    initActions(); 
    
    initEngine();
});