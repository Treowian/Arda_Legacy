// js/ui/actions.js
import { gameState } from '../core/state.js';
import { updateUI, addChronicle } from './dom.js'; 

let ferveurClicks = 0;
const CLICKS_TO_GOLDEN_AGE = 50;
let ageDorActif = false;

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
    // 1. Gain immédiat (Exemple : si le focus est sur la richesse ou la sécurité)
    if (gameState.state.active_focus === 'agricole') {
        gameState.resources.richesse += 1;
    } else {
        // Gain par défaut
        gameState.resources.espoir += 1;
    }
    
    // 2. Gestion de la Ferveur (uniquement si l'Âge d'Or n'est pas déjà actif)
    if (!ageDorActif) {
        ferveurClicks++;
        let progressPercent = (ferveurClicks / CLICKS_TO_GOLDEN_AGE) * 100;
        
        if (ferveurClicks >= CLICKS_TO_GOLDEN_AGE) {
            triggerAgeDor();
        } else {
            document.getElementById('ui-ferveur-fill').style.width = `${progressPercent}%`;
            document.getElementById('ui-ferveur-status').textContent = `Jauge de Ferveur : ${Math.floor(progressPercent)}%`;
        }
    }
    
    // 3. Narration aléatoire (15% de chance de déclencher un texte)
    if (Math.random() < 0.15 && typeof addChronicle === 'function') {
        const phrase = CITATIONS_GARDIEN[Math.floor(Math.random() * CITATIONS_GARDIEN.length)];
        addChronicle(phrase);
    }
    
    // 4. On met à jour l'interface pour voir les ressources monter instantanément
    updateUI();
}

function triggerAgeDor() {
    ageDorActif = true;
    ferveurClicks = 0;
    
    const fill = document.getElementById('ui-ferveur-fill');
    const status = document.getElementById('ui-ferveur-status');
    
    if(fill && status) {
        fill.style.width = `100%`;
        fill.style.backgroundColor = "white"; // Changement de couleur pour marquer l'effet
        status.textContent = `✨ ÂGE D'OR ACTIF ! ✨`;
    }
    
    if (typeof addChronicle === 'function') {
        addChronicle("✨ Votre présence constante inspire grandement votre peuple. Un âge d'or temporaire commence !");
    }
    
    // Bonus passif stocké dans le state (ton moteur de temps devra lire cette valeur)
    gameState.state.bonus_multiplicateur = 1.5;
    
    // Fin de l'âge d'or après 30 secondes
    setTimeout(() => {
        ageDorActif = false;
        gameState.state.bonus_multiplicateur = 1.0;
        
        if(fill && status) {
            fill.style.width = `0%`;
            fill.style.backgroundColor = "#d4af37";
            status.textContent = `Jauge de Ferveur : 0%`;
        }
        
        if (typeof addChronicle === 'function') {
            addChronicle("L'élan de ferveur retombe doucement. Le quotidien reprend ses droits.");
        }
        updateUI();
    }, 30000); // 30 000 millisecondes = 30 secondes
}