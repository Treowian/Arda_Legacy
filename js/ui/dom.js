// js/ui/dom.js
import { gameState } from '../core/state.js';

// Cache de l'interface (évite les requêtes DOM inutiles)
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
    
    // Premier rendu immédiat
    updateUI();
}

export function updateUI() {
    if (!ui.year) return; // Sécurité : ne pas crasher si le cache est vide

    // textContent empêche les failles d'injection XSS
    ui.year.textContent = `An ${gameState.state.current_year}`;
    ui.shadowFill.style.width = `${gameState.state.shadow_level}%`;
    
    // Math.floor masque les décimales générées par la production passive
    ui.savoir.textContent = Math.floor(gameState.resources.savoir);
    ui.richesse.textContent = Math.floor(gameState.resources.richesse);
    ui.renom.textContent = Math.floor(gameState.resources.renom);
    ui.espoir.textContent = Math.floor(gameState.resources.espoir);
    
    ui.hommes.textContent = gameState.population.hommes;
    ui.elfes.textContent = gameState.population.elfes;
}