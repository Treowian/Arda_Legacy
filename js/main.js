// js/main.js
import { loadGame } from './core/save.js';
import { initUI } from './ui/dom.js';
import { initEngine } from './core/engine.js';
import { initActions } from './ui/actions.js';
import { initProjects } from './ui/projects.js'; // 🆕 Import des projets

document.addEventListener('DOMContentLoaded', () => {
    loadGame();
    initUI();
    initActions();
    initProjects(); // 🆕 Initialisation du panneau de grands projets
    initEngine();
});
