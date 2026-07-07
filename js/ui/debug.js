// js/ui/debug.js
import { gameState } from '../core/state.js';
import { updateUI } from './dom.js';
import { spawnEvent } from '../core/engine.js';

export function initDebug() {
    const btnAllRes = document.getElementById('db-add-resources');
    const btnPop = document.getElementById('db-add-pop');
    const btnShadow0 = document.getElementById('db-shadow-0');
    const btnShadow100 = document.getElementById('db-shadow-100');
    const btnEvent = document.getElementById('db-trigger-event');
    const btnReset = document.getElementById('db-hard-reset');

    if (btnAllRes) {
        btnAllRes.onclick = () => {
            gameState.resources.richesse += 10000;
            gameState.resources.savoir += 5000;
            gameState.resources.renom += 2000;
            gameState.resources.espoir += 2000;
            updateUI();
            console.log("🔮 Cheats : Ressources injectées.");
        };
    }

    if (btnPop) {
        btnPop.onclick = () => {
            gameState.population.hommes += 50;
            gameState.population.elfes += 50;
            updateUI();
            console.log("👥 Cheats : Population augmentée.");
        };
    }

    if (btnShadow0) {
        btnShadow0.onclick = () => {
            gameState.state.shadow_level = 0;
            updateUI();
            console.log("☀️ Cheats : Ombre balayée.");
        };
    }

    if (btnShadow100) {
        btnShadow100.onclick = () => {
            gameState.state.shadow_level = 100;
            updateUI();
            console.log("🌑 Cheats : Mode Crépuscule forcé.");
        };
    }

    if (btnEvent) {
        btnEvent.onclick = () => {
            console.log("🎲 Cheats : Déclenchement manuel d'un événement...");
            spawnEvent();
        };
    }

    if (btnReset) {
        btnReset.onclick = () => {
            if (confirm("🚨 HARD RESET : Supprimer définitivement la sauvegarde locale ?")) {
                localStorage.clear();
                location.reload();
            }
        };
    }
}
