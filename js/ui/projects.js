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

    // On récupère TOUS les projets valides pour cet âge
    const currentAge = gameState.meta.current_age || 1;
    const validProjects = PROJECTS.filter(p => p.age === currentAge && p.is_twilight === gameState.state.is_twilight);

    if (validProjects.length === 0 || gameState.state.is_victory) {
        container.innerHTML = `<p style="color: #2ecc71; font-weight: bold; text-align: center;">✨ Votre Légende est éternelle.</p>`;
        return;
    }

    container.innerHTML = ''; // On vide

    // On crée un bouton par projet valide (ex: les 2 choix de l'Âge 3)
    validProjects.forEach(project => {
        let costText = [];
        let canAfford = true;

        for (const [key, value] of Object.entries(project.cost)) {
            if (gameState.resources[key] !== undefined) { costText.push(`${value} ${key.toUpperCase()}`); if (gameState.resources[key] < value) canAfford = false; }
            if (gameState.population[key] !== undefined) { costText.push(`${value} ${key.toUpperCase()}`); if (gameState.population[key] < value) canAfford = false; }
        }

        const div = document.createElement('div');
        div.style.background = 'rgba(255,255,255,0.03)';
        div.style.padding = '10px';
        div.style.marginBottom = '10px';
        div.style.borderRadius = '4px';
        div.style.border = `1px solid ${gameState.state.is_twilight ? '#8e44ad' : 'rgba(255,255,255,0.1)'}`;

        div.innerHTML = `
            <h4 style="margin: 0 0 5px 0; font-size: 1em; color: ${gameState.state.is_twilight ? '#c0392b' : 'inherit'};">${project.title}</h4>
            <p style="margin: 0 0 10px 0; font-size: 0.85em; opacity: 0.8;">${project.description}</p>
            <button class="btn-action" style="width: 100%; padding: 8px; font-size: 0.9em; background: ${canAfford ? (gameState.state.is_twilight ? '#8e44ad' : '#27ae60') : '#444'}; color: white; cursor: ${canAfford ? 'pointer' : 'not-allowed'};" ${!canAfford ? 'disabled' : ''}>
                ${canAfford ? '🚀 ACCOMPLIR' : '🔒 Requis : ' + costText.join(', ')}
            </button>
        `;

        const btn = div.querySelector('button');
        if (canAfford) {
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
        container.appendChild(div);
    });
}
