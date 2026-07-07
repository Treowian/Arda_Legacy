// js/data/projects.js
import { triggerPrestige } from '../core/save.js';

export const PROJECTS = [
    // --- ÂGE 1 ---
    {
        id: "proj_age1_normal", age: 1, is_twilight: false,
        title: "🏛️ Fonder les Cités du Lindon",
        description: "Rassemblez les survivants sous la bannière de Gil-galad et jetez les bases d'un empire.",
        cost: { richesse: 5000, savoir: 3000, renom: 1000 },
        onComplete: (gs) => transitionAge(gs, 2, "La splendeur dorée du Lindon s'éveille. Bienvenue au Deuxième Âge.")
    },
    {
        id: "proj_age1_twilight", age: 1, is_twilight: true,
        title: "🌱 Fuir avec la Pousse de l'Arbre Blanc",
        description: "Le royaume s'effondre sous le poids de l'Ombre. Sacrifiez vos ressources pour fuir vers l'Est.",
        cost: { espoir: 500, hommes: 50, renom: 200 },
        onComplete: (gs) => { 
            gs.meta.legacies.push("Arbre Blanc"); 
            transitionAge(gs, 2, "Le Beleriand s'engloutit dans les larmes, mais la lignée de l'Arbre survivra. L'Exil commence."); 
        }
    },

    // --- ÂGE 2 ---
    {
        id: "proj_age2_normal", age: 2, is_twilight: false,
        title: "⚔️ Forger la Dernière Alliance",
        description: "Unissez les peuples des Elfes et des Hommes pour briser de manière décisive le joug de Sauron.",
        cost: { richesse: 50000, savoir: 20000, renom: 10000, hommes: 500 },
        onComplete: (gs) => transitionAge(gs, 3, "Sauron est terrassé au pied de la Montagne du Destin ! Le Troisième Âge s'ouvre.")
    },
    {
        id: "proj_age2_twilight", age: 2, is_twilight: true,
        title: "🗡️ L'Héritage de l'Épée Brisée",
        description: "Le roi est mort, vos forges sont détruites. Fuyez dans la clandestinité avec les fragments de la lame.",
        cost: { espoir: 2000, hommes: 200, savoir: 5000 },
        onComplete: (gs) => { 
            gs.meta.legacies.push("Épée Brisée"); 
            transitionAge(gs, 3, "Votre dynastie brisée se fond dans les bois. Vous devenez les Rôdeurs du Nord clandestins."); 
        }
    },
    
    // --- ÂGE 3 : END GAME ET PRESTIGE ---
    {
        id: "proj_age3_normal", age: 3, is_twilight: false,
        title: "👑 Couronner le Roi Elessar (Ascension Cosmique)",
        description: "L'Unique est détruit. Couronnez le Roi légitime pour clore les chroniques et obtenir des Éclats de Silmaril permanently.",
        cost: { richesse: 250000, savoir: 100000, renom: 50000, espoir: 10000 },
        onComplete: (gs) => {
            alert("LÉGENDE ACCOMPLIE ! Votre règne entre dans l'éternité. Vos ressources vont être converties en Prestige permanent.");
            const scoreTotal = gs.resources.richesse + gs.resources.savoir + gs.resources.renom;
            triggerPrestige(scoreTotal); // RE-LANCE LE JEU EN NG+
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
