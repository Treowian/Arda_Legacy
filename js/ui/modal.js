// js/ui/modal.js
import { gameState } from '../core/state.js';
import { updateUI, addChronicle } from './dom.js'; 
import { EVENTS } from '../data/events.js';

const modal = document.getElementById('event-modal');
const titleEl = document.getElementById('modal-title');
const textEl = document.getElementById('modal-text');
const choicesEl = document.getElementById('modal-choices');

// 🆕 Initialisation propre de l'écouteur de clic
export function initModal() {
    const inboxBtn = document.getElementById('btn-inbox');
    if (inboxBtn) {
        inboxBtn.addEventListener('click', () => {
            openPendingEvents();
        });
    }
}

// Fonction qui dépile la file d'attente
export function openPendingEvents() {
    if (!gameState.state.pending_events || gameState.state.pending_events.length === 0) return;

    // Prendre le premier événement de la liste
    const eventId = gameState.state.pending_events[0];
    const eventData = EVENTS.find(e => e.id === eventId);
    
    if (!eventData) {
        // Sécurité si l'événement n'existe plus dans la base de données
        gameState.state.pending_events.shift();
        return openPendingEvents(); 
    }

    // Le jeu N'EST PAS mis en pause.
    
    titleEl.textContent = eventData.title;
    textEl.textContent = eventData.description;
    choicesEl.innerHTML = '';

    eventData.choices.forEach(choice => {
        const btn = document.createElement('button');
        btn.className = 'btn-action';
        btn.textContent = choice.label;
        
        if (typeof choice.canAfford === 'function' && !choice.canAfford(gameState)) {
            btn.disabled = true;
        }

        btn.onclick = () => resolveChoice(eventData, choice);
        choicesEl.appendChild(btn);
    });

    if (modal) modal.showModal();
}

function resolveChoice(eventData, choice) {
    if (typeof choice.effect === 'function') {
        choice.effect(gameState);
    }
    
    gameState.state.resolved_events.push(eventData.id);
    if (choice.log) {
        addChronicle(`<strong>[${eventData.title}]</strong> ${choice.log}`);
    }
    
    // On retire l'événement traité de la file d'attente
    gameState.state.pending_events.shift();
    
    // S'il y a d'autres événements en attente, on enchaîne immédiatement
    if (gameState.state.pending_events.length > 0) {
        openPendingEvents();
    } else {
        if (modal) modal.close();
    }
    
    updateUI();
}
