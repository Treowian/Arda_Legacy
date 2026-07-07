// js/data/buildings.js

export const BUILDINGS = [
    {
        id: "ferme",
        name: "Ferme Humaine",
        description: "Génère +0.5 Richesse par an.",
        baseCost: { richesse: 20 },
        production: { richesse: 0.5 },
        multiplier: 1.15,
        isVisible: (gameState) => gameState.resources.richesse >= 20 || gameState.buildings.ferme > 0
    },
    {
        id: "forge",
        name: "Forge Naine",
        description: "Génère +4 Richesse par an.",
        baseCost: { richesse: 150 },
        production: { richesse: 4 },
        multiplier: 1.15,
        isVisible: (gameState) => gameState.buildings.ferme >= 3
    },
    {
        id: "scriptorium",
        name: "Scriptorium",
        description: "Génère +1 Savoir par an.",
        baseCost: { richesse: 200 },
        production: { savoir: 1 },
        multiplier: 1.15,
        isVisible: (gameState) => gameState.buildings.forge >= 1
    },
    {
        id: "caserne",
        name: "Place d'Armes",
        description: "Génère +1 Renom par an.",
        baseCost: { richesse: 400 },
        production: { renom: 1 },
        multiplier: 1.15,
        isVisible: (gameState) => gameState.buildings.forge >= 1
    },
    {
        id: "sanctuaire",
        name: "Sanctuaire",
        description: "Génère +0.5 Espoir par an.",
        baseCost: { richesse: 800, savoir: 100 },
        production: { espoir: 0.5 },
        multiplier: 1.15,
        isVisible: (gameState) => gameState.buildings.scriptorium >= 1
    }
];
