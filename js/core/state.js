// js/core/state.js

// --- CONFIGURATION GLOBALE ---
// Ces constantes dictent les règles immuables du moteur.
export const CONFIG = {
    TICK_RATE_MS: 60000, // 1 minute réelle = 1 tick temporel
    SAVE_KEY: 'chroniques_save_v1' // Identifiant pour le localStorage
};

// --- ÉTAT DU JEU ---
// Cet objet contient l'intégralité des variables de la partie en cours.
export let gameState = {
    meta: {
        last_saved_at: Date.now(),
        current_age: 1,
    },
    state: {
        shadow_level: 0,
        current_year: 1,
        active_focus: 'agricole',
        resolved_events: [], // Mémorise les ID des événements déjà joués
        is_paused: false     // Permet de stopper le temps lors d'un choix crucial
    },
    resources: { 
        savoir: 0, 
        richesse: 50, 
        renom: 10, 
        espoir: 100 
    },
    population: { 
        hommes: 20, 
        elfes: 0 
    }
};

// --- MUTATEUR SÉCURISÉ ---
// Fonction défensive pour fusionner de nouvelles données (ex: au chargement de la sauvegarde)
// sans écraser accidentellement la structure existante.
export function setGameState(newState) {
    gameState = { ...gameState, ...newState };
}