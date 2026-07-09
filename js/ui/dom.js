// js/ui/dom.js
import { gameState } from '../core/state.js';
import { BUILDINGS } from '../data/buildings.js';
import { EVENTS } from '../data/events.js';
import { PROJECTS } from '../data/projects.js';

// ==========================================
// 1. INITIALISATION DE L'INTERFACE
// ==========================================
export function initUI() {
    const btnInspire = document.getElementById('btn-inspire');
    if (btnInspire) {
        btnInspire.addEventListener('click', () => {
            import('../core/engine.js').then(module => {
                if (module.handleManualClick) module.handleManualClick();
            });
        });
    }

    const radios = document.querySelectorAll('input[name="focus"]');
    radios.forEach(radio => {
        if (radio.value === gameState.state.active_focus) {
            radio.checked = true;
        }
        radio.addEventListener('change', (e) => {
            gameState.state.active_focus = e.target.value;
            updateUI();
        });
    });

    const councilModal = document.getElementById('council-modal');
    const btnOpenCouncil = document.getElementById('btn-open-council');
    const btnCloseCouncil = document.getElementById('btn-close-council');

    if (btnOpenCouncil && councilModal) {
        btnOpenCouncil.addEventListener('click', () => {
            councilModal.showModal();
        });
        btnCloseCouncil.addEventListener('click', () => councilModal.close());
    }

    const btnInbox = document.getElementById('btn-inbox');
    if (btnInbox) {
        btnInbox.addEventListener('click', () => {
            if (gameState.state.pending_events.length > 0) {
                const eventId = gameState.state.pending_events[0];
                const eventObj = EVENTS.find(e => e.id === eventId);
                if (eventObj) showEventModal(eventObj);
            }
        });
    }

    updateUI();
}

// ==========================================
// 2. BOUCLE PRINCIPALE DE MISE À JOUR VISUELLE
// ==========================================
export function updateUI() {
    if (!document.getElementById('ui-year')) return; 

    document.getElementById('ui-year').textContent = `An ${gameState.state.current_year}`;
    document.getElementById('ui-res-savoir').textContent = Math.floor(gameState.resources.savoir);
    document.getElementById('ui-res-richesse').textContent = Math.floor(gameState.resources.richesse);
    document.getElementById('ui-res-renom').textContent = Math.floor(gameState.resources.renom);
    document.getElementById('ui-res-espoir').textContent = Math.floor(gameState.resources.espoir);
    
    document.getElementById('ui-pop-hommes').textContent = Math.floor(gameState.population.hommes);
    document.getElementById('ui-pop-elfes').textContent = Math.floor(gameState.population.elfes);

    updateRatesDisplay();

    // -- Affichage de l'Héritage (Prestige) --
    const prestigeDisplay = document.getElementById('ui-prestige-display');
    if (prestigeDisplay) {
        if (gameState.meta && gameState.meta.prestige_eclats > 0) {
            prestigeDisplay.style.display = 'block';
            const eclats = gameState.meta.prestige_eclats;
            document.getElementById('ui-eclats').textContent = eclats;
            document.getElementById('ui-eclats-bonus').textContent = eclats * 5; 
        } else {
            prestigeDisplay.style.display = 'none'; 
        }
    }

    // -- Gestion de l'Ombre et du JUICE (Couleur dynamique) --
    const shadowRatio = Math.min(100, Math.max(0, gameState.state.shadow_level));
    const shadowFill = document.getElementById('ui-shadow-fill');
    if (shadowFill) shadowFill.style.width = `${shadowRatio}%`;

    const ratio = shadowRatio / 100;
    const r = Math.round(245 - (ratio * (245 - 44)));
    const g = Math.round(242 - (ratio * (242 - 62)));
    const b = Math.round(235 - (ratio * (235 - 80)));
    
    document.documentElement.style.setProperty('--bg-color', `rgb(${r}, ${g}, ${b})`);

    if (ratio > 0.6) {
        document.documentElement.style.setProperty('--text-color', '#ecf0f1');
        document.documentElement.style.setProperty('--panel-bg', 'rgba(30, 40, 55, 0.85)'); 
        document.documentElement.style.setProperty('--border-color', 'rgba(255, 255, 255, 0.1)');
        if (shadowFill) shadowFill.style.backgroundColor = '#8e44ad';
    } else {
        document.documentElement.style.setProperty('--text-color', '#2c3e50');
        document.documentElement.style.setProperty('--panel-bg', 'rgba(255, 255, 255, 0.92)'); 
        document.documentElement.style.setProperty('--border-color', 'rgba(0, 0, 0, 0.1)');
        if (shadowFill) shadowFill.style.backgroundColor = '#c0392b';
    }
    
    renderModifiers();

    const btnInbox = document.getElementById('btn-inbox');
    if (btnInbox) {
        if (gameState.state.pending_events && gameState.state.pending_events.length > 0) {
            btnInbox.style.display = 'block';
            btnInbox.textContent = `📬 ${gameState.state.pending_events.length} Événement(s) en attente`;
            btnInbox.classList.add('pulse-anim');
        } else {
            btnInbox.style.display = 'none';
            btnInbox.classList.remove('pulse-anim');
        }
    }

    renderBuildings();
    renderCouncil();
    renderProjects();
}

// ==========================================
// 3. RENDUS SPÉCIFIQUES
// ==========================================

function renderModifiers() {
    const container = document.getElementById('ui-modifiers-container');
    if (!container) return;

    if (gameState.state.active_modifiers && gameState.state.active_modifiers.length > 0) {
        container.style.display = 'block';
        
        container.innerHTML = gameState.state.active_modifiers.map(mod => {
            const penalty = Math.round((1 - mod.power) * 100);
            const targetName = mod.target.charAt(0).toUpperCase() + mod.target.slice(1);
            return `
            <div style="background: rgba(231, 76, 60, 0.1); border-left: 4px solid #c0392b; padding: 10px; margin-bottom: 8px; border-radius: 4px;">
                <div style="color: #c0392b; font-weight: bold; font-size: 0.9em; margin-bottom: 4px;">
                    ⚠️ ${mod.label}
                </div>
                <div style="font-size: 0.8em;">
                    Production de ${targetName} : <strong>-${penalty}%</strong> <br>
                    <span style="font-style: italic; opacity: 0.8;">Se dissipe dans ${mod.duration} an(s)</span>
                </div>
            </div>`;
        }).join('');
    } else {
        container.style.display = 'none';
        container.innerHTML = '';
    }
}

function renderBuildings() {
    const container = document.getElementById('ui-buildings-container');
    if (!container) return;

    // Purge l'affichage existant
    container.innerHTML = '';

    BUILDINGS.forEach(b => {
        if (!b.isVisible(gameState)) return;

        const owned = gameState.buildings[b.id] || 0;
        let affordable = true;
        let costStr = '';

        // 🔴 1. Vérification intelligente des coûts (Ressources ET Population)
        for (const [res, baseValue] of Object.entries(b.baseCost)) {
            const cost = Math.floor(baseValue * Math.pow(b.multiplier, owned));
            // Cherche dans resources, sinon dans population, sinon 0
            const currentAmount = gameState.resources[res] ?? gameState.population[res] ?? 0;
            
            if (currentAmount < cost) affordable = false;
            costStr += `${cost} ${res.toUpperCase()}<br>`;
        }

        const btn = document.createElement('button');
        btn.className = 'btn-action';
        btn.style.display = 'block';
        btn.style.width = '100%';
        btn.style.textAlign = 'left';
        btn.disabled = !affordable;

        btn.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
                <strong style="font-size: 1.1em; letter-spacing: 0.5px;">${b.name} <span style="opacity: 0.6; font-weight: normal;">(${owned})</span></strong>
                <div style="text-align: right; font-size: 0.85em; font-family: monospace; font-weight: bold; color: ${affordable ? '#2ecc71' : '#e74c3c'}; line-height: 1.3;">
                    ${costStr}
                </div>
            </div>
            <div style="font-size: 0.85em; font-weight: normal; opacity: 0.85; line-height: 1.4;">
                ${b.description}
            </div>
        `;

        btn.addEventListener('click', () => {
            if (affordable) {
                // 🔴 2. Déduction intelligente des coûts
                for (const [res, baseValue] of Object.entries(b.baseCost)) {
                    const cost = Math.floor(baseValue * Math.pow(b.multiplier, owned));
                    
                    if (gameState.resources[res] !== undefined) {
                        gameState.resources[res] -= cost;
                    } else if (gameState.population[res] !== undefined) {
                        gameState.population[res] -= cost;
                    }
                }
                gameState.buildings[b.id] = owned + 1;
                updateUI();
            }
        });

        container.appendChild(btn);
    });
}

function renderCouncil() {
    const container = document.getElementById('ui-council-container');
    if (!container) return;
    container.innerHTML = '';

    const councilors = [
        { id: 'senechal', name: 'Sénéchal', req: 50, desc: 'Gère automatiquement les focus selon le niveau de l\'Ombre.' },
        { id: 'batisseur', name: 'Bâtisseur', req: 200, desc: 'Achète automatiquement les infrastructures si les fonds le permettent.' },
        { id: 'heraut', name: 'Héraut', req: 500, desc: 'Inspire automatiquement le peuple.' }
    ];

    let unlockedAny = false;

    councilors.forEach(c => {
        if (gameState.resources.renom >= c.req || gameState.council[c.id]) {
            gameState.council[c.id] = true; 
            unlockedAny = true;

            const isActive = gameState.state.council_active[c.id];
            const btn = document.createElement('button');
            btn.className = 'btn-action';
            btn.style.backgroundColor = isActive ? '#27ae60' : '#7f8c8d';
            btn.innerHTML = `${c.name} : ${isActive ? 'ACTIF' : 'EN PAUSE'}<br><span style="font-size:0.8em; font-weight:normal;">${c.desc}</span>`;

            btn.addEventListener('click', () => {
                gameState.state.council_active[c.id] = !isActive;
                updateUI();
            });
            container.appendChild(btn);
        } else {
            const div = document.createElement('div');
            div.style.padding = '10px';
            div.style.color = '#7f8c8d';
            div.style.border = '1px dashed #ccc';
            div.style.marginBottom = '10px';
            div.innerHTML = `🔒 <em>Poste verrouillé (Requis : ${c.req} Renom)</em>`;
            container.appendChild(div);
        }
    });

    if (!unlockedAny) {
        container.innerHTML = `<p style="font-size: 0.9em; font-style: italic; opacity: 0.7;">Aucun membre du Conseil n'a encore été débloqué.</p>`;
    }
}

function renderProjects() {
    const container = document.getElementById('ui-project-container');
    if (!container) return;
    container.innerHTML = '';

    if (typeof PROJECTS === 'undefined') return;

    const currentProject = PROJECTS.find(p => p.age === gameState.meta.current_age && !gameState.state.resolved_events.includes(p.id));

    if (!currentProject) {
        container.innerHTML = `<p style="color: #7f8c8d; font-style: italic; font-size: 0.9em;">Aucun grand projet pour le moment.</p>`;
        return;
    }

    let canAfford = true;
    let reqText = [];

    for (const [key, value] of Object.entries(currentProject.cost)) {
        const currentAmount = gameState.resources[key] ?? gameState.population[key] ?? 0;
        
        if (currentAmount < value) canAfford = false;
        reqText.push(`${value} ${key.toUpperCase()}`);
    }

    const btn = document.createElement('button');
    btn.className = 'btn-action';
    btn.style.backgroundColor = canAfford ? '#b89742' : '#7f8c8d';
    btn.disabled = !canAfford;
    
    btn.innerHTML = `
        <strong>${currentProject.title}</strong><br>
        <span style="font-size: 0.8em; font-weight: normal;">${currentProject.description}</span><br>
        <span style="font-size: 0.75em; display: block; margin-top: 5px;">
            ${canAfford ? '✨ Clic pour achever l\'Ère' : '🔒 Requis : ' + reqText.join(', ')}
        </span>
    `;

    btn.addEventListener('click', () => {
        if (canAfford) {
            for (const [key, value] of Object.entries(currentProject.cost)) {
                if (gameState.resources[key] !== undefined) gameState.resources[key] -= value;
                if (gameState.population[key] !== undefined) gameState.population[key] -= value;
            }
            gameState.state.resolved_events.push(currentProject.id);
            if (currentProject.effect) currentProject.effect(gameState);
            updateUI();
        }
    });

    container.appendChild(btn);
}

// ==========================================
// 4. NOTIFICATIONS ET MODALES
// ==========================================

export function showEventModal(eventObj) {
    const modal = document.getElementById('event-modal');
    if (!modal) return;

    document.getElementById('modal-title').textContent = eventObj.title;
    document.getElementById('modal-text').textContent = eventObj.description;

    const choicesContainer = document.getElementById('modal-choices');
    choicesContainer.innerHTML = ''; 

    eventObj.choices.forEach(choice => {
        const btn = document.createElement('button');
        btn.className = 'btn-action';
        btn.textContent = choice.label;
        btn.disabled = !choice.canAfford(gameState);

        btn.addEventListener('click', () => {
            choice.effect(gameState);
            addChronicle(`<em>${choice.log}</em>`);

            gameState.state.pending_events = gameState.state.pending_events.filter(e => e !== eventObj.id);

            if (!eventObj.repeatable) {
                gameState.state.resolved_events.push(eventObj.id);
            }

            modal.close();
            updateUI();
        });
        
        choicesContainer.appendChild(btn);
    });

    modal.showModal();
}

// ==========================================
// 5. MOTEUR DE CHRONIQUES (Logs)
// ==========================================
export function addChronicle(htmlMsg) {
    const container = document.getElementById('log-container');
    if (!container) return;
    
    const entry = document.createElement('div');
    entry.style.marginBottom = '12px';
    entry.style.paddingBottom = '12px';
    entry.style.borderBottom = '1px solid rgba(0,0,0,0.05)';
    entry.style.lineHeight = '1.4';
    
    const yearSpan = `<span style="font-family: var(--font-title); font-size: 0.8em; color: #7f8c8d; display: block; margin-bottom: 2px;">An ${gameState.state.current_year}</span>`;
    
    entry.innerHTML = yearSpan + htmlMsg;
    container.prepend(entry); 
}

// ==========================================
// 6. CALCUL DES FLUX (RATES)
// ==========================================
function updateRatesDisplay() {
    const prestigeBonus = 1 + ((gameState.meta.prestige_eclats || 0) * 0.05);
    const redemptionBonus = gameState.meta.redemption_achieved ? 1.5 : 1.0;
    const multiplier = (gameState.state.bonus_multiplicateur || 1.0) * prestigeBonus * redemptionBonus;

    let malusRichesse = 1.0;
    let malusEspoir = 1.0;
    if (gameState.state.active_modifiers) {
        gameState.state.active_modifiers.forEach(mod => {
            if (mod.target === 'richesse') malusRichesse *= mod.power;
            if (mod.target === 'espoir') malusEspoir *= mod.power;
        });
    }

    let rates = { savoir: 0, richesse: 0, renom: 0, espoir: 0, hommes: 0, elfes: 0 };

    if (gameState.state.is_twilight) {
        rates.richesse -= 50;
        rates.espoir -= 5;
        rates.hommes -= 1;
    } else {
        if (gameState.resources.espoir > 200) rates.hommes += 0.5 * multiplier;
        if (gameState.resources.espoir > 1000) rates.hommes += 1.5 * multiplier;

        let bonusAgricole = gameState.state.active_focus === 'agricole' ? 1.2 : 1.0;
        
        rates.richesse += (gameState.population.hommes * 0.1) * multiplier * bonusAgricole * malusRichesse;
        rates.savoir += (gameState.population.elfes * 0.1) * multiplier;
        rates.espoir -= 0.5;

        BUILDINGS.forEach(b => {
            const owned = gameState.buildings[b.id] || 0;
            if (owned > 0 && b.production) {
                for (const [res, amount] of Object.entries(b.production)) {
                    let finalAmount = (amount * owned) * multiplier;
                    if (res === 'richesse') finalAmount *= malusRichesse;
                    if (res === 'espoir') finalAmount *= malusEspoir;
                    if (rates[res] !== undefined) rates[res] += finalAmount;
                }
            }
        });

        if (gameState.council.heraut && gameState.state.council_active.heraut) {
            if (gameState.state.active_focus === 'agricole') rates.richesse += 20; 
            else rates.espoir += 20;
        }
    }
    
    if (gameState.state.shadow_level >= 80 && gameState.resources.espoir >= 500) {
        rates.renom += 5 * multiplier;
    }
    if (gameState.council.heraut && gameState.state.council_active.heraut && gameState.state.is_twilight) {
         rates.espoir += 30; 
         rates.renom += 10;  
    }

    gameState.state.current_rates = rates;

    const displayRate = (val, id) => {
        const el = document.getElementById(id);
        if (!el) return;
        if (val === 0) { el.textContent = ''; return; }
        const sign = val > 0 ? '+' : '';
        const color = val > 0 ? '#27ae60' : '#c0392b';
        el.textContent = ` ${sign}${val.toFixed(1)}/an`;
        el.style.color = color;
        el.style.fontSize = '0.85em';
    };

    displayRate(rates.savoir, 'ui-rate-savoir');
    displayRate(rates.richesse, 'ui-rate-richesse');
    displayRate(rates.renom, 'ui-rate-renom');
    displayRate(rates.espoir, 'ui-rate-espoir');
    displayRate(rates.hommes, 'ui-rate-hommes');
    displayRate(rates.elfes, 'ui-rate-elfes');
}