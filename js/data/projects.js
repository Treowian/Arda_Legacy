// js/data/projects.js

export const PROJECTS = [
    // --- ÂGE 1 ---
    {
        id: "proj_age1_normal",
        age: 1,
        is_twilight: false,
        title: "🏛️ Fonder les Cités du Lindon",
        description: "Rassemblez les survivants et jetez les bases majestueuses du Deuxième Âge.",
        cost: { richesse: 300, savoir: 200, renom: 100 },
        onComplete: (gameState) => transitionAge(gameState, 2, "La gloire du Lindon illumine ce nouvel Âge.")
    },
    {
        id: "proj_age1_twilight",
        age: 1,
        is_twilight: true,
        title: "🌱 Sauver la Pousse de l'Arbre Blanc",
        description: "Votre domaine s'effondre. Sacrifiez vos dernières forces pour fuir vers l'Est en protégeant cette relique d'espoir.",
        cost: { espoir: 80, hommes: 30, renom: 50 },
        onComplete: (gameState) => {
            gameState.meta.legacies.push("Arbre Blanc");
            transitionAge(gameState, 2, "Le Beleriand est perdu, mais l'Arbre Blanc survivra. L'exil commence.");
        }
    },

    // --- ÂGE 2 ---
    {
        id: "proj_age2_normal",
        age: 2,
        is_twilight: false,
        title: "⚔️ Forger la Dernière Alliance",
        description: "Unissez les Hommes et les Elfes pour vaincre Sauron de manière décisive.",
        cost: { richesse: 1000, savoir: 600, renom: 500, hommes: 50 },
        onComplete: (gameState) => transitionAge(gameState, 3, "Sauron est vaincu par les Hauts Rois ! Le Troisième Âge commence dans la lumière.")
    },
    {
        id: "proj_age2_twilight",
        age: 2,
        is_twilight: true,
        title: "🗡️ L'Héritage de l'Épée Brisée",
        description: "La guerre est perdue, le roi est mort. Fuyez dans l'ombre avec les fragments de Narsil pour survivre.",
        cost: { espoir: 100, hommes: 50, savoir: 200 },
        onComplete: (gameState) => {
            gameState.meta.legacies.push("Épée Brisée");
            transitionAge(gameState, 3, "Vous devenez des Rôdeurs errants. Le Troisième Âge sera celui de la clandestinité.");
        }
    },
    
    // --- ÂGE 3 ---
    {
        id: "proj_age3_normal",
        age: 3,
        is_twilight: false,
        title: "👑 Couronner le Roi Elessar",
        description: "L'Anneau Unique est détruit. Réunissez les royaumes profanes et célébrez le retour du Roi légitime pour clore les Chroniques.",
        cost: { richesse: 2500, savoir: 1500, renom: 1200, espoir: 80 },
        onComplete: (gameState) => {
            gameState.state.is_victory = true;
            gameState.state.is_paused = true;
        },
        log: "🎉 LE RETOUR DU ROI ! Vous avez guidé votre peuple à travers les Âges du Mythe. Victoire absolue !"
    },
    {
        id: "proj_age3_twilight",
        age: 3,
        is_twilight: true,
        title: "⛵ Prendre les Derniers Navires",
        description: "Le monde appartient définitivement à l'Ombre. Fuyez vers les Havres Gris avant que tout ne disparaisse.",
        cost: { espoir: 150, renom: 300 },
        onComplete: (gameState) => {
            gameState.state.is_victory = true;
            gameState.state.is_paused = true;
        },
        log: "🌊 L'exil final. Vous quittez la Terre du Milieu, laissant les Hommes à leur triste sort. Fin de la partie."
    }
];

// Fonction utilitaire pour gérer la transition
function transitionAge(gameState, newAge, message) {
    gameState.meta.current_age = newAge;
    gameState.state.current_year = 1;
    gameState.state.is_twilight = false; 
    gameState.state.shadow_level = 0;
    gameState.state.resolved_events = []; 
}
