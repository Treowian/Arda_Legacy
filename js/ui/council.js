// js/ui/council.js
import { gameState } from '../core/state.js';
import { updateUI } from './dom.js';

export function renderCouncil() {
    const container = document.getElementById('ui-council-container');
    if (!container) return;

    const age = gameState.meta.current_age || 1;
    const basePrice = 2000 * Math.pow(10, age - 1); 

    container.innerHTML = '';

    const members = [
        { id: 'senechal', name: 'Le Sénéchal', desc: 'Gère les Décrets (Auto-Switch à 70% et 30% d\'Ombre)' },
        { id: 'batisseur', name: 'Maître Bâtisseur', desc: 'Achat d\'infrastructures (Sécurité : Trésor > 3x le coût)' },
        { id: 'heraut', name: 'Le Héraut', desc: 'Inspiration passive (Simule 10 clics par an)' }
    ];

    if (!gameState.state.council_active) {
        gameState.state.council_active = { senechal: true, batisseur: true, heraut: true };
    }

    members.forEach(m => {
        const isHired = gameState.council[m.id];
        const isActive = gameState.state.council_active[m.id];
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
        
        if (isHired && isActive) {
            div.style.background = 'rgba(39, 174, 96, 0.08)';
            div.style.borderLeft = '4px solid #27ae60';
        } else if (isHired && !isActive) {
            div.style.background = 'rgba(0,0,0,0.05)';
            div.style.borderLeft = '4px solid #7f8c8d';
            div.style.opacity = '0.7';
        }

        // L'icône a été retirée à côté de ${m.name}
        div.innerHTML = `
            <div style="flex: 1; padding-right: 15px; display: flex; flex-direction: column; justify-content: center;">
                <div style="font-weight: bold; font-size: 0.95em; color: #2c3e50; margin-bottom: 4px; display: flex; align-items: center; gap: 6px;">
                    ${m.name} 
                </div>
                <div style="font-size: 0.75em; opacity: 0.8; font-style: italic; line-height: 1.3;">${m.desc}</div>
            </div>
            
            <div style="flex-shrink: 0; width: 110px;">
            ${!isHired ? `
                <button class="btn-action" style="font-size: 0.8em; padding: 8px 5px; margin: 0; background: ${canAfford ? '#2980b9' : '#bbb'}; cursor: ${canAfford ? 'pointer' : 'not-allowed'}; width: 100%; height: 100%; border-radius: 4px;" ${!canAfford ? 'disabled' : ''}>
                    Recruter<br><span style="font-weight:bold; font-size: 0.9em;">${basePrice} RICHESSE</span>
                </button>
            ` : `
                <button class="btn-action" style="font-size: 0.85em; padding: 8px 5px; margin: 0; background: ${isActive ? '#e74c3c' : '#27ae60'}; cursor: pointer; width: 100%; height: 100%; border-radius: 4px;">
                    ${isActive ? 'Repos' : 'Rappeler'}
                </button>
            `}
            </div>
        `;

        const btn = div.querySelector('button');
        
        if (!isHired && canAfford) {
            btn.onclick = () => {
                gameState.resources.richesse -= basePrice;
                gameState.council[m.id] = true;
                gameState.state.council_active[m.id] = true;
                updateUI();
            };
        } else if (isHired) {
            btn.onclick = () => {
                gameState.state.council_active[m.id] = !gameState.state.council_active[m.id];
                updateUI();
            };
        }

        container.appendChild(div);
    });
}
