// js/ui/modal.js
import { gameState } from '../core/state.js';
import { updateUI, addChronicle } from './dom.js'; // Assure-toi que addChronicle est exportée dans dom.js

// Mise en cache des éléments du DOM
const modal = document.getElementById('event-modal');
const titleEl = document.getElementById('modal-title');
const textEl = document.getElementById('modal-text');
const choicesEl = document.getElementById('modal-choices');

export function triggerEvent(eventData) {
    // 1. Figer le temps (sécurité)
    gameState.state.is_paused = true;

    // 2. Remplir le contenu textuel (textContent = protection XSS)
    titleEl.textContent = eventData.title;
    textEl.textContent = eventData.description;
    
    // 3. Nettoyer les boutons de l'événement précédent
    choicesEl.innerHTML = '';

    // 4. Générer les choix dynamiquement
    eventData.choices.forEach(choice => {
        const btn = document.createElement('button');
        btn.className = 'btn-action';
        btn.textContent = choice.label;
        
        // Validation mathématique défensive : le joueur a-t-il les ressources ?
        if (typeof choice.canAfford === 'function' && !choice.canAfford(gameState)) {
            btn.disabled = true;
        }

        // Écouteur d'événement pour résoudre le choix
        btn.onclick = () => resolveChoice(eventData.id, choice);
        choicesEl.appendChild(btn);
    });

    // 5. Afficher la modale (méthode native HTML5 qui bloque le fond)
    modal.showModal();
}

function resolveChoice(eventId, choice) {
    // 1. Appliquer les conséquences mathématiques du choix
    choice.effect(gameState);
    
    // 2. Inscrire l'événement dans la mémoire pour ne plus le tirer
    gameState.state.resolved_events.push(eventId);
    
    // 3. Ajouter la ligne d'histoire dans l'interface
    if (choice.log) {
        addChronicle(choice.log);
    }
    
    // 4. Relancer la machine
    modal.close();
    gameState.state.is_paused = false;
    
    // 5. Forcer un rafraîchissement visuel immédiat des jauges
    updateUI();
}