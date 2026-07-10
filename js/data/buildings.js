// js/data/buildings.js

export const BUILDINGS = [
    // --- ÂGE 1 ---
    {
        id: "bld_ferme",
        name: "Fermes Agricoles",
        description: "Génère de la Richesse.",
        req_age: 1,
        baseCost: { hommes: 5, espoir: 10 },
        multiplier: 1.15,
        production: { richesse: 3 },
        isVisible: (s) => true
    },
    {
        id: "bld_mine",
        name: "Carrières de Pierre",
        description: "Génère de la Richesse et du Renom.",
        req_age: 1,
        baseCost: { richesse: 200, hommes: 15 },
        multiplier: 1.20,
        production: { richesse: 5, renom: 1 },
        isVisible: (s) => true
    },
    {
        id: "bld_bibliotheque",
        name: "Archives du Savoir",
        description: "Génère du Savoir.",
        req_age: 1,
        baseCost: { richesse: 600, renom: 20 },
        multiplier: 1.25,
        production: { savoir: 4 },
        isVisible: (s) => true
    },

    // --- BÂTIMENTS DE POPULATION (LOGEMENTS) ---
    {
        id: "bld_hameau",
        name: "Hameaux Fortifiés",
        description: "Augmente la capacité maximale d'Hommes de +50.",
        req_age: 1,
        baseCost: { richesse: 150, renom: 10 },
        multiplier: 1.20, // 🔴 Baisse radicale (était 1.30)
        capacity: { hommes: 50 }, // 🔴 Augmentation (était 20)
        isVisible: (s) => true
    },
    {
        id: "bld_refuge",
        name: "Refuges Sylvestres",
        description: "Attire les Elfes errants. Augmente la capacité d'Elfes de +25.",
        req_age: 1,
        baseCost: { richesse: 800, renom: 50 },
        multiplier: 1.22, // 🔴 Baisse radicale (était 1.45)
        capacity: { elfes: 25 }, // 🔴 Augmentation (était 5)
        isVisible: (s) => true
    },

    // --- ÂGE 2 ---
    {
        id: "bld_forge",
        name: "Forges Elfiques",
        description: "Génère de la Richesse et du Savoir.",
        req_age: 2,
        baseCost: { richesse: 2500, hommes: 50, elfes: 10 },
        multiplier: 1.30,
        production: { richesse: 15, savoir: 8 },
        isVisible: (s) => s.meta.current_age >= 2
    },
    {
        id: "bld_caserne",
        name: "Garnisons de Veille",
        description: "Génère du Renom et de l'Espoir.",
        req_age: 2,
        baseCost: { richesse: 4000, hommes: 80 },
        multiplier: 1.35,
        production: { renom: 5, espoir: 2 },
        isVisible: (s) => s.meta.current_age >= 2
    },
    {
        id: "bld_sanctuaire",
        name: "Sanctuaires Guérisseurs",
        description: "Génère de l'Espoir et du Savoir.",
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
        description: "Génère massivement du Savoir.",
        req_age: 3,
        baseCost: { richesse: 35000, renom: 1500 },
        multiplier: 1.45,
        production: { savoir: 40 },
        isVisible: (s) => s.meta.current_age >= 3
    },
    {
        id: "bld_place_armes",
        name: "Citadelles de Guerre",
        description: "Génère massivement du Renom.",
        req_age: 3,
        baseCost: { richesse: 45000, hommes: 300, espoir: 500 },
        multiplier: 1.50,
        production: { renom: 25 },
        isVisible: (s) => s.meta.current_age >= 3
    }
];