// js/data/buildings.js

export const BUILDINGS = [
    // --- TIER 1 : Économie de base ---
    {
        id: "ferme", name: "Ferme Humaine", description: "+0.5 Richesse/an.",
        baseCost: { richesse: 20 }, production: { richesse: 0.5 }, multiplier: 1.15,
        isVisible: (st) => st.resources.richesse >= 20 || st.buildings.ferme > 0
    },
    {
        id: "village", name: "Camp de Réfugiés", description: "+0.2 Hommes/an.",
        baseCost: { espoir: 50, richesse: 50 }, production: { hommes: 0.2 }, multiplier: 1.15,
        isVisible: (st) => st.buildings.ferme >= 5
    },
    // --- TIER 2 : Spécialisation ---
    {
        id: "forge", name: "Forge Naine", description: "+4 Richesse/an.",
        baseCost: { richesse: 150 }, production: { richesse: 4 }, multiplier: 1.15,
        isVisible: (st) => st.buildings.ferme >= 10
    },
    {
        id: "scriptorium", name: "Scriptorium", description: "+1 Savoir/an.",
        baseCost: { richesse: 300 }, production: { savoir: 1 }, multiplier: 1.15,
        isVisible: (st) => st.buildings.forge >= 1
    },
    {
        id: "caserne", name: "Place d'Armes", description: "+1 Renom/an.",
        baseCost: { richesse: 500, hommes: 10 }, production: { renom: 1 }, multiplier: 1.15,
        isVisible: (st) => st.buildings.forge >= 1
    },
    // --- TIER 3 : Les Enclaves (Peuples Libres) ---
    {
        id: "hobbits", name: "Alliance de la Comté", description: "Génère +5 Espoir/an. (Aucune ombre)",
        baseCost: { richesse: 2500, renom: 500 }, production: { espoir: 5 }, multiplier: 1.50,
        isVisible: (st) => st.meta.current_age >= 2 && st.resources.renom >= 300
    },
    {
        id: "nains", name: "Ambassade d'Erebor", description: "+25 Richesse/an, mais génère +0.5 Ombre/an.",
        baseCost: { richesse: 5000, savoir: 1000 }, production: { richesse: 25 }, multiplier: 1.50,
        isVisible: (st) => st.meta.current_age >= 2 && st.resources.richesse >= 2000
    },
    {
        id: "ents", name: "Pacte de Fangorn", description: "Réduit passivement l'Ombre de -1/an.",
        baseCost: { espoir: 3000, savoir: 3000 }, production: { }, multiplier: 2.0, // Effet géré dans le moteur
        isVisible: (st) => st.meta.current_age >= 2 && st.resources.savoir >= 1500
    }
];
