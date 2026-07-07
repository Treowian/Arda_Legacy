// js/ui/projects.js
import { gameState } from '../core/state.js';
import { PROJECTS } from '../data/projects.js';
import { updateUI, addChronicle } from './dom.js';

export function initProjects() {
    renderCurrentProject();
}

export function renderCurrentProject() {
    const container = document.getElementById('ui-project-container');
    if (!container) return;

    // Filtre magique : projet du bon âge ET du bon mode (Crépuscule ou non)
    const currentAge = gameState.meta.current_age || 1;
    const isTwilight = gameState.state.is_twilight;
    const project = PROJECTS.find(p => p.age === currentAge && p.is_twilight === isTwilight);

    if (!project || gameState.state.is_victory) {
        container.innerHTML = `<p style="color: #2ecc71; font-weight: bold; text-align: center;">✨ Votre Légende est éternelle.</p>`;
        return;
    }

    let costText = [];
    let canAfford = true;

    for (const [key, value] of Object.entries(project.cost)) {
        if (gameState.resources[key] !== undefined) {
            costText.push(`${value} ${key.toUpperCase()}`);
            if (gameState.resources[key] < value) canAfford = false;
        }
        if (gameState.population[key] !== undefined) {
            costText.push(`${value} ${key.toUpperCase()}`);
            if (gameState.population[key] < value) canAfford = false;
        }
    }

    // Le bouton devient violet et dramatique en mode Crépuscule
    const btnColor = canAfford ? (isTwilight ? '#8e44ad' : '#27ae60') : '#444';
    const btnText = canAfford ? (isTwilight ? '🔥 ENTRER DANS L\'EXIL' : '🚀 ACCOMPLIR L\'ÈRE') : '🔒 Requis : ' + costText.join(', ');

    container.innerHTML = `
        <div style="background: rgba(255,255,255,0.03); padding: 10px; border-radius: 4px; border: 1px solid ${isTwilight ? '#8e44ad' : 'rgba(255,255,255,0.1)'};">
            <h4 style="margin: 0 0 5px 0; font-size: 1em; color: ${isTwilight ? '#c0392b' : 'inherit'};">${project.title}</h4>
            <p style="margin: 0 0 10px 0; font-size: 0.85em; opacity: 0.8; line-height: 1.3;">${project.description}</p>
            <button id="btn-complete-project" class="btn-action" style="width: 100%; padding: 8px; font-size: 0.9em; background: ${btnColor}; color: white; cursor: ${canAfford ? 'pointer' : 'not-allowed'};" ${!canAfford ? 'disabled' : ''}>
                ${btnText}
            </button>
        </div>
    `;

    const btn = document.getElementById('btn-complete-project');
    if (btn && canAfford) {
        btn.onclick = () => {
            for (const [key, value] of Object.entries(project.cost)) {
                if (gameState.resources[key] !== undefined) gameState.resources[key] -= value;
                if (gameState.population[key] !== undefined) gameState.population[key] -= value;
            }
            project.onComplete(gameState);
            addChronicle(project.log || "L'Âge tourne une nouvelle page.");
            updateUI();
            renderCurrentProject();
        };
    }
}
