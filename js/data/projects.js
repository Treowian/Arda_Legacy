// js/data/projects.js

export const PROJECTS = [
    // --- ÂGE 1 ---
    {
        id: "proj_age1_normal", 
        age: 1, 
        is_twilight: false,
        title: "🏛️ Fonder les Cités du Lindon", 
        description: "Jetez les bases d'un empire.",
        // 🔴 RÉÉQUILIBRAGE : Coûts augmentés et ajout d'un prérequis en Hommes
        cost: { richesse: 15000, savoir: 10000, renom: 2000, hommes: 100 },
        effect: (gs) => transitionAge(gs, 2, "La splendeur du Lindon s'éveille.")
    },
    {
        id: "proj_age1_twilight", 
        age: 1, 
        is_twilight: true,
        title: "🌱 Fuir avec l'Arbre Blanc", 
        description: "Fuyez vers l'Est.",
        // 🔴 RÉÉQUILIBRAGE
        cost: { espoir: 2000, hommes: 100, renom: 500 },
        effect: (gs) => { 
            gs.meta.legacies.push("Arbre Blanc"); 
            transitionAge(gs, 2, "L'Exil commence."); 
        }
    },
    
    // --- ÂGE 2 ---
    {
        id: "proj_age2_normal", 
        age: 2, 
        is_twilight: false,
        title: "⚔️ Forger la Dernière Alliance", 
        description: "Unissez Elfes et Hommes.",
        // 🔴 RÉÉQUILIBRAGE : Un mur économique massif pour empêcher de sauter l'Âge 2
        cost: { richesse: 150000, savoir: 80000, renom: 25000, hommes: 1000, elfes: 500 },
        effect: (gs) => transitionAge(gs, 3, "Sauron est terrassé !")
    },
    {
        id: "proj_age2_twilight", 
        age: 2, 
        is_twilight: true,
        title: "🗡️ L'Héritage de l'Épée Brisée", 
        description: "Fuyez dans la clandestinité.",
        // 🔴 RÉÉQUILIBRAGE
        cost: { espoir: 8000, hommes: 500, savoir: 25000 },
        effect: (gs) => { 
            gs.meta.legacies.push("Épée Brisée"); 
            transitionAge(gs, 3, "Vous devenez les Rôdeurs du Nord."); 
        }
    },

    // --- ÂGE 3 : LES DEUX VOIES DE FIN ---
    {
        id: "proj_age3_elfes", 
        age: 3, 
        is_twilight: false,
        title: "⛵ La Voie des Elfes (Le Départ)",
        description: "Prenez les Navires Blancs. Le monde est sauvé, la magie disparaît.",
        cost: { savoir: 500000, renom: 100000, espoir: 20000 },
        effect: (gs) => triggerVictory(gs, "Voie des Elfes")
    },
    {
        id: "proj_age3_hommes", 
        age: 3, 
        is_twilight: false,
        title: "👑 La Voie des Hommes (Le Dominion)",
        description: "Forgez le Quatrième Âge, un empire mortel forgé dans l'acier.",
        cost: { richesse: 1000000, renom: 100000, hommes: 10000 },
        effect: (gs) => triggerVictory(gs, "Voie des Hommes")
    }
];

// ==========================================
// FONCTIONS UTILITAIRES
// ==========================================

function transitionAge(gameState, newAge, message) {
    gameState.meta.current_age = newAge;
    gameState.state.current_year = 1;
    gameState.state.is_twilight = false; 
    gameState.state.shadow_level = 0;
    
    // Injection dynamique d'un message dans les chroniques
    import('../ui/dom.js').then(module => {
        if (module.addChronicle) {
            module.addChronicle(`<strong style="color:#d4af37;">[NOUVEL ÂGE]</strong> ${message}`);
        }
    });
}

function triggerVictory(gameState, choix) {
    gameState.state.is_victory = true; 
    
    const vModal = document.getElementById('victory-modal');
    if (vModal) {
        document.getElementById('victory-title').textContent = "LE QUATRIÈME ÂGE COMMENCE";
        document.getElementById('victory-title').style.color = "#f1c40f";
        document.getElementById('victory-desc').textContent = `Vous avez choisi : ${choix}. Votre ère s'achève, mais votre légende est éternelle.`;
        vModal.style.background = 'rgba(0,0,0,0.95)';
        
        const btn = document.getElementById('btn-prestige');
        if(btn) btn.textContent = "Accepter l'Héritage (New Game +)";
        
        vModal.style.display = 'flex';
    }
}