// js/core/state.js

export const gameState = {
    meta: {
        current_age: 1,
        legacies: [],
        prestige_eclats: 0,
        redemption_achieved: false,
        last_save_time: Date.now()
    },
    state: {
        current_year: 1,
        shadow_level: 0,
        active_focus: 'espoir',
        is_paused: false,
        is_victory: false,
        is_twilight: false,
        bonus_multiplicateur: 1.0,
        resolved_events: [],
        pending_events: [],
        // 🆕 SUIVI DE L'ACTIVITÉ DES INTENDANTS
        council_active: {
            senechal: true,
            batisseur: true,
            heraut: true
        }
    },
    resources: {
        savoir: 0, richesse: 50, renom: 10, espoir: 100
    },
    population: {
        hommes: 20, elfes: 0
    },
    buildings: {
        ferme: 0, village: 0, refuge_elfique: 0, forge: 0, 
        scriptorium: 0, caserne: 0, sanctuaire: 0, 
        hobbits: 0, nains: 0, ents: 0
    },
    council: {
        senechal: false,   
        batisseur: false,  
        heraut: false      
    }
};
