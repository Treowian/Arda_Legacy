// js/core/state.js

export const gameState = {
    meta: {
        current_age: 1,
        legacies: [],
        prestige_eclats: 0,
        redemption_achieved: false,
        last_save_time: Date.now()
    },
    state: {
        current_year: 1,
        shadow_level: 0,
        active_focus: 'espoir',
        is_paused: false,
        is_victory: false,
        is_twilight: false,
        bonus_multiplicateur: 1.0,
        resolved_events: [],
        pending_events: []
    },
    resources: {
        savoir: 0, richesse: 50, renom: 10, espoir: 100
    },
    population: {
        hommes: 20, elfes: 0
    },
    buildings: {
        ferme: 0, village: 0, refuge_elfique: 0, forge: 0, 
        scriptorium: 0, caserne: 0, sanctuaire: 0, 
        hobbits: 0, nains: 0, ents: 0
    },
    // 🆕 LE CONSEIL DU ROI
    council: {
        senechal: false,   // Auto-Focus
        batisseur: false,  // Auto-Achat
        heraut: false      // Auto-Inspiration
    }
};

### 2. Le Moteur Automatisé : `js/core/engine.js`
*C'est ici que la magie opère. Toutes les 10 secondes, le Conseil prend ses décisions.*

```javascript
// js/core/engine.js
// ... (gardez vos imports)
import { BUILDINGS } from '../data/buildings.js';

// ... (dans gameTick(), juste AVANT processEconomy())

    // 🆕 1. LOGIQUE DU SÉNÉCHAL (Auto-Focus)
    if (gameState.council.senechal) {
        if (gameState.state.shadow_level >= 70 && gameState.state.active_focus !== 'frontalier') {
            gameState.state.active_focus = 'frontalier';
            addChronicle("📜 <em>Le Sénéchal ordonne le Focus Frontalier pour contrer l'Ombre.</em>");
        } else if (gameState.state.shadow_level <= 30 && gameState.state.active_focus !== 'agricole') {
            gameState.state.active_focus = 'agricole';
            addChronicle("📜 <em>Le Sénéchal rétablit le Focus Agricole. La paix revient.</em>");
        }
    }

    // 🆕 2. LOGIQUE DU HÉRAUT (Auto-Inspiration)
    if (gameState.council.heraut) {
        // Simule 10 clics (puisque 1 tic = 10 ans)
        for(let i=0; i<10; i++) {
            // Appelle la logique de handleInspireClick() sans l'UI
            if (gameState.state.is_twilight) {
                gameState.resources.espoir += 3;
                gameState.resources.renom += 1;
            } else {
                if (gameState.state.active_focus === 'agricole') gameState.resources.richesse += 2;
                else gameState.resources.espoir += 2;
            }
        }
    }

    // 🆕 3. LOGIQUE DU MAÎTRE BÂTISSEUR (Auto-Achat)
    if (gameState.council.batisseur && !gameState.state.is_twilight) {
        BUILDINGS.forEach(b => {
            const owned = gameState.buildings[b.id] || 0;
            // Calcul du coût actuel
            let canAffordSafe = true;
            for (const [res, baseValue] of Object.entries(b.baseCost)) {
                const cost = Math.floor(baseValue * Math.pow(b.multiplier, owned));
                // RÈGLE D'OR : On n'achète que si on a 3x le prix
                if (gameState.resources[res] < (cost * 3)) canAffordSafe = false;
            }

            if (canAffordSafe && b.isVisible(gameState)) {
                // On achète !
                for (const [res, baseValue] of Object.entries(b.baseCost)) {
                    const cost = Math.floor(baseValue * Math.pow(b.multiplier, owned));
                    gameState.resources[res] -= cost;
                }
                gameState.buildings[b.id]++;
                console.log(`🔨 Le Bâtisseur a construit : ${b.name}`);
            }
        });
    }

// ... (reste du processEconomy() et spawnEvent())

### 3. L'Interface du Conseil : `js/ui/council.js`
*Créez ce nouveau fichier pour afficher les boutons de recrutement. Le prix scale selon l'Âge.*

```javascript
// js/ui/council.js
import { gameState } from '../core/state.js';
import { updateUI } from './dom.js';

export function renderCouncil() {
    const container = document.getElementById('ui-council-container');
    if (!container) return;

    const age = gameState.meta.current_age || 1;
    const basePrice = 2000 * Math.pow(10, age - 1); // 2k, 20k, 200k...

    container.innerHTML = '';

    const members = [
        { id: 'senechal', name: 'Le Sénéchal', desc: 'Auto-Focus (70/30 Shadow)' },
        { id: 'batisseur', name: 'Maître Bâtisseur', desc: 'Auto-Achat (Sécurité 3x)' },
        { id: 'heraut', name: 'Le Héraut', desc: 'Auto-Inspiration (1/an)' }
    ];

    members.forEach(m => {
        const isHired = gameState.council[m.id];
        const canAfford = gameState.resources.richesse >= basePrice;

        const div = document.createElement('div');
        div.style.padding = '8px';
        div.style.border = '1px solid #ddd';
        div.style.marginBottom = '5px';
        div.style.background = isHired ? '#d4f1d4' : '#fff';

        div.innerHTML = `
            <div style="font-weight:bold; font-size:0.9em;">${m.name} ${isHired ? '✅' : ''}</div>
            <div style="font-size:0.75em; font-style:italic;">${m.desc}</div>
            ${!isHired ? `
                <button class="btn-action" style="font-size:0.7em; padding:3px; background:${canAfford?'#2980b9':'#ccc'}" ${!canAfford?'disabled':''}>
                    Recruter (${basePrice} Or)
                </button>
            ` : ''}
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

### 4. Mise à jour de `index.html`
*Ajoutez ce bloc au-dessus des Infrastructures :*

```html
<div id="ui-council-panel" style="margin-top: 20px; border-top: 1px dashed #333; padding-top: 15px;">
    <h3 style="font-family: var(--font-title); font-size: 1.1em; margin-bottom: 10px; color: #002b4e;">👑 LE CONSEIL DU ROI</h3>
    <div id="ui-council-container"></div>
</div>

N'oubliez pas d'importer `renderCouncil` dans `dom.js` et de l'appeler dans `updateUI` ! Avec ça, votre royaume est maintenant capable de s'auto-gérer intelligemment. Votre jeu vient de passer d'un simple clicker à une véritable simulation de gouvernement.

Dites-moi si vous souhaitez ajuster les seuils du Sénéchal ou si vous voulez que le Maître Bâtisseur soit encore plus agressif dans ses investissements !
