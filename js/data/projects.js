// js/data/projects.js
import { triggerPrestige } from '../core/save.js';

export const PROJECTS = [
    // --- ÂGE 1 ---
    {
        id: "proj_age1_normal", age: 1, is_twilight: false,
        title: "🏛️ Fonder les Cités du Lindon",
        description: "Rassemblez les survivants. L'ère commence.",
        cost: { richesse: 5000, savoir: 3000, renom: 1000 },
        onComplete: (gs) => transitionAge(gs, 2, "La gloire du Lindon illumine ce nouvel Âge.")
    },
    {
        id: "proj_age1_twilight", age: 1, is_twilight: true,
        title: "🌱 Fuir avec l'Arbre Blanc",
        description: "Le Beleriand brûle. Fuyez vers l'Est pour survivre.",
        cost: { espoir: 500, hommes: 50, renom: 200 },
        onComplete: (gs) => { gs.meta.legacies.push("Arbre Blanc"); transitionAge(gs, 2, "L'exil commence."); }
    },

    // --- ÂGE 2 ---
    {
        id: "proj_age2_normal", age: 2, is_twilight: false,
        title: "⚔️ Forger la Dernière Alliance",
        description: "Unissez les Hommes et les Elfes. Un effort monumental.",
        cost: { richesse: 50000, savoir: 20000, renom: 10000, hommes: 500 },
        onComplete: (gs) => transitionAge(gs, 3, "Sauron est vaincu... pour un temps.")
    },
    {
        id: "proj_age2_twilight", age: 2, is_twilight: true,
        title: "🗡️ L'Épée Brisée",
        description: "Devenez des Rôdeurs errants dans les ténèbres.",
        cost: { espoir: 2000, hommes: 200, savoir: 1000 },
        onComplete: (gs) => { gs.meta.legacies.push("Épée Brisée"); transitionAge(gs, 3, "Le Troisième Âge sera clandestin."); }
    },
    
    // --- ÂGE 3 (END GAME) ---
    {
        id: "proj_age3_normal", age: 3, is_twilight: false,
        title: "👑 Le Retour du Roi (New Game +)",
        description: "Sacre final. Vous recommencerez le jeu avec des bonus permanents.",
        cost: { richesse: 250000, savoir: 100000, renom: 50000, espoir: 10000 },
        onComplete: (gs) => {
            alert("VICTOIRE ABSOLUE ! Votre score va être converti en Éclats de Silmaril.");
            const score = gs.resources.richesse + gs.resources.savoir + gs.resources.renom;
            triggerPrestige(score); // LANCE LE NEW GAME +
        }
    }
];

function transitionAge(gameState, newAge, message) {
    gameState.meta.current_age = newAge;
    gameState.state.current_year = 1;
    gameState.state.is_twilight = false; 
    gameState.state.shadow_level = 0;
    gameState.state.resolved_events = []; 
}
