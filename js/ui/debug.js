// js/ui/debug.js
import { gameState } from '../core/state.js';
import { updateUI } from './dom.js';
import { hardReset } from '../core/save.js'; // 🔴 Importation du vrai Hard Reset

export function initDebug() {
    const btnRes = document.getElementById('db-add-resources');
    if (btnRes) btnRes.addEventListener('click', () => {
        gameState.resources.savoir += 10000;
        gameState.resources.richesse += 10000;
        gameState.resources.renom += 10000;
        gameState.resources.espoir += 10000;
        updateUI();
    });

    const btnPop = document.getElementById('db-add-pop');
    if (btnPop) btnPop.addEventListener('click', () => {
        // Ajoute de la population (même au-dessus du plafond pour tester)
        gameState.population.hommes += 50;
        gameState.population.elfes += 50;
        updateUI();
    });

    const btnShadow0 = document.getElementById('db-shadow-0');
    if (btnShadow0) btnShadow0.addEventListener('click', () => {
        gameState.state.shadow_level = 0;
        updateUI();
    });

    const btnShadow100 = document.getElementById('db-shadow-100');
    if (btnShadow100) btnShadow100.addEventListener('click', () => {
        gameState.state.shadow_level = 100;
        updateUI();
    });

    const btnEvent = document.getElementById('db-trigger-event');
    if (btnEvent) btnEvent.addEventListener('click', () => {
        import('../core/engine.js').then(m => m.spawnEvent());
    });

    // 🔴 Connexion du bouton au VRAI système de Hard Reset sécurisé
    const btnReset = document.getElementById('db-hard-reset');
    if (btnReset) btnReset.addEventListener('click', () => {
        hardReset(); 
    });
}