// js/ui/actions.js
import { gameState } from '../core/state.js';
import { updateUI, addChronicle } from './dom.js'; 

let ferveurClicks = 0;
const CLICKS_TO_GOLDEN_AGE = 50;
let ageDorActif = false;
let aParleCeCycle = false;

const CITATIONS_GARDIEN = [
    "Vous marchez le long des remparts, observant l'horizon.",
    "Vos paroles réconfortent les anciens près du feu.",
    "Un mot d'encouragement de votre part redonne le sourire à un enfant."
];

export function initActions() {
    const btnInspire = document.getElementById('btn-inspire');
    if (btnInspire) btnInspire.addEventListener('click', handleInspireClick);
    
    // Écoute des boutons de Focus (Décrets)
    const radios = document.querySelectorAll('input[name="focus"]');
    radios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            gameState.state.active_focus = e.target.value;
            addChronicle(`<em>Vous avez promulgué un nouveau Décret : ${e.target.value}.</em>`);
        });
    });
}

function handleInspireClick() {
    if (gameState.state.is_twilight) {
        gameState.resources.espoir += 3;
        gameState.resources.renom += 1;
    } else {
        // Le boost de début de jeu selon le décret !
        if (gameState.state.active_focus === 'agricole') {
            gameState.resources.richesse += 2; // +2 Richesse par clic (nerf de la guerre)
        } else {
            gameState.resources.espoir += 2;   // +2 Espoir par clic
        }
    }
    
    if (!ageDorActif) {
        ferveurClicks++;
        let progressPercent = (ferveurClicks / CLICKS_TO_GOLDEN_AGE) * 100;
        
        if (ferveurClicks >= CLICKS_TO_GOLDEN_AGE) triggerAgeDor();
        else {
            const fill = document.getElementById('ui-ferveur-fill');
            const status = document.getElementById('ui-ferveur-status');
            if(fill) fill.style.width = `${progressPercent}%`;
            if(status) status.textContent = `Jauge de Ferveur : ${Math.floor(progressPercent)}%`;
        }

        if (!aParleCeCycle && Math.random() < 0.30) {
            const phrase = CITATIONS_GARDIEN[Math.floor(Math.random() * CITATIONS_GARDIEN.length)];
            addChronicle(phrase);
            aParleCeCycle = true;
        }
    }
    updateUI();
}

function triggerAgeDor() {
    ageDorActif = true;
    ferveurClicks = 0;
    
    const fill = document.getElementById('ui-ferveur-fill');
    const status = document.getElementById('ui-ferveur-status');
    if(fill && status) { fill.style.width = `100%`; fill.style.backgroundColor = "white"; status.textContent = `✨ ÂGE D'OR ACTIF ! ✨`; }
    addChronicle("<strong>[Âge d'Or]</strong> Votre présence constante inspire grandement votre peuple.");
    
    gameState.state.bonus_multiplicateur = 1.5;
    setTimeout(() => {
        ageDorActif = false;
        aParleCeCycle = false;
        gameState.state.bonus_multiplicateur = 1.0;
        if(fill && status) { fill.style.width = `0%`; fill.style.backgroundColor = "#d4af37"; status.textContent = `Jauge de Ferveur : 0%`; }
        addChronicle("<em>L'élan de ferveur retombe.</em>");
        updateUI();
    }, 30000);
}
