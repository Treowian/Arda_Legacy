// js/main.js
import { gameState } from './state.js';
import { loadGame } from './core/save.js';
import { initUI } from './ui/dom.js';
import { initEngine } from './core/engine.js';
import { initActions } from './ui/actions.js';
import { initProjects } from './ui/projects.js';
import { renderBuildings } from './ui/buildings.js';
import { initDebug } from './ui/debug.js';

// Rendre accessible globalement pour les manipulations directes via F12
window.gameState = gameState;

document.addEventListener('DOMContentLoaded', () => {
    loadGame();       // 1. Charger les cookies/Localstorage
    initUI();         // 2. Mettre en cache l'interface
    initActions();    // 3. Écouter le bouton Inspirer
    initProjects();   // 4. Initialiser la logique des grands projets
    renderBuildings(); // 5. Lancer l'évaluation des infrastructures
    initDebug();      // 6. Activer le menu de triche
    initEngine();     // 7. Lancer le temps (10s / an)
});
