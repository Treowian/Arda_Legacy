// js/core/state.js

export const gameState = {
    meta: {
        current_age: 1,
        legacies: [],
        prestige_eclats: 0, // Notre monnaie de New Game +
        redemption_achieved: false // Devient vrai si tu purges le Crépuscule
    },
    state: {
        current_year: 1,
        shadow_level: 0,
        active_focus: 'espoir',
        is_paused: false,
        is_victory: false,
        is_twilight: false, // Mode Crépuscule activé si Ombre = 100
        bonus_multiplicateur: 1.0,
        resolved_events: []
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
        village: 0, // Génère des hommes passivement
        forge: 0,
        scriptorium: 0,
        caserne: 0,
        sanctuaire: 0,
        hobbits: 0,
        nains: 0,
        ents: 0
    }
};
