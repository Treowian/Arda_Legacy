// js/data/projects.js
export const PROJECTS = [
    // --- ÂGE 1 ---
    {
        id: "proj_age1_normal", age: 1, is_twilight: false,
        title: "🏛️ Fonder les Cités du Lindon", description: "Jetez les bases d'un empire.",
        cost: { richesse: 5000, savoir: 3000, renom: 1000 },
        onComplete: (gs) => transitionAge(gs, 2, "La splendeur du Lindon s'éveille.")
    },
    {
        id: "proj_age1_twilight", age: 1, is_twilight: true,
        title: "🌱 Fuir avec l'Arbre Blanc", description: "Fuyez vers l'Est.",
        cost: { espoir: 500, hommes: 50, renom: 200 },
        onComplete: (gs) => { gs.meta.legacies.push("Arbre Blanc"); transitionAge(gs, 2, "L'Exil commence."); }
    },
    // --- ÂGE 2 ---
    {
        id: "proj_age2_normal", age: 2, is_twilight: false,
        title: "⚔️ Forger la Dernière Alliance", description: "Unissez Elfes et Hommes.",
        cost: { richesse: 50000, savoir: 20000, renom: 10000, hommes: 500 },
        onComplete: (gs) => transitionAge(gs, 3, "Sauron est terrassé !")
    },
    {
        id: "proj_age2_twilight", age: 2, is_twilight: true,
        title: "🗡️ L'Héritage de l'Épée Brisée", description: "Fuyez dans la clandestinité.",
        cost: { espoir: 2000, hommes: 200, savoir: 5000 },
        onComplete: (gs) => { gs.meta.legacies.push("Épée Brisée"); transitionAge(gs, 3, "Vous devenez les Rôdeurs du Nord."); }
    },
    
    // --- ÂGE 3 : LES DEUX VOIES DE FIN ---
    {
        id: "proj_age3_elfes", age: 3, is_twilight: false,
        title: "⛵ La Voie des Elfes (Le Départ)",
        description: "Prenez les Navires Blancs. Le monde est sauvé, la magie disparaît.",
        cost: { savoir: 100000, renom: 50000, espoir: 10000 },
        onComplete: (gs) => triggerVictory("Voie des Elfes")
    },
    {
        id: "proj_age3_hommes", age: 3, is_twilight: false,
        title: "👑 La Voie des Hommes (Le Dominion)",
        description: "Forgez le Quatrième Âge, un empire mortel forgé dans l'acier.",
        cost: { richesse: 250000, renom: 50000, hommes: 5000 },
        onComplete: (gs) => triggerVictory("Voie des Hommes")
    }
];

function transitionAge(gameState, newAge, message) {
    gameState.meta.current_age = newAge;
    gameState.state.current_year = 1;
    gameState.state.is_twilight = false; 
    gameState.state.shadow_level = 0;
}

// Déclenche l'écran de victoire (injecté dans le HTML depuis js/ui/projects.js)
function triggerVictory(choix) {
    const vModal = document.getElementById('victory-modal');
    if (vModal) {
        document.getElementById('victory-title').textContent = "LE QUATRIÈME ÂGE COMMENCE";
        document.getElementById('victory-desc').textContent = `Vous avez choisi : ${choix}. Votre ère s'achève, mais votre légende est éternelle.`;
        vModal.style.display = 'flex';
    }
}
