// js/data/buildings.js

export const BUILDINGS = [
    // --- ÂGE 1 ---
    {
        id: "bld_ferme",
        name: "Fermes Agricoles",
        description: "Génère de la Richesse. Nécessite de la main d'œuvre et de l'optimisme.",
        req_age: 1,
        baseCost: { hommes: 5, espoir: 10 },
        multiplier: 1.15,
        production: { richesse: 3 },
        isVisible: (s) => true
    },
    {
        id: "bld_mine",
        name: "Carrières de Pierre",
        description: "Génère Richesse et Renom, mais épuise vos travailleurs.",
        req_age: 1,
        baseCost: { richesse: 200, hommes: 15 },
        multiplier: 1.20,
        production: { richesse: 5, renom: 1 },
        isVisible: (s) => true
    },
    {
        id: "bld_bibliotheque",
        name: "Archives du Savoir",
        description: "Génère du Savoir. Importer des manuscrits coûte très cher.",
        req_age: 1,
        baseCost: { richesse: 600, renom: 20 },
        multiplier: 1.25,
        production: { savoir: 4 },
        isVisible: (s) => true
    },

    // --- ÂGE 2 ---
    {
        id: "bld_forge",
        name: "Forges Elfiques",
        description: "Génère beaucoup de Richesse et de Savoir. Nécessite l'alliance des deux peuples.",
        req_age: 2,
        baseCost: { richesse: 2500, hommes: 50, elfes: 10 },
        multiplier: 1.30,
        production: { richesse: 15, savoir: 8 },
        isVisible: (s) => s.meta.current_age >= 2
    },
    {
        id: "bld_caserne",
        name: "Garnisons de Veille",
        description: "Génère du Renom et maintient l'Espoir. L'armée coûte de l'or.",
        req_age: 2,
        baseCost: { richesse: 4000, hommes: 80 },
        multiplier: 1.35,
        production: { renom: 5, espoir: 2 },
        isVisible: (s) => s.meta.current_age >= 2
    },
    {
        id: "bld_sanctuaire",
        name: "Sanctuaires Guérisseurs",
        description: "Protège l'Espoir et génère du Savoir antique.",
        req_age: 2,
        baseCost: { richesse: 6000, renom: 250, elfes: 20 },
        multiplier: 1.40,
        production: { espoir: 4, savoir: 12 },
        isVisible: (s) => s.meta.current_age >= 2
    },

    // --- ÂGE 3 ---
    {
        id: "bld_academie",
        name: "Académie des Sages",
        description: "Production massive de Savoir. Un gouffre financier pour l'État.",
        req_age: 3,
        baseCost: { richesse: 35000, renom: 1500 },
        multiplier: 1.45,
        production: { savoir: 40 },
        isVisible: (s) => s.meta.current_age >= 3
    },
    {
        id: "bld_place_armes",
        name: "Citadelles de Guerre",
        description: "Production massive de Renom face aux Ténèbres.",
        req_age: 3,
        baseCost: { richesse: 45000, hommes: 300, espoir: 500 },
        multiplier: 1.50,
        production: { renom: 25 },
        isVisible: (s) => s.meta.current_age >= 3
    }
];