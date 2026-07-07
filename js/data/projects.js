// js/data/projects.js

export const PROJECTS = [
    {
        id: "proj_vers_age2",
        age: 1, // Disponible uniquement à l'Âge 1
        title: "🏛️ Fonder les Cités du Lindon",
        description: "Le Beleriand est englouti. Rassemblez les survivants, dressez les premières pierres des Havres Gris et jetez les bases du Deuxième Âge.",
        cost: { richesse: 300, savoir: 200, renom: 100 },
        onComplete: (gameState) => {
            gameState.meta.current_age = 2;
            gameState.state.current_year = 1; // Le temps redémarre à l'An 1 du nouvel Âge
        },
        log: "✨ Le Premier Âge s'achève. Les bannières du Lindon flottent sous un nouveau soleil. Bienvenue au Deuxième Âge !"
    },
    {
        id: "proj_vers_age3",
        age: 2, // Disponible uniquement à l'Âge 2
        title: "⚔️ Forger la Dernière Alliance",
        description: "Sauron menace de tout détruire. Unissez le sang des Hommes de Númenor et la lignée des Rois Elfes pour une ultime guerre.",
        cost: { richesse: 1000, savoir: 600, renom: 500, hommes: 50 },
        onComplete: (gameState) => {
            gameState.meta.current_age = 3;
            gameState.state.current_year = 1;
        },
        log: "⚡ Isildur a coupé l'Anneau ! Le Deuxième Âge se ferme dans le sang et la gloire. Le Troisième Âge commence..."
    },
    {
        id: "proj_victoire",
        age: 3, // Disponible uniquement à l'Âge 3
        title: "👑 Couronner le Roi Elessar",
        description: "L'Anneau Unique est détruit. Réunissez les royaumes profanes et célébrez le retour du Roi légitime pour clore les Chroniques.",
        cost: { richesse: 2500, savoir: 1500, renom: 1200, espoir: 80 },
        onComplete: (gameState) => {
            gameState.state.is_victory = true;
            gameState.state.is_paused = true;
        },
        log: "🎉 LE RETOUR DU ROI ! Vous avez guidé votre peuple à travers les Âges du Mythe. Victoire absolue !"
    }
];
