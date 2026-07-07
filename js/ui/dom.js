// js/ui/dom.js
import { gameState } from '../core/state.js';
import { BUILDINGS } from '../data/buildings.js'; 
import { renderCurrentProject } from './projects.js';
import { renderBuildings } from './buildings.js';
import { renderCouncil } from './council.js'; // 🆕 IMPORT DU MODULE CONSEIL

const ui = {};

export function initUI() {
    ui.year = document.getElementById('ui-year');
    ui.shadowFill = document.getElementById('ui-shadow-fill');

    ui.savoir = document.getElementById('ui-res-savoir');
    ui.richesse = document.getElementById('ui-res-richesse');
    ui.renom = document.getElementById('ui-res-renom');
    ui.espoir = document.getElementById('ui-res-espoir');
    ui.hommes = document.getElementById('ui-pop-hommes');
    ui.elfes = document.getElementById('ui-pop-elfes');

    ui.rateSavoir = document.getElementById('ui-rate-savoir');
    ui.rateRichesse = document.getElementById('ui-rate-richesse');
    ui.rateRenom = document.getElementById('ui-rate-renom');
    ui.rateEspoir = document.getElementById('ui-rate-espoir');
    ui.rateHommes = document.getElementById('ui-rate-hommes');
    ui.rateElfes = document.getElementById('ui-rate-elfes');
    
    const btnPrestige = document.getElementById('btn-prestige');
    if (btnPrestige) {
        btnPrestige.onclick = () => {
            import('../core/save.js').then(module => {
                const scoreTotal = gameState.resources.richesse + gameState.resources.savoir + gameState.resources.renom;
                module.triggerPrestige(scoreTotal);
            });
        };
    }
    
    const inboxBtn = document.getElementById('btn-inbox');
    if (inboxBtn) {
        inboxBtn.onclick = () => {
            import('./modal.js').then(module => {
                module.openPendingEvents();
            });
        };
    }
    
    updateUI();
}

function formatRate(value) {
    if (value === 0) return "";
    const sign = value > 0 ? "+" : "";
    const color = value > 0 ? "#27ae60" : "#c0392b"; 
    return `<span style="font-size: 0.85em; color: ${color}; margin-left: 8px; font-weight: normal;">${sign}${value.toFixed(1)}/an</span>`;
}

export function updateUI() {
    if (!ui.year) return; 

    const titleEl = document.getElementById('ui-age-title');
    if (titleEl) {
        if (gameState.meta.current_age === 1) titleEl.textContent = "Âge I : L'Aube";
        else if (gameState.meta.current_age === 2) titleEl.textContent = "Âge II : L'Essor";
        else if (gameState.meta.current_age === 3) titleEl.textContent = "Âge III : Le Crépuscule";
    }

    ui.year.textContent = `An ${gameState.state.current_year}`;
    ui.shadowFill.style.width = `${gameState.state.shadow_level}%`;
    
    // --- EVALUATION DES REVENUS ANNUELS ---
    let rates = { richesse: 0, savoir: 0, renom: 0, espoir: 0, hommes: 0, elfes: 0 };
    
    const prestigeBonus = 1 + ((gameState.meta.prestige_eclats || 0) * 0.05);
    const redemptionBonus = gameState.meta.redemption_achieved ? 1.5 : 1.0;
    const multiplier = (gameState.state.bonus_multiplicateur || 1.0) * prestigeBonus * redemptionBonus;

    if (gameState.state.is_twilight) {
        rates.richesse -= 50;
        rates.espoir -= 5;
        rates.hommes -= 1;
    } else {
        if (gameState.resources.espoir > 200) rates.hommes += 0.5 * multiplier;
        if (gameState.resources.espoir > 1000) rates.hommes += 1.5 * multiplier;
        
        let bonusAgricole = gameState.state.active_focus === 'agricole' ? 1.2 : 1.0;
        
        rates.richesse += (gameState.population.hommes * 0.1) * multiplier * bonusAgricole;
        rates.savoir += (gameState.population.elfes * 0.1) * multiplier;
        rates.espoir -= 0.5;

        BUILDINGS.forEach(b => {
            const owned = gameState.buildings[b.id] || 0;
            if (owned > 0 && b.production) {
                for (const [res, amount] of Object.entries(b.production)) {
                    if (rates[res] !== undefined) {
                        rates[res] += (amount * owned) * multiplier;
                    }
                }
            }
        });
    }

    if (gameState.state.shadow_level >= 80 && gameState.resources.espoir >= 500) {
        rates.renom += 5 * multiplier;
    }

    // Affichage des compteurs
    ui.savoir.textContent = Math.floor(gameState.resources.savoir);
    ui.richesse.textContent = Math.floor(gameState.resources.richesse);
    ui.renom.textContent = Math.floor(gameState.resources.renom);
    ui.espoir.textContent = Math.floor(gameState.resources.espoir);
    ui.hommes.textContent = Math.floor(gameState.population.hommes);
    ui.elfes.textContent = Math.floor(gameState.population.elfes);

    if (ui.rateSavoir) ui.rateSavoir.innerHTML = formatRate(rates.savoir);
    if (ui.rateRichesse) ui.rateRichesse.innerHTML = formatRate(rates.richesse);
    if (ui.rateRenom) ui.rateRenom.innerHTML = formatRate(rates.renom);
    if (ui.rateEspoir) ui.rateEspoir.innerHTML = formatRate(rates.espoir);
    if (ui.rateHommes) ui.rateHommes.innerHTML = formatRate(rates.hommes);
    if (ui.rateElfes) ui.rateElfes.innerHTML = formatRate(rates.elfes);

    const prestigeDisp = document.getElementById('ui-prestige-display');
    if (prestigeDisp) {
        if (gameState.meta.prestige_eclats > 0) {
            prestigeDisp.style.display = 'block';
            document.getElementById('ui-eclats').textContent = gameState.meta.prestige_eclats;
            document.getElementById('ui-eclats-bonus').textContent = (gameState.meta.prestige_eclats * 5);
        } else {
            prestigeDisp.style.display = 'none';
        }
    }

    const inboxBtn = document.getElementById('btn-inbox');
    if (inboxBtn) {
        const pendingCount = (gameState.state.pending_events || []).length;
        if (pendingCount > 0) {
            inboxBtn.style.display = 'block';
            inboxBtn.textContent = `📬 ${pendingCount} Événement(s) en attente !`;
            inboxBtn.classList.add('pulse-anim');
        } else {
            inboxBtn.style.display = 'none';
            inboxBtn.classList.remove('pulse-anim');
        }
    }

    renderCurrentProject();
    renderBuildings();
    renderCouncil(); // 🆕 REFLECTION DU PANNEAU DU CONSEIL
}

export function addChronicle(text) {
    const logContainer = document.getElementById('log-container') || document.getElementById('chronicles');
    if (logContainer) {
        const entry = document.createElement('p');
        entry.style.marginBottom = "10px";
        entry.style.fontStyle = "italic";
        entry.style.fontSize = "0.9em";
        entry.style.lineHeight = "1.4";
        entry.innerHTML = "- " + text;
        logContainer.prepend(entry);
    }
}
