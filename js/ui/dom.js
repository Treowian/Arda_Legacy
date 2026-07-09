// js/ui/dom.js
import { gameState } from '../core/state.js';
import { BUILDINGS } from '../data/buildings.js';
import { EVENTS } from '../data/events.js';
import { PROJECTS } from '../data/projects.js';

// ==========================================
// 1. INITIALISATION DE L'INTERFACE
// ==========================================
export function initUI() {
    console.log("🖥️ Initialisation de l'UI...");

    // Gestion du bouton manuel (Inspirer)
    const btnInspire = document.getElementById('btn-inspire');
    if (btnInspire) {
        btnInspire.addEventListener('click', () => {
            // Import dynamique pour éviter les dépendances circulaires
            import('../core/engine.js').then(module => {
                if (module.handleManualClick) module.handleManualClick();
            });
        });
    }

    // Gestion des Décrets de Focus (Radios)
    const radios = document.querySelectorAll('input[name="focus"]');
    radios.forEach(radio => {
        // Synchronise l'interface avec l'état de la sauvegarde
        if (radio.value === gameState.state.active_focus) {
            radio.checked = true;
        }
        radio.addEventListener('change', (e) => {
            gameState.state.active_focus = e.target.value;
            updateUI();
        });
    });

    // 🆕 GESTION DE LA MODALE DU CONSEIL
    const councilModal = document.getElementById('council-modal');
    const btnOpenCouncil = document.getElementById('btn-open-council');
    const btnCloseCouncil = document.getElementById('btn-close-council');

    if (btnOpenCouncil && councilModal) {
        btnOpenCouncil.addEventListener('click', () => {
            councilModal.showModal();
            // Masque la pastille rouge lors de l'ouverture
            const notifCouncil = document.getElementById('notif-council');
            if (notifCouncil) notifCouncil.style.display = 'none';
        });
        btnCloseCouncil.addEventListener('click', () => councilModal.close());
    }

    // Gestion de la boîte de réception des événements
    const btnInbox = document.getElementById('btn-inbox');
    if (btnInbox) {
        btnInbox.addEventListener('click', () => {
            if (gameState.state.pending_events.length > 0) {
                // Récupère le plus vieil événement en attente
                const eventId = gameState.state.pending_events[0];
                const eventObj = EVENTS.find(e => e.id === eventId);
                if (eventObj) showEventModal(eventObj);
            }
        });
    }

    // Premier rendu visuel
    updateUI();
}

// ==========================================
// 2. BOUCLE PRINCIPALE DE MISE À JOUR VISUELLE
// ==========================================
export function updateUI() {
    if (!document.getElementById('ui-year')) return; // Garde-fou

    // -- Mise à jour des valeurs textuelles --
    document.getElementById('ui-year').textContent = `An ${gameState.state.current_year}`;
    document.getElementById('ui-res-savoir').textContent = Math.floor(gameState.resources.savoir);
    document.getElementById('ui-res-richesse').textContent = Math.floor(gameState.resources.richesse);
    document.getElementById('ui-res-renom').textContent = Math.floor(gameState.resources.renom);
    document.getElementById('ui-res-espoir').textContent = Math.floor(gameState.resources.espoir);
    
    document.getElementById('ui-pop-hommes').textContent = Math.floor(gameState.population.hommes);
    document.getElementById('ui-pop-elfes').textContent = Math.floor(gameState.population.elfes);

    updateRatesDisplay();

    // -- Gestion de l'Ombre et du JUICE (Couleur dynamique) --
    const shadowRatio = Math.min(100, Math.max(0, gameState.state.shadow_level));
    const shadowFill = document.getElementById('ui-shadow-fill');
    if (shadowFill) shadowFill.style.width = `${shadowRatio}%`;

    // Calcul de l'assombrissement du thème (CSS Custom Properties)
    const ratio = shadowRatio / 100;
    const r = Math.round(245 - (ratio * (245 - 44)));
    const g = Math.round(242 - (ratio * (242 - 62)));
    const b = Math.round(235 - (ratio * (235 - 80)));
    
    document.documentElement.style.setProperty('--bg-color', `rgb(${r}, ${g}, ${b})`);

    if (ratio > 0.6) {
        document.documentElement.style.setProperty('--text-color', '#ecf0f1');
        if (shadowFill) shadowFill.style.backgroundColor = '#8e44ad'; // Devient violacé/sombre
    } else {
        document.documentElement.style.setProperty('--text-color', '#2c3e50');
        if (shadowFill) shadowFill.style.backgroundColor = '#c0392b'; // Reste rouge
    }

    // -- Affichage des Malédictions / Crises en cours --
    renderModifiers();

    // -- Affichage de l'Inbox --
    const btnInbox = document.getElementById('btn-inbox');
    if (btnInbox) {
        if (gameState.state.pending_events && gameState.state.pending_events.length > 0) {
            btnInbox.style.display = 'block';
            // 🔴 CORRECTION ORTHOGRAPHIQUE ICI
            btnInbox.textContent = `📬 ${gameState.state.pending_events.length} Événement(s) en attente`;
            btnInbox.classList.add('pulse-anim');
        } else {
            btnInbox.style.display = 'none';
            btnInbox.classList.remove('pulse-anim');
        }
    }

    // -- Rendu des listes (Bâtiments, Projets, Conseil) --
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
        
        // Utilisation de .map().join('') sécurisée car données internes au jeu
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

        for (const [res, baseValue] of Object.entries(b.baseCost)) {
            const cost = Math.floor(baseValue * Math.pow(b.multiplier, owned));
            if (gameState.resources[res] < cost) affordable = false;
            costStr += `${cost} ${res.toUpperCase()} <br>`;
        }

        // Création DOM sécurisée (éviter les injections XSS)
        const btn = document.createElement('button');
        btn.className = 'btn-action';
        btn.style.display = 'flex';
        btn.style.justifyContent = 'space-between';
        btn.style.alignItems = 'center';
        btn.style.textAlign = 'left';
        btn.disabled = !affordable;

        const leftDiv = document.createElement('div');
        leftDiv.innerHTML = `<strong>${b.name} (${owned})</strong><br><span style="font-size:0.8em; font-weight:normal; opacity:0.8;">${b.description}</span>`;

        const rightDiv = document.createElement('div');
        rightDiv.style.fontSize = '0.75em';
        rightDiv.style.textAlign = 'right';
        rightDiv.style.color = affordable ? '#2ecc71' : '#e74c3c';
        rightDiv.innerHTML = costStr;

        btn.appendChild(leftDiv);
        btn.appendChild(rightDiv);

        btn.addEventListener('click', () => {
            if (affordable) {
                // Déduction des coûts
                for (const [res, baseValue] of Object.entries(b.baseCost)) {
                    const cost = Math.floor(baseValue * Math.pow(b.multiplier, owned));
                    gameState.resources[res] -= cost;
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

    // Liste des intendants et leurs seuils de déblocage (Renom)
    const councilors = [
        { id: 'senechal', name: 'Sénéchal', req: 50, desc: 'Gère automatiquement les focus selon le niveau de l\'Ombre.' },
        { id: 'batisseur', name: 'Bâtisseur', req: 200, desc: 'Achète automatiquement les infrastructures si les fonds le permettent.' },
        { id: 'heraut', name: 'Héraut', req: 500, desc: 'Inspire automatiquement le peuple.' }
    ];

    let unlockedAny = false;

    councilors.forEach(c => {
        // Déblocage définitif si le Renom est atteint
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
            // Affichage masqué si non débloqué
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

// ==========================================
// 4. NOTIFICATIONS ET MODALES
// ==========================================

export function updateNotifications() {
    let canBuyBuilding = false;

    // Vérifie si au moins 1 bâtiment est achetable
    BUILDINGS.forEach(b => {
        if (!b.isVisible(gameState)) return;
        const owned = gameState.buildings[b.id] || 0;
        let affordable = true;
        for (const [res, baseValue] of Object.entries(b.baseCost)) {
            const currentCost = Math.floor(baseValue * Math.pow(b.multiplier, owned));
            if (gameState.resources[res] < currentCost) affordable = false;
        }
        if (affordable) canBuyBuilding = true;
    });

    // Affiche ou masque la pastille rouge de l'accordéon Bâtiments
    const notifBuildings = document.getElementById('notif-buildings');
    if (notifBuildings) {
        notifBuildings.style.display = canBuyBuilding ? 'inline-block' : 'none';
    }
}

export function showEventModal(eventObj) {
    const modal = document.getElementById('event-modal');
    if (!modal) return;

    document.getElementById('modal-title').textContent = eventObj.title;
    document.getElementById('modal-text').textContent = eventObj.description;

    const choicesContainer = document.getElementById('modal-choices');
    choicesContainer.innerHTML = ''; // Nettoyage de sécurité

    eventObj.choices.forEach(choice => {
        const btn = document.createElement('button');
        btn.className = 'btn-action';
        btn.textContent = choice.label;
        btn.disabled = !choice.canAfford(gameState);

        btn.addEventListener('click', () => {
            // Applique les effets du choix
            choice.effect(gameState);
            
            // Ajoute la trace dans l'histoire
            addChronicle(`<em>${choice.log}</em>`);

            // Retire l'événement de la file d'attente
            gameState.state.pending_events = gameState.state.pending_events.filter(e => e !== eventObj.id);

            // Marque l'événement comme résolu s'il est unique
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
    
    // Ajout de l'année en préfixe discret
    const yearSpan = `<span style="font-family: var(--font-title); font-size: 0.8em; color: #7f8c8d; display: block; margin-bottom: 2px;">An ${gameState.state.current_year}</span>`;
    
    entry.innerHTML = yearSpan + htmlMsg;
    container.prepend(entry); // Le log le plus récent apparaît en haut
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

        // Bâtiments
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

        // Automatisation du Conseil (Héraut)
        if (gameState.council.heraut && gameState.state.council_active.heraut) {
            if (gameState.state.active_focus === 'agricole') rates.richesse += 20; // 10 ticks * 2
            else rates.espoir += 20;
        }
    }
    
    // Cas spéciaux de Renom et Héraut (Crépuscule)
    if (gameState.state.shadow_level >= 80 && gameState.resources.espoir >= 500) {
        rates.renom += 5 * multiplier;
    }
    if (gameState.council.heraut && gameState.state.council_active.heraut && gameState.state.is_twilight) {
         rates.espoir += 30; // 10 ticks * 3
         rates.renom += 10;  // 10 ticks * 1
    }

    // Mise à jour de l'HTML
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

function renderProjects() {
    const container = document.getElementById('ui-project-container');
    if (!container) return;
    container.innerHTML = '';

    // ⚠️ Assure-toi que PROJECTS est bien importé en haut de ton fichier dom.js
    // import { PROJECTS } from '../data/projects.js';
    if (typeof PROJECTS === 'undefined') return;

    // Trouve le projet de l'âge en cours non résolu
    const currentProject = PROJECTS.find(p => p.age === gameState.meta.current_age && !gameState.state.resolved_events.includes(p.id));

    if (!currentProject) {
        container.innerHTML = `<p style="color: #7f8c8d; font-style: italic; font-size: 0.9em;">Aucun grand projet pour le moment.</p>`;
        return;
    }

    let canAfford = true;
    let reqText = [];

    // Vérification intelligente (Regarde dans resources ET dans population)
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
            // Paiement intelligent
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