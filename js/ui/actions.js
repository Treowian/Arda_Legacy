// js/ui/actions.js
import { gameState } from '../core/state.js';
import { updateUI, addChronicle } from './dom.js'; 

let ferveurClicks = 0;
const CLICKS_TO_GOLDEN_AGE = 50;
let ageDorActif = false;
let aParleCeCycle = false; // 🔒 LE VERROU ANTI-SPAM

const CITATIONS_GARDIEN = [
    "Vous marchez le long des remparts, observant l'horizon.",
    "Vos paroles réconfortent les anciens près du feu.",
    "Vous inspectez les réserves avec les intendants.",
    "Un mot d'encouragement de votre part redonne le sourire à un enfant.",
    "Vous étudiez un vieux parchemin sous la lueur d'une bougie."
];

export function initActions() {
    const btnInspire = document.getElementById('btn-inspire');
    if (btnInspire) {
        btnInspire.addEventListener('click', handleInspireClick);
    }
}

function handleInspireClick() {
    // 1. Gain immédiat
    if (gameState.state.active_focus === 'agricole') {
        gameState.resources.richesse += 1;
    } else {
        gameState.resources.espoir += 1;
    }
    
    // 2. Gestion de la Ferveur
    if (!ageDorActif) {
        ferveurClicks++;
        let progressPercent = (ferveurClicks / CLICKS_TO_GOLDEN_AGE) * 100;
        
        if (ferveurClicks >= CLICKS_TO_GOLDEN_AGE) {
            triggerAgeDor();
        } else {
            const fill = document.getElementById('ui-ferveur-fill');
            const status = document.getElementById('ui-ferveur-status');
            if(fill) fill.style.width = `${progressPercent}%`;
            if(status) status.textContent = `Jauge de Ferveur : ${Math.floor(progressPercent)}%`;
        }

        // 3. Narration (1 seule fois par cycle !)
        // On a monté la chance à 30% pour qu'elle s'affiche assez vite pendant tes clics
        if (!aParleCeCycle && Math.random() < 0.30 && typeof addChronicle === 'function') {
            const phrase = CITATIONS_GARDIEN[Math.floor(Math.random() * CITATIONS_GARDIEN.length)];
            addChronicle(phrase);
            aParleCeCycle = true; // On ferme le verrou 🔒
        }
    }
    
    updateUI();
}

function triggerAgeDor() {
    ageDorActif = true;
    ferveurClicks = 0;
    
    const fill = document.getElementById('ui-ferveur-fill');
    const status = document.getElementById('ui-ferveur-status');
    
    if(fill && status) {
        fill.style.width = `100%`;
        fill.style.backgroundColor = "white"; 
        status.textContent = `✨ ÂGE D'OR ACTIF ! ✨`;
    }
    
    if (typeof addChronicle === 'function') {
        addChronicle("<strong>[Âge d'Or]</strong> Votre présence constante inspire grandement votre peuple.");
    }
    
    gameState.state.bonus_multiplicateur = 1.5;
    
    // Fin de l'âge d'or après 30 secondes
    setTimeout(() => {
        ageDorActif = false;
        aParleCeCycle = false; // On rouvre le verrou pour le prochain cycle ! 🔓
        gameState.state.bonus_multiplicateur = 1.0;
        
        if(fill && status) {
            fill.style.width = `0%`;
            fill.style.backgroundColor = "#d4af37";
            status.textContent = `Jauge de Ferveur : 0%`;
        }
        
        if (typeof addChronicle === 'function') {
            addChronicle("<em>L'élan de ferveur retombe doucement. Le quotidien reprend ses droits.</em>");
        }
        updateUI();
    }, 30000);
}
