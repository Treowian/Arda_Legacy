// js/ui/modal.js
import { gameState } from '../core/state.js';
import { updateUI, addChronicle } from './dom.js'; 
import { EVENTS } from '../data/events.js';

const modal = document.getElementById('event-modal');
const titleEl = document.getElementById('modal-title');
const textEl = document.getElementById('modal-text');
const choicesEl = document.getElementById('modal-choices');

// 🆕 La fonction qui ouvre le premier événement de la pile
export function openPendingEvents() {
    if (!gameState.state.pending_events || gameState.state.pending_events.length === 0) return;

    // Prendre le premier de la liste
    const eventId = gameState.state.pending_events[0];
    const eventData = EVENTS.find(e => e.id === eventId);
    
    if (!eventData) {
        // Sécurité si l'événement n'existe plus
        gameState.state.pending_events.shift();
        return openPendingEvents(); 
    }

    // PLUS AUCUNE PAUSE ICI : Le jeu continue !
    
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
    
    // 🆕 On retire l'événement traité de la file d'attente
    gameState.state.pending_events.shift();
    
    // Y en a-t-il d'autres en attente ?
    if (gameState.state.pending_events.length > 0) {
        // Oui ? On affiche le suivant !
        openPendingEvents();
    } else {
        // Non ? On ferme la modale.
        if (modal) modal.close();
    }
    
    updateUI();
}
