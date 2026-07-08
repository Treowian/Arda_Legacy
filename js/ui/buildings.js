// js/ui/buildings.js
import { gameState } from '../core/state.js';
import { BUILDINGS } from '../data/buildings.js';
import { updateUI } from './dom.js';

export function renderBuildings() {
    const panel = document.getElementById('ui-buildings-panel');
    const container = document.getElementById('ui-buildings-container');
    if (!panel || !container) return;

    // On récupère uniquement les bâtiments que le joueur a le droit de voir
    const visibleBuildings = BUILDINGS.filter(b => b.isVisible(gameState));
    
    if (visibleBuildings.length > 0 && !gameState.state.is_twilight) {
        panel.style.display = 'block';
    } else {
        panel.style.display = 'none';
        return;
    }

    container.innerHTML = '';

    visibleBuildings.forEach(building => {
        const owned = gameState.buildings[building.id] || 0;
        let currentCost = {};
        let canAfford = true;
        let costStrings = [];

        // Calcul des coûts
        for (const [res, baseValue] of Object.entries(building.baseCost)) {
            const calculatedCost = Math.floor(baseValue * Math.pow(building.multiplier, owned));
            currentCost[res] = calculatedCost;
            costStrings.push(`${calculatedCost} ${res.toUpperCase()}`);
            if (gameState.resources[res] < calculatedCost) canAfford = false;
        }

        const div = document.createElement('div');
        div.style.background = 'rgba(255,255,255,0.02)';
        div.style.padding = '10px';
        div.style.border = '1px solid rgba(0,0,0,0.1)';
        div.style.borderRadius = '4px';
        div.style.display = 'flex';
        div.style.justifyContent = 'space-between';
        div.style.alignItems = 'stretch'; /* Étire le bouton pour qu'il remplisse la hauteur */
        div.style.marginBottom = '8px';

        // Le HTML avec le conteneur fixe de 125px pour le bouton
        div.innerHTML = `
            <div style="flex: 1; padding-right: 15px; display: flex; flex-direction: column; justify-content: center;">
                <div style="font-weight: bold; font-size: 0.95em; color: #2c3e50; margin-bottom: 4px;">
                    ${building.name} (${owned})
                </div>
                <div style="font-size: 0.75em; opacity: 0.8; font-style: italic; line-height: 1.3;">
                    ${building.description}
                </div>
            </div>
            
            <div style="flex-shrink: 0; width: 125px; display: flex;">
                <button class="btn-action" style="font-size: 0.75em; padding: 6px 4px; margin: 0; background: ${canAfford ? '#8a6d55' : '#bbb'}; cursor: ${canAfford ? 'pointer' : 'not-allowed'}; border: none; border-radius: 4px; color: white; width: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; line-height: 1.2;" ${!canAfford ? 'disabled' : ''}>
                    <span style="margin-bottom: 4px;">Bâtir</span>
                    <span style="font-weight:bold; font-size: 0.9em;">${costStrings.join('<br>')}</span>
                </button>
            </div>
        `;

        const btn = div.querySelector('button');
        if (canAfford) {
            btn.onclick = () => {
                // Paiement des coûts
                for (const [res, cost] of Object.entries(currentCost)) {
                    gameState.resources[res] -= cost;
                }
                // Achat
                gameState.buildings[building.id]++;
                updateUI();
            };
        }

        container.appendChild(div);
    });
}
