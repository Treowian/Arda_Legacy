// js/ui/buildings.js
import { gameState } from '../core/state.js';
import { BUILDINGS } from '../data/buildings.js';
import { updateUI } from './dom.js';

export function renderBuildings() {
    const panel = document.getElementById('ui-buildings-panel');
    const container = document.getElementById('ui-buildings-container');
    if (!panel || !container) return;

    // Vérifier si au moins un bâtiment est visible pour afficher le panneau
    const visibleBuildings = BUILDINGS.filter(b => b.isVisible(gameState));
    
    if (visibleBuildings.length > 0 && !gameState.state.is_twilight) {
        panel.style.display = 'block';
    } else {
        panel.style.display = 'none';
        return;
    }

    container.innerHTML = '';

    visibleBuildings.forEach(building => {
        const owned = gameState.buildings[building.id];
        
        // Calcul exponentiel du coût
        let currentCost = {};
        let canAfford = true;
        let costStrings = [];

        for (const [res, baseValue] of Object.entries(building.baseCost)) {
            const calculatedCost = Math.floor(baseValue * Math.pow(building.multiplier, owned));
            currentCost[res] = calculatedCost;
            costStrings.push(`${calculatedCost} ${res.toUpperCase()}`);
            if (gameState.resources[res] < calculatedCost) canAfford = false;
        }

        const div = document.createElement('div');
        div.style.background = 'rgba(255,255,255,0.03)';
        div.style.padding = '8px';
        div.style.border = '1px solid rgba(0,0,0,0.1)';
        div.style.display = 'flex';
        div.style.justifyContent = 'space-between';
        div.style.alignItems = 'center';
        div.style.marginBottom = '5px';

        div.innerHTML = `
            <div>
                <strong style="font-size: 0.95em;">${building.name} (${owned})</strong>
                <div style="font-size: 0.75em; opacity: 0.8;">${building.description}</div>
            </div>
            <button class="btn-action" style="font-size: 0.8em; padding: 4px 8px; background: ${canAfford ? '#3498db' : '#ccc'}; cursor: ${canAfford ? 'pointer' : 'not-allowed'}; border: none; border-radius: 4px; color: white;" ${!canAfford ? 'disabled' : ''}>
                Acheter<br><span style="font-size: 0.8em;">${costStrings.join(', ')}</span>
            </button>
        `;

        const btn = div.querySelector('button');
        if (canAfford) {
            btn.onclick = () => {
                for (const [res, cost] of Object.entries(currentCost)) {
                    gameState.resources[res] -= cost;
                }
                gameState.buildings[building.id]++;
                updateUI();
            };
        }

        container.appendChild(div);
    });
}
