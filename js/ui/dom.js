// js/ui/dom.js
import { gameState } from '../core/state.js';
import { renderCurrentProject } from './projects.js';
import { renderBuildings } from './buildings.js';

// Cache interne des éléments du DOM
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
    
    // Branchement de l'écouteur du bouton de prestige de l'écran de fin
    const btnPrestige = document.getElementById('btn-prestige');
    if (btnPrestige) {
        btnPrestige.onclick = () => {
            // Import à la demande pour éviter les dépendances circulaires
            import('../core/save.js').then(module => {
                const scoreTotal = gameState.resources.richesse + gameState.resources.savoir + gameState.resources.renom;
                module.triggerPrestige(scoreTotal);
            });
        };
    }
    
    updateUI();
}

export function updateUI() {
    if (!ui.year) return; // Sécurité si l'UI n'est pas encore initialisée

    // 1. Rendu dynamique du libellé de l'Âge
    const titleEl = document.getElementById('ui-age-title');
    if (titleEl) {
        if (gameState.meta.current_age === 1) titleEl.textContent = "Âge I : L'Aube";
        else if (gameState.meta.current_age === 2) titleEl.textContent = "Âge II : L'Essor";
        else if (gameState.meta.current_age === 3) titleEl.textContent = "Âge III : Le Crépuscule";
    }

    // 2. Mise à jour de la chronologie et de la jauge d'Ombre
    ui.year.textContent = `An ${gameState.state.current_year}`;
    ui.shadowFill.style.width = `${gameState.state.shadow_level}%`;
    
    // 3. Rendu des compteurs de ressources de base (tronqués à l'entier inférieur)
    ui.savoir.textContent = Math.floor(gameState.resources.savoir);
    ui.richesse.textContent = Math.floor(gameState.resources.richesse);
    ui.renom.textContent = Math.floor(gameState.resources.renom);
    ui.espoir.textContent = Math.floor(gameState.resources.espoir);
    
    // 4. Rendu de la démographie
    ui.hommes.textContent = Math.floor(gameState.population.hommes);
    ui.elfes.textContent = Math.floor(gameState.population.elfes);

    // 5. Rendu du bandeau de Prestige si le joueur possède des Éclats de Silmaril
    const prestigeDisp = document.getElementById('ui-prestige-display');
    if (prestigeDisp) {
        if (gameState.meta.prestige_eclats > 0) {
            prestigeDisp.style.display = 'block';
            document.getElementById('ui-eclats').textContent = gameState.meta.prestige_eclats;
            document.getElementById('ui-eclats-bonus').textContent = (gameState.meta.prestige_eclats * 5);
        } else {
            prestigeDisp.style.display = 'none';
        }
    }

    // 6. Actualisation des panneaux d'achats à droite
    renderCurrentProject();
    renderBuildings();
}

export function addChronicle(text) {
    const logContainer = document.getElementById('log-container') || document.getElementById('chronicles');
    
    if (logContainer) {
        const entry = document.createElement('p');
        entry.style.marginBottom = "10px";
        entry.style.fontStyle = "italic";
        entry.style.fontSize = "0.9em";
        entry.style.lineHeight = "1.4";
        entry.innerHTML = "- " + text; // Permet de conserver les balises <strong> et <em>
        
        logContainer.prepend(entry); // Ajoute au début pour voir les nouveaux faits en haut
    } else {
        console.log("📖 Chronique : " + text);
    }
}
