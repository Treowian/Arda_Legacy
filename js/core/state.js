// js/core/state.js

// 1. On définit l'état de base, vierge, et on l'exporte (Nécessaire pour le Prestige)
export const initialState = {
    meta: {
        current_age: 1,
        legacies: [],
        prestige_eclats: 0,
        redemption_achieved: false,
        last_save_time: null // Plus propre de démarrer à null
    },
    state: {
        current_year: 1,
        shadow_level: 0,
        active_focus: 'agricole',
        is_paused: false,
        is_victory: false,
        is_twilight: false,
        bonus_multiplicateur: 1.0,
        resolved_events: [],
        pending_events: [],
        resolved_projects: [], // ⚠️ Important pour éviter des bugs avec .includes()
        council_active: {
            senechal: true,
            batisseur: true,
            heraut: true
        },
        // 🆕 REGISTRE DES MALÉDICTIONS ET BONUS TEMPORAIRES
        active_modifiers: []
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
    },
    buildings: {
        ferme: 0,
        village: 0,
        refuge_elfique: 0,
        forge: 0,
        scriptorium: 0,
        caserne: 0,
        sanctuaire: 0,
        hobbits: 0,
        nains: 0,
        ents: 0
    },
    council: {
        senechal: false,
        batisseur: false,
        heraut: false
    }
};

// 2. On exporte l'état courant (qui est un clone profond de l'état initial au démarrage)
export const gameState = JSON.parse(JSON.stringify(initialState));