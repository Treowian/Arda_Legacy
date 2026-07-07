// js/ui/projects.js
import { gameState } from '../core/state.js';
import { PROJECTS } from '../data/projects.js';
import { updateUI, addChronicle } from './dom.js';

export function initProjects() {
    // Premier rendu au chargement
    renderCurrentProject();
}

export function renderCurrentProject() {
    const container = document.getElementById('ui-project-container');
    if (!container) return;

    // 1. On cherche le projet qui correspond à l'Âge actuel du joueur
    const currentAge = gameState.meta.current_age || 1;
    const project = PROJECTS.find(p => p.age === currentAge);

    // Si le joueur a gagné ou s'il n'y a plus de projet
    if (!project || gameState.state.is_victory) {
        container.innerHTML = `<p style="color: #2ecc71; font-weight: bold; text-align: center;">✨ Votre Légende est éternelle. Jeu Terminé !</p>`;
        return;
    }

    // 2. On prépare le texte des coûts pour l'afficher sur le bouton
    let costText = [];
    let canAfford = true;

    // On vérifie les coûts dans les ressources
    for (const [key, value] of Object.entries(project.cost)) {
        if (gameState.resources[key] !== undefined) {
            costText.push(`${value} ${key.toUpperCase()}`);
            if (gameState.resources[key] < value) canAfford = false;
        }
        // On vérifie si le coût demande de la population (ex: Hommes)
        if (gameState.population[key] !== undefined) {
            costText.push(`${value} ${key.toUpperCase()}`);
            if (gameState.population[key] < value) canAfford = false;
        }
    }

    // 3. On injecte le HTML du projet actif
    container.innerHTML = `
        <div style="background: rgba(255,255,255,0.03); padding: 10px; border-radius: 4px; border: 1px solid rgba(255,255,255,0.1);">
            <h4 style="margin: 0 0 5px 0; font-size: 1em;">${project.title}</h4>
            <p style="margin: 0 0 10px 0; font-size: 0.85em; opacity: 0.8; line-height: 1.3;">${project.description}</p>
            <button id="btn-complete-project" class="btn-action" style="width: 100%; padding: 8px; font-size: 0.9em; background: ${canAfford ? '#27ae60' : '#444'}; color: white; cursor: ${canAfford ? 'pointer' : 'not-allowed'};" ${!canAfford ? 'disabled' : ''}>
                ${canAfford ? '🚀 ACCOMPLIR L\'ÈRE' : '🔒 Requis : ' + costText.join(', ')}
            </button>
        </div>
    `;

    // 4. Écouteur de clic sur le bouton si le joueur a les moyens
    const btn = document.getElementById('btn-complete-project');
    if (btn && canAfford) {
        btn.onclick = () => buyProject(project);
    }
}

function buyProject(project) {
    // A. On retire les ressources au joueur
    for (const [key, value] of Object.entries(project.cost)) {
        if (gameState.resources[key] !== undefined) gameState.resources[key] -= value;
        if (gameState.population[key] !== undefined) gameState.population[key] -= value;
    }

    // B. On exécute l'effet magique (Changement d'Âge ou Victoire)
    project.onComplete(gameState);

    // C. On écrit l'événement historique dans les Chroniques
    addChronicle(project.log);

    // D. On rafraîchit absolument tout
    updateUI();
    renderCurrentProject();
}
