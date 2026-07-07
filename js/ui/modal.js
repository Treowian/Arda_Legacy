// js/ui/modal.js
import { gameState } from '../core/state.js';
import { updateUI, addChronicle } from './dom.js'; 

// Mise en cache des éléments du DOM
const modal = document.getElementById('event-modal');
const titleEl = document.getElementById('modal-title');
const textEl = document.getElementById('modal-text');
const choicesEl = document.getElementById('modal-choices');

export function triggerEvent(eventData) {
    // 1. Figer le temps pendant la lecture
    gameState.state.is_paused = true;

    // 2. Remplir le contenu textuel
    titleEl.textContent = eventData.title;
    textEl.textContent = eventData.description;
    
    // 3. Nettoyer les boutons précédents
    choicesEl.innerHTML = '';

    // 4. Générer les choix dynamiquement
    eventData.choices.forEach(choice => {
        const btn = document.createElement('button');
        btn.className = 'btn-action';
        btn.textContent = choice.label;
        
        // Vérifier si le joueur a les moyens de payer le choix
        if (typeof choice.canAfford === 'function' && !choice.canAfford(gameState)) {
            btn.disabled = true;
        }

        // On envoie tout l'objet eventData pour avoir accès au titre et à l'ID
        btn.onclick = () => resolveChoice(eventData, choice);
        choicesEl.appendChild(btn);
    });

    // 5. Afficher la modale
    if (modal) {
        modal.showModal();
    }
}

function resolveChoice(eventData, choice) {
    // 1. Appliquer les conséquences mathématiques du choix
    if (typeof choice.effect === 'function') {
        choice.effect(gameState);
    }
    
    // 2. Inscrire l'événement dans la mémoire pour ne plus le tirer
    gameState.state.resolved_events.push(eventData.id);
    
    // 3. Ajouter la ligne d'histoire dans l'interface avec le contexte en gras
    if (choice.log) {
        addChronicle(`<strong>[${eventData.title}]</strong> ${choice.log}`);
    }
    
    // 4. Relancer la machine et fermer la fenêtre
    if (modal) {
        modal.close();
    }
    gameState.state.is_paused = false;
    
    // 5. Rafraîchir les visuels
    updateUI();
}
