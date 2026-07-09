// js/data/events.js

// Fonctions utilitaires pour sécuriser les limites (empêcher les valeurs négatives ou > 100)
const cap = (val) => Math.max(0, val);
const clamp = (val, min, max) => Math.max(min, Math.min(max, val));
const capZero = (val) => Math.max(0, val);

export const EVENTS = [
    // ==========================================
    // 1. ÉVÉNEMENTS DU QUOTIDIEN (Routine)
    // Nerf de la sévérité (Max -15%/-20% pour garder l'écart avec les Crises)
    // ==========================================
    {
        id: "quo_pluie_grise", title: "La Pluie Grise",
        description: "Un crachin froid et ininterrompu s'abat sur vos terres. La boue engloutit les routes, et le moral de votre peuple s'effrite.",
        repeatable: true, condition: (gameState) => Math.random() < 0.15,
        choices: [
            { label: "Allumer les grands âtres (-10% Richesse, +10% Espoir)", canAfford: (s) => s.resources.richesse > 10, effect: (s) => { s.resources.richesse *= 0.90; s.resources.espoir *= 1.10; }, log: "Le feu a chassé l'humidité des os, mais le bois sec a un prix." },
            { label: "Endurer (-10% Espoir)", canAfford: (s) => s.resources.espoir > 10, effect: (s) => { s.resources.espoir *= 0.90; }, log: "Les chants se sont tus. La pluie semble ne jamais devoir cesser." }
        ]
    },
    {
        id: "quo_fievre_pale", title: "La Fièvre Pâle",
        description: "Une toux étrange se propage parmi les plus jeunes. Les guérisseurs manquent d'herbes pour faire baisser la fièvre.",
        repeatable: true, condition: (gameState) => Math.random() < 0.10 && gameState.population.hommes > 30,
        choices: [
            { label: "Acheter des herbes rares (-15% Richesse, +10% Espoir)", canAfford: (s) => s.resources.richesse > 20, effect: (s) => { s.resources.richesse *= 0.85; s.resources.espoir *= 1.10; }, log: "L'or a payé la santé de vos enfants. Leurs rires résonnent à nouveau." },
            { label: "Isoler les malades (-5% Hommes, -10% Espoir)", canAfford: (s) => s.population.hommes >= 10, effect: (s) => { s.population.hommes *= 0.95; s.resources.espoir *= 0.90; }, log: "La maladie s'est éteinte, mais elle a emporté les plus faibles." },
            // 🆕 3ème choix : Solution alternative
            { label: "Prier les anciens (Quitte ou double)", canAfford: () => true, effect: (s) => { if(Math.random() < 0.5) { s.resources.espoir *= 1.15; } else { s.population.hommes *= 0.90; s.resources.espoir *= 0.85; } }, log: "Vous vous en remettez au destin. Les résultats furent incertains." }
        ]
    },
    {
        id: "quo_recolte_or", title: "L'Été d'Or",
        description: "Le soleil a baigné vos terres, et les récoltes dépassent toutes les espérances. Les silos débordent.",
        repeatable: true, condition: (gameState) => Math.random() < 0.10,
        choices: [
            { label: "Stocker pour l'avenir (+20% Richesse, +15% Savoir)", canAfford: () => true, effect: (s) => { s.resources.richesse *= 1.20; s.resources.savoir *= 1.15; }, log: "L'abondance est sagement mise de côté. Votre peuple apprend la prévoyance." },
            { label: "Organiser un grand banquet (-10% Richesse, +30% Espoir)", canAfford: () => true, effect: (s) => { s.resources.richesse *= 0.90; s.resources.espoir *= 1.30; }, log: "La bière a coulé à flots. Cette nuit restera dans les mémoires." }
        ]
    },
    {
        id: "quo_feu_foret", title: "Le Ciel de Cendres",
        description: "Un été trop sec a déclenché un incendie dans la forêt. Les flammes menacent vos cabanes de bûcherons.",
        repeatable: true, condition: (gameState) => Math.random() < 0.10,
        choices: [
            { label: "Lutter contre les flammes (-5% Hommes, +15% Renom)", canAfford: (s) => s.population.hommes >= 10, effect: (s) => { s.population.hommes *= 0.95; s.resources.renom *= 1.15; }, log: "Le feu est vaincu, mais les brûlures ont fauché plusieurs de vos braves." },
            { label: "Laisser brûler la vieille forêt (-15% Richesse, +5 Ombre)", canAfford: (s) => s.resources.richesse > 10, effect: (s) => { s.resources.richesse *= 0.85; s.state.shadow_level = clamp(s.state.shadow_level + 5, 0, 100); }, log: "Le bois est en cendres et la faune a fui. Le paysage est désolé." }
        ]
    },
    {
        id: "quo_fonte_neiges", title: "La Colère du Fleuve",
        description: "Au printemps, la fonte des neiges grossit les rivières qui menacent d'emporter le moulin principal.",
        repeatable: true, condition: (gameState) => Math.random() < 0.10,
        choices: [
            { label: "Renforcer les digues en urgence (-10% Richesse, +15% Renom)", canAfford: (s) => s.resources.richesse > 10, effect: (s) => { s.resources.richesse *= 0.90; s.resources.renom *= 1.15; }, log: "Vos hommes ont travaillé dans l'eau glacée, mais le moulin est sauvé." },
            { label: "Laisser les eaux monter (-15% Richesse, -10% Espoir)", canAfford: (s) => s.resources.richesse > 10, effect: (s) => { s.resources.richesse *= 0.85; s.resources.espoir *= 0.90; }, log: "Le fleuve a emporté vos réserves. Il faudra rebâtir." }
        ]
    },
    {
        id: "quo_secheresse", title: "La Terre Craquelée",
        description: "Aucune pluie n'est tombée depuis des mois. Les puits s'assèchent et le blé jaunit sur tige.",
        repeatable: true, condition: (gameState) => Math.random() < 0.10,
        choices: [
            { label: "Rationner l'eau strictement (-10% Espoir, +10% Savoir)", canAfford: (s) => s.resources.espoir > 10, effect: (s) => { s.resources.espoir *= 0.90; s.resources.savoir *= 1.10; }, log: "La soif a endurci les cœurs, mais l'ordre a été maintenu." },
            { label: "Creuser de nouveaux puits profonds (-15% Richesse, +15% Espoir)", canAfford: (s) => s.resources.richesse > 10, effect: (s) => { s.resources.richesse *= 0.85; s.resources.espoir *= 1.15; }, log: "L'eau claire a finalement jailli des profondeurs, au prix d'efforts." }
        ]
    },
    {
        id: "quo_loups_hiver", title: "Les Hurlements Blancs",
        description: "Un hiver terrible pousse les meutes de loups à se rapprocher dangereusement de vos enclos.",
        repeatable: true, condition: (gameState) => Math.random() < 0.12,
        choices: [
            { label: "Organiser une grande traque (-5% Hommes, +15% Renom)", canAfford: (s) => s.population.hommes >= 10, effect: (s) => { s.population.hommes *= 0.95; s.resources.renom *= 1.15; }, log: "Les loups ont été repoussés, mais la neige s'est teintée de rouge." },
            { label: "Sacrifier du bétail pour les apaiser (-10% Richesse, +5 Ombre)", canAfford: (s) => s.resources.richesse > 10, effect: (s) => { s.resources.richesse *= 0.90; s.state.shadow_level = clamp(s.state.shadow_level + 5, 0, 100); }, log: "Les bêtes ont mangé à leur faim et sont reparties, mais elles reviendront." }
        ]
    },
    {
        id: "quo_nuit_sans_etoiles", title: "La Nuit Opaque",
        description: "Une brume épaisse masque les étoiles. Une peur irrationnelle s'empare des habitants, qui n'osent plus sortir.",
        repeatable: true, condition: (gameState) => Math.random() < 0.08,
        choices: [
            { label: "Allumer des brasiers sur les collines (-10% Richesse, +15% Espoir)", canAfford: (s) => s.resources.richesse > 10, effect: (s) => { s.resources.richesse *= 0.90; s.resources.espoir *= 1.15; }, log: "La lumière a percé les ténèbres et rassuré les âmes tremblantes." },
            { label: "Ignorer ces superstitions (-10% Espoir, +5 Ombre)", canAfford: (s) => s.resources.espoir > 10, effect: (s) => { s.resources.espoir *= 0.90; s.state.shadow_level = clamp(s.state.shadow_level + 5, 0, 100); }, log: "La nuit est passée, mais l'angoisse a laissé une trace durable." },
            // 🆕 3ème choix
            { label: "Prier les Valar dans le noir (Risqué)", canAfford: () => true, effect: (s) => { if(Math.random() < 0.5) { s.resources.espoir *= 1.25; } else { s.state.shadow_level = clamp(s.state.shadow_level + 10, 0, 100); } }, log: "Vos prières ont reçu une réponse incertaine dans le noir." }
        ]
    },
    {
        id: "quo_source_pure", title: "Le Don de la Terre",
        description: "Des bûcherons ont découvert une source d'eau claire aux reflets argentés, dont l'eau semble redonner des forces.",
        repeatable: true, condition: (gameState) => Math.random() < 0.08,
        choices: [
            { label: "L'aménager comme lieu de guérison (-10% Richesse, +25% Espoir)", canAfford: (s) => s.resources.richesse > 10, effect: (s) => { s.resources.richesse *= 0.90; s.resources.espoir *= 1.25; }, log: "Les malades viennent y boire et retrouvent la vigueur d'antan." },
            { label: "L'exploiter secrètement pour vous (+20% Richesse, +10 Ombre)", canAfford: () => true, effect: (s) => { s.resources.richesse *= 1.20; s.state.shadow_level = clamp(s.state.shadow_level + 10, 0, 100); }, log: "L'eau vous a enrichi, mais sa pureté s'est peu à peu ternie." }
        ]
    },
    {
        id: "quo_eboulement", title: "Le Cri de la Montagne",
        description: "Une paroi rocheuse a cédé près d'un sentier très fréquenté, bloquant la route marchande.",
        repeatable: true, condition: (gameState) => Math.random() < 0.10,
        choices: [
            { label: "Dégager la voie sans attendre (-15% Richesse, +15% Renom)", canAfford: (s) => s.resources.richesse > 10, effect: (s) => { s.resources.richesse *= 0.85; s.resources.renom *= 1.15; }, log: "Le commerce a repris rapidement grâce à votre diligence." },
            { label: "Laisser les voyageurs se débrouiller (+5% Richesse, -15% Renom)", canAfford: (s) => s.resources.renom > 10, effect: (s) => { s.resources.richesse *= 1.05; s.resources.renom *= 0.85; }, log: "L'isolement appauvrit votre domaine, et votre nom est raillé." }
        ]
    },
    {
        id: "quo_essaim_sauterelles", title: "Le Nuage Noir",
        description: "Un essaim d'insectes voraces s'abat sur vos champs. Tout ce qui est vert risque de disparaître.",
        repeatable: true, condition: (gameState) => Math.random() < 0.08,
        choices: [
            { label: "Brûler les champs infestés (-20% Richesse, +15% Savoir)", canAfford: (s) => s.resources.richesse > 10, effect: (s) => { s.resources.richesse *= 0.80; s.resources.savoir *= 1.15; }, log: "La récolte est perdue, mais l'essaim n'a pas pu se reproduire." },
            { label: "Prier pour qu'elles partent vite (-10% Richesse, -15% Espoir)", canAfford: (s) => s.resources.espoir > 10, effect: (s) => { s.resources.richesse *= 0.90; s.resources.espoir *= 0.85; }, log: "Elles ont tout dévoré avant de s'envoler." }
        ]
    },
    {
        id: "quo_gibier_abondant", title: "La Marche des Cerfs",
        description: "Les chasseurs rapportent que les forêts regorgent de grand gibier cet automne. La viande ne manquera pas.",
        repeatable: true, condition: (gameState) => Math.random() < 0.12,
        choices: [
            { label: "Remplir les fumoirs (+20% Richesse, +10% Espoir)", canAfford: () => true, effect: (s) => { s.resources.richesse *= 1.20; s.resources.espoir *= 1.10; }, log: "Les greniers sont pleins. L'hiver ne fait plus peur." },
            { label: "Inviter les tribus voisines à chasser (-5% Richesse, +25% Renom)", canAfford: () => true, effect: (s) => { s.resources.richesse *= 0.95; s.resources.renom *= 1.25; }, log: "Le partage de la viande a forgé de solides amitiés." }
        ]
    };
// ==========================================
    // 2. ÉVÉNEMENTS DIPLOMATIQUES (Géo-Bloqués)
    // Refonte : Scaling % et ajouts de mécaniques de "Push your luck"
    // ==========================================
    {
        id: "dip_emissaire_gondor", title: "Le Cor de Minas Tirith",
        description: "Un messager du Gondor, épuisé et monté sur un cheval écumant, vous apporte un message cacheté de cire noire. L'allié demande une aide financière.",
        repeatable: true, condition: (s) => s.meta.current_age === 3 && Math.random() < 0.12, 
        choices: [
            { label: "Envoyer l'or demandé (-20% Richesse, +30% Renom)", canAfford: (s) => s.resources.richesse > 20, effect: (s) => { s.resources.richesse *= 0.80; s.resources.renom *= 1.30; }, log: "Votre loyauté est inscrite dans les annales des Rois. Le Gondor s'en souviendra." },
            { label: "Préserver vos ressources (+10% Richesse, -20% Renom)", canAfford: (s) => s.resources.renom > 10, effect: (s) => { s.resources.richesse *= 1.10; s.resources.renom *= 0.80; }, log: "Le messager est reparti vers le sud, le visage sombre et désespéré." },
            // 🆕 3ème choix : Négociation risquée
            { label: "Négocier un prêt militaire (50% de chance d'accord)", canAfford: () => true, effect: (s) => { if(Math.random() < 0.5) { s.resources.renom *= 1.15; s.population.hommes *= 1.10; } else { s.resources.renom *= 0.70; } }, log: "Les négociations furent âpres. Le résultat est scellé." }
        ]
    },
    {
        id: "dip_cavaliers_rohan", title: "Les Éperons Verts",
        description: "Une patrouille de fiers cavaliers aux cheveux d'or s'arrête pour faire boire leurs bêtes et échanger des nouvelles.",
        repeatable: true, condition: (s) => s.meta.current_age === 3 && Math.random() < 0.12, 
        choices: [
            { label: "Offrir le meilleur fourrage (-10% Richesse, +20% Renom)", canAfford: (s) => s.resources.richesse > 10, effect: (s) => { s.resources.richesse *= 0.90; s.resources.renom *= 1.20; }, log: "Les seigneurs des chevaux ont salué votre générosité." },
            { label: "Exiger une taxe de passage (+15% Richesse, -15% Renom)", canAfford: (s) => s.resources.renom > 10, effect: (s) => { s.resources.richesse *= 1.15; s.resources.renom *= 0.85; }, log: "Ils ont payé et fait demi-tour dans un nuage de poussière méprisant." }
        ]
    },
    {
        id: "dip_caravane_erebor", title: "La Caravane d'Erebor",
        description: "Une somptueuse escorte de Nains transportant des métaux précieux souhaite traverser votre domaine pour rejoindre l'Ouest.",
        repeatable: true, condition: (s) => s.meta.current_age >= 2 && Math.random() < 0.15,
        choices: [
            { label: "Les accueillir avec faste (-15% Richesse, +25% Renom, +15% Savoir)", canAfford: (s) => s.resources.richesse > 15, effect: (s) => { s.resources.richesse *= 0.85; s.resources.renom *= 1.25; s.resources.savoir *= 1.15; }, log: "Votre hospitalité a impressionné les seigneurs de la Montagne Blanche." },
            { label: "Exiger une taxe lourde (+25% Richesse, -20% Renom)", canAfford: (s) => s.resources.renom > 15, effect: (s) => { s.resources.richesse *= 1.25; s.resources.renom *= 0.80; }, log: "Ils ont payé en grimaçant, jurant de ne plus jamais emprunter vos routes." }
        ]
    },
    {
        id: "dip_pelerin_gris", title: "Le Pèlerin en Manteau Gris",
        description: "Un vieil homme voûté, coiffé d'un grand chapeau bleu et appuyé sur un bâton, s'arrête à vos frontières.",
        repeatable: true, condition: (s) => s.meta.current_age === 3 && Math.random() < 0.10, 
        choices: [
            { label: "L'inviter à votre table (+30% Savoir, +25% Espoir)", canAfford: () => true, effect: (s) => { s.resources.savoir *= 1.30; s.resources.espoir *= 1.25; }, log: "Ses récits sur les temps anciens ont ravivé la flamme et la sagesse du domaine." },
            { label: "Le chasser (-15% Espoir, +10 Ombre)", canAfford: (s) => s.resources.espoir > 10, effect: (s) => { s.resources.espoir *= 0.85; s.state.shadow_level = clamp(s.state.shadow_level + 10, 0, 100); }, log: "Il est parti avec un soupir lourd, laissant un sentiment de vide immense." },
            { label: "Lui demander conseil mais le renvoyer (+10% Savoir)", canAfford: () => true, effect: (s) => { s.resources.savoir *= 1.10; }, log: "Vous prenez ses mots sans offrir l'hospitalité. Il sourit tristement." }
        ]
    },
    {
        id: "dip_rodeurs_veilleurs", title: "Les Veilleurs Silencieux",
        description: "Des hommes taciturnes vêtus de vert et de brun patinés proposent de surveiller vos frontières gratuitement en secret.",
        repeatable: true, condition: (s) => s.meta.current_age === 3 && Math.random() < 0.15,
        choices: [
            { label: "Accepter leur veille sacrée (+20% Espoir, -15 Ombre)", canAfford: () => true, effect: (s) => { s.resources.espoir *= 1.20; s.state.shadow_level = capZero(s.state.shadow_level - 15); }, log: "L'Ombre recule là où leur regard se pose, mais votre peuple murmure." },
            { label: "Les chasser par méfiance (+15% Renom, +10 Ombre)", canAfford: () => true, effect: (s) => { s.resources.renom *= 1.15; s.state.shadow_level = clamp(s.state.shadow_level + 10, 0, 100); }, log: "Vous avez gardé le contrôle de vos terres, mais les nuits semblent plus noires." }
        ]
    },
    {
        id: "dip_herbe_comte", title: "Les Chariots de la Comté",
        description: "De petits chariots conduits par des gens de petite taille arrivent de l'Ouest, chargés d'herbe à pipe parfumée.",
        repeatable: true, condition: (s) => s.meta.current_age >= 2 && Math.random() < 0.12,
        choices: [
            { label: "Acheter leur cargaison (-20% Richesse, +35% Espoir)", canAfford: (s) => s.resources.richesse > 10, effect: (s) => { s.resources.richesse *= 0.80; s.resources.espoir *= 1.35; }, log: "Le parfum de la feuille a apporté une paix éphémère et douce." },
            { label: "Les renvoyer à leurs collines (-15% Espoir)", canAfford: (s) => s.resources.espoir > 10, effect: (s) => { s.resources.espoir *= 0.85; }, log: "La vie continue, mais le quotidien manque cruellement de cette insouciance." }
        ]
    },
    {
        id: "dip_chasseurs_beornides", title: "La Loi des Beornides",
        description: "De grands hommes farouches exigent que vous cessiez de chasser l'ours dans les forêts limitrophes.",
        repeatable: true, condition: (s) => s.meta.current_age === 3 && Math.random() < 0.10,
        choices: [
            { label: "Respecter leur décret (-15% Richesse, +25% Renom)", canAfford: (s) => s.resources.richesse > 10, effect: (s) => { s.resources.richesse *= 0.85; s.resources.renom *= 1.25; }, log: "Les Beornides apprécient votre parole. Les frontières sont apaisées." },
            { label: "Ignorer leurs menaces (+20% Richesse, -30% Renom, -10% Hommes)", canAfford: (s) => s.resources.renom > 10, effect: (s) => { s.resources.richesse *= 1.20; s.resources.renom *= 0.70; s.population.hommes *= 0.90; }, log: "Des escarmouches ont éclaté dans les bois. Le sang a coulé." },
            { label: "Proposer un concours de chasse (Risqué)", canAfford: () => true, effect: (s) => { if(Math.random() < 0.5) { s.resources.renom *= 1.40; } else { s.population.hommes *= 0.85; s.resources.renom *= 0.85; } }, log: "Le défi fut relevé. La forêt en gardera longtemps le souvenir." }
        ]
    },
    {
        id: "dip_orques_embuscade", title: "L'Appel du Sang",
        description: "Une caravane marchande humaine alliée a été encerclée par des pillards orques à quelques lieues de vos avant-postes.",
        repeatable: true, condition: (s) => Math.random() < 0.10 && s.population.hommes > 20,
        choices: [
            { label: "Envoyer l'infanterie lourde (-15% Hommes, +40% Renom, +20% Espoir)", canAfford: (s) => s.population.hommes > 15, effect: (s) => { s.population.hommes *= 0.85; s.resources.renom *= 1.40; s.resources.espoir *= 1.20; }, log: "La caravane est sauvée. Les survivants jurent de chanter votre courage." },
            { label: "Sécuriser vos remparts (-25% Renom, +10 Ombre)", canAfford: (s) => s.resources.renom > 10, effect: (s) => { s.resources.renom *= 0.75; s.state.shadow_level = clamp(s.state.shadow_level + 10, 0, 100); }, log: "La caravane a été massacrée. L'Ombre se nourrit de votre passivité." },
            { label: "Tenter une mission de sauvetage furtive (Risqué)", canAfford: () => true, effect: (s) => { if(Math.random() < 0.5) { s.resources.renom *= 1.30; s.resources.richesse *= 1.20; } else { s.population.hommes *= 0.80; } }, log: "L'opération s'est jouée à un fil sous le couvert de la nuit." }
        ]
    },
    {
        id: "dip_ambassade_lindon", title: "Les Sages du Lindon",
        description: "Un haut seigneur Elfe vient étudier vos chroniques pour y chercher la trace d'une ancienne légende.",
        repeatable: true, condition: (s) => s.meta.current_age >= 2 && Math.random() < 0.08 && s.resources.savoir > 50,
        choices: [
            { label: "Ouvrir vos archives (+50% Savoir, +10% Elfes, -15% Richesse)", canAfford: (s) => s.resources.richesse > 10, effect: (s) => { s.resources.savoir *= 1.50; s.population.elfes *= 1.10; s.resources.richesse *= 0.85; }, log: "L'érudit a déchiffré des parchemins oubliés. L'alliance est renforcée." },
            { label: "Refuser l'accès aux secrets (-20% Renom)", canAfford: (s) => s.resources.renom > 10, effect: (s) => { s.resources.renom *= 0.80; }, log: "L'Elfe est reparti en silence, déplorant la fermeture d'esprit des mortels." }
        ]
    },
    {
        id: "dip_convoi_graines", title: "Le Trocin des Hobbits",
        description: "Des Hobbits proposent d'échanger des graines de céréales inconnues contre de vieux parchemins d'histoire.",
        repeatable: true, condition: (s) => s.meta.current_age >= 2 && Math.random() < 0.08 && s.resources.savoir > 30,
        choices: [
            { label: "Accepter l'échange (-25% Savoir, +40% Richesse)", canAfford: (s) => s.resources.savoir > 10, effect: (s) => { s.resources.savoir *= 0.75; s.resources.richesse *= 1.40; }, log: "Les champs produiront davantage l'an prochain grâce à ces méthodes agricoles." },
            { label: "Garder vos écrits sacrés (-15% Richesse)", canAfford: (s) => s.resources.richesse > 10, effect: (s) => { s.resources.richesse *= 0.85; }, log: "Les Hobbits sont repartis déçus, grignotant tristement leurs provisions." }
        ]
    },
    {
        id: "dip_emissaire_mirkwood", title: "La Rançon de la Forêt Noire",
        description: "Des Elfes sylvains réclament une compensation en or pour les arbres coupés par vos pionniers aux lisières.",
        repeatable: true, condition: (s) => s.meta.current_age >= 2 && Math.random() < 0.10,
        choices: [
            { label: "Payer le tribut (-25% Richesse, +20% Renom)", canAfford: (s) => s.resources.richesse > 10, effect: (s) => { s.resources.richesse *= 0.75; s.resources.renom *= 1.20; }, log: "La paix est maintenue avec les gens des bois." },
            { label: "Refuser le chantage (+15% Richesse, -20% Espoir, +5 Ombre)", canAfford: (s) => s.resources.espoir > 10, effect: (s) => { s.resources.richesse *= 1.15; s.resources.espoir *= 0.80; s.state.shadow_level = clamp(s.state.shadow_level + 5, 0, 100); }, log: "Les flèches volent désormais bas près des chantiers forestiers." }
        ]
    },
    {
        id: "dip_forgeron_nain", title: "L'Apprenti de Nogrod",
        description: "Un artisan Nain banni de son clan cherche un atelier pour prouver sa valeur. Il demande de l'or pour s'installer.",
        repeatable: true, condition: (s) => s.meta.current_age >= 2 && Math.random() < 0.08,
        choices: [
            { label: "Financer son installation (-30% Richesse, +45% Savoir)", canAfford: (s) => s.resources.richesse > 10, effect: (s) => { s.resources.richesse *= 0.70; s.resources.savoir *= 1.45; }, log: "Ses méthodes de traitement du fer ont révolutionné vos forges." },
            { label: "Le renvoyer à sa montagne (-15% Savoir)", canAfford: (s) => s.resources.savoir > 10, effect: (s) => { s.resources.savoir *= 0.85; }, log: "Il est parti offrir son génie à des rivaux plus offrants." }
        ]
    },
    {
        id: "dip_troubadour_gondor", title: "Le Chant de la Grande Rivière",
        description: "Un musicien itinérant venu du Sud chante la gloire des anciens rois. La foule s'attroupe.",
        repeatable: true, condition: (s) => s.meta.current_age === 3 && Math.random() < 0.10,
        choices: [
            { label: "L'héberger au château (-15% Richesse, +35% Espoir)", canAfford: (s) => s.resources.richesse > 10, effect: (s) => { s.resources.richesse *= 0.85; s.resources.espoir *= 1.35; }, log: "Ses mélodies ont rallumé la fierté et l'espérance parmi les opprimés." },
            { label: "Le chasser pour troubles publics (-20% Espoir, +5 Ombre)", canAfford: (s) => s.resources.espoir > 10, effect: (s) => { s.resources.espoir *= 0.80; s.state.shadow_level = clamp(s.state.shadow_level + 5, 0, 100); }, log: "Les gens ont boudé la taverne, regrettant la beauté des vers interdits." }
        ]
    },
    {
        id: "dip_trahison_espion", title: "Le Sourire du Traître",
        description: "Un marchand itinérant qui logeait chez vous est suspecté d'envoyer des lettres codées vers le Nord.",
        repeatable: true, condition: (s) => s.meta.current_age >= 2 && Math.random() < 0.08 && s.state.shadow_level > 20,
        choices: [
            { label: "L'arrêter et confisquer ses biens (+25% Richesse, +15% Renom, -20% Espoir)", canAfford: (s) => s.resources.espoir > 10, effect: (s) => { s.resources.richesse *= 1.25; s.resources.renom *= 1.15; s.resources.espoir *= 0.80; }, log: "L'or a été saisi, mais le doute s'est instillé parmi vos proches." },
            { label: "Le bannir sans preuve (-25% Renom, +10 Ombre)", canAfford: (s) => s.resources.renom > 10, effect: (s) => { s.resources.renom *= 0.75; s.state.shadow_level = clamp(s.state.shadow_level + 10, 0, 100); }, log: "Il est parti colporter vos secrets à vos pires ennemis." },
            { label: "Tenter d'en faire un agent double (Risqué)", canAfford: () => true, effect: (s) => { if(Math.random() < 0.4) { s.resources.savoir *= 1.40; s.state.shadow_level = capZero(s.state.shadow_level - 10); } else { s.resources.renom *= 0.70; s.state.shadow_level += 15; } }, log: "Le jeu d'espions est un art mortel aux conséquences imprévisibles." }
        ]
    },
    {
        id: "dip_alliance_scellee", title: "Le Pacte de l'Étoile",
        description: "Un seigneur local d'une colonie voisine propose de sceller une alliance par un mariage entre vos deux lignées.",
        repeatable: true, condition: (s) => Math.random() < 0.06 && s.resources.renom > 40,
        choices: [
            { label: "Accepter l'union (-35% Richesse, +45% Renom, +30% Espoir)", canAfford: (s) => s.resources.richesse > 10, effect: (s) => { s.resources.richesse *= 0.65; s.resources.renom *= 1.45; s.resources.espoir *= 1.30; }, log: "Les festivités ont uni les deux peuples sous une même bannière." },
            { label: "Refuser pour préserver votre sang (+20% Renom, -30% Espoir)", canAfford: (s) => s.resources.espoir > 10, effect: (s) => { s.resources.renom *= 1.20; s.resources.espoir *= 0.70; }, log: "L'orgueil a sauvé votre lignée, mais vous a laissé cruellement isolé." }
        ]
    },
    {
        id: "dip_orques_parlementer", title: "Le Message de la Griffe",
        description: "Un orque se présente sous un drapeau de trêve. Il propose de cesser les raids contre un tribut en bétail.",
        repeatable: true, condition: (s) => s.meta.current_age >= 2 && Math.random() < 0.08 && s.state.shadow_level > 30,
        choices: [
            { label: "Acheter la paix (-40% Richesse, -30% Renom, +15 Ombre)", canAfford: (s) => s.resources.richesse > 10, effect: (s) => { s.resources.richesse *= 0.60; s.resources.renom *= 0.70; s.state.shadow_level = clamp(s.state.shadow_level + 15, 0, 100); }, log: "Les raids cessent, mais vous financez votre propre destruction future." },
            { label: "Exécuter le monstre (+40% Renom, +20% Espoir, -20% Richesse)", canAfford: (s) => s.resources.richesse > 10, effect: (s) => { s.resources.renom *= 1.40; s.resources.espoir *= 1.20; s.resources.richesse *= 0.80; }, log: "La guerre totale est déclarée, mais les cœurs brûlent de courage." }
        ]
    },
    {
        id: "dip_sorcier_brun", title: "L'Ami des Bêtes",
        description: "Un homme vêtu de brun terreux, entouré d'oiseaux, traverse vos champs pour soigner la faune.",
        repeatable: true, condition: (s) => s.meta.current_age === 3 && Math.random() < 0.06, 
        choices: [
            { label: "L'aider dans sa tâche (-15% Richesse, +30% Espoir, +25% Savoir)", canAfford: (s) => s.resources.richesse > 10, effect: (s) => { s.resources.richesse *= 0.85; s.resources.espoir *= 1.30; s.resources.savoir *= 1.25; }, log: "La nature semble s'épanouir autour de vous, bénie par Radagast." },
            { label: "Le repousser comme un fou (-20% Espoir)", canAfford: (s) => s.resources.espoir > 10, effect: (s) => { s.resources.espoir *= 0.80; }, log: "Les oiseaux ont fui et la terre semble un peu plus stérile cet automne." }
        ]
    },
    {
        id: "dip_nains_col_perdu", title: "Le Secret des Cimes",
        description: "Des Nains affirment avoir découvert de l'or, mais exigent votre aide militaire pour chasser les ogres.",
        repeatable: true, condition: (s) => s.meta.current_age >= 2 && Math.random() < 0.08 && s.population.hommes > 20,
        choices: [
            { label: "Fournir des soldats (-20% Hommes, +60% Richesse, +20% Renom)", canAfford: (s) => s.population.hommes > 10, effect: (s) => { s.population.hommes *= 0.80; s.resources.richesse *= 1.60; s.resources.renom *= 1.20; }, log: "La bataille fut sanglante, mais les chariots d'or remplissent vos cales." },
            { label: "Laisser le trésor aux monstres (-25% Renom)", canAfford: (s) => s.resources.renom > 10, effect: (s) => { s.resources.renom *= 0.75; }, log: "Les Nains vous méprisent pour votre lâcheté et ferment leurs comptoirs." }
        ]
    },
    {
        id: "dip_desertion_frontiere", title: "La Peur du Guetteur",
        description: "Des soldats d'une garnison humaine voisine désertent et demandent l'asile, terrifiés par des bruits souterrains.",
        repeatable: true, condition: (s) => s.meta.current_age >= 2 && Math.random() < 0.08 && s.state.shadow_level > 40,
        choices: [
            { label: "Les intégrer comme manœuvres (+15% Hommes, -25% Espoir)", canAfford: (s) => s.resources.espoir > 10, effect: (s) => { s.population.hommes *= 1.15; s.resources.espoir *= 0.75; }, log: "Des bras supplémentaires, mais leur terreur se transmet." },
            { label: "Les renvoyer à leurs postes (-30% Renom, +10 Ombre)", canAfford: (s) => s.resources.renom > 10, effect: (s) => { s.resources.renom *= 0.70; s.state.shadow_level = clamp(s.state.shadow_level + 10, 0, 100); }, log: "Ils ont fui plus loin, laissant la frontière sans défense." }
        ]
    },
    {
        id: "dip_herboriste_vallee", title: "La Sagesse d'Imladris",
        description: "Une herboriste elfe formée à Fondcombe propose d'ouvrir une maison de guérison, si vous fournissez les pierres.",
        repeatable: true, condition: (s) => s.meta.current_age === 3 && Math.random() < 0.06,
        choices: [
            { label: "Bâtir le dispensaire (-30% Richesse, +40% Espoir, +25% Savoir)", canAfford: (s) => s.resources.richesse > 10, effect: (s) => { s.resources.richesse *= 0.70; s.resources.espoir *= 1.40; s.resources.savoir *= 1.25; }, log: "Les malades guérissent plus vite et bénissent la science d'Elrond." },
            { label: "Économiser vos pierres (-15% Espoir)", canAfford: (s) => s.resources.espoir > 10, effect: (s) => { s.resources.espoir *= 0.85; }, log: "Les blessés souffrent en silence dans des cahutes insalubres." }
        ]
    },
    {
        id: "dip_marchand_dorwinion", title: "Le Vin du Sud",
        description: "Un négociant du Dorwinion apporte un vin capiteux qui plonge ceux qui le boivent dans des sommeils enchantés.",
        repeatable: true, condition: (s) => s.meta.current_age >= 2 && Math.random() < 0.08,
        choices: [
            { label: "Acheter la cargaison pour les fêtes (-25% Richesse, +35% Espoir)", canAfford: (s) => s.resources.richesse > 10, effect: (s) => { s.resources.richesse *= 0.75; s.resources.espoir *= 1.35; }, log: "Le vin a apporté l'allégresse, bien que les réveils soient lourds." },
            { label: "Refuser ce luxe inutile (+15% Richesse, -20% Espoir)", canAfford: (s) => s.resources.espoir > 10, effect: (s) => { s.resources.richesse *= 1.15; s.resources.espoir *= 0.80; }, log: "La sobriété maintient la discipline, mais l'ambiance est austère." }
        ]
    },
    {
        id: "dip_elfes_mutiles", title: "Les Rescapés de la Guerre",
        description: "Des Elfes blessés demandent à se reposer quelques années dans vos sanctuaires sacrés.",
        repeatable: true, condition: (s) => Math.random() < 0.08 && s.resources.espoir > 50,
        choices: [
            { label: "Ouvrir vos lieux saints (-25% Espoir, +10% Elfes, +40% Savoir)", canAfford: (s) => s.resources.espoir > 10, effect: (s) => { s.resources.espoir *= 0.75; s.population.elfes *= 1.10; s.resources.savoir *= 1.40; }, log: "Leurs traumatismes pèsent sur le moral, mais leur savoir est immense." },
            { label: "Préserver la paix des sanctuaires (-25% Renom, -15% Savoir)", canAfford: (s) => s.resources.renom > 10, effect: (s) => { s.resources.renom *= 0.75; s.resources.savoir *= 0.85; }, log: "Les Elfes ont continué leur douloureuse marche vers les Havres Gris." }
        ]
    },
    {
        id: "dip_serment_jeune_seigneur", title: "Le Serment du Jeune Loup",
        description: "Un jeune noble d'une principauté voisine vient prêter serment d'amitié, offrant son épée.",
        repeatable: true, condition: (s) => Math.random() < 0.06 && s.resources.renom > 30,
        choices: [
            { label: "Accepter son allégeance (+10% Hommes, +30% Renom)", canAfford: () => true, effect: (s) => { s.population.hommes *= 1.10; s.resources.renom *= 1.30; }, log: "Le jeune homme est fier et ses troupes renforcent vos patrouilles." },
            { label: "Le rejeter par prudence (-20% Renom)", canAfford: (s) => s.resources.renom > 10, effect: (s) => { s.resources.renom *= 0.80; }, log: "Il est reparti blessé dans son honneur, devenant un rival dangereux." }
        ]
    },
    {
        id: "dip_pelerinage_dunand", title: "Les Exilés du Dunland",
        description: "Des clans farouches du Dunland traversent vos terres en pèlerinage. Ils promettent de ne rien piller si on les laisse en paix.",
        repeatable: true, condition: (s) => s.meta.current_age >= 2 && Math.random() < 0.08,
        choices: [
            { label: "Accorder le libre passage (+20% Renom, -15% Espoir)", canAfford: (s) => s.resources.espoir > 10, effect: (s) => { s.resources.renom *= 1.20; s.resources.espoir *= 0.85; }, log: "Ils ont respecté leur parole, mais leur vue terrifie vos paysans." },
            { label: "Les attaquer comme des pillards (-10% Hommes, +30% Richesse, +15 Ombre)", canAfford: (s) => s.population.hommes > 10, effect: (s) => { s.population.hommes *= 0.90; s.resources.richesse *= 1.30; s.state.shadow_level = clamp(s.state.shadow_level + 15, 0, 100); }, log: "Vous avez pris leur bétail, mais allumé une vendetta sanglante." }
        ]
    },
    {
        id: "dip_fete_solstice_inter", title: "Le Feu des Deux Peuples",
        description: "Les communautés d'Hommes et d'Elfes de votre domaine proposent d'organiser une grande foire commune.",
        repeatable: true, condition: (s) => Math.random() < 0.05 && s.population.elfes > 5 && s.population.hommes > 50,
        choices: [
            { label: "Financer la foire (-30% Richesse, +45% Espoir, +30% Renom)", canAfford: (s) => s.resources.richesse > 10, effect: (s) => { s.resources.richesse *= 0.70; s.resources.espoir *= 1.45; s.resources.renom *= 1.30; }, log: "L'harmonie entre les deux races brille comme un phare contre l'Ombre." },
            { label: "Annuler par peur des troubles (+15% Richesse, -35% Espoir)", canAfford: (s) => s.resources.espoir > 10, effect: (s) => { s.resources.richesse *= 1.15; s.resources.espoir *= 0.65; }, log: "La méfiance s'est installée entre les quartiers du domaine." }
        ]
    };
// ==========================================
    // 3. CRISES SYSTÉMIQUES (Répétables)
    // Sévérité élevée (20% à 50% de pertes). Permet de faire redescendre l'Ombre.
    // ==========================================
    {
        id: "cri_01_culte_noir", title: "Les Autels de Sang",
        description: "L'Ombre étouffe le domaine. Des sentinelles découvrent que des villageois sacrifient secrètement du bétail à des divinités sombres.",
        repeatable: true, condition: (s) => s.state.shadow_level >= 70,
        choices: [
            { label: "Purger le culte par le fer (-15% Hommes, -15 Ombre)", canAfford: (s) => s.population.hommes > 10, effect: (s) => { s.population.hommes *= 0.85; s.state.shadow_level = capZero(s.state.shadow_level - 15); }, log: "Le sang a coulé dans la clairière. Les idoles sont brisées." },
            { label: "Tolérer par peur d'une révolte (-30% Espoir, +10 Ombre)", canAfford: (s) => s.resources.espoir > 10, effect: (s) => { s.resources.espoir *= 0.70; s.state.shadow_level = clamp(s.state.shadow_level + 10, 0, 100); }, log: "Les murmures des adeptes s'entendent désormais dans les rues." }
        ]
    },
    {
        id: "cri_02_mutinerie", title: "Le Pain de la Colère",
        description: "La garnison de votre avant-poste, affamée et terrifiée par les ténèbres, refuse d'obéir aux ordres et pille les réserves.",
        repeatable: true, condition: (s) => s.state.shadow_level >= 72,
        choices: [
            { label: "Acheter leur loyauté (-35% Richesse, -10 Ombre)", canAfford: (s) => s.resources.richesse > 10, effect: (s) => { s.resources.richesse *= 0.65; s.state.shadow_level = capZero(s.state.shadow_level - 10); }, log: "L'or a calmé les esprits, mais la discipline est morte." },
            { label: "Décimer les meneurs (-20% Hommes, -30% Espoir)", canAfford: (s) => s.population.hommes > 10, effect: (s) => { s.population.hommes *= 0.80; s.resources.espoir *= 0.70; }, log: "Les corps pendent aux remparts. L'obéissance est revenue, glaciale." },
            // 🆕 3ème choix de crise : Le pari charismatique
            { label: "Tenter un discours passionné (50% de réussite)", canAfford: () => true, effect: (s) => { if(Math.random() < 0.5) { s.resources.renom *= 1.40; s.state.shadow_level = capZero(s.state.shadow_level - 15); } else { s.resources.richesse *= 0.50; s.resources.espoir *= 0.50; s.state.shadow_level = clamp(s.state.shadow_level + 5, 0, 100); } }, log: "Vos mots ont été joués aux dés face à une foule en colère." }
        ]
    },
    {
        id: "cri_03_famine_noire", title: "La Terre Stérile",
        description: "Vos sols, corrompus par une brume fétide, ne produisent plus rien. Les enfants pleurent de faim.",
        repeatable: true, condition: (s) => s.state.shadow_level >= 75,
        choices: [
            { label: "Ouvrir les silos des nobles (-40% Richesse, +20% Espoir, -5 Ombre)", canAfford: (s) => s.resources.richesse > 10, effect: (s) => { s.resources.richesse *= 0.60; s.resources.espoir *= 1.20; s.state.shadow_level = capZero(s.state.shadow_level - 5); }, log: "Vous sauvez des vies au prix de la colère des puissants." },
            { label: "Laisser la faim purger les faibles (-25% Hommes, -35% Espoir, +15 Ombre)", canAfford: (s) => s.population.hommes > 10, effect: (s) => { s.population.hommes *= 0.75; s.resources.espoir *= 0.65; s.state.shadow_level = clamp(s.state.shadow_level + 15, 0, 100); }, log: "Les corbeaux s'engraissent sur vos terres." }
        ]
    },
    {
        id: "cri_04_poison_puits", title: "L'Eau de Cendres",
        description: "Le puits de la cité a été empoisonné. Ceux qui en boivent meurent dans d'atroces convulsions.",
        repeatable: true, condition: (s) => s.state.shadow_level >= 70 && s.population.hommes > 20,
        choices: [
            { label: "Faire venir des purificateurs (-30% Savoir, -10 Ombre)", canAfford: (s) => s.resources.savoir > 10, effect: (s) => { s.resources.savoir *= 0.70; s.state.shadow_level = capZero(s.state.shadow_level - 10); }, log: "Les incantations ont lavé la pierre, mais vos érudits sont épuisés." },
            { label: "Condamner le quartier infesté (-20% Hommes, -25% Espoir)", canAfford: (s) => s.population.hommes > 10, effect: (s) => { s.population.hommes *= 0.80; s.resources.espoir *= 0.75; }, log: "Vous murez des vivants avec les morts. L'angoisse est totale." }
        ]
    },
    {
        id: "cri_05_paranoia", title: "La Chasse aux Traîtres",
        description: "La paranoïa ronge les esprits. Les voisins s'accusent mutuellement d'être des espions de l'Ennemi.",
        repeatable: true, condition: (s) => s.state.shadow_level >= 74,
        choices: [
            { label: "Autoriser les tribunaux populaires (-35% Espoir, -15 Ombre)", canAfford: (s) => s.resources.espoir > 10, effect: (s) => { s.resources.espoir *= 0.65; s.state.shadow_level = capZero(s.state.shadow_level - 15); }, log: "Les dénonciations calment la foule, mais le tissu social est détruit." },
            { label: "Interdire les lynchages (-35% Renom, +10 Ombre)", canAfford: (s) => s.resources.renom > 10, effect: (s) => { s.resources.renom *= 0.65; s.state.shadow_level = clamp(s.state.shadow_level + 10, 0, 100); }, log: "Vous protégez les innocents, mais le peuple vous accuse de trahison." }
        ]
    },
    {
        id: "cri_06_raids_orques", title: "Le Ciel de Fer",
        description: "Profitant de votre faiblesse, des orques passent vos palissades et brûlent les faubourgs.",
        repeatable: true, condition: (s) => s.state.shadow_level >= 75 && s.population.hommes > 30,
        choices: [
            { label: "Sacrifier l'arrière-garde (-25% Hommes, +25% Renom)", canAfford: (s) => s.population.hommes > 10, effect: (s) => { s.population.hommes *= 0.75; s.resources.renom *= 1.25; }, log: "La forteresse tient, mais le sacrifice de vos braves pèse sur vous." },
            { label: "Payer une rançon en métaux (-45% Richesse, +15 Ombre)", canAfford: (s) => s.resources.richesse > 10, effect: (s) => { s.resources.richesse *= 0.55; s.state.shadow_level = clamp(s.state.shadow_level + 15, 0, 100); }, log: "Les monstres repartent chargés d'or, ricanant de votre impuissance." }
        ]
    },
    {
        id: "cri_07_desertion_masse", title: "La Grande Fuite",
        description: "Terrifiées, des familles entières plient bagage pour fuir vers l'Ouest.",
        repeatable: true, condition: (s) => s.state.shadow_level >= 70 && s.population.hommes > 40,
        choices: [
            { label: "Fermer les portes par la force (-30% Espoir, +10 Ombre)", canAfford: (s) => s.resources.espoir > 10, effect: (s) => { s.resources.espoir *= 0.70; s.state.shadow_level = clamp(s.state.shadow_level + 10, 0, 100); }, log: "Vous gardez vos bras pour le travail, mais votre domaine est une prison." },
            { label: "Les laisser partir (-30% Hommes, -25% Renom)", canAfford: (s) => s.population.hommes > 10, effect: (s) => { s.population.hommes *= 0.70; s.resources.renom *= 0.75; }, log: "Les maisons vides se délabrent sous le vent gris." }
        ]
    },
    {
        id: "cri_08_corruption_elite", title: "L'Or de la Honte",
        description: "Vos conseillers les plus éminents ont été achetés. Ils sabotent discrètement vos défenses.",
        repeatable: true, condition: (s) => s.state.shadow_level >= 72 && s.resources.savoir > 30,
        choices: [
            { label: "Exécuter votre cour (-40% Savoir, +35% Renom, -20 Ombre)", canAfford: (s) => s.resources.savoir > 10, effect: (s) => { s.resources.savoir *= 0.60; s.resources.renom *= 1.35; s.state.shadow_level = capZero(s.state.shadow_level - 20); }, log: "Le gouvernement est décapité, mais la trahison est stoppée." },
            { label: "Faire semblant de ne rien voir (-35% Espoir, +15 Ombre)", canAfford: (s) => s.resources.espoir > 10, effect: (s) => { s.resources.espoir *= 0.65; s.state.shadow_level = clamp(s.state.shadow_level + 15, 0, 100); }, log: "L'élite festoie pendant que votre pouvoir pourrit." }
        ]
    },
    {
        id: "cri_09_spectre_visite", title: "Le Souffle Noir",
        description: "Une silhouette montée sur un cheval noir s'arrête devant vos portes. C'est un spectre de l'Anneau.",
        repeatable: true, condition: (s) => s.state.shadow_level >= 78,
        choices: [
            { label: "Lui livrer des otages (-45% Renom, +20 Ombre)", canAfford: (s) => s.resources.renom > 10, effect: (s) => { s.resources.renom *= 0.55; s.state.shadow_level = clamp(s.state.shadow_level + 20, 0, 100); }, log: "Vous avez sauvé votre peau au prix de votre âme." },
            { label: "Le repousser avec des reliques (-40% Savoir, -20% Hommes, -10 Ombre)", canAfford: (s) => s.resources.savoir > 10 && s.population.hommes > 10, effect: (s) => { s.resources.savoir *= 0.60; s.population.hommes *= 0.80; s.state.shadow_level = capZero(s.state.shadow_level - 10); }, log: "Le monstre recule, mais son cri a brisé des cœurs." }
        ]
    },
    {
        id: "cri_10_folie_gardien", title: "Le Trône de Cendres",
        description: "Le désespoir vous gagne. Votre peuple panique en voyant votre regard s'égarer dans le vide.",
        repeatable: true, condition: (s) => s.state.shadow_level >= 80,
        choices: [
            { label: "S'enfermer pour méditer (-45% Renom, +25% Savoir)", canAfford: (s) => s.resources.renom > 10, effect: (s) => { s.resources.renom *= 0.55; s.resources.savoir *= 1.25; }, log: "Votre absence affaiblit l'État, mais préserve votre lucidité." },
            { label: "Se livrer aux excès (-45% Espoir, +20 Ombre)", canAfford: (s) => s.resources.espoir > 10, effect: (s) => { s.resources.espoir *= 0.55; s.state.shadow_level = clamp(s.state.shadow_level + 20, 0, 100); }, log: "Vous sombrez ouvertement dans la déchéance." }
        ]
    },
    {
        id: "cri_11_incendie_archives", title: "Les Cendres du Savoir",
        description: "Un incendie allumé par des sbires de l'Ombre ravage votre bibliothèque ancestrale.",
        repeatable: true, condition: (s) => s.state.shadow_level >= 70 && s.resources.savoir > 50,
        choices: [
            { label: "Sauver les parchemins (-15% Hommes, -25% Savoir)", canAfford: (s) => s.population.hommes > 10, effect: (s) => { s.population.hommes *= 0.85; s.resources.savoir *= 0.75; }, log: "Quelques secrets sont sauvés au prix de terribles brûlures." },
            { label: "Sécuriser l'or plutôt que les livres (-55% Savoir, +35% Richesse)", canAfford: (s) => s.resources.savoir > 10, effect: (s) => { s.resources.savoir *= 0.45; s.resources.richesse *= 1.35; }, log: "Le passé est mort. Vos coffres sont pleins, mais vous êtes aveugles." }
        ]
    },
    {
        id: "cri_12_betes_enragees", title: "La Rage des Bois",
        description: "Les loups et les ours, rendus fous par l'influence du Nord, attaquent les bergers et les fermes isolées.",
        repeatable: true, condition: (s) => s.state.shadow_level >= 72,
        choices: [
            { label: "Abandonner l'élevage extérieur (-35% Richesse, -20% Espoir)", canAfford: (s) => s.resources.richesse > 10, effect: (s) => { s.resources.richesse *= 0.65; s.resources.espoir *= 0.80; }, log: "Le bétail est parqué à l'intérieur, les rations diminuent cruellement." },
            { label: "Forcer les bergers à s'armer (-20% Hommes, +20% Renom)", canAfford: (s) => s.population.hommes > 10, effect: (s) => { s.population.hommes *= 0.80; s.resources.renom *= 1.20; }, log: "Les pertes sont lourdes, mais la frontière agricole refuse de plier." }
        ]
    },
    {
        id: "cri_13_blocus_marchand", title: "Les Routes Mortes",
        description: "Les royaumes voisins décrètent un blocus commercial total par peur de la contagion de l'Ombre. Plus aucun marchand ne passe.",
        repeatable: true, condition: (s) => s.state.shadow_level >= 75 && s.resources.richesse > 40,
        choices: [
            { label: "Payer des contrebandiers (-45% Richesse, +15 Ombre)", canAfford: (s) => s.resources.richesse > 10, effect: (s) => { s.resources.richesse *= 0.55; s.state.shadow_level = clamp(s.state.shadow_level + 15, 0, 100); }, log: "Les vivres arrivent par des réseaux clandestins fétides." },
            { label: "Accepter l'autarcie forcée (-35% Espoir, -30% Richesse)", canAfford: (s) => s.resources.espoir > 10, effect: (s) => { s.resources.espoir *= 0.65; s.resources.richesse *= 0.70; }, log: "Le domaine s'appauvrit et s'isole du monde libre." }
        ]
    },
    {
        id: "cri_14_monstre_mines", title: "La Chose des Profondeurs",
        description: "Vos mineurs ont réveillé une créature rampante qui massacre les ouvriers dans l'obscurité.",
        repeatable: true, condition: (s) => s.state.shadow_level >= 74,
        choices: [
            { label: "Sceller la mine définitivement (-50% Richesse, -10 Ombre)", canAfford: (s) => s.resources.richesse > 10, effect: (s) => { s.resources.richesse *= 0.50; s.state.shadow_level = capZero(s.state.shadow_level - 10); }, log: "Vous murez le monstre au prix de vos revenus miniers." },
            { label: "Envoyer des soldats (-20% Hommes, +35% Renom)", canAfford: (s) => s.population.hommes > 10, effect: (s) => { s.population.hommes *= 0.80; s.resources.renom *= 1.35; }, log: "Le sang inonde les tunnels. La créature est tuée." },
            { label: "Faire appel à des mercenaires nains (Risqué)", canAfford: () => true, effect: (s) => { if(Math.random() < 0.6) { s.resources.richesse *= 0.70; s.state.shadow_level = capZero(s.state.shadow_level - 15); } else { s.resources.richesse *= 0.50; s.resources.renom *= 0.70; } }, log: "Les Nains demandent un paiement d'avance, sans garantie de retour." }
        ]
    },
    {
        id: "cri_15_temple_profane", title: "Le Sanctuaire Souillé",
        description: "Le grand temple a été vandalisé. Des symboles de haine recouvrent les murs sacrés.",
        repeatable: true, condition: (s) => s.state.shadow_level >= 70 && s.resources.espoir > 40,
        choices: [
            { label: "Financer une purification (-35% Richesse, -25% Espoir, -15 Ombre)", canAfford: (s) => s.resources.richesse > 10, effect: (s) => { s.resources.richesse *= 0.65; s.resources.espoir *= 0.75; s.state.shadow_level = capZero(s.state.shadow_level - 15); }, log: "Les rituels lavent l'affront, mais les cœurs restent ébranlés." },
            { label: "Laisser le sanctuaire en ruines (-45% Espoir, +15 Ombre)", canAfford: (s) => s.resources.espoir > 10, effect: (s) => { s.resources.espoir *= 0.55; s.state.shadow_level = clamp(s.state.shadow_level + 15, 0, 100); }, log: "Le phare de votre foi s'éteint, laissant le domaine dans le noir." }
        ]
    },
    {
        id: "cri_16_enfants_perdus", title: "Les Disparus de l'Automne",
        description: "Des enfants ont disparu des lisières des villages, enlevés par des silhouettes encapuchonnées.",
        repeatable: true, condition: (s) => s.state.shadow_level >= 73,
        choices: [
            { label: "Traquer les ravisseuses (-20% Hommes, +35% Renom)", canAfford: (s) => s.population.hommes > 10, effect: (s) => { s.population.hommes *= 0.80; s.resources.renom *= 1.35; }, log: "Une loge sombre est détruite, mais certains enfants manquent à l'appel." },
            { label: "Instaurer un couvre-feu strict (-30% Espoir, +5 Ombre)", canAfford: (s) => s.resources.espoir > 10, effect: (s) => { s.resources.espoir *= 0.70; s.state.shadow_level = clamp(s.state.shadow_level + 5, 0, 100); }, log: "La terreur paralyse les chaumières. On s'enferme dès le coucher du soleil." }
        ]
    },
    {
        id: "cri_17_or_maudit", title: "La Fièvre Sombre",
        description: "Un coffre d'or volé provoque une folie de cupidité chez vos intendants. Ils s'entretuent dans la salle du conseil.",
        repeatable: true, condition: (s) => s.state.shadow_level >= 76 && s.resources.richesse > 50,
        choices: [
            { label: "Jeter le trésor dans le fleuve (-45% Richesse, -10 Ombre, +25% Espoir)", canAfford: (s) => s.resources.richesse > 10, effect: (s) => { s.resources.richesse *= 0.55; s.state.shadow_level = capZero(s.state.shadow_level - 10); s.resources.espoir *= 1.25; }, log: "Le sacrifice de l'or guérit la folie des esprits." },
            { label: "Garder le trésor (+80% Richesse, +30 Ombre, -40% Espoir)", canAfford: (s) => s.resources.espoir > 10, effect: (s) => { s.resources.richesse *= 1.80; s.state.shadow_level = clamp(s.state.shadow_level + 30, 0, 100); s.resources.espoir *= 0.60; }, log: "L'or brille, mais la paranoïa s'installe à votre table." }
        ]
    },
    {
        id: "cri_18_maladie_bétail_noir", title: "La Lèpre des Étables",
        description: "Vos vaches crèvent touchées par une gangrène noire qui liquéfie la chair.",
        repeatable: true, condition: (s) => s.state.shadow_level >= 72,
        choices: [
            { label: "Brûler les fermes (-40% Richesse, -5 Ombre)", canAfford: (s) => s.resources.richesse > 10, effect: (s) => { s.resources.richesse *= 0.60; s.state.shadow_level = capZero(s.state.shadow_level - 5); }, log: "Le feu assainit la terre, ruinant vos économies." },
            { label: "Laisser le mal s'éteindre seul (-15% Hommes, -35% Espoir, +10 Ombre)", canAfford: (s) => s.population.hommes > 10, effect: (s) => { s.population.hommes *= 0.85; s.resources.espoir *= 0.65; s.state.shadow_level = clamp(s.state.shadow_level + 10, 0, 100); }, log: "La puanteur de la charogne empeste le domaine." }
        ]
    },
    {
        id: "cri_19_ambassade_fausse", title: "L'Émissaire de Panique",
        description: "Un homme se présente comme messager divin, mais ses paroles distillent le découragement et le renoncement.",
        repeatable: true, condition: (s) => s.state.shadow_level >= 70,
        choices: [
            { label: "L'exécuter pour hérésie (+25% Renom, -25% Espoir)", canAfford: (s) => s.resources.espoir > 10, effect: (s) => { s.resources.espoir *= 0.75; s.resources.renom *= 1.25; }, log: "Vous tuez le menteur, mais ses paroles hantent les esprits." },
            { label: "Publier ses décrets de défaite (-45% Espoir, +20 Ombre)", canAfford: (s) => s.resources.espoir > 10, effect: (s) => { s.resources.espoir *= 0.55; s.state.shadow_level = clamp(s.state.shadow_level + 20, 0, 100); }, log: "Le découragement brise les dernières volontés de résistance." }
        ]
    },
    {
        id: "cri_20_pillage_reliques", title: "Le Vol du Passé",
        description: "Des voleurs profanent les tombes de vos ancêtres pour y dérober des épées antiques, les revendant aux forces de l'Ombre.",
        repeatable: true, condition: (s) => s.state.shadow_level >= 74 && s.resources.savoir > 40,
        choices: [
            { label: "Traquer les receleurs (-25% Richesse, +25% Renom)", canAfford: (s) => s.resources.richesse > 10, effect: (s) => { s.resources.richesse *= 0.75; s.resources.renom *= 1.25; }, log: "Vous récupérez les reliques, mais l'affront reste entier." },
            { label: "Laisser faire (-40% Savoir, +10 Ombre)", canAfford: (s) => s.resources.savoir > 10, effect: (s) => { s.resources.savoir *= 0.60; s.state.shadow_level = clamp(s.state.shadow_level + 10, 0, 100); }, log: "Le passé est pillé. Votre domaine perd son identité et sa magie." }
        ]
    },
    {
        id: "cri_21_orques_otages", title: "Les Fils Captifs",
        description: "Des pillards ont capturé les enfants de vos généraux et exigent l'ouverture de vos portes en pleine nuit.",
        repeatable: true, condition: (s) => s.state.shadow_level >= 77 && s.population.hommes > 20,
        choices: [
            { label: "Refuser et attaquer (-20% Hommes, -35% Espoir, +60% Renom)", canAfford: (s) => s.population.hommes > 10, effect: (s) => { s.population.hommes *= 0.80; s.resources.espoir *= 0.65; s.resources.renom *= 1.60; }, log: "Les otages meurent, mais l'honneur militaire et le bastion sont saufs." },
            { label: "Livrer le bastion ouest (-45% Richesse, -40% Renom, +25 Ombre)", canAfford: (s) => s.resources.richesse > 10, effect: (s) => { s.resources.richesse *= 0.55; s.resources.renom *= 0.60; s.state.shadow_level = clamp(s.state.shadow_level + 25, 0, 100); }, log: "Vous sauvez les enfants au prix d'une brèche stratégique majeure." }
        ]
    },
    {
        id: "cri_22_mutinerie_ouvriers", title: "La Révolte des Pioches",
        description: "Les ouvriers de vos carrières cessent le travail, poussés à bout par les cadences et la peur de la nuit.",
        repeatable: true, condition: (s) => s.state.shadow_level >= 71,
        choices: [
            { label: "Augmenter drastiquement les rations (-35% Richesse, +20% Espoir)", canAfford: (s) => s.resources.richesse > 10, effect: (s) => { s.resources.richesse *= 0.65; s.resources.espoir *= 1.20; }, log: "Le travail reprend, mais vos finances sont exsangues." },
            { label: "Briser la grève par la force (-15% Hommes, -25% Espoir, +10 Ombre)", canAfford: (s) => s.population.hommes > 10, effect: (s) => { s.population.hommes *= 0.85; s.resources.espoir *= 0.75; s.state.shadow_level = clamp(s.state.shadow_level + 10, 0, 100); }, log: "Les fouets ont parlé. La productivité reprend dans une rancœur sourde." }
        ]
    },
    {
        id: "cri_23_poison_esprit", title: "La Brume Folle",
        description: "Une brume violette plonge ceux qui la respirent dans une léthargie proche de la mort ou dans une folie meurtrière.",
        repeatable: true, condition: (s) => s.state.shadow_level >= 75,
        choices: [
            { label: "Acheter des masques filtres (-45% Richesse, +15% Espoir)", canAfford: (s) => s.resources.richesse > 10, effect: (s) => { s.resources.richesse *= 0.55; s.resources.espoir *= 1.15; }, log: "La technique protège votre population au prix fort." },
            { label: "Se calfeutrer et attendre (-20% Hommes, -25% Espoir)", canAfford: (s) => s.population.hommes > 10, effect: (s) => { s.population.hommes *= 0.80; s.resources.espoir *= 0.75; }, log: "La folie décime les faubourgs avant que le vent ne tourne." }
        ]
    },
    {
        id: "cri_24_desertion_gardes", title: "Les Murs sans Guetteurs",
        description: "Vos sentinelles abandonnent leurs postes, terrifiées par des voix chuchotant dans l'obscurité.",
        repeatable: true, condition: (s) => s.state.shadow_level >= 73,
        choices: [
            { label: "Allumer des grands feux de garde (-35% Richesse, +15% Renom)", canAfford: (s) => s.resources.richesse > 10, effect: (s) => { s.resources.richesse *= 0.65; s.resources.renom *= 1.15; }, log: "Le domaine dépense des fortunes en huile pour repousser le Noir." },
            { label: "Punir les déserteurs de mort (-10% Hommes, -35% Espoir, +10 Ombre)", canAfford: (s) => s.population.hommes > 10, effect: (s) => { s.population.hommes *= 0.90; s.resources.espoir *= 0.65; s.state.shadow_level = clamp(s.state.shadow_level + 10, 0, 100); }, log: "La terreur de vos propres lois remplace la terreur de la nuit." }
        ]
    },
    {
        id: "cri_25_sombre_sommation", 
        // 🔴 ATTENTION VISUELLE : Format spécifique pour le Game Over.
        title: "💀 L'ULTIME SOMMATION (GAME OVER) 💀",
        description: "L'Ombre a atteint son zénith. Les portes du domaine ploient sous une force invisible... Un héraut de la Nuit exige votre capitulation absolue sous peine d'annihilation totale.",
        repeatable: true, condition: (s) => s.state.shadow_level >= 80,
        choices: [
            { 
                label: "Brûler le messager et combattre pour la Lumière (+80% Renom, +40% Espoir, -30% Richesse)", 
                canAfford: (s) => s.resources.richesse > 10, 
                effect: (s) => { s.resources.richesse *= 0.70; s.resources.renom *= 1.80; s.resources.espoir *= 1.40; s.state.shadow_level -= 15; }, 
                log: "Vous choisissez de mourir debout. L'espoir brille d'un éclat désespéré, repoussant légèrement les ténèbres." 
            },
            { 
                label: "Accepter la vassalité (Met fin à la partie de manière tragique)", 
                canAfford: () => true, 
                effect: (s) => { 
                    s.state.is_victory = true; // Gèle la boucle temporelle
                    s.state.shadow_level = 100; // Remplit la barre visuellement
                    // Injection dans le DOM pour afficher l'écran de fin version sombre
                    setTimeout(() => {
                        const vModal = document.getElementById('victory-modal');
                        if (vModal) {
                            vModal.style.background = 'rgba(20, 0, 0, 0.98)';
                            document.getElementById('victory-title').textContent = "LE DOMAINE EST TOMBÉ";
                            document.getElementById('victory-title').style.color = "#c0392b";
                            document.getElementById('victory-desc').textContent = "Vous avez plié le genou devant l'Ombre. Votre peuple vivra dans les chaînes, et votre nom sera maudit à travers les Âges.";
                            const btn = document.getElementById('btn-prestige');
                            if(btn) btn.textContent = "Recommencer dans la Honte";
                            vModal.style.display = 'flex';
                        }
                    }, 500);
                }, 
                log: "Vous tendez les clés du domaine. Votre histoire s'achève dans les ténèbres." 
            }
        ]
    };
// ==========================================
    // 4. ÉVÉNEMENTS NARRATIFS UNIQUES (Âge 1)
    // Refonte : Conversion en % et suppression de l'event de fin auto.
    // ==========================================
    {
        id: "age1_01_reveil",
        title: "Les Cris de l'Éveil",
        description: "Votre peuple s'éveille dans un monde brut et sans soleil, sous un dôme d'étoiles glacées. La peur de l'inconnu paralyse les premiers clans.",
        repeatable: false,
        condition: (gameState) => gameState.meta.current_age === 1 && (gameState.state.current_year >= 1),
        choices: [
            {
                label: "Allumer les grands feux de joie (+30% Espoir, -10% Richesse)",
                canAfford: (s) => s.resources.richesse > 10,
                effect: (s) => {
                    s.resources.espoir *= 1.30;
                    s.resources.richesse *= 0.90;
                },
                log: "La lueur des brasiers a réchauffé les cœurs et uni les premiers Hommes."
            },
            {
                label: "S'enfoncer dans les grottes obscures (+20% Richesse, +10 Ombre, -15% Espoir)",
                canAfford: (s) => s.resources.espoir > 10,
                effect: (s) => {
                    s.resources.richesse *= 1.20;
                    s.state.shadow_level = clamp(s.state.shadow_level + 10, 0, 100);
                    s.resources.espoir *= 0.85;
                },
                log: "La sécurité de la pierre vous a protégés, mais la peur s'est installée."
            }
        ]
    },
    {
        id: "age1_02_chasseurs",
        title: "Les Flèches de l'Ombre",
        description: "Vos premiers éclaireurs découvrent des carcasses d'animaux mutilés dans les bois. Une présence malveillante rôde à vos lisières.",
        repeatable: false,
        condition: (gameState) => gameState.meta.current_age === 1 && (gameState.state.current_year >= 3),
        choices: [
            {
                label: "Forger les premières armes de bronze (-20% Richesse, +25% Renom)",
                canAfford: (s) => s.resources.richesse > 10,
                effect: (s) => {
                    s.resources.richesse *= 0.80;
                    s.resources.renom *= 1.25;
                },
                log: "Les hommes ont désormais de quoi se défendre face aux dangers du monde."
            },
            {
                label: "Se replier derrière des palissades (-15% Espoir)",
                canAfford: (s) => s.resources.espoir > 10,
                effect: (s) => {
                    s.resources.espoir *= 0.85;
                },
                log: "Vous avez cédé du terrain. Les murmures de la forêt se rapprochent."
            }
        ]
    },
    {
        id: "age1_03_orques_premiers",
        title: "La Vermine de fer",
        description: "Une patrouille de créatures hideuses aux yeux rouges, courbées sous le poids d'armures sombres, attaque un campement de pêcheurs. Ce sont des Orques.",
        repeatable: false,
        condition: (gameState) => gameState.meta.current_age === 1 && (gameState.state.current_year >= 5 && gameState.population.hommes > 20),
        choices: [
            {
                label: "Mener la contre-attaque (-10% Hommes, +30% Renom, +15% Espoir)",
                canAfford: (s) => s.population.hommes > 10,
                effect: (s) => {
                    s.population.hommes *= 0.90;
                    s.resources.renom *= 1.30;
                    s.resources.espoir *= 1.15;
                },
                log: "Le monstre a saigné. Votre peuple sait désormais que l'ennemi peut mourir."
            },
            {
                label: "Abandonner les rives du fleuve (-25% Richesse, -20% Espoir, +5 Ombre)",
                canAfford: (s) => s.resources.richesse > 10,
                effect: (s) => {
                    s.resources.richesse *= 0.75;
                    s.resources.espoir *= 0.80;
                    s.state.shadow_level = clamp(s.state.shadow_level + 5, 0, 100);
                },
                log: "La terre recule devant la cruauté de la vermine."
            }
        ]
    },
    {
        id: "age1_04_orome_passage",
        title: "Le Galop du Chasseur",
        description: "Un grondement de tonnerre secoue le ciel sans nuages. Un cavalier gigantesque sur un cheval blanc aux sabots de feu traverse vos plaines à la poursuite du mal.",
        repeatable: false,
        condition: (gameState) => gameState.meta.current_age === 1 && (gameState.state.current_year >= 8),
        choices: [
            {
                label: "Invoquer le nom d'Oromë (+40% Espoir, +20% Renom)",
                canAfford: () => true,
                effect: (s) => {
                    s.resources.espoir *= 1.40;
                    s.resources.renom *= 1.20;
                },
                log: "Le passage du Vala a balayé l'angoisse des nuits sombres."
            },
            {
                label: "Rester terré en silence (Aucun effet)",
                canAfford: () => true,
                effect: () => {},
                log: "Vous avez laissé la divinité passer sans oser lever les yeux."
            }
        ]
    },
    {
        id: "age1_05_langue_elfique",
        title: "Les Mots d'Argent",
        description: "Un émissaire des Elfes Gris s'arrête dans votre village et propose d'enseigner leur langue mélodieuse à vos enfants.",
        repeatable: false,
        condition: (gameState) => gameState.meta.current_age === 1 && (gameState.state.current_year >= 12 && gameState.resources.savoir > 20),
        choices: [
            {
                label: "Accepter leur enseignement (+45% Savoir, +15% Renom)",
                canAfford: () => true,
                effect: (s) => {
                    s.resources.savoir *= 1.45;
                    s.resources.renom *= 1.15;
                },
                log: "Vos enfants parlent désormais la langue des étoiles. Les ponts sont jetés."
            },
            {
                label: "Garder les parlers des Hommes (+25% Espoir, -15% Renom)",
                canAfford: (s) => s.resources.renom > 10,
                effect: (s) => {
                    s.resources.espoir *= 1.25;
                    s.resources.renom *= 0.85;
                },
                log: "Vous préservez vos coutumes, au prix d'un isolement culturel grandissant."
            }
        ]
    },
    {
        id: "age1_06_loup_angband",
        title: "La Gueule du Nord",
        description: "Un loup d'une taille monstrueuse, échappé des fosses d'Angband, s'installe sur la colline sacrée et hurle chaque nuit.",
        repeatable: false,
        condition: (gameState) => gameState.meta.current_age === 1 && (gameState.state.current_year >= 15 && gameState.resources.renom > 10),
        choices: [
            {
                label: "Envoyer vos meilleurs guerriers (-15% Hommes, +45% Renom)",
                canAfford: (s) => s.population.hommes > 10,
                effect: (s) => {
                    s.population.hommes *= 0.85;
                    s.resources.renom *= 1.45;
                },
                log: "La bête a été percée de lances. Sa tête orne désormais vos remparts."
            },
            {
                label: "Lui offrir du bétail en sacrifice (-30% Richesse, +15 Ombre)",
                canAfford: (s) => s.resources.richesse > 10,
                effect: (s) => {
                    s.resources.richesse *= 0.70;
                    s.state.shadow_level = clamp(s.state.shadow_level + 15, 0, 100);
                },
                log: "Vous achetez une paix honteuse. L'Ombre s'engraisse de votre lâcheté."
            },
            {
                label: "Tendre un piège complexe (Risqué)",
                canAfford: () => true,
                effect: (s) => {
                    if (Math.random() < 0.4) {
                        s.resources.renom *= 1.50;
                        s.resources.savoir *= 1.20;
                    } else {
                        s.population.hommes *= 0.70;
                        s.resources.espoir *= 0.80;
                    }
                },
                log: "Le piège s'est refermé. Le résultat fut sanglant."
            }
        ]
    },
    {
        id: "age1_07_noldor_exil",
        title: "Les Princes Couronnés",
        description: "Des seigneurs Elfes fiers et magnifiques, portant des joyaux d'une lumière insoutenable, arrivent du Nord. Ce sont les Noldor en exil.",
        repeatable: false,
        condition: (gameState) => gameState.meta.current_age === 1 && (gameState.state.current_year >= 20),
        choices: [
            {
                label: "Leur jurer amitié et soutien (+60% Renom, +40% Savoir, -20% Richesse)",
                canAfford: (s) => s.resources.richesse > 10,
                effect: (s) => {
                    s.resources.renom *= 1.60;
                    s.resources.savoir *= 1.40;
                    s.resources.richesse *= 0.80;
                },
                log: "Vous marchez dans l'ombre de géants. Leur gloire vous éclaire et vous condamne."
            },
            {
                label: "Refuser de vous mêler de leurs guerres (+30% Espoir, -30% Renom)",
                canAfford: (s) => s.resources.renom > 10,
                effect: (s) => {
                    s.resources.espoir *= 1.30;
                    s.resources.renom *= 0.70;
                },
                log: "Les rois elfes vous ignorent désormais, vous laissant à votre condition de mortels."
            }
        ]
    },
    {
        id: "age1_08_forges_lecon",
        title: "Le Secret de l'Acier",
        description: "Des forgerons Noldor acceptent de dévoiler les secrets de la trempe de l'acier en échange d'une livraison massive de charbon de bois.",
        repeatable: false,
        condition: (gameState) => gameState.meta.current_age === 1 && (gameState.state.current_year >= 24 && gameState.resources.richesse > 50),
        choices: [
            {
                label: "Livrer le charbon (-35% Richesse, +60% Savoir)",
                canAfford: (s) => s.resources.richesse > 10,
                effect: (s) => {
                    s.resources.richesse *= 0.65;
                    s.resources.savoir *= 1.60;
                },
                log: "Vos forges crachent un feu blanc. Vos armes coupent désormais le fer ennemi."
            },
            {
                label: "Préserver vos forêts (+20% Espoir, -20% Savoir)",
                canAfford: (s) => s.resources.savoir > 10,
                effect: (s) => {
                    s.resources.espoir *= 1.20;
                    s.resources.savoir *= 0.80;
                },
                log: "Les arbres respirent, mais vos guerriers combattent toujours avec du bronze."
            }
        ]
    },
    {
        id: "age1_09_espions_morgoth",
        title: "Le Poison des Rumeurs",
        description: "Des mendiants au regard fuyant colportent l'idée que les Elfes se servent des Hommes comme de la chair à flèche face au Seigneur du Nord.",
        repeatable: false,
        condition: (gameState) => gameState.meta.current_age === 1 && (gameState.state.current_year >= 28 && gameState.state.shadow_level > 20),
        choices: [
            {
                label: "Traquer et pendre les agitateurs (+15% Renom, -20% Espoir)",
                canAfford: (s) => s.resources.espoir > 10,
                effect: (s) => {
                    s.resources.renom *= 1.15;
                    s.resources.espoir *= 0.80;
                },
                log: "La sédition est étouffée dans le sang, mais la méfiance demeure."
            },
            {
                label: "Laisser le peuple débattre (-30% Espoir, +15 Ombre)",
                canAfford: (s) => s.resources.espoir > 10,
                effect: (s) => {
                    s.resources.espoir *= 0.70;
                    s.state.shadow_level = clamp(s.state.shadow_level + 15, 0, 100);
                },
                log: "Le doute ronge l'alliance. Les cœurs se détachent des Elfes."
            }
        ]
    },
    {
        id: "age1_10_migration_edain",
        title: "Les Fils de Bëor",
        description: "Une immense tribu d'Hommes brisés par le voyage traverse les cols de la montagne. Ils cherchent un seigneur pour les guider.",
        repeatable: false,
        condition: (gameState) => gameState.meta.current_age === 1 && (gameState.state.current_year >= 32),
        choices: [
            {
                label: "Les intégrer à votre domaine (+40% Hommes, -30% Richesse, +20% Espoir)",
                canAfford: (s) => s.resources.richesse > 10,
                effect: (s) => {
                    s.population.hommes *= 1.40;
                    s.resources.richesse *= 0.70;
                    s.resources.espoir *= 1.20;
                },
                log: "Votre colonie devient une cité. Les bras ne manqueront pas pour les récoltes."
            },
            {
                label: "Les repousser vers l'Ouest (-30% Renom)",
                canAfford: (s) => s.resources.renom > 10,
                effect: (s) => {
                    s.resources.renom *= 0.70;
                },
                log: "Ils poursuivent leur douloureuse marche, maudissant votre avarice."
            }
        ]
    },
    {
        id: "age1_11_gemme_brute",
        title: "La Lueur sous la Roche",
        description: "Vos mineurs extraient un cristal d'une pureté extraordinaire, qui semble capturer et retenir la lumière des étoiles.",
        repeatable: false,
        condition: (gameState) => gameState.meta.current_age === 1 && (gameState.state.current_year >= 36 && gameState.resources.savoir > 40),
        choices: [
            {
                label: "L'offrir à un roi Elfe (+60% Renom, +40% Savoir)",
                canAfford: () => true,
                effect: (s) => {
                    s.resources.renom *= 1.60;
                    s.resources.savoir *= 1.40;
                },
                log: "Le Roi a pleuré en voyant la gemme et vous a comblé de bénédictions."
            },
            {
                label: "La garder dans vos coffres (+50% Richesse, +10 Ombre)",
                canAfford: () => true,
                effect: (s) => {
                    s.resources.richesse *= 1.50;
                    s.state.shadow_level = clamp(s.state.shadow_level + 10, 0, 100);
                },
                log: "La pierre brille dans le noir, excitant la cupidité de vos proches."
            }
        ]
    },
    {
        id: "age1_12_orages_fer",
        title: "L'Assaut des Nuées",
        description: "Des centaines d'orques déferlent des montagnes pour piller vos silos d'avant-garde. La garnison est encerclée.",
        repeatable: false,
        condition: (gameState) => gameState.meta.current_age === 1 && (gameState.state.current_year >= 40 && gameState.population.hommes > 40),
        choices: [
            {
                label: "Soutenir la garnison à tout prix (-20% Hommes, +50% Renom)",
                canAfford: (s) => s.population.hommes > 10,
                effect: (s) => {
                    s.population.hommes *= 0.80;
                    s.resources.renom *= 1.50;
                },
                log: "La position est tenue au prix d'un sacrifice héroïque. L'ennemi recule."
            },
            {
                label: "Abandonner l'avant-poste (-35% Richesse, -30% Espoir, +10 Ombre)",
                canAfford: (s) => s.resources.richesse > 10 && s.resources.espoir > 10,
                effect: (s) => {
                    s.resources.richesse *= 0.65;
                    s.resources.espoir *= 0.70;
                    s.state.shadow_level = clamp(s.state.shadow_level + 10, 0, 100);
                },
                log: "Les silos brûlent. Le Nord s'assombrit."
            }
        ]
    },
    {
        id: "age1_13_feanor_serment",
        title: "L'Étoile Maudite",
        description: "Des messagers féroces portant l'emblème de la Maison de Fëanor exigent que vous rompiez tout commerce avec leurs rivaux.",
        repeatable: false,
        condition: (gameState) => gameState.meta.current_age === 1 && (gameState.state.current_year >= 45),
        choices: [
            {
                label: "Céder à leur effrayante fierté (-25% Richesse, +35% Renom, +10 Ombre)",
                canAfford: (s) => s.resources.richesse > 10,
                effect: (s) => {
                    s.resources.richesse *= 0.75;
                    s.resources.renom *= 1.35;
                    s.state.shadow_level = clamp(s.state.shadow_level + 10, 0, 100);
                },
                log: "Vous évitez leur colère, mais vous vous liez à une maison maudite."
            },
            {
                label: "Garder votre indépendance (-30% Renom, +20% Espoir)",
                canAfford: (s) => s.resources.renom > 10,
                effect: (s) => {
                    s.resources.renom *= 0.70;
                    s.resources.espoir *= 1.20;
                },
                log: "Ils sont repartis en crachant des menaces, mais votre honneur est sauf."
            }
        ]
    },
    {
        id: "age1_14_fuite_glamour",
        title: "Les Exilés de Gondolin",
        description: "Des rescapés d'une cité elfe cachée traversent vos terres en secret. Ils transportent des reliques d'une valeur inestimable.",
        repeatable: false,
        condition: (gameState) => gameState.meta.current_age === 1 && (gameState.state.current_year >= 50 && gameState.resources.savoir > 60),
        choices: [
            {
                label: "Les cacher (-25% Richesse, +60% Savoir, +30% Espoir)",
                canAfford: (s) => s.resources.richesse > 10,
                effect: (s) => {
                    s.resources.richesse *= 0.75;
                    s.resources.savoir *= 1.60;
                    s.resources.espoir *= 1.30;
                },
                log: "En remerciement, ils vous confient des parchemins d'une sagesse immense."
            },
            {
                label: "Piller leurs chariots (+80% Richesse, -50% Renom, +25 Ombre)",
                canAfford: (s) => s.resources.renom > 10,
                effect: (s) => {
                    s.resources.richesse *= 1.80;
                    s.resources.renom *= 0.50;
                    s.state.shadow_level = clamp(s.state.shadow_level + 25, 0, 100);
                },
                log: "Vous êtes riches, mais le sang elfe crie vengeance auprès des Valar."
            }
        ]
    },
    {
        id: "age1_15_fleche_noire",
        title: "L'Ombre sur les Moissons",
        description: "Une bise empoisonnée venue du Nord flétrit les cultures en une seule nuit. La famine menace le domaine.",
        repeatable: false,
        condition: (gameState) => gameState.meta.current_age === 1 && (gameState.state.current_year >= 54 && gameState.resources.richesse > 40),
        choices: [
            {
                label: "Acheter du grain aux Nains (-35% Richesse, +15% Espoir)",
                canAfford: (s) => s.resources.richesse > 10,
                effect: (s) => {
                    s.resources.richesse *= 0.65;
                    s.resources.espoir *= 1.15;
                },
                log: "L'or des coffres a sauvé le peuple de la faim noire."
            },
            {
                label: "Rationner et accepter les pertes (-15% Hommes, -25% Espoir)",
                canAfford: (s) => s.population.hommes > 10,
                effect: (s) => {
                    s.population.hommes *= 0.85;
                    s.resources.espoir *= 0.75;
                },
                log: "Les ventres creux enterrent les faibles. Le désespoir grandit."
            }
        ]
    },
    {
        id: "age1_16_dragon_premier",
        title: "Le Souffle du Ver",
        description: "Les rumeurs parlent d'un gigantesque serpent de feu sans ailes qui calcine les bastions du Nord. Les fumées sont visibles à l'horizon.",
        repeatable: false,
        condition: (gameState) => gameState.meta.current_age === 1 && (gameState.state.current_year >= 58),
        choices: [
            {
                label: "Fortifier les souterrains (-40% Richesse, +25% Espoir)",
                canAfford: (s) => s.resources.richesse > 10,
                effect: (s) => {
                    s.resources.richesse *= 0.60;
                    s.resources.espoir *= 1.25;
                },
                log: "Le domaine creuse la terre pour échapper à la fournaise future."
            },
            {
                label: "Ignorer les contes lointains (-20% Espoir, +10 Ombre)",
                canAfford: (s) => s.resources.espoir > 10, effect: (s) => {
                    s.resources.espoir *= 0.80;
                    s.state.shadow_level = clamp(s.state.shadow_level + 10, 0, 100);
                },
                log: "La terre tremble et la peur paralyse les sentinelles."
            }
        ]
    },
    {
        id: "age1_17_trahison_ulfang",
        title: "Les Cœurs Changeants",
        description: "Des Hommes venus de l'Est lointain proposent leurs services comme mercenaires, mais les Elfes se méfient de leur loyauté.",
        repeatable: false,
        condition: (gameState) => gameState.meta.current_age === 1 && (gameState.state.current_year >= 62),
        choices: [
            {
                label: "Engager les Orientaux (+30% Hommes, -25% Richesse, +15 Ombre)",
                canAfford: (s) => s.resources.richesse > 10,
                effect: (s) => {
                    s.population.hommes *= 1.30;
                    s.resources.richesse *= 0.75;
                    s.state.shadow_level = clamp(s.state.shadow_level + 15, 0, 100);
                },
                log: "Leurs lames sont acérées, mais leurs murmures nocturnes sont inquiétants."
            },
            {
                label: "Refuser leur aide (-15% Renom, +15% Espoir)",
                canAfford: (s) => s.resources.renom > 10,
                effect: (s) => {
                    s.resources.renom *= 0.85;
                    s.resources.espoir *= 1.15;
                },
                log: "Ils sont partis rejoindre les rangs de l'ennemi au Nord."
            }
        ]
    },
    {
        id: "age1_18_menegroth_splendeur",
        title: "L'Invitation des Mille Cavernes",
        description: "Le Roi Thingol d'Doriath vous invite à envoyer vos érudits admirer les Mille Cavernes, si vous offrez un tribut en ivoire.",
        repeatable: false,
        condition: (gameState) => gameState.meta.current_age === 1 && (gameState.state.current_year >= 66 && gameState.resources.richesse > 50),
        choices: [
            {
                label: "Envoyer la délégation (-35% Richesse, +70% Savoir, +25% Renom)",
                canAfford: (s) => s.resources.richesse > 10,
                effect: (s) => {
                    s.resources.richesse *= 0.65;
                    s.resources.savoir *= 1.70;
                    s.resources.renom *= 1.25;
                },
                log: "Vos sages reviennent éblouis, porteurs des secrets de la Haute Magie."
            },
            {
                label: "Décliner par fierté (-20% Savoir)",
                canAfford: (s) => s.resources.savoir > 10,
                effect: (s) => {
                    s.resources.savoir *= 0.80;
                },
                log: "Vous restez dans l'ignorance de la plus grande cour de l'Âge."
            }
        ]
    },
    {
        id: "age1_19_balrog_ombre",
        title: "Le Fléau de Flamme",
        description: "Une silhouette de feu et d'ombre a été aperçue sur les crêtes rocheuses. Sa seule présence fait fuir toute la faune.",
        repeatable: false,
        condition: (gameState) => gameState.meta.current_age === 1 && (gameState.state.current_year >= 70 && gameState.state.shadow_level > 40),
        choices: [
            {
                label: "Évacuer la vallée frontalière (-30% Richesse, -15% Espoir)",
                canAfford: (s) => s.resources.richesse > 10,
                effect: (s) => {
                    s.resources.richesse *= 0.70;
                    s.resources.espoir *= 0.85;
                },
                log: "La zone est perdue, mais vous évitez une destruction totale."
            },
            {
                label: "Dresser des barrières sacrées (-35% Savoir, +10 Ombre)",
                canAfford: (s) => s.resources.savoir > 10,
                effect: (s) => {
                    s.resources.savoir *= 0.65;
                    s.state.shadow_level = clamp(s.state.shadow_level + 10, 0, 100);
                },
                log: "Les glyphes de protection ont éclaté sous la chaleur démoniaque."
            }
        ]
    },
    {
        id: "age1_20_naufrage_sirion",
        title: "Les Réfugiés des Bouches",
        description: "Les bastions du Nord s'effondrent les uns après les autres. Des vagues de fuyards humains et elfes demandent l'asile.",
        repeatable: false,
        condition: (gameState) => gameState.meta.current_age === 1 && (gameState.state.current_year >= 74),
        choices: [
            {
                label: "Ouvrir grand vos portes (-40% Richesse, +25% Hommes, +15% Elfes)",
                canAfford: (s) => s.resources.richesse > 10,
                effect: (s) => {
                    s.resources.richesse *= 0.60;
                    s.population.hommes *= 1.25;
                    s.population.elfes *= 1.15;
                },
                log: "Le domaine étouffe sous le nombre, mais l'entraide ravive l'espoir."
            },
            {
                label: "Fermer les frontières (+15% Richesse, -35% Renom, -20% Espoir)",
                canAfford: (s) => s.resources.renom > 10,
                effect: (s) => {
                    s.resources.richesse *= 1.15;
                    s.resources.renom *= 0.65;
                    s.resources.espoir *= 0.80;
                },
                log: "Vous survivez dans l'égoïsme, hantés par les cris des mourants."
            }
        ]
    },
    {
        id: "age1_21_silmaril_rumeur",
        title: "La Splendeur du Joyau",
        description: "La rumeur se répand qu'un mortel a arraché un joyau sacré de la couronne du Seigneur Sombre. L'espoir renaît.",
        repeatable: false,
        condition: (gameState) => gameState.meta.current_age === 1 && (gameState.state.current_year >= 78),
        choices: [
            {
                label: "Célébrer cet exploit (+50% Espoir, +20% Renom)",
                canAfford: () => true,
                effect: (s) => {
                    s.resources.espoir *= 1.50;
                    s.resources.renom *= 1.20;
                },
                log: "La foi dans la victoire finale enflamme les cœurs les plus sombres."
            },
            {
                label: "Rester prudent (-10% Espoir)",
                canAfford: (s) => s.resources.espoir > 10,
                effect: (s) => {
                    s.resources.espoir *= 0.90;
                },
                log: "La lueur de l'espoir s'éteint rapidement derrière vos remparts."
            }
        ]
    },
    {
        id: "age1_22_nains_belegost",
        title: "Les Masques de Fer",
        description: "Les Nains de Belegost proposent de forger des masques de guerre résistant aux flammes en échange d'or pur.",
        repeatable: false,
        condition: (gameState) => gameState.meta.current_age === 1 && (gameState.state.current_year >= 82 && gameState.resources.richesse > 80),
        choices: [
            {
                label: "Acheter les masques (-45% Richesse, +60% Savoir, +20% Renom)",
                canAfford: (s) => s.resources.richesse > 10,
                effect: (s) => {
                    s.resources.richesse *= 0.55;
                    s.resources.savoir *= 1.60;
                    s.resources.renom *= 1.20;
                },
                log: "Vos armées possèdent désormais une défense légendaire contre le feu."
            },
            {
                label: "Économiser votre or (-15% Savoir)",
                canAfford: (s) => s.resources.savoir > 10,
                effect: (s) => {
                    s.resources.savoir *= 0.85;
                },
                log: "Vous gardez vos coffres pleins, mais vos boucliers restent en bois."
            }
        ]
    },
    {
        id: "age1_23_larme_unom",
        title: "Les Larmes sans Nombre",
        description: "Une immense armée alliée a été annihilée au Nord suite à une trahison. Le deuil frappe toutes les familles.",
        repeatable: false,
        condition: (gameState) => gameState.meta.current_age === 1 && (gameState.state.current_year >= 85),
        choices: [
            {
                label: "Décréter un deuil national (-30% Espoir, +25% Renom)",
                canAfford: (s) => s.resources.espoir > 10,
                effect: (s) => {
                    s.resources.espoir *= 0.70;
                    s.resources.renom *= 1.25;
                },
                log: "La tristesse est immense, mais la dignité de votre peuple reste entière."
            },
            {
                label: "Forcer à travailler (-15% Hommes, -25% Espoir, +10 Ombre)",
                canAfford: (s) => s.population.hommes > 10,
                effect: (s) => {
                    s.population.hommes *= 0.85;
                    s.resources.espoir *= 0.75;
                    s.state.shadow_level = clamp(s.state.shadow_level + 10, 0, 100);
                },
                log: "Le désespoir pousse les ouvriers à la révolte."
            }
        ]
    },
    {
        id: "age1_24_ruines_doriath",
        title: "La Chute du Royaume Caché",
        description: "Le royaume de Doriath est tombé, pillé par ses alliés. La panique s'empare des derniers bastions libres.",
        repeatable: false,
        condition: (gameState) => gameState.meta.current_age === 1 && (gameState.state.current_year >= 88),
        choices: [
            {
                label: "Accueillir les survivants (+15% Elfes, -20% Richesse, -15% Espoir)",
                canAfford: (s) => s.resources.richesse > 10,
                effect: (s) => {
                    s.population.elfes *= 1.15;
                    s.resources.richesse *= 0.80;
                    s.resources.espoir *= 0.85;
                },
                log: "Le domaine recueille les morceaux brisés d'un monde qui se meurt."
            },
            {
                label: "Se barricader totalement (+10% Richesse, +15 Ombre)",
                canAfford: () => true,
                effect: (s) => {
                    s.resources.richesse *= 1.10;
                    s.state.shadow_level = clamp(s.state.shadow_level + 15, 0, 100);
                },
                log: "Vous vous murez dans l'attente de la fin."
            }
        ]
    },
    {
        id: "age1_26_valar_colere",
        title: "Le Tonnerre de l'Ouest",
        description: "La terre tremble avec violence. Les armées des Dieux débarquent au Nord. La guerre finale a commencé.",
        repeatable: false,
        condition: (gameState) => gameState.meta.current_age === 1 && (gameState.state.current_year >= 95),
        choices: [
            {
                label: "Mobiliser vos dernières forces (-20% Hommes, +60% Renom)",
                canAfford: (s) => s.population.hommes > 10,
                effect: (s) => {
                    s.population.hommes *= 0.80;
                    s.resources.renom *= 1.60;
                },
                log: "Vos bannières flottent aux côtés des armées de la Lumière."
            },
            {
                label: "Rester terrés dans les abris (+25% Espoir, -35% Renom)",
                canAfford: (s) => s.resources.renom > 10,
                effect: (s) => {
                    s.resources.espoir *= 1.25;
                    s.resources.renom *= 0.65;
                },
                log: "Vous survivez tapis dans l'ombre pendant que les montagnes s'effondrent."
            }
        ]
    },
    {
        id: "age1_27_beleriand_abyme",
        title: "L'Engloutissement",
        description: "Le Nord se brise sous les chocs géologiques. La mer s'engouffre. Votre domaine doit fuir vers l'Est.",
        repeatable: false,
        condition: (gameState) => gameState.meta.current_age === 1 && (gameState.state.current_year >= 97),
        choices: [
            {
                label: "Mener la migration (-40% Richesse, -20% Hommes, +40% Espoir)",
                canAfford: (s) => s.resources.richesse > 10 && s.population.hommes > 10,
                effect: (s) => {
                    s.resources.richesse *= 0.60;
                    s.population.hommes *= 0.80;
                    s.resources.espoir *= 1.40;
                },
                log: "Vous guidez les vôtres vers un nouveau continent."
            },
            {
                label: "S'accrocher aux vieux remparts (-40% Hommes, +20 Ombre)",
                canAfford: (s) => s.population.hommes > 10,
                effect: (s) => {
                    s.population.hommes *= 0.60;
                    s.state.shadow_level = clamp(s.state.shadow_level + 20, 0, 100);
                },
                log: "Les flots ont emporté vos fortifications et vos souvenirs."
            }
        ]
    },
    {
        id: "age1_28_morgoth_bannissement",
        title: "Le Vide Éternel",
        description: "Le Seigneur Sombre a été vaincu et jeté au-delà des Portes de la Nuit. Le silence retombe sur le monde.",
        repeatable: false,
        condition: (gameState) => gameState.meta.current_age === 1 && (gameState.state.current_year >= 99),
        choices: [
            {
                label: "Bâtir le mémorial de l'Aube (-30% Richesse, +70% Renom)",
                canAfford: (s) => s.resources.richesse > 10,
                effect: (s) => {
                    s.resources.richesse *= 0.70;
                    s.resources.renom *= 1.70;
                },
                log: "L'histoire de vos sacrifices est gravée dans la pierre."
            },
            {
                label: "Savourer la paix retrouvée (+35% Espoir)",
                canAfford: () => true,
                effect: (s) => {
                    s.resources.espoir *= 1.35;
                    s.state.shadow_level = 0;
                },
                log: "La tension retombe enfin après un siècle de terreur."
            }
        ]
    },
    {
        id: "age1_29_heritage_choix",
        title: "L'Aube d'une Nouvelle Ère",
        description: "Le monde est remodelé. L'Âge touche à sa fin, le Grand Projet vous appelle.",
        repeatable: false,
        condition: (gameState) => gameState.meta.current_age === 1 && (gameState.state.current_year >= 100),
        choices: [
            {
                label: "Structurer des guildes de bâtisseurs (-30% Richesse, +40% Savoir)",
                canAfford: (s) => s.resources.richesse > 10,
                effect: (s) => {
                    s.resources.richesse *= 0.70;
                    s.resources.savoir *= 1.40;
                },
                log: "Vous jetez les bases d'un empire axé sur l'architecture."
            },
            {
                label: "Établir un ordre de gardiens (+40% Renom, +20% Espoir)",
                canAfford: () => true,
                effect: (s) => {
                    s.resources.renom *= 1.40;
                    s.resources.espoir *= 1.20;
                },
                log: "Vous choisissez la voie de la vigilance militaire."
            }
        ]
    };
// ==========================================
    // 5. ÉVÉNEMENTS NARRATIFS UNIQUES (Âge 2)
    // L'ère des empires, de Númenor et de la Forge des Anneaux.
    // Conversion totale en % pour soutenir l'inflation économique.
    // ==========================================
    {
        id: "age2_01_fondation",
        title: "Les Nouvelles Assises",
        description: "Le monde a changé. Votre peuple s'installe sur des terres vierges et fertiles. Il faut choisir comment structurer les fondations de ce nouvel Âge.",
        repeatable: false,
        condition: (gameState) => gameState.meta.current_age === 2 && (gameState.state.current_year >= 1),
        choices: [
            {
                label: "Ériger de grandes cités de pierre (-30% Richesse, +40% Renom)",
                canAfford: (s) => s.resources.richesse > 10,
                effect: (s) => {
                    s.resources.richesse *= 0.70;
                    s.resources.renom *= 1.40;
                },
                log: "Les fondations sont solides, tournées vers la grandeur architecturale."
            },
            {
                label: "Privilégier l'agriculture et les bois (+40% Richesse, +10% Espoir)",
                canAfford: () => true,
                effect: (s) => {
                    s.resources.richesse *= 1.40;
                    s.resources.espoir *= 1.10;
                },
                log: "La terre nourricière assure la paix et l'autosuffisance immédiate."
            }
        ]
    },
    {
        id: "age2_02_numenor_visite",
        title: "Les Rois de la Mer",
        description: "De gigantesques navires aux voiles blanches et aux proues dorées accostent. Ce sont les Hommes de Númenor, grands, beaux et savants.",
        repeatable: false,
        condition: (gameState) => gameState.meta.current_age === 2 && (gameState.state.current_year >= 5),
        choices: [
            {
                label: "Créer un comptoir commun (-25% Richesse, +60% Savoir, +20% Renom)",
                canAfford: (s) => s.resources.richesse > 10,
                effect: (s) => {
                    s.resources.richesse *= 0.75;
                    s.resources.savoir *= 1.60;
                    s.resources.renom *= 1.20;
                },
                log: "Leurs technologies et leurs cartes maritimes enrichissent vos érudits."
            },
            {
                label: "Se méfier de leur fierté écrasante (+15% Espoir, -20% Renom)",
                canAfford: (s) => s.resources.renom > 10,
                effect: (s) => {
                    s.resources.espoir *= 1.15;
                    s.resources.renom *= 0.80;
                },
                log: "Les Dunedain repartent vers l'océan, vous trouvant bien provinciaux."
            }
        ]
    },
    {
        id: "age2_03_annatar_visite",
        title: "Le Dispensateur de Dons",
        description: "Un seigneur à la beauté irréelle, nommé Annatar, se présente à vos portes. Il affirme vouloir guérir la Terre du Milieu et offre des secrets de forge oubliés.",
        repeatable: false,
        condition: (gameState) => gameState.meta.current_age === 2 && (gameState.state.current_year >= 10 && gameState.resources.savoir > 50),
        choices: [
            {
                label: "Accepter ses cadeaux (+100% Savoir, +50% Richesse, +25 Ombre)",
                canAfford: () => true,
                effect: (s) => {
                    s.resources.savoir *= 2.00;
                    s.resources.richesse *= 1.50;
                    s.state.shadow_level = clamp(s.state.shadow_level + 25, 0, 100);
                },
                log: "Vos artisans réalisent des merveilles, mais un sentiment d'anxiété plane sur les forges."
            },
            {
                label: "Écouter les réticences des Elfes (-20% Renom, -10 Ombre)",
                canAfford: (s) => s.resources.renom > 10,
                effect: (s) => {
                    s.resources.renom *= 0.80;
                    s.state.shadow_level = capZero(s.state.shadow_level - 10);
                },
                log: "Vous refusez ses présents. Il repart vers l'Est, le regard brièvement noir."
            },
            {
                label: "L'étudier en secret (Risqué)",
                canAfford: () => true,
                effect: (s) => {
                    if (Math.random() < 0.5) {
                        s.resources.savoir *= 1.50;
                    } else {
                        s.resources.espoir *= 0.80;
                        s.state.shadow_level = clamp(s.state.shadow_level + 20, 0, 100);
                    }
                },
                log: "Jouer avec le feu brûle parfois. Les conséquences s'inscrivent dans le temps."
            }
        ]
    },
    {
        id: "age2_04_guildes_or",
        title: "L'Âge des Corporations",
        description: "L'argent coule à flots grâce au commerce. Les grandes guildes d'artisans exigent le contrôle des taxes du domaine.",
        repeatable: false,
        condition: (gameState) => gameState.meta.current_age === 2 && (gameState.state.current_year >= 15 && gameState.resources.richesse > 100),
        choices: [
            {
                label: "Leur céder le contrôle (-30% Renom, +80% Richesse)",
                canAfford: (s) => s.resources.renom > 10,
                effect: (s) => {
                    s.resources.renom *= 0.70;
                    s.resources.richesse *= 1.80;
                },
                log: "L'économie explose, mais votre autorité politique s'effrite face aux marchands."
            },
            {
                label: "Maintenir l'autorité de l'Intendant (-30% Richesse, +30% Renom)",
                canAfford: (s) => s.resources.richesse > 10,
                effect: (s) => {
                    s.resources.richesse *= 0.70;
                    s.resources.renom *= 1.30;
                },
                log: "L'ordre règne, mais les marchands grognent et ralentissent la production."
            }
        ]
    },
    {
        id: "age2_05_mirkwood_frontiere",
        title: "Les Frontières Vertes",
        description: "Les Elfes Sylvains ferment leurs forêts sacrées aux Hommes, accusant vos bûcherons d'abattre des arbres séculaires sans respect.",
        repeatable: false,
        condition: (gameState) => gameState.meta.current_age === 2 && (gameState.state.current_year >= 20),
        choices: [
            {
                label: "Payer une compensation et reboiser (-30% Richesse, +20% Renom)",
                canAfford: (s) => s.resources.richesse > 10,
                effect: (s) => {
                    s.resources.richesse *= 0.70;
                    s.resources.renom *= 1.20;
                },
                log: "La paix est préservée avec le peuple des bois au détriment de vos chantiers."
            },
            {
                label: "Forcer le passage (+30% Richesse, -30% Renom, +10 Ombre)",
                canAfford: (s) => s.resources.renom > 10,
                effect: (s) => {
                    s.resources.richesse *= 1.30;
                    s.resources.renom *= 0.70;
                    s.state.shadow_level = clamp(s.state.shadow_level + 10, 0, 100);
                },
                log: "Le bois alimente vos forges, mais les flèches elfiques tuent vos ouvriers."
            }
        ]
    },
    {
        id: "age2_06_anneaux_rumeur",
        title: "Les Cercles de Pouvoir",
        description: "Les espions rapportent que les forgerons d'Eregion, menés par Celebrimbor, créent des anneaux magiques capables de stopper le déclin du monde.",
        repeatable: false,
        condition: (gameState) => gameState.meta.current_age === 2 && (gameState.state.current_year >= 25 && gameState.resources.savoir > 100),
        choices: [
            {
                label: "Envoyer des érudits enquêter (-20% Richesse, +80% Savoir)",
                canAfford: (s) => s.resources.richesse > 10,
                effect: (s) => {
                    s.resources.richesse *= 0.80;
                    s.resources.savoir *= 1.80;
                },
                log: "Vos sages reviennent avec des croquis fascinants sur la géométrie sacrée."
            },
            {
                label: "Ignorer ces artefacts dangereux (+20% Espoir)",
                canAfford: () => true,
                effect: (s) => {
                    s.resources.espoir *= 1.20;
                },
                log: "Vous vous concentrez sur la vie simple de vos sujets."
            }
        ]
    },
    {
        id: "age2_07_esclavage_ombre",
        title: "Les Mines de l'Est",
        description: "L'Ombre grandit au Mordor. Des tribus humaines soumises à Sauron proposent de vous vendre des captifs pour travailler dans vos carrières.",
        repeatable: false,
        condition: (gameState) => gameState.meta.current_age === 2 && (gameState.state.current_year >= 30 && gameState.state.shadow_level > 20),
        choices: [
            {
                label: "Acheter les captifs (+100% Richesse, -40% Espoir, +20 Ombre)",
                canAfford: (s) => s.resources.espoir > 10,
                effect: (s) => {
                    s.resources.richesse *= 2.00;
                    s.resources.espoir *= 0.60;
                    s.state.shadow_level = clamp(s.state.shadow_level + 20, 0, 100);
                },
                log: "Vos monuments sortent de terre à une vitesse prodigieuse, baignés de larmes."
            },
            {
                label: "Refuser cette infamie (+40% Espoir, -25% Richesse)",
                canAfford: (s) => s.resources.richesse > 10,
                effect: (s) => {
                    s.resources.espoir *= 1.40;
                    s.resources.richesse *= 0.75;
                },
                log: "Votre économie stagne, mais l'honneur de votre peuple reste intact."
            }
        ]
    },
    {
        id: "age2_08_numenor_tribut",
        title: "L'Ombre sur Númenor",
        description: "Les navires des Rois de la Mer reviennent, mais ils exigent un lourd tribut en or et en bois, vous traitant comme des inférieurs.",
        repeatable: false,
        condition: (gameState) => gameState.meta.current_age === 2 && (gameState.state.current_year >= 35 && gameState.resources.richesse > 80),
        choices: [
            {
                label: "Payer le tribut sans broncher (-60% Richesse, -20% Renom)",
                canAfford: (s) => s.resources.richesse > 10 && s.resources.renom > 10,
                effect: (s) => {
                    s.resources.richesse *= 0.40;
                    s.resources.renom *= 0.80;
                },
                log: "Vous achetez la paix face à la plus grande flotte du monde."
            },
            {
                label: "Refuser et fortifier (-30% Richesse, +40% Renom, -20% Espoir)",
                canAfford: (s) => s.resources.richesse > 10 && s.resources.espoir > 10,
                effect: (s) => {
                    s.resources.richesse *= 0.70;
                    s.resources.renom *= 1.40;
                    s.resources.espoir *= 0.80;
                },
                log: "La tension monte. Les voiles noires de Númenor guettent vos rivages."
            }
        ]
    },
    {
        id: "age2_09_forge_barad_dur",
        title: "La Tour de Feu",
        description: "Une immense forteresse noire s'élève dans les désolations du Sud. La terre tremble à chaque coup de marteau. La peur s'installe.",
        repeatable: false,
        condition: (gameState) => gameState.meta.current_age === 2 && (gameState.state.current_year >= 40),
        choices: [
            {
                label: "Renforcer les garnisons frontalières (-35% Richesse, +30% Renom)",
                canAfford: (s) => s.resources.richesse > 10,
                effect: (s) => {
                    s.resources.richesse *= 0.65;
                    s.resources.renom *= 1.30;
                },
                log: "Vos soldats surveillent les cols, prêts à donner l'alerte."
            },
            {
                label: "Financer des rituels d'espoir (-30% Richesse, +40% Espoir)",
                canAfford: (s) => s.resources.richesse > 10,
                effect: (s) => {
                    s.resources.richesse *= 0.70;
                    s.resources.espoir *= 1.40;
                },
                log: "Les temples résonnent de prières pour dissiper l'angoisse ambiante."
            }
        ]
    },
    {
        id: "age2_10_anneaux_distribution",
        title: "Le Cadeau du Maître",
        description: "Un messager d'Annatar vous apporte un anneau d'or orné d'une gemme rouge, promettant une vie éternelle pour le dirigeant du domaine.",
        repeatable: false,
        condition: (gameState) => gameState.meta.current_age === 2 && (gameState.state.current_year >= 45 && gameState.resources.renom > 40),
        choices: [
            {
                label: "Enfiler l'Anneau (+150% Richesse, +100% Renom, +40 Ombre)",
                canAfford: () => true,
                effect: (s) => {
                    s.resources.richesse *= 2.50;
                    s.resources.renom *= 2.00;
                    s.state.shadow_level = clamp(s.state.shadow_level + 40, 0, 100);
                },
                log: "Votre volonté devient d'acier, la richesse abonde, mais vos nuits deviennent terrifiantes."
            },
            {
                label: "Jeter le présent dans les forges (+60% Espoir, -25% Richesse)",
                canAfford: (s) => s.resources.richesse > 10,
                effect: (s) => {
                    s.resources.espoir *= 1.60;
                    s.resources.richesse *= 0.75;
                },
                log: "Le messager s'est volatilisé dans un cri strident. Votre peuple loue votre sagesse."
            }
        ]
    },
    {
        id: "age2_11_erebor_alliance",
        title: "Le Pacte de la Pierre",
        description: "Les Nains de Khazad-dûm ouvrent leurs portes. Ils proposent une route commerciale exclusive à travers la montagne.",
        repeatable: false,
        condition: (gameState) => gameState.meta.current_age === 2 && (gameState.state.current_year >= 50 && gameState.resources.richesse > 60),
        choices: [
            {
                label: "Investir massivement (-30% Richesse immédiat, mais +80% ensuite, +40% Savoir)",
                canAfford: (s) => s.resources.richesse > 10,
                effect: (s) => {
                    s.resources.richesse = (s.resources.richesse * 0.70) * 1.80;
                    s.resources.savoir *= 1.40;
                },
                log: "Le Mithril et l'or coulent dans votre économie. L'alliance est scellée."
            },
            {
                label: "Décliner par méfiance envers les Nains (-20% Renom)",
                canAfford: (s) => s.resources.renom > 10,
                effect: (s) => {
                    s.resources.renom *= 0.80;
                },
                log: "Les Nains s'allient avec vos rivaux, vous isolant économiquement."
            }
        ]
    },
    {
        id: "age2_12_guerre_elfes_sauron",
        title: "Le Masque Tombe",
        description: "Sauron s'est révélé. Ses armées de monstres envahissent l'Eregion et massacrent les forgerons elfes. La guerre totale est là.",
        repeatable: false,
        condition: (gameState) => gameState.meta.current_age === 2 && (gameState.state.current_year >= 55 && gameState.population.hommes > 50),
        choices: [
            {
                label: "Envoyer votre armée soutenir les Elfes (-30% Hommes, +80% Renom)",
                canAfford: (s) => s.population.hommes > 10,
                effect: (s) => {
                    s.population.hommes *= 0.70;
                    s.resources.renom *= 1.80;
                },
                log: "Vos troupes subissent de lourdes pertes, mais sauvent les restes du peuple elfe."
            },
            {
                label: "Murer le domaine (-40% Richesse, +30% Espoir, -40% Renom)",
                canAfford: (s) => s.resources.richesse > 10 && s.resources.renom > 10,
                effect: (s) => {
                    s.resources.richesse *= 0.60;
                    s.resources.espoir *= 1.30;
                    s.resources.renom *= 0.60;
                },
                log: "Vous survivez lâchement pendant que l'Eregion brûle jusqu'aux fondations."
            }
        ]
    },
    {
        id: "age2_13_fondation_imladris",
        title: "La Vallée Cachée",
        description: "Elrond a fondé un refuge secret : Fondcombe. Il vous demande d'y envoyer vos reliques historiques pour les préserver.",
        repeatable: false,
        condition: (gameState) => gameState.meta.current_age === 2 && (gameState.state.current_year >= 60 && gameState.resources.savoir > 80),
        choices: [
            {
                label: "Envoyer vos archives (-40% Savoir, +40% Renom, +20% Espoir)",
                canAfford: (s) => s.resources.savoir > 10,
                effect: (s) => {
                    s.resources.savoir *= 0.60;
                    s.resources.renom *= 1.40;
                    s.resources.espoir *= 1.20;
                },
                log: "Vos parchemins sont en sécurité dans la maison d'Elrond pour les siècles futurs."
            },
            {
                label: "Garder vos écrits chez vous (+30% Savoir, -20% Espoir)",
                canAfford: (s) => s.resources.espoir > 10,
                effect: (s) => {
                    s.resources.savoir *= 1.30;
                    s.resources.espoir *= 0.80;
                },
                log: "Vous conservez votre savoir immédiat, mais risquez sa destruction future."
            }
        ]
    },
    {
        id: "age2_14_numenor_orgueil",
        title: "Les Temples de Sang",
        description: "Les Númenoréens ont érigé un immense temple dédié à Melkor sur vos côtes. Ils y pratiquent des sacrifices pour l'immortalité.",
        repeatable: false,
        condition: (gameState) => gameState.meta.current_age === 2 && (gameState.state.current_year >= 65 && gameState.state.shadow_level > 30),
        choices: [
            {
                label: "Fermer les yeux pour garder leurs profits (+100% Richesse, +20 Ombre)",
                canAfford: () => true,
                effect: (s) => {
                    s.resources.richesse *= 2.00;
                    s.state.shadow_level = clamp(s.state.shadow_level + 20, 0, 100);
                },
                log: "L'or emplit vos coffres, mais l'air empeste le soufre et la mort."
            },
            {
                label: "Chasser leurs prêtres par la force (-15% Hommes, +50% Espoir, -15 Ombre)",
                canAfford: (s) => s.population.hommes > 10,
                effect: (s) => {
                    s.population.hommes *= 0.85;
                    s.resources.espoir *= 1.50;
                    s.state.shadow_level = capZero(s.state.shadow_level - 15);
                },
                log: "Le temple est purifié par le feu. Votre peuple respire à nouveau."
            }
        ]
    },
    {
        id: "age2_15_armee_sauron_siege",
        title: "Les Tambours du Mordor",
        description: "L'armée de Sauron encercle votre domaine. Les ciels sont noirs de flèches incendiaires, vos murs tremblent.",
        repeatable: false,
        condition: (gameState) => gameState.meta.current_age === 2 && (gameState.state.current_year >= 70 && gameState.population.hommes > 30),
        choices: [
            {
                label: "Soutenir le siège (-20% Hommes, -30% Richesse, +50% Renom)",
                canAfford: (s) => s.population.hommes > 10 && s.resources.richesse > 10,
                effect: (s) => {
                    s.population.hommes *= 0.80;
                    s.resources.richesse *= 0.70;
                    s.resources.renom *= 1.50;
                },
                log: "Vos lignes tiennent bon grâce à votre courage. L'ennemi s'épuise sur vos murs."
            },
            {
                label: "Négocier une reddition (-60% Richesse, -30% Renom, +25 Ombre)",
                canAfford: (s) => s.resources.richesse > 10 && s.resources.renom > 10,
                effect: (s) => {
                    s.resources.richesse *= 0.40;
                    s.resources.renom *= 0.70;
                    s.state.shadow_level = clamp(s.state.shadow_level + 25, 0, 100);
                },
                log: "Vous sauvez des vies au prix de votre honneur et de votre fortune."
            },
            {
                label: "Tenter une sortie meurtrière (Risqué)",
                canAfford: () => true,
                effect: (s) => {
                    if(Math.random() < 0.4) {
                        s.resources.renom *= 1.80;
                        s.state.shadow_level = capZero(s.state.shadow_level - 10);
                    } else {
                        s.population.hommes *= 0.60;
                        s.resources.espoir *= 0.70;
                    }
                },
                log: "La fureur des Hommes a rencontré la noirceur des Orques."
            }
        ]
    },
    {
        id: "age2_16_ar_pharazon_debarquement",
        title: "L'Arrivée du Roi d'Or",
        description: "Ar-Pharazôn, Roi de Númenor, débarque avec une armée si colossale que les forces de Sauron s'enfuient sans combattre.",
        repeatable: false,
        condition: (gameState) => gameState.meta.current_age === 2 && (gameState.state.current_year >= 75),
        choices: [
            {
                label: "S'incliner devant sa puissance (+50% Renom, -30% Espoir)",
                canAfford: (s) => s.resources.espoir > 10,
                effect: (s) => {
                    s.resources.renom *= 1.50;
                    s.resources.espoir *= 0.70;
                },
                log: "Vous rejoignez l'allégeance de l'Empire, ébloui et soumis."
            },
            {
                label: "Rester neutre et distant (-30% Richesse)",
                canAfford: (s) => s.resources.richesse > 10,
                effect: (s) => {
                    s.resources.richesse *= 0.70;
                },
                log: "Vous payez de lourdes amendes pour votre manque d'enthousiasme."
            }
        ]
    },
    {
        id: "age2_17_sauron_captif",
        title: "Le Prisonnier de l'Ouest",
        description: "Sauron s'est rendu au Roi de Númenor et a été emmené enchaîné sur leur île. Une paix étrange et suspecte s'installe.",
        repeatable: false,
        condition: (gameState) => gameState.meta.current_age === 2 && (gameState.state.current_year >= 78),
        choices: [
            {
                label: "Démanteler les industries de guerre (+60% Richesse, -20% Renom)",
                canAfford: (s) => s.resources.renom > 10,
                effect: (s) => {
                    s.resources.richesse *= 1.60;
                    s.resources.renom *= 0.80;
                },
                log: "L'or retourne à l'agriculture, mais vos soldats s'amollissent."
            },
            {
                label: "Rester vigilant et armé (-25% Richesse, +30% Espoir)",
                canAfford: (s) => s.resources.richesse > 10,
                effect: (s) => {
                    s.resources.richesse *= 0.75;
                    s.resources.espoir *= 1.30;
                },
                log: "Vous suspectez le piège. Votre peuple veille sur les remparts."
            }
        ]
    },
    {
        id: "age2_18_culte_melkor",
        title: "La Grande Dissimulation",
        description: "Profitant de la paix, des sociétés secrètes adorant le Premier Seigneur Sombre s'installent parmi vos notables.",
        repeatable: false,
        condition: (gameState) => gameState.meta.current_age === 2 && (gameState.state.current_year >= 82 && gameState.state.shadow_level > 40),
        choices: [
            {
                label: "Établir une inquisition (-15% Hommes, -30% Espoir, -15 Ombre)",
                canAfford: (s) => s.population.hommes > 10 && s.resources.espoir > 10,
                effect: (s) => {
                    s.population.hommes *= 0.85;
                    s.resources.espoir *= 0.70;
                    s.state.shadow_level = capZero(s.state.shadow_level - 15);
                },
                log: "La chasse aux sorcières assombrit l'ambiance, mais le culte est éradiqué."
            },
            {
                label: "Laisser faire par tolérance (+40% Richesse, +20 Ombre)",
                canAfford: () => true,
                effect: (s) => {
                    s.resources.richesse *= 1.40;
                    s.state.shadow_level = clamp(s.state.shadow_level + 20, 0, 100);
                },
                log: "L'élite s'enrichit grâce à ces réseaux, mais la morale se décompose."
            }
        ]
    },
    {
        id: "age2_19_flotte_numenor",
        title: "L'Armada de l'Hubris",
        description: "Le Roi a construit la plus grande flotte de l'histoire pour attaquer les Dieux. Ils coupent toutes vos forêts pour faire des mâts.",
        repeatable: false,
        condition: (gameState) => gameState.meta.current_age === 2 && (gameState.state.current_year >= 85 && gameState.resources.richesse > 50),
        choices: [
            {
                label: "Vendre votre bois à la flotte (+100% Richesse, -30% Espoir)",
                canAfford: (s) => s.resources.espoir > 10,
                effect: (s) => {
                    s.resources.richesse *= 2.00;
                    s.resources.espoir *= 0.70;
                },
                log: "La richesse abonde, mais vos collines sont nues et le ciel gronde."
            },
            {
                label: "Saboter les chantiers de l'Empire (-15% Hommes, +50% Renom)",
                canAfford: (s) => s.population.hommes > 10,
                effect: (s) => {
                    s.population.hommes *= 0.85;
                    s.resources.renom *= 1.50;
                },
                log: "Vous ralentissez la folie du Roi au prix de vies humaines."
            }
        ]
    },
    {
        id: "age2_20_submersion",
        title: "La Chute de l'Étoile",
        description: "Un cataclysme secoue la planète. L'Île de Númenor est engloutie par la colère divine. Une vague gigantesque frappe vos côtes.",
        repeatable: false,
        condition: (gameState) => gameState.meta.current_age === 2 && (gameState.state.current_year >= 90),
        choices: [
            {
                label: "Fuir vers les hauteurs (-50% Richesse, -20% Hommes, +30% Espoir)",
                canAfford: (s) => s.resources.richesse > 10 && s.population.hommes > 10,
                effect: (s) => {
                    s.resources.richesse *= 0.50;
                    s.population.hommes *= 0.80;
                    s.resources.espoir *= 1.30;
                },
                log: "Le littoral est dévasté, mais le cœur de votre peuple survit sur la montagne."
            },
            {
                label: "Tenter de sauver les ports bas (-40% Hommes, +20 Ombre)",
                canAfford: (s) => s.population.hommes > 10,
                effect: (s) => {
                    s.population.hommes *= 0.60;
                    s.state.shadow_level = clamp(s.state.shadow_level + 20, 0, 100);
                },
                log: "La vague géante balaie vos infrastructures et emporte vos marins."
            }
        ]
    },
    {
        id: "age2_21_survivants_elendil",
        title: "Les Fidèles de la Tempête",
        description: "Des navires menés par Elendil et ses fils s'échouent. Restés fidèles aux Dieux, ils demandent de la pierre pour bâtir de nouveaux royaumes.",
        repeatable: false,
        condition: (gameState) => gameState.meta.current_age === 2 && (gameState.state.current_year >= 92 && gameState.resources.richesse > 40),
        choices: [
            {
                label: "Fournir la pierre (-30% Richesse, +100% Renom, +40% Espoir)",
                canAfford: (s) => s.resources.richesse > 10,
                effect: (s) => {
                    s.resources.richesse *= 0.70;
                    s.resources.renom *= 2.00;
                    s.resources.espoir *= 1.40;
                },
                log: "Vous posez les pierres du Gondor. Une amitié éternelle renaît."
            },
            {
                label: "Préserver vos matériaux (-20% Renom)",
                canAfford: (s) => s.resources.renom > 10,
                effect: (s) => {
                    s.resources.renom *= 0.80;
                },
                log: "Les hauts rois s'installent plus loin, vous ignorant superbement."
            }
        ]
    },
    {
        id: "age2_22_retour_sauron",
        title: "L'Ombre se Réincarne",
        description: "Sauron a survécu à la submersion. Son esprit est revenu au Mordor, et la Montagne du Destin entre en éruption.",
        repeatable: false,
        condition: (gameState) => gameState.meta.current_age === 2 && (gameState.state.current_year >= 94 && gameState.resources.espoir > 30),
        choices: [
            {
                label: "Décréter la guerre totale (-25% Richesse, +30% Renom)",
                canAfford: (s) => s.resources.richesse > 10,
                effect: (s) => {
                    s.resources.richesse *= 0.75;
                    s.resources.renom *= 1.30;
                },
                log: "Le peuple s'arme. Personne ne se fait d'illusions sur la suite."
            },
            {
                label: "Paniquer et rationner (-20% Espoir, +5 Ombre)",
                canAfford: (s) => s.resources.espoir > 10,
                effect: (s) => {
                    s.resources.espoir *= 0.80;
                    s.state.shadow_level = clamp(s.state.shadow_level + 5, 0, 100);
                },
                log: "Le découragement paralyse les industries de votre domaine."
            }
        ]
    },
    {
        id: "age2_23_derniere_alliance",
        title: "La Dernière Alliance",
        description: "Elendil et Gil-galad lèvent une armée unie pour anéantir Sauron. Ils appellent toutes les forces libres à les rejoindre.",
        repeatable: false,
        condition: (gameState) => gameState.meta.current_age === 2 && (gameState.state.current_year >= 96 && gameState.population.hommes > 40),
        choices: [
            {
                label: "Mobiliser vos troupes (-25% Hommes, +100% Renom)",
                canAfford: (s) => s.population.hommes > 10,
                effect: (s) => {
                    s.population.hommes *= 0.75;
                    s.resources.renom *= 2.00;
                },
                log: "Vos bannières marchent aux côtés des plus grands rois de l'Histoire."
            },
            {
                label: "Défendre vos foyers (+20% Espoir, -50% Renom)",
                canAfford: (s) => s.resources.renom > 10,
                effect: (s) => {
                    s.resources.espoir *= 1.20;
                    s.resources.renom *= 0.50;
                },
                log: "La grande armée passe sans vous, vous marquant du sceau de la lâcheté."
            }
        ]
    },
    {
        id: "age2_24_siege_mordor",
        title: "La Longue Veille au Noir",
        description: "Le siège du Mordor s'éternise depuis des années. On vous demande des convois constants de ravitaillement.",
        repeatable: false,
        condition: (gameState) => gameState.meta.current_age === 2 && (gameState.state.current_year >= 97 && gameState.resources.richesse > 50),
        choices: [
            {
                label: "Envoyer les convois de vivres (-35% Richesse, +40% Renom)",
                canAfford: (s) => s.resources.richesse > 10,
                effect: (s) => {
                    s.resources.richesse *= 0.65;
                    s.resources.renom *= 1.40;
                },
                log: "L'armée de l'Alliance tient bon grâce à vos efforts agricoles."
            },
            {
                label: "Garder la nourriture (-10% Hommes, -30% Renom)",
                canAfford: (s) => s.resources.renom > 10,
                effect: (s) => {
                    s.population.hommes *= 0.90;
                    s.resources.renom *= 0.70;
                },
                log: "Les armées souffrent de famine au front et votre nom est maudit."
            },
            {
                label: "Infiltrer des vivres par les sentiers secrets (Risqué)",
                canAfford: () => true,
                effect: (s) => {
                    if(Math.random() < 0.5) {
                        s.resources.renom *= 1.50;
                    } else {
                        s.resources.richesse *= 0.70;
                        s.state.shadow_level = clamp(s.state.shadow_level + 10, 0, 100);
                    }
                },
                log: "L'Ombre a intercepté une partie des vôtres. Le jeu fut mortel."
            }
        ]
    },
    {
        id: "age2_25_montagne_destin_choc",
        title: "Le Duel des Sommets",
        description: "Gil-galad et Elendil sont tombés en terrassant Sauron. Isildur a coupé le Doigt du Monstre. L'Anneau est pris. Sauron est vaincu.",
        repeatable: false,
        condition: (gameState) => gameState.meta.current_age === 2 && (gameState.state.current_year >= 98),
        choices: [
            {
                label: "Organiser des fêtes de délivrance (+50% Espoir, +20% Renom)",
                canAfford: () => true,
                effect: (s) => {
                    s.resources.espoir *= 1.50;
                    s.resources.renom *= 1.20;
                },
                log: "Le cauchemar s'achève enfin après des décennies de conflit."
            },
            {
                label: "Méditer sur la mort des grands rois (-20% Espoir)",
                canAfford: (s) => s.resources.espoir > 10,
                effect: (s) => {
                    s.resources.espoir *= 0.80;
                },
                log: "La victoire est totale, mais le monde semble soudain plus vide."
            }
        ]
    },
    {
        id: "age2_26_isildur_erreur",
        title: "La Faute d'Isildur",
        description: "Isildur refuse de détruire l'Anneau Unique, le gardant comme compensation. Le mal n'est pas éradiqué à la racine.",
        repeatable: false,
        condition: (gameState) => gameState.meta.current_age === 2 && (gameState.state.current_year >= 99),
        choices: [
            {
                label: "Avertir vos sages en secret (-15% Richesse, +40% Savoir)",
                canAfford: (s) => s.resources.richesse > 10,
                effect: (s) => {
                    s.resources.richesse *= 0.85;
                    s.resources.savoir *= 1.40;
                },
                log: "Les érudits consignent cette folie dans les livres secrets du domaine."
            },
            {
                label: "Ignorer les affaires des rois (+10% Espoir)",
                canAfford: () => true,
                effect: (s) => {
                    s.resources.espoir *= 1.10;
                },
                log: "Vous savourez la paix immédiate, refusant de penser à l'avenir."
            }
        ]
    },
    {
        id: "age2_27_desastre_champs",
        title: "Le Désastre des Iris",
        description: "Isildur est tombé dans une embuscade d'orques. L'Anneau Unique est perdu dans les eaux de la Grande Rivière.",
        repeatable: false,
        condition: (gameState) => gameState.meta.current_age === 2 && (gameState.state.current_year >= 99 && gameState.state.shadow_level < 50),
        choices: [
            {
                label: "Sécuriser les frontières du Nord (-25% Richesse, +20% Renom)",
                canAfford: (s) => s.resources.richesse > 10,
                effect: (s) => {
                    s.resources.richesse *= 0.75;
                    s.resources.renom *= 1.20;
                },
                log: "Vous protégez les routes face aux orques enhardis par la mort du Roi."
            },
            {
                label: "Se replier sur vos terres (+10% Richesse, -15% Espoir)",
                canAfford: (s) => s.resources.espoir > 10,
                effect: (s) => {
                    s.resources.richesse *= 1.10;
                    s.resources.espoir *= 0.85;
                },
                log: "Le chaos politique du Nord jette un voile d'incertitude sur vos sujets."
            }
        ]
    },
    {
        id: "age2_28_depart_derniers_noldor",
        title: "Le Crépuscule des Rois",
        description: "Blessés par la perte de Gil-galad, de nombreux hauts elfes décident de quitter définitivement le domaine vers l'Ouest.",
        repeatable: false,
        condition: (gameState) => gameState.meta.current_age === 2 && (gameState.state.current_year >= 100 && gameState.population.elfes > 10),
        choices: [
            {
                label: "Offrir une garde d'honneur (-15% Richesse, +30% Renom, -20% Elfes)",
                canAfford: (s) => s.resources.richesse > 10,
                effect: (s) => {
                    s.resources.richesse *= 0.85;
                    s.resources.renom *= 1.30;
                    s.population.elfes *= 0.80;
                },
                log: "Leur départ affaiblit votre puissance magique, mais leur bénédiction demeure."
            },
            {
                label: "Tenter de les retenir (-30% Elfes, -30% Espoir, +10 Ombre)",
                canAfford: (s) => s.resources.espoir > 10,
                effect: (s) => {
                    s.population.elfes *= 0.70;
                    s.resources.espoir *= 0.70;
                    s.state.shadow_level = clamp(s.state.shadow_level + 10, 0, 100);
                },
                log: "La contrainte brise l'amitié. Ils partent en vous maudissant."
            }
        ]
    },
    {
        id: "age2_29_choix_heritage_ere",
        title: "L'Aube d'une Nouvelle Ère",
        description: "Le monde est remodelé. L'Âge touche à sa fin, le Grand Projet vous appelle.",
        repeatable: false,
        condition: (gameState) => gameState.meta.current_age === 2 && (gameState.state.current_year >= 100),
        choices: [
            {
                label: "Rassembler des reliques sacrées (-30% Richesse, +60% Savoir)",
                canAfford: (s) => s.resources.richesse > 10,
                effect: (s) => {
                    s.resources.richesse *= 0.70;
                    s.resources.savoir *= 1.60;
                },
                log: "Vos successeurs hériteront de parchemins et d'objets protecteurs cruciaux."
            },
            {
                label: "Léguer une forteresse imprenable (+50% Renom, +20% Espoir)",
                canAfford: () => true,
                effect: (s) => {
                    s.resources.renom *= 1.50;
                    s.resources.espoir *= 1.20;
                },
                log: "Vous transmettez un bastion de pierre et une discipline militaire de fer."
            }
        ]
    };
// ==========================================
    // 6. ÉVÉNEMENTS NARRATIFS UNIQUES (Âge 3)
    // Le Crépuscule, la Guerre de l'Anneau et la Fin des Temps.
    // Conversion totale en % pour maintenir le drame en Late Game.
    // ==========================================
    {
        id: "age3_01_fardeau",
        title: "L'Héritage des Ruines",
        description: "Le Troisième Âge s'ouvre sur un monde fragmenté. Les grands empires d'autrefois ne sont plus que des souvenirs gravés sur des tombes. Il faut choisir la posture de vos premiers veilleurs.",
        repeatable: false,
        condition: (gameState) => gameState.meta.current_age === 3 && (gameState.state.current_year >= 1),
        choices: [
            {
                label: "Conserver les reliques du passé (-30% Richesse, +50% Savoir)",
                canAfford: (s) => s.resources.richesse > 10,
                effect: (s) => {
                    s.resources.richesse *= 0.70;
                    s.resources.savoir *= 1.50;
                },
                log: "Vous choisissez la voie de l'érudition et de la mémoire sacrée."
            },
            {
                label: "Fortifier les cols et les accès (+40% Renom, -10% Espoir)",
                canAfford: (s) => s.resources.espoir > 10,
                effect: (s) => {
                    s.resources.renom *= 1.40;
                    s.resources.espoir *= 0.90;
                },
                log: "Vous transformez vos cités en bastions austères, prêts pour l'usure du temps."
            }
        ]
    },
    {
        id: "age3_02_istari_arrivee",
        title: "Les Envoyés de l'Ouest",
        description: "Cinq voyageurs étranges débarquent aux Havres Gris. L'un d'eux, habillé de gris et appuyé sur un bâton, demande à consulter vos cartes.",
        repeatable: false,
        condition: (gameState) => gameState.meta.current_age === 3 && (gameState.state.current_year >= 5),
        choices: [
            {
                label: "Lui ouvrir vos cartes de géographie (+60% Savoir, +30% Espoir)",
                canAfford: () => true,
                effect: (s) => {
                    s.resources.savoir *= 1.60;
                    s.resources.espoir *= 1.30;
                },
                log: "Le magicien a partagé des paroles de réconfort. Un vent d'espoir souffle sur le domaine."
            },
            {
                label: "Le traiter comme un vagabond suspect (-15% Espoir)",
                canAfford: (s) => s.resources.espoir > 10,
                effect: (s) => {
                    s.resources.espoir *= 0.85;
                },
                log: "Il continue sa route en s'appuyant sur son bâton, le visage empreint de tristesse."
            },
            {
                label: "Le soumettre à une épreuve de volonté (Risqué)",
                canAfford: () => true,
                effect: (s) => {
                    if (Math.random() < 0.5) {
                        s.resources.savoir *= 1.80;
                        s.resources.renom *= 1.30;
                    } else {
                        s.resources.espoir *= 0.60;
                        s.state.shadow_level = clamp(s.state.shadow_level + 15, 0, 100);
                    }
                },
                log: "Le Pèlerin a réagi de manière impressionnante face à votre défiance."
            }
        ]
    },
    {
        id: "age3_03_rohan_naissance",
        title: "Les Fils d'Eorl",
        description: "Une tribu de cavaliers venus du Grand Nord cherche des plaines pour faire paître leurs chevaux. Le Gondor leur offre des terres, et ils demandent votre bénédiction.",
        repeatable: false,
        condition: (gameState) => gameState.meta.current_age === 3 && (gameState.state.current_year >= 10),
        choices: [
            {
                label: "Envoyer des présents de bienvenue (-25% Richesse, +40% Renom)",
                canAfford: (s) => s.resources.richesse > 10,
                effect: (s) => {
                    s.resources.richesse *= 0.75;
                    s.resources.renom *= 1.40;
                },
                log: "Une alliance de sang et de fidélité se dessine avec les Seigneurs des Chevaux."
            },
            {
                label: "Ignorer ces barbares nomades (-15% Renom)",
                canAfford: (s) => s.resources.renom > 10,
                effect: (s) => {
                    s.resources.renom *= 0.85;
                },
                log: "Ils s'installent dans les plaines du sud, ignorant désormais votre existence."
            }
        ]
    },
    {
        id: "age3_04_grand_peste",
        title: "L'Ombre Invisible",
        description: "Une peste noire venue de l'Est décime les cités du Gondor et se rapproche de vos frontières. Les villages se dépeuplent à vue d'œil.",
        repeatable: false,
        condition: (gameState) => gameState.meta.current_age === 3 && (gameState.state.current_year >= 15 && gameState.population.hommes > 40),
        choices: [
            {
                label: "Acheter les secrets des herboristes elfes (-40% Richesse, +20% Espoir)",
                canAfford: (s) => s.resources.richesse > 10,
                effect: (s) => {
                    s.resources.richesse *= 0.60;
                    s.resources.espoir *= 1.20;
                },
                log: "Le remède limite les pertes et rassure la population terrifiée."
            },
            {
                label: "Fermer les frontières et fuir (-20% Hommes, -30% Espoir)",
                canAfford: (s) => s.population.hommes > 10 && s.resources.espoir > 10,
                effect: (s) => {
                    s.population.hommes *= 0.80;
                    s.resources.espoir *= 0.70;
                },
                log: "Les tombes se multiplient. Les survivants sont plongés dans la mélancolie."
            }
        ]
    },
    {
        id: "age3_05_angmar_guerre",
        title: "Le Roi-Sorcier",
        description: "Un royaume maléfique s'est élevé dans les landes glacées du Nord, mené par le premier des spectres de l'Anneau. Le Nord appelle à l'aide.",
        repeatable: false,
        condition: (gameState) => gameState.meta.current_age === 3 && (gameState.state.current_year >= 20 && gameState.population.hommes > 20),
        choices: [
            {
                label: "Envoyer vos guerriers au secours de l'Arnor (-15% Hommes, +60% Renom)",
                canAfford: (s) => s.population.hommes > 10,
                effect: (s) => {
                    s.population.hommes *= 0.85;
                    s.resources.renom *= 1.60;
                },
                log: "Le Nord est dévasté, mais vos lignes ont permis de sauver la lignée des rois."
            },
            {
                label: "Murer le domaine dans son isolement (-20% Renom, +10 Ombre)",
                canAfford: (s) => s.resources.renom > 10,
                effect: (s) => {
                    s.resources.renom *= 0.80;
                    s.state.shadow_level = clamp(s.state.shadow_level + 10, 0, 100);
                },
                log: "L'Arnor s'effondre dans les ruines. La menace se rapproche de vous."
            }
        ]
    },
    {
        id: "age3_06_moria_ombre",
        title: "Le Fléau de Durin",
        description: "Un grondement sourd retentit sous les Montagnes Brumeuses. Les Nains fuient en masse la Moria, fuyant une terreur de feu.",
        repeatable: false,
        condition: (gameState) => gameState.meta.current_age === 3 && (gameState.state.current_year >= 25),
        choices: [
            {
                label: "Accueillir les mineurs exilés (+40% Savoir, +20% Richesse, -10% Espoir)",
                canAfford: (s) => s.resources.espoir > 10,
                effect: (s) => {
                    s.resources.savoir *= 1.40;
                    s.resources.richesse *= 1.20;
                    s.resources.espoir *= 0.90;
                },
                log: "Leurs artisans enrichissent vos forges, mais leur désespoir est contagieux."
            },
            {
                label: "Leur refuser l'asile par peur (-25% Renom)",
                canAfford: (s) => s.resources.renom > 10,
                effect: (s) => {
                    s.resources.renom *= 0.75;
                },
                log: "Les Nains errent dans la nature, maudissant la lâcheté des Hommes."
            }
        ]
    },
    {
        id: "age3_07_gondor_sans_roi",
        title: "Le Trône Vide",
        description: "Le dernier roi du Gondor a disparu en relevant le défi du Roi-Sorcier. Ce sont désormais les Intendants qui gouvernent.",
        repeatable: false,
        condition: (gameState) => gameState.meta.current_age === 3 && (gameState.state.current_year >= 30 && gameState.resources.renom > 30),
        choices: [
            {
                label: "Soutenir l'autorité des Intendants (+40% Renom, -20% Richesse)",
                canAfford: (s) => s.resources.richesse > 10,
                effect: (s) => {
                    s.resources.renom *= 1.40;
                    s.resources.richesse *= 0.80;
                },
                log: "Vous stabilisez la politique des Hommes en finançant les messagers."
            },
            {
                label: "Laisser le chaos s'installer (-20% Espoir, +5 Ombre)",
                canAfford: (s) => s.resources.espoir > 10,
                effect: (s) => {
                    s.resources.espoir *= 0.80;
                    s.state.shadow_level = clamp(s.state.shadow_level + 5, 0, 100);
                },
                log: "Le désordre grandit au Sud, affaiblissant le dernier rempart contre le Mordor."
            }
        ]
    },
    {
        id: "age3_08_foret_noire_araignees",
        title: "La Toile Épaisse",
        description: "La grande forêt verte s'est assombrie, envahie par des araignées géantes issues de Dol Guldur. Le commerce sylvestre meurt.",
        repeatable: false,
        condition: (gameState) => gameState.meta.current_age === 3 && (gameState.state.current_year >= 35),
        choices: [
            {
                label: "Financer des patrouilles (-30% Richesse, +30% Renom)",
                canAfford: (s) => s.resources.richesse > 10,
                effect: (s) => {
                    s.resources.richesse *= 0.70;
                    s.resources.renom *= 1.30;
                },
                log: "Les routes restent praticables au prix d'efforts constants de vos soldats."
            },
            {
                label: "Abandonner la lisière (-25% Richesse, +10 Ombre)",
                canAfford: (s) => s.resources.richesse > 10,
                effect: (s) => {
                    s.resources.richesse *= 0.75;
                    s.state.shadow_level = clamp(s.state.shadow_level + 10, 0, 100);
                },
                log: "La forêt gagne du terrain, sombre, rampante et étouffante."
            }
        ]
    },
    {
        id: "age3_09_relique_perdue",
        title: "L'Épée Brisée",
        description: "Des éclaireurs rapportent qu'un fragment d'Andúril est enfoui dans de vieilles ruines infestées de trolls.",
        repeatable: false,
        condition: (gameState) => gameState.meta.current_age === 3 && (gameState.state.current_year >= 40 && gameState.resources.savoir > 60),
        choices: [
            {
                label: "Envoyer une expédition d'érudits (-10% Hommes, +80% Savoir, +40% Renom)",
                canAfford: (s) => s.population.hommes > 10,
                effect: (s) => {
                    s.population.hommes *= 0.90;
                    s.resources.savoir *= 1.80;
                    s.resources.renom *= 1.40;
                },
                log: "Le fragment est retrouvé et placé en sécurité. L'honneur du passé est sauf."
            },
            {
                label: "Laisser la relique dans la boue (-20% Renom, +5 Ombre)",
                canAfford: (s) => s.resources.renom > 10,
                effect: (s) => {
                    s.resources.renom *= 0.80;
                    s.state.shadow_level = clamp(s.state.shadow_level + 5, 0, 100);
                },
                log: "Le souvenir des anciens rois s'efface un peu plus du monde."
            }
        ]
    },
    {
        id: "age3_10_dragon_erebor",
        title: "La Chute de la Montagne",
        description: "Un dragon de feu, Smaug le Doré, s'est abattu sur la montagne d'Erebor, massacrant les Nains et les Hommes.",
        repeatable: false,
        condition: (gameState) => gameState.meta.current_age === 3 && (gameState.state.current_year >= 45),
        choices: [
            {
                label: "Fournir des vivres aux réfugiés (-40% Richesse, +40% Espoir)",
                canAfford: (s) => s.resources.richesse > 10,
                effect: (s) => {
                    s.resources.richesse *= 0.60;
                    s.resources.espoir *= 1.40;
                },
                log: "Vous sauvez des milliers de vies de la misère du givre."
            },
            {
                label: "Profiter de la crise (+80% Richesse, -40% Renom, +20 Ombre)",
                canAfford: (s) => s.resources.renom > 10,
                effect: (s) => {
                    s.resources.richesse *= 1.80;
                    s.resources.renom *= 0.60;
                    s.state.shadow_level = clamp(s.state.shadow_level + 20, 0, 100);
                },
                log: "Vous vous enrichissez de la misère des autres. L'Ombre jubile."
            }
        ]
    },
    {
        id: "age3_11_conseil_blanc",
        title: "L'Alliance des Sages",
        description: "Saroumane le Blanc et Elrond convoquent les grands esprits pour analyser la puissance grandissante du Nécromancien.",
        repeatable: false,
        condition: (gameState) => gameState.meta.current_age === 3 && (gameState.state.current_year >= 50 && gameState.resources.savoir > 100),
        choices: [
            {
                label: "Envoyer vos rapports à Saroumane (+60% Savoir, +25% Renom)",
                canAfford: () => true,
                effect: (s) => {
                    s.resources.savoir *= 1.60;
                    s.resources.renom *= 1.25;
                },
                log: "Votre érudition est saluée par le chef de l'Ordre des Magiciens."
            },
            {
                label: "Garder vos connaissances secrètes (+20% Savoir)",
                canAfford: () => true,
                effect: (s) => {
                    s.resources.savoir *= 1.20;
                },
                log: "Vous préférez rester en dehors des querelles des puissants."
            }
        ]
    },
    {
        id: "age3_12_rodeurs_du_nord",
        title: "Les Lignées Cachées",
        description: "Les derniers descendants d'Arnor vivent cachés sous l'apparence de Rôdeurs. Ils demandent des lances pour leur veille.",
        repeatable: false,
        condition: (gameState) => gameState.meta.current_age === 3 && (gameState.state.current_year >= 55 && gameState.resources.richesse > 50),
        choices: [
            {
                label: "Leur offrir vos meilleures armes (-40% Richesse, +40% Espoir)",
                canAfford: (s) => s.resources.richesse > 10,
                effect: (s) => {
                    s.resources.richesse *= 0.60;
                    s.resources.espoir *= 1.40;
                },
                log: "En secret, ces rois sans couronne protègent vos villages des pires monstres."
            },
            {
                label: "Les chasser comme des mendiants (-20% Espoir)",
                canAfford: (s) => s.resources.espoir > 10,
                effect: (s) => {
                    s.resources.espoir *= 0.80;
                },
                log: "La frontière nord devient une passoire. La terreur s'infiltre."
            }
        ]
    },
    {
        id: "age3_13_saroumane_isengard",
        title: "L'Orgueil d'Orthanc",
        description: "Saroumane s'installe définitivement en Isengard. Il propose d'acheter toutes vos anciennes chroniques pour un prix d'or.",
        repeatable: false,
        condition: (gameState) => gameState.meta.current_age === 3 && (gameState.state.current_year >= 60 && gameState.resources.savoir > 50),
        choices: [
            {
                label: "Lui vendre vos parchemins (+80% Richesse, -35% Savoir, +15 Ombre)",
                canAfford: (s) => s.resources.savoir > 10,
                effect: (s) => {
                    s.resources.richesse *= 1.80;
                    s.resources.savoir *= 0.65;
                    s.state.shadow_level = clamp(s.state.shadow_level + 15, 0, 100);
                },
                log: "L'or emplit vos caisses, mais vos érudits pleurent la perte de l'histoire."
            },
            {
                label: "Refuser de céder vos écrits sacrés (+40% Savoir, +20% Espoir)",
                canAfford: () => true,
                effect: (s) => {
                    s.resources.savoir *= 1.40;
                    s.resources.espoir *= 1.20;
                },
                log: "Saroumane vous regarde désormais avec une froideur méprisante."
            }
        ]
    },
    {
        id: "age3_14_balade_hobbit",
        title: "Le Récit du Semi-Homme",
        description: "Un mage gris accompagne un petit Hobbit qui prétend avoir trompé un dragon et trouvé une bague magique dans les cavernes.",
        repeatable: false,
        condition: (gameState) => gameState.meta.current_age === 3 && (gameState.state.current_year >= 65),
        choices: [
            {
                label: "Consigner ce récit extraordinaire (+50% Savoir, +20% Espoir)",
                canAfford: () => true,
                effect: (s) => {
                    s.resources.savoir *= 1.50;
                    s.resources.espoir *= 1.20;
                },
                log: "Vos scribes rient de ces contes, mais l'histoire retiendra ce nom."
            },
            {
                label: "Chasser ces conteurs d'histoires (-10% Espoir)",
                canAfford: (s) => s.resources.espoir > 10,
                effect: (s) => {
                    s.resources.espoir *= 0.90;
                },
                log: "Vous passez à côté de l'événement qui va changer le destin du monde."
            }
        ]
    },
    {
        id: "age3_15_retour_mordor",
        title: "L'Oeil s'Ouvre",
        description: "Les trois spectres de l'Anneau réoccupent le Mordor. Les ciels du Sud se teintent de fumées noires permanentes.",
        repeatable: false,
        condition: (gameState) => gameState.meta.current_age === 3 && (gameState.state.current_year >= 70 && gameState.resources.espoir > 30),
        choices: [
            {
                label: "Doublez la solde des sentinelles (-30% Richesse, +20% Renom)",
                canAfford: (s) => s.resources.richesse > 10,
                effect: (s) => {
                    s.resources.richesse *= 0.70;
                    s.resources.renom *= 1.20;
                },
                log: "La discipline maintient le calme face à la panique qui vient."
            },
            {
                label: "Rationner l'espoir et prier (-20% Espoir, +5 Ombre)",
                canAfford: (s) => s.resources.espoir > 10,
                effect: (s) => {
                    s.resources.espoir *= 0.80;
                    s.state.shadow_level = clamp(s.state.shadow_level + 5, 0, 100);
                },
                log: "La population s'enfonce doucement dans la léthargie du désespoir."
            }
        ]
    },
    {
        id: "age3_16_nazgul_chevauchee",
        title: "Les Cavaliers Noirs",
        description: "Neuf ombres vêtues de haillons noirs traversent vos plaines à bride abattue, cherchant un pays nommé 'Comté'.",
        repeatable: false,
        condition: (gameState) => gameState.meta.current_age === 3 && (gameState.state.current_year >= 75),
        choices: [
            {
                label: "Faire sonner les cloches de panique (-20% Espoir)",
                canAfford: (s) => s.resources.espoir > 10,
                effect: (s) => {
                    s.resources.espoir *= 0.80;
                },
                log: "Votre peuple se terre chez lui, évitant de croiser le regard des spectres."
            },
            {
                label: "Tenter de leur barrer la route (-10% Hommes, +50% Renom)",
                canAfford: (s) => s.population.hommes > 10,
                effect: (s) => {
                    s.population.hommes *= 0.90;
                    s.resources.renom *= 1.50;
                },
                log: "Vos braves ont affronté l'effroi pur. Peu ont survécu à leur lame empoisonnée."
            }
        ]
    },
    {
        id: "age3_17_minas_ithil_chute",
        title: "La Tour de la Lune de Sang",
        description: "La cité de Minas Ithil tombe et devient Minas Morgul, la tour de la sorcellerie. Une lueur verte illumine les nuits.",
        repeatable: false,
        condition: (gameState) => gameState.meta.current_age === 3 && (gameState.state.current_year >= 78),
        choices: [
            {
                label: "Financer les fortifications (-40% Richesse, +30% Renom)",
                canAfford: (s) => s.resources.richesse > 10,
                effect: (s) => {
                    s.resources.richesse *= 0.60;
                    s.resources.renom *= 1.30;
                },
                log: "Vous aidez à dresser la dernière ligne de défense des Hommes."
            },
            {
                label: "S'enfoncer dans l'impuissance (-25% Espoir, +10 Ombre)",
                canAfford: (s) => s.resources.espoir > 10,
                effect: (s) => {
                    s.resources.espoir *= 0.75;
                    s.state.shadow_level = clamp(s.state.shadow_level + 10, 0, 100);
                },
                log: "La lueur verte semble consumer lentement l'espoir de vos sujets."
            }
        ]
    },
    {
        id: "age3_18_depart_fondcombe",
        title: "Les Havres Appellent",
        description: "Elrond se prépare à quitter Fondcombe pour toujours. Il propose d'emmener vos derniers enfants elfes.",
        repeatable: false,
        condition: (gameState) => gameState.meta.current_age === 3 && (gameState.state.current_year >= 82 && gameState.population.elfes > 10),
        choices: [
            {
                label: "Les laisser partir (-10% Elfes, +30% Renom, -20% Espoir)",
                canAfford: (s) => s.population.elfes > 10 && s.resources.espoir > 10,
                effect: (s) => {
                    s.population.elfes *= 0.90;
                    s.resources.renom *= 1.30;
                    s.resources.espoir *= 0.80;
                },
                log: "Vous acceptez le crépuscule de la magie chez vous pour assurer leur salut."
            },
            {
                label: "Les forcer à rester (+10% Elfes, -30% Espoir, +15 Ombre)",
                canAfford: (s) => s.resources.espoir > 10,
                effect: (s) => {
                    s.population.elfes *= 1.10;
                    s.resources.espoir *= 0.70;
                    s.state.shadow_level = clamp(s.state.shadow_level + 15, 0, 100);
                },
                log: "Leur chant devient triste et amer, la magie s'éteint dans la contrainte."
            }
        ]
    },
    {
        id: "age3_19_trahison_isengard",
        title: "L'Effondrement du Blanc",
        description: "Saroumane s'est allié au Mordor. Sa forteresse produit des monstres hybrides qui attaquent le Rohan. Les repères s'effacent.",
        repeatable: false,
        condition: (gameState) => gameState.meta.current_age === 3 && (gameState.state.current_year >= 85),
        choices: [
            {
                label: "Envoyer des messages d'alerte (-20% Richesse, +30% Savoir)",
                canAfford: (s) => s.resources.richesse > 10,
                effect: (s) => {
                    s.resources.richesse *= 0.80;
                    s.resources.savoir *= 1.30;
                },
                log: "Vous tentez de coordonner la résistance face à la trahison."
            },
            {
                label: "Nier l'évidence par peur (-25% Espoir, +10 Ombre)",
                canAfford: (s) => s.resources.espoir > 10,
                effect: (s) => {
                    s.resources.espoir *= 0.75;
                    s.state.shadow_level = clamp(s.state.shadow_level + 10, 0, 100);
                },
                log: "Le doute s'installe. Si le plus sage capitule, comment espérer vaincre ?"
            }
        ]
    },
    {
        id: "age3_20_guerre_anneau_debut",
        title: "Le Grand Orage",
        description: "Le Gondor allume les feux d'alarme. Le Mordor lance ses milliers d'orques sur Minas Tirith. C'est l'heure.",
        repeatable: false,
        condition: (gameState) => gameState.meta.current_age === 3 && (gameState.state.current_year >= 90 && gameState.population.hommes > 30),
        choices: [
            {
                label: "Mobiliser vos dernières forces (-20% Hommes, +80% Renom)",
                canAfford: (s) => s.population.hommes > 10,
                effect: (s) => {
                    s.population.hommes *= 0.80;
                    s.resources.renom *= 1.80;
                },
                log: "Vos bannières marchent vers la dernière guerre de cet Âge."
            },
            {
                label: "Défendre vos propres greniers (+10% Richesse, -35% Renom, -25% Espoir)",
                canAfford: (s) => s.resources.renom > 10 && s.resources.espoir > 10,
                effect: (s) => {
                    s.resources.richesse *= 1.10;
                    s.resources.renom *= 0.65;
                    s.resources.espoir *= 0.75;
                },
                log: "Vous attendez la fin, tapi dans votre coin de terre stérile."
            }
        ]
    },
    {
        id: "age3_21_rohan_charge",
        title: "Les Sabots de l'Aube",
        description: "Les rumeurs affirment que les cavaliers du Rohan ont brisé le siège du Gondor. Le Roi est mort, mais la cité tient.",
        repeatable: false,
        condition: (gameState) => gameState.meta.current_age === 3 && (gameState.state.current_year >= 92),
        choices: [
            {
                label: "Sonner le clairon de la joie (+50% Espoir, +20% Renom)",
                canAfford: () => true,
                effect: (s) => {
                    s.resources.espoir *= 1.50;
                    s.resources.renom *= 1.20;
                },
                log: "Un frisson de fierté traverse le domaine. Les Hommes résistent encore."
            },
            {
                label: "Attendre la suite avec prudence (-10% Espoir)",
                canAfford: (s) => s.resources.espoir > 10,
                effect: (s) => {
                    s.resources.espoir *= 0.90;
                },
                log: "La guerre n'est pas finie, la peur dicte vos silences."
            }
        ]
    },
    {
        id: "age3_22_porte_noire_defis",
        title: "La Dernière Chance",
        description: "Une armée désespérée marche vers la Porte Noire du Mordor pour attirer le Regard de l'Ennemi.",
        repeatable: false,
        condition: (gameState) => gameState.meta.current_age === 3 && (gameState.state.current_year >= 95),
        choices: [
            {
                label: "Envoyer vos soldats se sacrifier (-15% Hommes, +100% Renom)",
                canAfford: (s) => s.population.hommes > 10,
                effect: (s) => {
                    s.population.hommes *= 0.85;
                    s.resources.renom *= 2.00;
                },
                log: "Vous donnez tout ce qu'il vous reste pour une cause invisible."
            },
            {
                label: "Garder vos hommes (+20% Espoir, -35% Renom)",
                canAfford: (s) => s.resources.renom > 10,
                effect: (s) => {
                    s.resources.espoir *= 1.20;
                    s.resources.renom *= 0.65;
                },
                log: "Vous refusez ce qui semble être un suicide collectif."
            }
        ]
    },
    {
        id: "age3_23_destruction_anneau",
        title: "La Chute de la Tour",
        description: "Un cri surnaturel déchire la planète. L'Anneau Unique est détruit. Le Seigneur Sombre s'évanouit dans le néant.",
        repeatable: false,
        condition: (gameState) => gameState.meta.current_age === 3 && (gameState.state.current_year >= 96),
        choices: [
            {
                label: "Décréter la fête nationale (+100% Espoir, +40% Renom, -30% Richesse)",
                canAfford: (s) => s.resources.richesse > 10,
                effect: (s) => {
                    s.resources.espoir *= 2.00;
                    s.resources.renom *= 1.40;
                    s.resources.richesse *= 0.70;
                    s.state.shadow_level = 0;
                },
                log: "Les larmes de joie coulent. L'Ombre s'effondre instantanément partout."
            },
            {
                label: "S'effondrer de soulagement (+40% Espoir)",
                canAfford: () => true,
                effect: (s) => {
                    s.resources.espoir *= 1.40;
                    s.state.shadow_level = 0;
                },
                log: "Le poids de trois millénaires de terreur s'efface d'un coup."
            }
        ]
    },
    {
        id: "age3_24_couronnement_roi",
        title: "Le Retour du Roi",
        description: "Le Rôdeur du Nord a été couronné sous le nom d'Aragorn Elessar. Les deux royaumes sont réunis.",
        repeatable: false,
        condition: (gameState) => gameState.meta.current_age === 3 && (gameState.state.current_year >= 97 && gameState.resources.renom > 40),
        choices: [
            {
                label: "Aller prêter serment au Roi (-30% Richesse, +80% Renom, +40% Espoir)",
                canAfford: (s) => s.resources.richesse > 10,
                effect: (s) => {
                    s.resources.richesse *= 0.70;
                    s.resources.renom *= 1.80;
                    s.resources.espoir *= 1.40;
                },
                log: "Vous intégrez la Pax Romana de la Terre du Milieu restaurée."
            },
            {
                label: "Garder votre autonomie (+20% Richesse, -30% Renom)",
                canAfford: (s) => s.resources.renom > 10,
                effect: (s) => {
                    s.resources.richesse *= 1.20;
                    s.resources.renom *= 0.70;
                },
                log: "Le Roi respecte votre indépendance, mais vous restez en marge de la Renaissance."
            }
        ]
    },
    {
        id: "age3_25_comte_epuration",
        title: "Le Dernier Sursaut de la Vermine",
        description: "Des brigands pillent la Comté des Hobbits. Le Roi interdit d'y envoyer l'armée.",
        repeatable: false,
        condition: (gameState) => gameState.meta.current_age === 3 && (gameState.state.current_year >= 98),
        choices: [
            {
                label: "Envoyer des provisions en secret (-25% Richesse, +30% Espoir)",
                canAfford: (s) => s.resources.richesse > 10,
                effect: (s) => {
                    s.resources.richesse *= 0.75;
                    s.resources.espoir *= 1.30;
                },
                log: "Vous aidez les Semi-hommes à libérer leur Comté en secret."
            },
            {
                label: "Laisser faire la justice de la nature (+15% Richesse)",
                canAfford: () => true,
                effect: (s) => {
                    s.resources.richesse *= 1.15;
                },
                log: "Les petits villages brûlent, mais les Hobbits finissent par l'emporter."
            }
        ]
    },
    {
        id: "age3_26_depart_porteurs",
        title: "Le Dernier Navire",
        description: "Les porteurs de l'Anneau montent à bord d'un navire blanc aux Havres Gris. C'est la fin des choses anciennes.",
        repeatable: false,
        condition: (gameState) => gameState.meta.current_age === 3 && (gameState.state.current_year >= 99 && gameState.population.elfes > 0),
        choices: [
            {
                label: "Esquisser un geste d'adieu (-15% Elfes, +40% Savoir, -25% Espoir)",
                canAfford: (s) => s.resources.espoir > 10,
                effect: (s) => {
                    s.population.elfes *= 0.85;
                    s.resources.savoir *= 1.40;
                    s.resources.espoir *= 0.75;
                },
                log: "Les derniers Elfes quittent vos forêts. Le monde devient purement humain."
            },
            {
                label: "Fermer les yeux pour ne pas pleurer (-15% Espoir)",
                canAfford: (s) => s.resources.espoir > 10,
                effect: (s) => {
                    s.resources.espoir *= 0.85;
                },
                log: "Le navire s'évanouit à l'horizon. L'air perd sa dernière once de magie."
            }
        ]
    },
    {
        id: "age3_27_quatrieme_age_aube",
        title: "L'Âge des Hommes",
        description: "Le Troisième Âge se ferme. Le monde appartient désormais à la responsabilité humaine. Le Grand Projet final vous attend.",
        repeatable: false,
        condition: (gameState) => gameState.meta.current_age === 3 && (gameState.state.current_year >= 100),
        choices: [
            {
                label: "Consacrer le domaine aux sciences (-40% Richesse, +80% Savoir)",
                canAfford: (s) => s.resources.richesse > 10,
                effect: (s) => {
                    s.resources.richesse *= 0.60;
                    s.resources.savoir *= 1.80;
                },
                log: "Vous tournez votre peuple vers l'avenir, la médecine et l'architecture."
            },
            {
                label: "Consacrer le domaine à la nature (+40% Espoir, +20% Richesse)",
                canAfford: () => true,
                effect: (s) => {
                    s.resources.espoir *= 1.40;
                    s.resources.richesse *= 1.20;
                },
                log: "Vous choisissez de vivre en harmonie simple avec la terre nourricière."
            }
        ]
    },
    {
        id: "age3_28_bilan_gardien",
        title: "Le Grand Livre du Gardien",
        description: "Toutes vos décisions ont été consignées. Les scribes relisent l'histoire de vos choix moraux.",
        repeatable: false,
        condition: (gameState) => gameState.meta.current_age === 3 && (gameState.state.current_year >= 100),
        choices: [
            {
                label: "Offrir le livre aux archives du Roi (+100% Renom)",
                canAfford: () => true,
                effect: (s) => {
                    s.resources.renom *= 2.00;
                },
                log: "Votre nom restera gravé à jamais parmi les grands protecteurs de la Terre du Milieu."
            },
            {
                label: "Le garder secret pour votre lignée (+40% Savoir)",
                canAfford: () => true,
                effect: (s) => {
                    s.resources.savoir *= 1.40;
                },
                log: "La sagesse accumulée reste un secret de famille bien gardé."
            }
        ]
    },
    {
        id: "age3_29_prestige_testament",
        title: "Le Legs du Troisième Âge",
        description: "Avant d'achever ce cycle, vous rédigez le testament qui accordera des bonus permanents pour vos futures réincarnations (New Game+).",
        repeatable: false,
        condition: (gameState) => gameState.meta.current_age === 3 && (gameState.state.current_year >= 100),
        choices: [
            {
                label: "Léguer un héritage de Sagesse (+100% Savoir)",
                canAfford: () => true,
                effect: (s) => {
                    s.resources.savoir *= 2.00;
                },
                log: "La complétion de votre Voie Finale (Projet) actera cette sagesse pour les ères futures."
            },
            {
                label: "Léguer un héritage d'Honneur (+100% Renom)",
                canAfford: () => true,
                effect: (s) => {
                    s.resources.renom *= 2.00;
                },
                log: "La complétion de votre Voie Finale (Projet) actera cette gloire pour les ères futures."
            }
        ]
    }
]; 