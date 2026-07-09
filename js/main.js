// js/main.js
import { gameState } from './core/state.js';
import { loadGame } from './core/save.js';
import { initUI } from './ui/dom.js';
import { initEngine } from './core/engine.js';
import { initActions } from './ui/actions.js';
import { initProjects } from './ui/projects.js';
import { renderBuildings } from './ui/buildings.js';
import { initDebug } from './ui/debug.js';
import { initModal } from './ui/modal.js';

// Rendre accessible globalement pour les manipulations directes via F12
window.gameState = gameState;

document.addEventListener('DOMContentLoaded', () => {
    // Initialisation des modules existants
    loadGame();       
    initUI();         
    initActions();    
    initProjects();   
    renderBuildings(); 
    initModal();      
    initDebug();      
    initEngine();     

    // ==========================================
    // 🔴 GESTION DU NEW GAME + (PRESTIGE)
    // ==========================================
    const btnPrestige = document.getElementById('btn-prestige');
    if (btnPrestige) {
        btnPrestige.addEventListener('click', () => {
            // 1. Calcul du prestige (1 éclat par tranche de 10 000 Renom + Savoir)
            const totalScore = (gameState.resources.renom || 0) + (gameState.resources.savoir || 0);
            const bonusEclats = Math.max(1, Math.floor(totalScore / 10000)); 

            // 2. Sauvegarde des métadonnées (Ce qui survit au reset)
            gameState.meta.prestige_eclats = (gameState.meta.prestige_eclats || 0) + bonusEclats;
            gameState.meta.current_age = 1;
            
            // Marquer la victoire sombre si c'était le Game Over de l'Ombre
            if (gameState.state.shadow_level >= 100) {
                gameState.meta.legacies = gameState.meta.legacies || [];
                if (!gameState.meta.legacies.includes("Âge Sombre")) gameState.meta.legacies.push("Âge Sombre");
            }

            // 3. Réinitialisation stricte de l'État et des Ressources
            gameState.state = {
                current_year: 1,
                shadow_level: 0,
                is_twilight: false,
                is_victory: false, // 🔴 Relance le moteur temporel
                pending_events: [],
                resolved_events: [],
                active_modifiers: [],
                active_focus: 'agricole',
                council_active: { senechal: false, batisseur: false, heraut: false },
                bonus_multiplicateur: 1.0
            };

            gameState.resources = { savoir: 0, richesse: 50, renom: 10, espoir: 100 };
            gameState.population = { hommes: 20, elfes: 0 };
            gameState.buildings = {};
            gameState.council = { senechal: false, batisseur: false, heraut: false };

            // 4. Nettoyage de l'interface
            const victoryModal = document.getElementById('victory-modal');
            if (victoryModal) victoryModal.style.display = 'none';
            
            const logContainer = document.getElementById('log-container');
            if (logContainer) logContainer.innerHTML = ''; 
            
            // 5. Message de relance (import dynamique pour éviter les cycles)
            import('./ui/dom.js').then(module => {
                if (module.addChronicle) {
                    module.addChronicle(`✨ <strong style="color:#d4af37;">UNE NOUVELLE ÈRE COMMENCE</strong>. Vous héritez de ${bonusEclats} Éclat(s) de Silmaril.`);
                    module.updateUI(); // Force le rafraîchissement immédiat
                }
            });
        });
    }
});