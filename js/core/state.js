// js/core/state.js

export const gameState = {
    // 1. MÉTA-DONNÉES (Persistance globale et progression inter-parties)
    meta: {
        current_age: 1,
        legacies: [],
        prestige_eclats: 0,             // Monnaie de New Game +
        redemption_achieved: false,     // Bonus permanent si le Crépuscule a été vaincu
        last_save_time: Date.now()      // Horodatage pour le calcul du temps hors-ligne
    },
    
    // 2. ÉTAT DU JEU EN COURS (Les variables volatiles de la session)
    state: {
        current_year: 1,
        shadow_level: 0,                // Menace (0 à 100)
        active_focus: 'espoir',         // 'agricole' ou 'frontalier'
        is_paused: false,               // Sécurité lors des modales
        is_victory: false,
        is_twilight: false,             // Mode survie/effondrement
        bonus_multiplicateur: 1.0,      // Modificateur global de production
        resolved_events: [],            // Historique des choix pour éviter les doublons
        pending_events: []              // Boîte de réception des événements (messager)
    },
    
    // 3. ÉCONOMIE DU ROYAUME
    resources: {
        savoir: 0,
        richesse: 50,
        renom: 10,
        espoir: 100
    },
    
    // 4. DÉMOGRAPHIE
    population: {
        hommes: 20,
        elfes: 0
    },
    
    // 5. INFRASTRUCTURES (Bâtiments et Enclaves)
    buildings: {
        ferme: 0,
        village: 0,
        refuge_elfique: 0,
        forge: 0,
        scriptorium: 0,
        caserne: 0,
        sanctuaire: 0,
        hobbits: 0,                     // La Comté
        nains: 0,                       // Erebor
        ents: 0                         // Fangorn
    },
    
    // 6. LE CONSEIL DU ROI (Automatisation)
    council: {
        senechal: false,                // Gestion automatique des Décrets selon l'Ombre
        batisseur: false,               // Achat automatique et sécurisé d'infrastructures
        heraut: false                   // Clics d'inspiration automatiques
    }
};
