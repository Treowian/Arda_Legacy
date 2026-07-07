// js/ui/dom.js
import { gameState } from '../core/state.js';
import { renderCurrentProject } from './projects.js';
import { renderBuildings } from './buildings.js';

const ui = {};

export function initUI() {
    ui.year = document.getElementById('ui-year');
    ui.shadowFill = document.getElementById('ui-shadow-fill');
    
    ui.savoir = document.getElementById('ui-res-savoir');
    ui.richesse = document.getElementById('ui-res-richesse');
    ui.renom = document.getElementById('ui-res-renom');
    ui.espoir = document.getElementById('ui-res-espoir');
    
    ui.hommes = document.getElementById('ui-pop-hommes');
    ui.elfes = document.getElementById('ui-pop-elfes');
    
    updateUI();
}

export function updateUI() {
    if (!ui.year) return; 

    // Gestion du titre de l'âge
    const titleEl = document.getElementById('ui-age-title');
    if (titleEl) {
        if (gameState.meta.current_age === 1) titleEl.textContent = "Âge I : L'Aube";
        else if (gameState.meta.current_age === 2) titleEl.textContent = "Âge II : L'Essor";
        else if (gameState.meta.current_age === 3) titleEl.textContent = "Âge III : Le Crépuscule";
    }

    ui.year.textContent = `An ${gameState.state.current_year}`;
    ui.shadowFill.style.width = `${gameState.state.shadow_level}%`;
    
    ui.savoir.textContent = Math.floor(gameState.resources.savoir);
    ui.richesse.textContent = Math.floor(gameState.resources.richesse);
    ui.renom.textContent = Math.floor(gameState.resources.renom);
    ui.espoir.textContent = Math.floor(gameState.resources.espoir);
    
    ui.hommes.textContent = gameState.population.hommes;
    ui.elfes.textContent = gameState.population.elfes;

    // Mise à jour des boutons d'achat
    renderCurrentProject();
    renderBuildings();
}

export function addChronicle(text) {
    const logContainer = document.getElementById('log-container') || document.getElementById('chronicles');
    
    if (logContainer) {
        const entry = document.createElement('p');
        entry.style.marginBottom = "10px";
        entry.style.fontStyle = "italic";
        entry.innerHTML = "- " + text;
        logContainer.prepend(entry);
    } else {
        console.log("📖 Chronique : " + text);
    }
}
