// js/ui/council.js
import { gameState } from '../core/state.js';
import { updateUI } from './dom.js';

export function renderCouncil() {
    const container = document.getElementById('ui-council-container');
    if (!container) return;

    // Progression des coûts indexée sur l'Âge : 2k à l'Âge 1, 20k à l'Âge 2, 200k à l'Âge 3
    const age = gameState.meta.current_age || 1;
    const basePrice = 2000 * Math.pow(10, age - 1); 

    container.innerHTML = '';

    const members = [
        { id: 'senechal', name: 'Le Sénéchal', desc: 'Gère les Décrets (Auto-Switch à 70% et 30% d\'Ombre)' },
        { id: 'batisseur', name: 'Maître Bâtisseur', desc: 'Achat d\'infrastructures (Sécurité : Ne bâtit que si Trésor > 3x le coût)' },
        { id: 'heraut', name: 'Le Héraut', desc: 'Inspiration passive (Simule 10 clics d\'Inspiration automatique par an)' }
    ];

    members.forEach(m => {
        const isHired = gameState.council[m.id];
        const canAfford = gameState.resources.richesse >= basePrice;

        const div = document.createElement('div');
        div.style.background = 'rgba(255,255,255,0.02)';
        div.style.padding = '10px';
        div.style.border = '1px solid rgba(0,0,0,0.1)';
        div.style.borderRadius = '4px';
        div.style.display = 'flex';
        div.style.justifyContent = 'space-between';
        div.style.alignItems = 'center';
        div.style.marginBottom = '8px';
        
        if (isHired) {
            div.style.background = 'rgba(39, 174, 96, 0.08)';
            div.style.borderLeft = '4px solid #27ae60';
        }

        div.innerHTML = `
            <div style="flex-grow: 1; padding-right: 10px;">
                <strong style="font-size: 0.9em; color: #2c3e50;">${m.name} ${isHired ? '💼' : ''}</strong>
                <div style="font-size: 0.75em; opacity: 0.8; font-style: italic; line-height:1.3;">${m.desc}</div>
            </div>
            ${!isHired ? `
                <button class="btn-action" style="font-size: 0.75em; padding: 6px 10px; margin: 0; background: ${canAfford ? '#2980b9' : '#bbb'}; cursor: ${canAfford ? 'pointer' : 'not-allowed'}; min-width: 95px;" ${!canAfford ? 'disabled' : ''}>
                    Recruter<br><span style="font-weight:bold;">${basePrice} OR</span>
                </button>
            ` : '<span style="color: #27ae60; font-weight: bold; font-size: 0.85em; padding-right:5px;">Siégeant</span>'}
        `;

        if (!isHired && canAfford) {
            div.querySelector('button').onclick = () => {
                gameState.resources.richesse -= basePrice;
                gameState.council[m.id] = true;
                updateUI();
            };
        }

        container.appendChild(div);
    });
}
