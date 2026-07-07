// js/main.js
import { gameState } from './core/state.js';
import { loadGame } from './core/save.js';
import { initUI } from './ui/dom.js';
import { initEngine } from './core/engine.js';
import { initActions } from './ui/actions.js';
import { initProjects } from './ui/projects.js';
import { renderBuildings } from './ui/buildings.js';

// Exposer le state à la console pour tricher/tester (F12)
window.gameState = gameState;

document.addEventListener('DOMContentLoaded', () => {
    loadGame();
    initUI();
    initActions();
    initProjects();
    renderBuildings();
    initEngine();
});
