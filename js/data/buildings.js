// js/data/buildings.js

export const BUILDINGS = [
    // --- TIER 1 : Subsistance ---
    {
        id: "ferme", name: "Ferme Humaine", description: "Génère +0.5 Richesse par an.",
        baseCost: { richesse: 20 }, production: { richesse: 0.5 }, multiplier: 1.15,
        isVisible: (st) => st.resources.richesse >= 20 || st.buildings.ferme > 0
    },
    {
        id: "village", name: "Camp de Réfugiés", description: "Attire +0.2 Hommes par an.",
        baseCost: { espoir: 50, richesse: 50 }, production: { hommes: 0.2 }, multiplier: 1.15,
        isVisible: (st) => st.buildings.ferme >= 5
    },
    // --- TIER 2 : Développement urbain ---
    {
        id: "refuge_elfique", 
        name: "Refuge Elfique", 
        description: "Attire +0.1 Elfe par an.",
        baseCost: { espoir: 200, savoir: 50 }, 
        production: { elfes: 0.1 }, 
        multiplier: 1.15,
        isVisible: (st) => st.resources.savoir >= 50 || st.buildings.refuge_elfique > 0
    },
    
    {
        id: "forge", name: "Forge Naine", description: "Génère +4 Richesse par an.",
        baseCost: { richesse: 150 }, production: { richesse: 4 }, multiplier: 1.15,
        isVisible: (st) => st.buildings.ferme >= 10
    },
    {
        id: "scriptorium", name: "Scriptorium", description: "Génère +1 Savoir par an.",
        baseCost: { richesse: 300 }, production: { savoir: 1 }, multiplier: 1.15,
        isVisible: (st) => st.buildings.forge >= 1
    },
    {
        id: "caserne", name: "Place d'Armes", description: "Génère +1 Renom par an.",
        baseCost: { richesse: 500, hommes: 10 }, production: { renom: 1 }, multiplier: 1.15,
        isVisible: (st) => st.buildings.forge >= 1
    },
    {
        id: "sanctuaire", name: "Sanctuaire", description: "Génère +0.5 Espoir par an.",
        baseCost: { richesse: 800, savoir: 100 }, production: { espoir: 0.5 }, multiplier: 1.15,
        isVisible: (st) => st.buildings.scriptorium >= 1
    },
    // --- TIER 3 : Les Enclaves des Peuples Libres (Âge 2+) ---
    {
        id: "hobbits", name: "Alliance de la Comté", description: "Génère +5 Espoir par an (Aucune corruption).",
        baseCost: { richesse: 2500, renom: 500 }, production: { espoir: 5 }, multiplier: 1.50,
        isVisible: (st) => st.meta.current_age >= 2 && st.resources.renom >= 300
    },
    {
        id: "nains", name: "Ambassade d'Erebor", description: "Génère +25 Richesse par an, mais génère +0.5 Ombre par an due à l'or.",
        baseCost: { richesse: 5000, savoir: 1000 }, production: { richesse: 25 }, multiplier: 1.50,
        isVisible: (st) => st.meta.current_age >= 2 && st.resources.richesse >= 2000
    },
    {
        id: "ents", name: "Pacte de Fangorn", description: "Écrase l'Ombre de -1.0 point par an.",
        baseCost: { espoir: 3000, savoir: 3000 }, production: { }, multiplier: 2.0,
        isVisible: (st) => st.meta.current_age >= 2 && st.resources.savoir >= 1500
    }
];
