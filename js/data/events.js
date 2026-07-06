// ===========================================================
// COMPILATION AUTOMATIQUE DES CHRONIQUES DU GARDIEN
// Généré via le script de conversion Python
// ===========================================================

export const EVENTS = [
    {
        id: "quo_pluie_grise",
        title: "La Pluie Grise",
        description: "Un crachin froid et ininterrompu s'abat sur vos terres. La boue engloutit les routes, et le moral de votre peuple s'effrite.",
        repeatable: true,
        condition: (gameState) => Math.random() < 0.15,
        choices: [
            {
                label: "Allumer les grands âtres (-20 Richesse, +5 Espoir)",
                canAfford: (gameState) => gameState.resources.richesse >= 20,
                effect: (gameState) => {
        gameState.resources.richesse -= 20;
        gameState.resources.espoir += 5;
    },
                log: "Le feu a chassé l'humidité des os, mais le bois sec a un prix."
            },
            {
                label: "Endurer (-10 Espoir)",
                canAfford: (gameState) => gameState.resources.espoir >= 10,
                effect: (gameState) => {
        gameState.resources.espoir -= 10;
    },
                log: "Les chants se sont tus. La pluie semble ne jamais devoir cesser."
            }
        ]
    },
    {
        id: "quo_fievre_pale",
        title: "La Fièvre Pâle",
        description: "Une toux étrange se propage parmi les plus jeunes. Les guérisseurs manquent d'herbes pour faire baisser la fièvre.",
        repeatable: true,
        condition: (gameState) => Math.random() < 0.10 && gameState.population.hommes > 30,
        choices: [
            {
                label: "Acheter des herbes rares (-30 Richesse, +10 Espoir)",
                canAfford: (gameState) => gameState.resources.richesse >= 30,
                effect: (gameState) => {
        gameState.resources.richesse -= 30;
        gameState.resources.espoir += 10;
    },
                log: "L'or a payé la santé de vos enfants. Leurs rires résonnent à nouveau."
            },
            {
                label: "Isoler les malades (-15 Hommes, -10 Espoir)",
                canAfford: (gameState) => gameState.population.hommes >= 15 && gameState.resources.espoir >= 10,
                effect: (gameState) => {
        gameState.population.hommes = Math.max(0, gameState.population.hommes - 15);
        gameState.resources.espoir -= 10;
    },
                log: "La maladie s'est éteinte, mais elle a emporté les plus faibles."
            }
        ]
    },
    {
        id: "quo_recolte_or",
        title: "L'Été d'Or",
        description: "Le soleil a baigné vos terres, et les récoltes dépassent toutes les espérances. Les silos débordent.",
        repeatable: true,
        condition: (gameState) => Math.random() < 0.10,
        choices: [
            {
                label: "Stocker pour l'avenir (+50 Richesse, +10 Savoir)",
                canAfford: () => true,
                effect: (gameState) => {
        gameState.resources.richesse += 50;
        gameState.resources.savoir += 10;
    },
                log: "L'abondance est sagement mise de côté. Votre peuple apprend la prévoyance."
            },
            {
                label: "Organiser un grand banquet (+20 Richesse, +30 Espoir)",
                canAfford: () => true,
                effect: (gameState) => {
        gameState.resources.richesse += 20;
        gameState.resources.espoir += 30;
    },
                log: "La bière a coulé à flots. Cette nuit restera dans les mémoires."
            }
        ]
    },
    {
        id: "quo_feu_foret",
        title: "Le Ciel de Cendres",
        description: "Un été trop sec a déclenché un incendie dans la forêt. Les flammes menacent vos cabanes de bûcherons.",
        repeatable: true,
        condition: (gameState) => Math.random() < 0.10,
        choices: [
            {
                label: "Lutter contre les flammes (-10 Hommes, +15 Renom)",
                canAfford: (gameState) => gameState.population.hommes >= 10,
                effect: (gameState) => {
        gameState.population.hommes = Math.max(0, gameState.population.hommes - 10);
        gameState.resources.renom += 15;
    },
                log: "Le feu est vaincu, mais les brûlures ont fauché plusieurs de vos braves."
            },
            {
                label: "Laisser brûler la vieille forêt (-40 Richesse, +5 Ombre)",
                canAfford: (gameState) => gameState.resources.richesse >= 40,
                effect: (gameState) => {
        gameState.resources.richesse -= 40;
        gameState.state.shadow_level = Math.min(100, gameState.state.shadow_level + 5);
    },
                log: "Le bois est en cendres et la faune a fui. Le paysage est désolé."
            }
        ]
    },
    {
        id: "quo_fonte_neiges",
        title: "La Colère du Fleuve",
        description: "Au printemps, la fonte des neiges grossit les rivières qui menacent d'emporter le moulin principal.",
        repeatable: true,
        condition: (gameState) => Math.random() < 0.10,
        choices: [
            {
                label: "Renforcer les digues en urgence (-20 Richesse, +10 Renom)",
                canAfford: (gameState) => gameState.resources.richesse >= 20,
                effect: (gameState) => {
        gameState.resources.richesse -= 20;
        gameState.resources.renom += 10;
    },
                log: "Vos hommes ont travaillé dans l'eau glacée, mais le moulin est sauvé."
            },
            {
                label: "Laisser les eaux monter (-40 Richesse, -10 Espoir)",
                canAfford: (gameState) => gameState.resources.richesse >= 40 && gameState.resources.espoir >= 10,
                effect: (gameState) => {
        gameState.resources.richesse -= 40;
        gameState.resources.espoir -= 10;
    },
                log: "Le fleuve a emporté vos réserves. Il faudra rebâtir."
            }
        ]
    },
    {
        id: "quo_secheresse",
        title: "La Terre Craquelée",
        description: "Aucune pluie n'est tombée depuis des mois. Les puits s'assèchent et le blé jaunit sur tige.",
        repeatable: true,
        condition: (gameState) => Math.random() < 0.10,
        choices: [
            {
                label: "Rationner l'eau strictement (-15 Espoir, +10 Savoir)",
                canAfford: (gameState) => gameState.resources.espoir >= 15,
                effect: (gameState) => {
        gameState.resources.espoir -= 15;
        gameState.resources.savoir += 10;
    },
                log: "La soif a endurci les cœurs, mais l'ordre a été maintenu."
            },
            {
                label: "Creuser de nouveaux puits profonds (-30 Richesse, +15 Espoir)",
                canAfford: (gameState) => gameState.resources.richesse >= 30,
                effect: (gameState) => {
        gameState.resources.richesse -= 30;
        gameState.resources.espoir += 15;
    },
                log: "L'eau claire a finalement jailli des profondeurs, au prix d'efforts immenses."
            }
        ]
    },
    {
        id: "quo_loups_hiver",
        title: "Les Hurlements Blancs",
        description: "Un hiver terrible pousse les meutes de loups à se rapprocher dangereusement de vos enclos.",
        repeatable: true,
        condition: (gameState) => Math.random() < 0.12,
        choices: [
            {
                label: "Organiser une grande traque (-10 Hommes, +20 Renom)",
                canAfford: (gameState) => gameState.population.hommes >= 10,
                effect: (gameState) => {
        gameState.population.hommes = Math.max(0, gameState.population.hommes - 10);
        gameState.resources.renom += 20;
    },
                log: "Les loups ont été repoussés, mais la neige s'est teintée de rouge."
            },
            {
                label: "Sacrifier du bétail pour les apaiser (-30 Richesse, +5 Ombre)",
                canAfford: (gameState) => gameState.resources.richesse >= 30,
                effect: (gameState) => {
        gameState.resources.richesse -= 30;
        gameState.state.shadow_level = Math.min(100, gameState.state.shadow_level + 5);
    },
                log: "Les bêtes ont mangé à leur faim et sont reparties, mais elles reviendront."
            }
        ]
    },
    {
        id: "quo_nuit_sans_etoiles",
        title: "La Nuit Opaque",
        description: "Une brume épaisse masque les étoiles. Une peur irrationnelle s'empare des habitants, qui n'osent plus sortir.",
        repeatable: true,
        condition: (gameState) => Math.random() < 0.08,
        choices: [
            {
                label: "Allumer des brasiers sur les collines (-20 Richesse, +15 Espoir)",
                canAfford: (gameState) => gameState.resources.richesse >= 20,
                effect: (gameState) => {
        gameState.resources.richesse -= 20;
        gameState.resources.espoir += 15;
    },
                log: "La lumière a percé les ténèbres et rassuré les âmes tremblantes."
            },
            {
                label: "Ignorer ces superstitions (-15 Espoir, +5 Ombre)",
                canAfford: (gameState) => gameState.resources.espoir >= 15,
                effect: (gameState) => {
        gameState.resources.espoir -= 15;
        gameState.state.shadow_level = Math.min(100, gameState.state.shadow_level + 5);
    },
                log: "La nuit est passée, mais l'angoisse a laissé une trace durable."
            }
        ]
    },
    {
        id: "quo_source_pure",
        title: "Le Don de la Terre",
        description: "Des bûcherons ont découvert une source d'eau claire aux reflets argentés, dont l'eau semble redonner des forces.",
        repeatable: true,
        condition: (gameState) => Math.random() < 0.08,
        choices: [
            {
                label: "L'aménager comme lieu de guérison (-20 Richesse, +40 Espoir)",
                canAfford: (gameState) => gameState.resources.richesse >= 20,
                effect: (gameState) => {
        gameState.resources.richesse -= 20;
        gameState.resources.espoir += 40;
    },
                log: "Les malades viennent y boire et retrouvent la vigueur d'antan."
            },
            {
                label: "L'exploiter secrètement pour vous (+30 Richesse, +10 Ombre)",
                canAfford: () => true,
                effect: (gameState) => {
        gameState.resources.richesse += 30;
        gameState.state.shadow_level = Math.min(100, gameState.state.shadow_level + 10);
    },
                log: "L'eau vous a enrichi, mais sa pureté s'est peu à peu ternie."
            }
        ]
    },
    {
        id: "quo_eboulement",
        title: "Le Cri de la Montagne",
        description: "Une paroi rocheuse a cédé près d'un sentier très fréquenté, bloquant la route marchande.",
        repeatable: true,
        condition: (gameState) => Math.random() < 0.10,
        choices: [
            {
                label: "Dégager la voie sans attendre (-30 Richesse, +15 Renom)",
                canAfford: (gameState) => gameState.resources.richesse >= 30,
                effect: (gameState) => {
        gameState.resources.richesse -= 30;
        gameState.resources.renom += 15;
    },
                log: "Le commerce a repris rapidement grâce à votre diligence."
            },
            {
                label: "Laisser les voyageurs se débrouiller (-20 Richesse, -10 Renom)",
                canAfford: (gameState) => gameState.resources.richesse >= 20 && gameState.resources.renom >= 10,
                effect: (gameState) => {
        gameState.resources.richesse -= 20;
        gameState.resources.renom -= 10;
    },
                log: "L'isolement appauvrit votre domaine, et votre nom est raillé."
            }
        ]
    },
    {
        id: "quo_essaim_sauterelles",
        title: "Le Nuage Noir",
        description: "Un essaim d'insectes voraces s'abat sur vos champs. Tout ce qui est vert risque de disparaître.",
        repeatable: true,
        condition: (gameState) => Math.random() < 0.08,
        choices: [
            {
                label: "Brûler les champs infestés (-50 Richesse, +15 Savoir)",
                canAfford: (gameState) => gameState.resources.richesse >= 50,
                effect: (gameState) => {
        gameState.resources.richesse -= 50;
        gameState.resources.savoir += 15;
    },
                log: "La récolte est perdue, mais l'essaim n'a pas pu se reproduire."
            },
            {
                label: "Prier pour qu'elles partent vite (-40 Richesse, -15 Espoir)",
                canAfford: (gameState) => gameState.resources.richesse >= 40 && gameState.resources.espoir >= 15,
                effect: (gameState) => {
        gameState.resources.richesse -= 40;
        gameState.resources.espoir -= 15;
    },
                log: "Elles ont tout dévoré avant de s'envoler, laissant la désolation derrière elles."
            }
        ]
    },
    {
        id: "quo_gibier_abondant",
        title: "La Marche des Cerfs",
        description: "Les chasseurs rapportent que les forêts regorgent de grand gibier cet automne. La viande ne manquera pas.",
        repeatable: true,
        condition: (gameState) => Math.random() < 0.12,
        choices: [
            {
                label: "Remplir les fumoirs (+40 Richesse, +10 Espoir)",
                canAfford: () => true,
                effect: (gameState) => {
        gameState.resources.richesse += 40;
        gameState.resources.espoir += 10;
    },
                log: "Les greniers sont pleins. L'hiver ne fait plus peur."
            },
            {
                label: "Inviter les tribus voisines à chasser (+15 Richesse, +25 Renom)",
                canAfford: () => true,
                effect: (gameState) => {
        gameState.resources.richesse += 15;
        gameState.resources.renom += 25;
    },
                log: "Le partage de la viande a forgé de solides amitiés avec vos voisins."
            }
        ]
    },
    {
        id: "quo_gel_tardif",
        title: "La Morsure du Givre",
        description: "Un gel inattendu frappe au milieu du printemps, figeant les jeunes pousses et tuant les bourgeons.",
        repeatable: true,
        condition: (gameState) => Math.random() < 0.10,
        choices: [
            {
                label: "Utiliser les vieilles réserves (-20 Richesse, +5 Espoir)",
                canAfford: (gameState) => gameState.resources.richesse >= 20,
                effect: (gameState) => {
        gameState.resources.richesse -= 20;
        gameState.resources.espoir += 5;
    },
                log: "Vous aviez prévu ce coup du sort. Le peuple est rassuré."
            },
            {
                label: "Laisser la faim s'installer (-10 Hommes, -15 Espoir)",
                canAfford: (gameState) => gameState.population.hommes >= 10 && gameState.resources.espoir >= 15,
                effect: (gameState) => {
        gameState.population.hommes = Math.max(0, gameState.population.hommes - 10);
        gameState.resources.espoir -= 15;
    },
                log: "Les ventres creux attisent la colère et le désespoir."
            }
        ]
    },
    {
        id: "quo_vent_froid",
        title: "La Bise Hurlante",
        description: "Une tempête de vent arrache les toits des granges et renverse de vieux arbres sur les routes.",
        repeatable: true,
        condition: (gameState) => Math.random() < 0.10,
        choices: [
            {
                label: "Financer des réparations solides (-30 Richesse, +10 Renom)",
                canAfford: (gameState) => gameState.resources.richesse >= 30,
                effect: (gameState) => {
        gameState.resources.richesse -= 30;
        gameState.resources.renom += 10;
    },
                log: "Les charpentiers ont œuvré sans relâche. Le village est plus fort qu'avant."
            },
            {
                label: "Faire avec les moyens du bord (-15 Richesse, -10 Espoir)",
                canAfford: (gameState) => gameState.resources.richesse >= 15 && gameState.resources.espoir >= 10,
                effect: (gameState) => {
        gameState.resources.richesse -= 15;
        gameState.resources.espoir -= 10;
    },
                log: "Les courants d'air glacent les maisons et les cœurs."
            }
        ]
    },
    {
        id: "quo_ours_agressif",
        title: "Le Monstre des Fourrés",
        description: "Un ours d'une taille anormale et au poil grisâtre rôde près des habitations, terrorisant les bûcherons.",
        repeatable: true,
        condition: (gameState) => Math.random() < 0.08,
        choices: [
            {
                label: "Mener la chasse vous-même (-5 Hommes, +30 Renom)",
                canAfford: (gameState) => gameState.population.hommes >= 5,
                effect: (gameState) => {
        gameState.population.hommes = Math.max(0, gameState.population.hommes - 5);
        gameState.resources.renom += 30;
    },
                log: "La bête est tombée, et sa fourrure orne désormais votre grand hall."
            },
            {
                label: "Interdire l'accès à la forêt (-20 Richesse, +5 Ombre)",
                canAfford: (gameState) => gameState.resources.richesse >= 20,
                effect: (gameState) => {
        gameState.resources.richesse -= 20;
        gameState.state.shadow_level = Math.min(100, gameState.state.shadow_level + 5);
    },
                log: "Le travail a cessé. La peur de la bête domine les esprits."
            }
        ]
    },
    {
        id: "quo_fete_moissons",
        title: "La Fête des Semailles",
        description: "C'est l'heure de célébrer le retour du printemps. Les villageois attendent vos largesses pour les festivités.",
        repeatable: true,
        condition: (gameState) => Math.random() < 0.10,
        choices: [
            {
                label: "Financer un festin princier (-30 Richesse, +30 Espoir)",
                canAfford: (gameState) => gameState.resources.richesse >= 30,
                effect: (gameState) => {
        gameState.resources.richesse -= 30;
        gameState.resources.espoir += 30;
    },
                log: "Les chants et les danses ont fait oublier les jours sombres."
            },
            {
                label: "Ne rien donner cette année (-20 Espoir, +5 Richesse)",
                canAfford: (gameState) => gameState.resources.espoir >= 20,
                effect: (gameState) => {
        gameState.resources.richesse += 5;
        gameState.resources.espoir -= 20;
    },
                log: "L'avarice a tué la fête. L'année commence dans la morosité."
            }
        ]
    },
    {
        id: "quo_arbres_malades",
        title: "La Lèpre de l'Écorce",
        description: "Une mousse noirâtre étouffe les grands arbres de la forêt ouest. Le bois devient friable et inutile.",
        repeatable: true,
        condition: (gameState) => Math.random() < 0.08,
        choices: [
            {
                label: "Abattre la zone infectée (-20 Richesse, +15 Savoir)",
                canAfford: (gameState) => gameState.resources.richesse >= 20,
                effect: (gameState) => {
        gameState.resources.richesse -= 20;
        gameState.resources.savoir += 15;
    },
                log: "Le sacrifice de ces vieux arbres a sauvé le reste de la forêt."
            },
            {
                label: "Attendre que le mal passe (-30 Richesse, +5 Ombre)",
                canAfford: (gameState) => gameState.resources.richesse >= 30,
                effect: (gameState) => {
        gameState.resources.richesse -= 30;
        gameState.state.shadow_level = Math.min(100, gameState.state.shadow_level + 5);
    },
                log: "La maladie s'est répandue, transformant la lisière en un bois mort."
            }
        ]
    },
    {
        id: "quo_nuit_claire",
        title: "Les Étoiles de Varda",
        description: "Une nuit d'une pureté exceptionnelle illumine le ciel. Les anciennes constellations brillent avec une intensité magique.",
        repeatable: true,
        condition: (gameState) => Math.random() < 0.05,
        choices: [
            {
                label: "S'assembler pour contempler (+40 Espoir, +10 Savoir)",
                canAfford: () => true,
                effect: (gameState) => {
        gameState.resources.espoir += 40;
        gameState.resources.savoir += 10;
    },
                log: "La beauté du firmament a ravivé la flamme dans tous les cœurs."
            },
            {
                label: "Obliger à travailler malgré tout (+15 Richesse, -10 Espoir)",
                canAfford: (gameState) => gameState.resources.espoir >= 10,
                effect: (gameState) => {
        gameState.resources.richesse += 15;
        gameState.resources.espoir -= 10;
    },
                log: "Les têtes sont restées baissées vers la terre, ignorant la lumière ancienne."
            }
        ]
    },
    {
        id: "quo_brouillard_epais",
        title: "Le Voile Gris",
        description: "Un brouillard si dense s'est levé qu'on ne voit pas à trois pas. Le travail dans les champs est impossible.",
        repeatable: true,
        condition: (gameState) => Math.random() < 0.10,
        choices: [
            {
                label: "Décréter des jours de repos (-15 Richesse, +15 Espoir)",
                canAfford: (gameState) => gameState.resources.richesse >= 15,
                effect: (gameState) => {
        gameState.resources.richesse -= 15;
        gameState.resources.espoir += 15;
    },
                log: "Les familles sont restées près du feu à se raconter de vieilles légendes."
            },
            {
                label: "Forcer les hommes à sortir (-10 Hommes, +10 Richesse)",
                canAfford: (gameState) => gameState.population.hommes >= 10,
                effect: (gameState) => {
        gameState.population.hommes = Math.max(0, gameState.population.hommes - 10);
        gameState.resources.richesse += 10;
    },
                log: "Plusieurs se sont perdus ou blessés dans la purée de pois."
            }
        ]
    },
    {
        id: "quo_pont_effondre",
        title: "Les Eaux Tumultueuses",
        description: "Le vieux pont de pierre franchissant le torrent ouest s'est effondré sous l'usure du temps.",
        repeatable: true,
        condition: (gameState) => Math.random() < 0.08,
        choices: [
            {
                label: "Faire construire un pont en arc (-40 Richesse, +20 Renom)",
                canAfford: (gameState) => gameState.resources.richesse >= 40,
                effect: (gameState) => {
        gameState.resources.richesse -= 40;
        gameState.resources.renom += 20;
    },
                log: "L'édifice est splendide et attirera de nouveaux voyageurs."
            },
            {
                label: "Bricoler une passerelle en bois (-10 Richesse, -5 Renom)",
                canAfford: (gameState) => gameState.resources.richesse >= 10 && gameState.resources.renom >= 5,
                effect: (gameState) => {
        gameState.resources.richesse -= 10;
        gameState.resources.renom -= 5;
    },
                log: "Cela suffira pour l'instant, mais c'est indigne d'un grand domaine."
            }
        ]
    },
    {
        id: "quo_troupeau_malade",
        title: "Le Mal des Bêtes",
        description: "Une maladie foudroyante frappe vos moutons. Leurs laines tombent et ils meurent en quelques jours.",
        repeatable: true,
        condition: (gameState) => Math.random() < 0.10,
        choices: [
            {
                label: "Abattre le troupeau infecté (-30 Richesse, +10 Savoir)",
                canAfford: (gameState) => gameState.resources.richesse >= 30,
                effect: (gameState) => {
        gameState.resources.richesse -= 30;
        gameState.resources.savoir += 10;
    },
                log: "La décision fut dure, mais elle a épargné les bêtes saines."
            },
            {
                label: "Tenter de les soigner (-15 Richesse, -10 Espoir)",
                canAfford: (gameState) => gameState.resources.richesse >= 15 && gameState.resources.espoir >= 10,
                effect: (gameState) => {
        gameState.resources.richesse -= 15;
        gameState.resources.espoir -= 10;
    },
                log: "Les remèdes ont échoué, et l'odeur de la mort empeste les pâturages."
            }
        ]
    },
    {
        id: "quo_orage_violent",
        title: "La Colère du Ciel",
        description: "Des éclairs déchirent la nuit et la foudre frappe votre plus haute tour, déclenchant un début d'incendie.",
        repeatable: true,
        condition: (gameState) => Math.random() < 0.12,
        choices: [
            {
                label: "L'éteindre sous la pluie battante (-5 Hommes, +10 Renom)",
                canAfford: (gameState) => gameState.population.hommes >= 5,
                effect: (gameState) => {
        gameState.population.hommes = Math.max(0, gameState.population.hommes - 5);
        gameState.resources.renom += 10;
    },
                log: "La tour tient bon, mais certains ont glissé sur les toits mouillés."
            },
            {
                label: "Laisser brûler le sommet (-20 Richesse, -15 Espoir)",
                canAfford: (gameState) => gameState.resources.richesse >= 20 && gameState.resources.espoir >= 15,
                effect: (gameState) => {
        gameState.resources.richesse -= 20;
        gameState.resources.espoir -= 15;
    },
                log: "La tour décapitée restera un triste rappel de la puissance des éléments."
            }
        ]
    },
    {
        id: "quo_champignons_toxiques",
        title: "Le Faux Pain",
        description: "Poussés par la faim, des cueilleurs ont ramené des champignons aux couleurs trompeuses. Plusieurs sont gravement malades.",
        repeatable: true,
        condition: (gameState) => Math.random() < 0.08,
        choices: [
            {
                label: "Payer les remèdes de la guérisseuse (-20 Richesse, +10 Espoir)",
                canAfford: (gameState) => gameState.resources.richesse >= 20,
                effect: (gameState) => {
        gameState.resources.richesse -= 20;
        gameState.resources.espoir += 10;
    },
                log: "Les potions ont été efficaces, et vous avez sauvé des vies."
            },
            {
                label: "Punir les cueilleurs pour leur ignorance (-10 Hommes, +5 Ombre)",
                canAfford: (gameState) => gameState.population.hommes >= 10,
                effect: (gameState) => {
        gameState.population.hommes = Math.max(0, gameState.population.hommes - 10);
        gameState.state.shadow_level = Math.min(100, gameState.state.shadow_level + 5);
    },
                log: "L'intransigeance a instauré un climat de terreur sourde."
            }
        ]
    },
    {
        id: "quo_source_tarie",
        title: "Le Puits Asséché",
        description: "Un de vos puits principaux ne remonte plus que de la boue rocailleuse.",
        repeatable: true,
        condition: (gameState) => Math.random() < 0.08,
        choices: [
            {
                label: "Payer des Nains pour forer la roche (-40 Richesse, +20 Savoir)",
                canAfford: (gameState) => gameState.resources.richesse >= 40,
                effect: (gameState) => {
        gameState.resources.richesse -= 40;
        gameState.resources.savoir += 20;
    },
                log: "Leur technique est fascinante et l'eau a rejailli, plus fraîche que jamais."
            },
            {
                label: "Abandonner ce puits (-15 Richesse, -10 Espoir)",
                canAfford: (gameState) => gameState.resources.richesse >= 15 && gameState.resources.espoir >= 10,
                effect: (gameState) => {
        gameState.resources.richesse -= 15;
        gameState.resources.espoir -= 10;
    },
                log: "Les femmes doivent désormais marcher des heures pour trouver de l'eau."
            }
        ]
    },
    {
        id: "quo_feuilles_mortes",
        title: "Le Souffle de l'Automne",
        description: "Les feuilles tombent en abondance. Un air vif annonce un changement de saison précoce.",
        repeatable: true,
        condition: (gameState) => Math.random() < 0.15,
        choices: [
            {
                label: "Ramasser pour le compost (+10 Richesse, +5 Savoir)",
                canAfford: () => true,
                effect: (gameState) => {
        gameState.resources.richesse += 10;
        gameState.resources.savoir += 5;
    },
                log: "Rien ne se perd sous votre sage intendance."
            },
            {
                label: "Se préparer simplement à l'hiver (+5 Espoir)",
                canAfford: () => true,
                effect: (gameState) => {
        gameState.resources.espoir += 5;
    },
                log: "Le cycle continue, immuable."
            }
        ]
    },
    {
        id: "dip_caravane_erebor",
        title: "La Caravane d'Erebor",
        description: "Une somptueuse escorte de Nains transportant des métaux précieux souhaite traverser votre domaine pour rejoindre l'Ouest. Ils demandent le gîte.",
        repeatable: true,
        condition: (gameState) => Math.random() < 0.15,
        choices: [
            {
                label: "Les accueillir avec faste (-40 Richesse, +30 Renom, +20 Savoir)",
                canAfford: (gameState) => gameState.resources.richesse >= 40,
                effect: (gameState) => {
        gameState.resources.richesse -= 40;
        gameState.resources.renom += 30;
        gameState.resources.savoir += 20;
    },
                log: "Votre hospitalité a impressionné les seigneurs de la Montagne Blanche."
            },
            {
                label: "Exiger une taxe lourde (+60 Richesse, -15 Renom)",
                canAfford: (gameState) => gameState.resources.renom >= 15,
                effect: (gameState) => {
        gameState.resources.richesse += 60;
        gameState.resources.renom -= 15;
    },
                log: "Ils ont payé en grimaçant, jurant de ne plus jamais emprunter vos routes."
            }
        ]
    },
    {
        id: "dip_pelerin_gris",
        title: "Le Pèlerin en Manteau Gris",
        description: "Un vieil homme voûté, coiffé d'un grand chapeau bleu et appuyé sur un bâton, s'arrête à vos frontières. Ses yeux brillent d'un feu secret.",
        repeatable: true,
        condition: (gameState) => Math.random() < 0.10,
        choices: [
            {
                label: "L'inviter à votre table (+50 Savoir, +30 Espoir)",
                canAfford: () => true,
                effect: (gameState) => {
        gameState.resources.savoir += 50;
        gameState.resources.espoir += 30;
    },
                log: "Ses récits sur les temps anciens ont ravivé la flamme et la sagesse du domaine."
            },
            {
                label: "Le chasser comme un agitateur (-20 Espoir, +5 Ombre)",
                canAfford: (gameState) => gameState.resources.espoir >= 20,
                effect: (gameState) => {
        gameState.resources.espoir -= 20;
        gameState.state.shadow_level = Math.min(100, gameState.state.shadow_level + 5);
    },
                log: "Il est parti avec un soupir lourd, laissant un sentiment de vide immense."
            }
        ]
    },
    {
        id: "dip_emissaire_gondor",
        title: "Le Cor de Minas Tirith",
        description: "Un messager du Gondor, épuisé et monté sur un cheval écumant, vous apporte un message cacheté de cire noire. L'allié demande une aide financière.",
        repeatable: true,
        condition: (gameState) => Math.random() < 0.12 && gameState.resources.richesse > 100,
        choices: [
            {
                label: "Envoyer l'or demandé (-100 Richesse, +50 Renom)",
                canAfford: (gameState) => gameState.resources.richesse >= 100,
                effect: (gameState) => {
        gameState.resources.richesse -= 100;
        gameState.resources.renom += 50;
    },
                log: "Votre loyauté est inscrite dans les annales des Rois. Le Gondor s'en souviendra."
            },
            {
                label: "Préserver vos propres ressources (-10 Renom, -10 Espoir)",
                canAfford: (gameState) => gameState.resources.renom >= 10 && gameState.resources.espoir >= 10,
                effect: (gameState) => {
        gameState.resources.renom -= 10;
        gameState.resources.espoir -= 10;
    },
                log: "Le messager est reparti vers le sud, le visage sombre et désespéré."
            }
        ]
    },
    {
        id: "dip_rodeurs_veilleurs",
        title: "Les Veilleurs Silencieux",
        description: "Des hommes taciturnes vêtus de vert et de brun patinés proposent de surveiller vos frontières gratuitement, en échange d'un secret absolu sur leur présence.",
        repeatable: true,
        condition: (gameState) => Math.random() < 0.15,
        choices: [
            {
                label: "Accepter leur veille sacrée (+20 Espoir, -10 Ombre)",
                canAfford: () => true,
                effect: (gameState) => {
        gameState.resources.espoir += 20;
        gameState.state.shadow_level = Math.max(0, gameState.state.shadow_level - 10);
    },
                log: "L'Ombre recule là où leur regard se pose, mais votre peuple murmure sur ces fantômes."
            },
            {
                label: "Les chasser par méfiance (+10 Renom, +5 Ombre)",
                canAfford: () => true,
                effect: (gameState) => {
        gameState.resources.renom += 10;
        gameState.state.shadow_level = Math.min(100, gameState.state.shadow_level + 5);
    },
                log: "Vous avez gardé le contrôle total de vos terres, mais les nuits semblent plus noires."
            }
        ]
    },
    {
        id: "dip_herbe_comte",
        title: "Les Chariots de la Comté",
        description: "De petits chariots conduits par des gens de petite taille arrivent de l'Ouest, chargés d'herbe à pipe parfumée et de tonneaux de bière blonde.",
        repeatable: true,
        condition: (gameState) => Math.random() < 0.12,
        choices: [
            {
                label: "Acheter leur cargaison (-30 Richesse, +40 Espoir)",
                canAfford: (gameState) => gameState.resources.richesse >= 30,
                effect: (gameState) => {
        gameState.resources.richesse -= 30;
        gameState.resources.espoir += 40;
    },
                log: "Le parfum de la feuille de la Comté a apporté une paix éphémère et douce dans les tavernes."
            },
            {
                label: "Les renvoyer à leurs collines (-10 Espoir)",
                canAfford: (gameState) => gameState.resources.espoir >= 10,
                effect: (gameState) => {
        gameState.resources.espoir -= 10;
    },
                log: "La vie continue, mais le quotidien manque cruellement de cette insouciance."
            }
        ]
    },
    {
        id: "dip_chasseurs_beornides",
        title: "La Loi des Beornides",
        description: "De grands hommes farouches, aux bras épais comme des troncs, exigent que vous cessiez de chasser l'ours dans les forêts limitrophes sous peine de représailles.",
        repeatable: true,
        condition: (gameState) => Math.random() < 0.10,
        choices: [
            {
                label: "Respecter leur décret sauvage (-20 Richesse, +20 Renom)",
                canAfford: (gameState) => gameState.resources.richesse >= 20,
                effect: (gameState) => {
        gameState.resources.richesse -= 20;
        gameState.resources.renom += 20;
    },
                log: "Les Beornides apprécient votre parole. Les frontières du Nord sont apaisées."
            },
            {
                label: "Ignorer leurs menaces (+15 Richesse, -20 Renom, -5 Hommes)",
                canAfford: (gameState) => gameState.resources.renom >= 20 && gameState.population.hommes >= 5,
                effect: (gameState) => {
        gameState.resources.richesse += 15;
        gameState.resources.renom -= 20;
        gameState.population.hommes = Math.max(0, gameState.population.hommes - 5);
    },
                log: "Des escarmouches ont éclaté dans les bois. Le sang a coulé pour du gibier."
            }
        ]
    },
    {
        id: "dip_orques_embuscade",
        title: "L'Appel du Sang",
        description: "Une caravane marchande humaine alliée a été encerclée par des pillards orques à quelques lieues de vos avant-postes. Leurs cris parviennent à vos vigies.",
        repeatable: true,
        condition: (gameState) => Math.random() < 0.10 && gameState.population.hommes > 20,
        choices: [
            {
                label: "Envoyer vos guerriers au secours (-15 Hommes, +40 Renom, +20 Espoir)",
                canAfford: (gameState) => gameState.population.hommes >= 15,
                effect: (gameState) => {
        gameState.population.hommes = Math.max(0, gameState.population.hommes - 15);
        gameState.resources.renom += 40;
        gameState.resources.espoir += 20;
    },
                log: "La caravane est sauvée. Les survivants jurent de chanter votre courage à jamais."
            },
            {
                label: "Sécuriser vos propres remparts (-30 Renom, +10 Ombre)",
                canAfford: (gameState) => gameState.resources.renom >= 30,
                effect: (gameState) => {
        gameState.resources.renom -= 30;
        gameState.state.shadow_level = Math.min(100, gameState.state.shadow_level + 10);
    },
                log: "La caravane a été massacrée. L'Ombre se nourrit de votre passivité."
            }
        ]
    },
    {
        id: "dip_ambassade_lindon",
        title: "Les Sages du Lindon",
        description: "Un haut seigneur Elfe envoyé par Círdan vient étudier vos chroniques familiales pour y chercher la trace d'une ancienne légende.",
        repeatable: true,
        condition: (gameState) => Math.random() < 0.08 && gameState.resources.savoir > 50,
        choices: [
            {
                label: "Lui ouvrir vos archives (+60 Savoir, +15 Elfes)",
                canAfford: () => true,
                effect: (gameState) => {
        gameState.resources.savoir += 60;
        gameState.population.elfes += 15;
    },
                log: "L'érudit elfe a déchiffré des parchemins oubliés, renforçant les liens avec les Havres."
            },
            {
                label: "Refuser l'accès aux secrets (-15 Renom)",
                canAfford: (gameState) => gameState.resources.renom >= 15,
                effect: (gameState) => {
        gameState.resources.renom -= 15;
    },
                log: "L'Elfe est reparti en silence, déplorant la fermeture d'esprit des mortels."
            }
        ]
    },
    {
        id: "dip_cavaliers_rohan",
        title: "Les Éperons Verts",
        description: "Une patrouille de fiers cavaliers aux cheveux d'or, montés sur des destriers impétueux, s'arrête pour faire boire leurs bêtes et échanger des nouvelles.",
        repeatable: true,
        condition: (gameState) => Math.random() < 0.12,
        choices: [
            {
                label: "Offrir le meilleur fourrage (-25 Richesse, +25 Renom)",
                canAfford: (gameState) => gameState.resources.richesse >= 25,
                effect: (gameState) => {
        gameState.resources.richesse -= 25;
        gameState.resources.renom += 25;
    },
                log: "Les seigneurs des chevaux ont salué votre générosité du haut de leurs selles."
            },
            {
                label: "Les traiter comme des intrus (-15 Renom)",
                canAfford: (gameState) => gameState.resources.renom >= 15,
                effect: (gameState) => {
        gameState.resources.renom -= 15;
    },
                log: "Ils ont fait faire demi-tour à leurs montures dans un nuage de poussière méprisant."
            }
        ]
    },
    {
        id: "dip_convoi_graines",
        title: "Le Trocin des Hobbits",
        description: "Un groupe de Hobbits propose d'échanger des graines de céréales inconnues et très fertiles contre de vieux parchemins d'histoire qui les fascinent.",
        repeatable: true,
        condition: (gameState) => Math.random() < 0.08 && gameState.resources.savoir > 30,
        choices: [
            {
                label: "Accepter l'échange (-30 Savoir, +40 Richesse)",
                canAfford: (gameState) => gameState.resources.savoir >= 30,
                effect: (gameState) => {
        gameState.resources.savoir -= 30;
        gameState.resources.richesse += 40;
    },
                log: "Les champs produiront davantage l'an prochain grâce à ces méthodes agricoles."
            },
            {
                label: "Garder vos écrits sacrés (-10 Richesse)",
                canAfford: (gameState) => gameState.resources.richesse >= 10,
                effect: (gameState) => {
        gameState.resources.richesse -= 10;
    },
                log: "Les Hobbits sont repartis déçus, grignotant tristement leurs provisions."
            }
        ]
    },
    {
        id: "dip_emissaire_mirkwood",
        title: "La Rançon de la Forêt Noire",
        description: "Des Elfes sylvains, méfiants et armés d'arcs en bois d'if, réclament une compensation en or pour les arbres coupés par vos pionniers aux lisières.",
        repeatable: true,
        condition: (gameState) => Math.random() < 0.10 && gameState.resources.richesse > 40,
        choices: [
            {
                label: "Payer le tribut (-40 Richesse, +15 Renom)",
                canAfford: (gameState) => gameState.resources.richesse >= 40,
                effect: (gameState) => {
        gameState.resources.richesse -= 40;
        gameState.resources.renom += 15;
    },
                log: "La paix est maintenue avec les gens des bois, bien que leur froideur persiste."
            },
            {
                label: "Refuser de céder au chantage (+20 Richesse, -10 Espoir, +5 Ombre)",
                canAfford: (gameState) => gameState.resources.espoir >= 10,
                effect: (gameState) => {
        gameState.resources.richesse += 20;
        gameState.resources.espoir -= 10;
        gameState.state.shadow_level = Math.min(100, gameState.state.shadow_level + 5);
    },
                log: "Les flèches volent désormais bas près des chantiers forestiers."
            }
        ]
    },
    {
        id: "dip_forgeron_nain",
        title: "L'Apprenti de Nogrod",
        description: "Un artisan Nain banni de son clan cherche un atelier pour prouver sa valeur. Il demande de l'or pour installer ses soufflets.",
        repeatable: true,
        condition: (gameState) => Math.random() < 0.08 && gameState.resources.richesse > 50,
        choices: [
            {
                label: "Financer son installation (-50 Richesse, +60 Savoir)",
                canAfford: (gameState) => gameState.resources.richesse >= 50,
                effect: (gameState) => {
        gameState.resources.richesse -= 50;
        gameState.resources.savoir += 60;
    },
                log: "Ses méthodes de traitement du fer ont révolutionné vos forges locales."
            },
            {
                label: "Le renvoyer à sa montagne (-10 Savoir)",
                canAfford: (gameState) => gameState.resources.savoir >= 10,
                effect: (gameState) => {
        gameState.resources.savoir -= 10;
    },
                log: "Il est parti offrir son génie à des rivaux plus offrants."
            }
        ]
    },
    {
        id: "dip_troubadour_gondor",
        title: "Le Chant de la Grande Rivière",
        description: "Un musicien itinérant venu du Sud chante la gloire des anciens rois d'Osgiliath sur la place du bourg. La foule s'attroupe.",
        repeatable: true,
        condition: (gameState) => Math.random() < 0.10,
        choices: [
            {
                label: "L'héberger au château (-15 Richesse, +35 Espoir)",
                canAfford: (gameState) => gameState.resources.richesse >= 15,
                effect: (gameState) => {
        gameState.resources.richesse -= 15;
        gameState.resources.espoir += 35;
    },
                log: "Ses mélodies ont rallumé la fierté et l'espérance parmi les opprimés."
            },
            {
                label: "Le chasser pour troubles publics (-15 Espoir, +5 Ombre)",
                canAfford: (gameState) => gameState.resources.espoir >= 15,
                effect: (gameState) => {
        gameState.resources.espoir -= 15;
        gameState.state.shadow_level = Math.min(100, gameState.state.shadow_level + 5);
    },
                log: "Les gens ont boudé la taverne, regrettant la beauté des vers interdits."
            }
        ]
    },
    {
        id: "dip_trahison_espion",
        title: "Le Sourire du Traître",
        description: "Un marchand itinérant qui logeait chez vous est suspecté d'envoyer des lettres codées vers le Nord, renseignant l'ennemi sur vos défenses.",
        repeatable: true,
        condition: (gameState) => Math.random() < 0.08 && gameState.state.shadow_level > 20,
        choices: [
            {
                label: "L'arrêter et confisquer ses biens (+30 Richesse, +15 Renom, -10 Espoir)",
                canAfford: (gameState) => gameState.resources.espoir >= 10,
                effect: (gameState) => {
        gameState.resources.richesse += 30;
        gameState.resources.renom += 15;
        gameState.resources.espoir -= 10;
    },
                log: "L'or a été saisi, mais le doute s'est instillé parmi vos proches."
            },
            {
                label: "Le bannir sans preuve (-20 Renom, +10 Ombre)",
                canAfford: (gameState) => gameState.resources.renom >= 20,
                effect: (gameState) => {
        gameState.resources.renom -= 20;
        gameState.state.shadow_level = Math.min(100, gameState.state.shadow_level + 10);
    },
                log: "Il est parti colporter vos secrets à vos pires ennemis."
            }
        ]
    },
    {
        id: "dip_alliance_scellee",
        title: "Le Pacte de l'Étoile",
        description: "Un seigneur local d'une colonie voisine propose de sceller une alliance de sang par un mariage entre vos deux lignées.",
        repeatable: true,
        condition: (gameState) => Math.random() < 0.06 && gameState.resources.renom > 40,
        choices: [
            {
                label: "Accepter l'union (-50 Richesse, +50 Renom, +30 Espoir)",
                canAfford: (gameState) => gameState.resources.richesse >= 50,
                effect: (gameState) => {
        gameState.resources.richesse -= 50;
        gameState.resources.renom += 50;
        gameState.resources.espoir += 30;
    },
                log: "Les festivités ont uni les deux peuples sous une même bannière d'espoir."
            },
            {
                label: "Refuser pour préserver votre sang (+15 Renom, -25 Espoir)",
                canAfford: (gameState) => gameState.resources.espoir >= 25,
                effect: (gameState) => {
        gameState.resources.renom += 15;
        gameState.resources.espoir -= 25;
    },
                log: "L'orgueil a sauvé votre lignée, mais vous a laissé cruellement isolé."
            }
        ]
    },
    {
        id: "dip_orques_parlementer",
        title: "Le Message de la Griffe",
        description: "Un orque hideux se présente sous un drapeau de trêve. Il propose de cesser les raids sur vos villages en échange d'un lourd tribut annuel en bétail.",
        repeatable: true,
        condition: (gameState) => Math.random() < 0.08 && gameState.state.shadow_level > 30 && gameState.resources.richesse > 60,
        choices: [
            {
                label: "Acheter la paix (-60 Richesse, -30 Renom, +20 Ombre)",
                canAfford: (gameState) => gameState.resources.richesse >= 60 && gameState.resources.renom >= 30,
                effect: (gameState) => {
        gameState.resources.richesse -= 60;
        gameState.resources.renom -= 30;
        gameState.state.shadow_level = Math.min(100, gameState.state.shadow_level + 20);
    },
                log: "Les raids cessent, mais vous financez votre propre destruction future."
            },
            {
                label: "Exécuter le monstre (+40 Renom, +20 Espoir, -10 Richesse)",
                canAfford: (gameState) => gameState.resources.richesse >= 10,
                effect: (gameState) => {
        gameState.resources.richesse -= 10;
        gameState.resources.renom += 40;
        gameState.resources.espoir += 20;
    },
                log: "La guerre totale est déclarée, mais les cœurs brûlent de courage."
            }
        ]
    },
    {
        id: "dip_sorcier_brun",
        title: "L'Ami des Bêtes",
        description: "Un homme étrange vêtu de brun terreux, entouré d'oiseaux qui lui chuchotent à l'oreille, traverse vos champs pour soigner la faune.",
        repeatable: true,
        condition: (gameState) => Math.random() < 0.06,
        choices: [
            {
                label: "L'aider dans sa tâche (-20 Richesse, +30 Espoir, +20 Savoir)",
                canAfford: (gameState) => gameState.resources.richesse >= 20,
                effect: (gameState) => {
        gameState.resources.richesse -= 20;
        gameState.resources.espoir += 30;
        gameState.resources.savoir += 20;
    },
                log: "La nature semble s'épanouir autour de vous, bénie par Radagast."
            },
            {
                label: "Le repousser comme un fou (-10 Espoir)",
                canAfford: (gameState) => gameState.resources.espoir >= 10,
                effect: (gameState) => {
        gameState.resources.espoir -= 10;
    },
                log: "Les oiseaux ont fui et la terre semble un peu plus stérile cet automne."
            }
        ]
    },
    {
        id: "dip_nains_col_perdu",
        title: "Le Secret des Cimes",
        description: "Des éclaireurs Nains affirment avoir découvert un gisement d'or pur à votre frontière, mais exigent votre aide militaire pour en chasser les ogres.",
        repeatable: true,
        condition: (gameState) => Math.random() < 0.08 && gameState.population.hommes > 20,
        choices: [
            {
                label: "Fournir des soldats (-20 Hommes, +150 Richesse, +30 Renom)",
                canAfford: (gameState) => gameState.population.hommes >= 20,
                effect: (gameState) => {
        gameState.population.hommes = Math.max(0, gameState.population.hommes - 20);
        gameState.resources.richesse += 150;
        gameState.resources.renom += 30;
    },
                log: "La bataille fut sanglante, mais les chariots d'or remplissent vos cales."
            },
            {
                label: "Laisser le trésor aux monstres (-20 Renom)",
                canAfford: (gameState) => gameState.resources.renom >= 20,
                effect: (gameState) => {
        gameState.resources.renom -= 20;
    },
                log: "Les Nains vous méprisent pour votre lâcheté et ferment leurs comptoirs."
            }
        ]
    },
    {
        id: "dip_desertion_frontiere",
        title: "La Peur du Guetteur",
        description: "Des soldats d'une garnison humaine voisine désertent et demandent l'asile dans vos villages, terrifiés par des bruits souterrains.",
        repeatable: true,
        condition: (gameState) => Math.random() < 0.08 && gameState.state.shadow_level > 40,
        choices: [
            {
                label: "Les intégrer comme manœuvres (+30 Hommes, -20 Espoir)",
                canAfford: (gameState) => gameState.resources.espoir >= 20,
                effect: (gameState) => {
        gameState.population.hommes += 30;
        gameState.resources.espoir -= 20;
    },
                log: "Des bras supplémentaires pour les champs, mais leur terreur se transmet."
            },
            {
                label: "Les renvoyer à leurs postes (-30 Renom, +10 Ombre)",
                canAfford: (gameState) => gameState.resources.renom >= 30,
                effect: (gameState) => {
        gameState.resources.renom -= 30;
        gameState.state.shadow_level = Math.min(100, gameState.state.shadow_level + 10);
    },
                log: "Ils ont fui plus loin dans la nature, laissant la frontière sans défense."
            }
        ]
    },
    {
        id: "dip_herboriste_vallee",
        title: "La Sagesse d'Imladris",
        description: "Une herboriste elfe formée à Fondcombe propose d'ouvrir une maison de guérison dans votre bourg, si vous fournissez les pierres de taille.",
        repeatable: true,
        condition: (gameState) => Math.random() < 0.06 && gameState.resources.richesse > 50,
        choices: [
            {
                label: "Bâtir le dispensaire (-50 Richesse, +40 Espoir, +20 Savoir)",
                canAfford: (gameState) => gameState.resources.richesse >= 50,
                effect: (gameState) => {
        gameState.resources.richesse -= 50;
        gameState.resources.espoir += 40;
        gameState.resources.savoir += 20;
    },
                log: "Les malades guérissent plus vite et bénissent la science d'Elrond."
            },
            {
                label: "Économiser vos pierres (-10 Espoir)",
                canAfford: (gameState) => gameState.resources.espoir >= 10,
                effect: (gameState) => {
        gameState.resources.espoir -= 10;
    },
                log: "Les blessés souffrent en silence dans des cahutes insalubres."
            }
        ]
    },
    {
        id: "dip_marchand_dorwinion",
        title: "Le Vin du Sud",
        description: "Un riche négociant du Dorwinion apporte des tonneaux d'un vin si capiteux qu'il plonge ceux qui le boivent dans des sommeils enchantés.",
        repeatable: true,
        condition: (gameState) => Math.random() < 0.08 && gameState.resources.richesse > 40,
        choices: [
            {
                label: "Acheter la cargaison pour les fêtes (-40 Richesse, +30 Espoir)",
                canAfford: (gameState) => gameState.resources.richesse >= 40,
                effect: (gameState) => {
        gameState.resources.richesse -= 40;
        gameState.resources.espoir += 30;
    },
                log: "Le vin a apporté l'allégresse, bien que les réveils soient lourds."
            },
            {
                label: "Refuser ce luxe inutile (+10 Richesse, -10 Espoir)",
                canAfford: (gameState) => gameState.resources.espoir >= 10,
                effect: (gameState) => {
        gameState.resources.richesse += 10;
        gameState.resources.espoir -= 10;
    },
                log: "La sobriété maintient la discipline, mais l'ambiance est austère."
            }
        ]
    },
    {
        id: "dip_elfes_mutiles",
        title: "Les Rescapés de la Guerre",
        description: "Des Elfes blessés revenant d'une escarmouche contre des orques demandent à se reposer quelques années dans vos sanctuaires sacrés.",
        repeatable: true,
        condition: (gameState) => Math.random() < 0.08 && gameState.resources.espoir > 50,
        choices: [
            {
                label: "Ouvrir vos lieux saints (-20 Espoir, +20 Elfes, +40 Savoir)",
                canAfford: (gameState) => gameState.resources.espoir >= 20,
                effect: (gameState) => {
        gameState.resources.espoir -= 20;
        gameState.population.elfes += 20;
        gameState.resources.savoir += 40;
    },
                log: "Leurs traumatismes pèsent sur le moral, mais leur savoir est immense."
            },
            {
                label: "Préserver la paix des sanctuaires (-20 Renom, -10 Savoir)",
                canAfford: (gameState) => gameState.resources.renom >= 20 && gameState.resources.savoir >= 10,
                effect: (gameState) => {
        gameState.resources.renom -= 20;
        gameState.resources.savoir -= 10;
    },
                log: "Les Elfes ont continué leur douloureuse marche vers les Havres Gris."
            }
        ]
    },
    {
        id: "dip_serment_jeune_seigneur",
        title: "Le Serment du Jeune Loup",
        description: "Un jeune noble d'une principauté humaine voisine vient prêter serment d'amitié à vos pieds, offrant son épée pour la défense commune.",
        repeatable: true,
        condition: (gameState) => Math.random() < 0.06 && gameState.resources.renom > 30,
        choices: [
            {
                label: "Accepter son allégeance (+15 Hommes, +25 Renom)",
                canAfford: () => true,
                effect: (gameState) => {
        gameState.population.hommes += 15;
        gameState.resources.renom += 25;
    },
                log: "Le jeune homme est fier et ses troupes renforcent vos patrouilles."
            },
            {
                label: "Le rejeter par prudence (-15 Renom)",
                canAfford: (gameState) => gameState.resources.renom >= 15,
                effect: (gameState) => {
        gameState.resources.renom -= 15;
    },
                log: "Il est reparti blessé dans son honneur, devenant un rival dangereux."
            }
        ]
    },
    {
        id: "dip_pelerinage_dunand",
        title: "Les Exilés du Dunland",
        description: "Des clans farouches du Dunland traversent vos terres en pèlerinage vers des tombes ancestrales. Ils promettent de ne rien piller si on les laisse en paix.",
        repeatable: true,
        condition: (gameState) => Math.random() < 0.08,
        choices: [
            {
                label: "Accorder le libre passage (+15 Renom, -10 Espoir)",
                canAfford: (gameState) => gameState.resources.espoir >= 10,
                effect: (gameState) => {
        gameState.resources.renom += 15;
        gameState.resources.espoir -= 10;
    },
                log: "Ils ont respecté leur parole, mais leur vue terrifie vos paysans."
            },
            {
                label: "Les attaquer comme des pillards (-10 Hommes, +40 Richesse, +15 Ombre)",
                canAfford: (gameState) => gameState.population.hommes >= 10,
                effect: (gameState) => {
        gameState.population.hommes = Math.max(0, gameState.population.hommes - 10);
        gameState.resources.richesse += 40;
        gameState.state.shadow_level = Math.min(100, gameState.state.shadow_level + 15);
    },
                log: "Vous avez pris leur bétail, mais allumé une vendetta sanglante."
            }
        ]
    },
    {
        id: "dip_fete_solstice_inter",
        title: "Le Feu des Deux Peuples",
        description: "Les communautés d'Hommes et d'Elfes de votre domaine proposent d'organiser une grande foire commune pour échanger leurs arts.",
        repeatable: true,
        condition: (gameState) => Math.random() < 0.05 && gameState.population.elfes > 5 && gameState.population.hommes > 50,
        choices: [
            {
                label: "Financer la foire (-40 Richesse, +50 Espoir, +30 Renom)",
                canAfford: (gameState) => gameState.resources.richesse >= 40,
                effect: (gameState) => {
        gameState.resources.richesse -= 40;
        gameState.resources.espoir += 50;
        gameState.resources.renom += 30;
    },
                log: "L'harmonie entre les deux races brille comme un phare contre l'Ombre."
            },
            {
                label: "Annuler par peur des troubles (+10 Richesse, -30 Espoir)",
                canAfford: (gameState) => gameState.resources.espoir >= 30,
                effect: (gameState) => {
        gameState.resources.richesse += 10;
        gameState.resources.espoir -= 30;
    },
                log: "La méfiance s'est installée entre les quartiers du domaine."
            }
        ]
    },
    {
        id: "age1_01_reveil",
        title: "Les Cris de l'Éveil",
        description: "Votre peuple s'éveille dans un monde brut et sans soleil, sous un dôme d'étoiles glacées. La peur de l'inconnu paralyse les premiers clans.",
        repeatable: false,
        condition: (gameState) => gameState.meta.current_age === 1 && (gameState.state.current_year >= 1),
        choices: [
            {
                label: "Allumer les grands feux de joie (+30 Espoir, -10 Richesse)",
                canAfford: (gameState) => gameState.resources.richesse >= 10,
                effect: (gameState) => {
        gameState.resources.espoir += 30;
        gameState.resources.richesse -= 10;
    },
                log: "La lueur des brasiers a réchauffé les cœurs et uni les premiers Hommes."
            },
            {
                label: "S'enfoncer dans les grottes obscures (+20 Richesse, +10 Ombre, -15 Espoir)",
                canAfford: (gameState) => gameState.resources.espoir >= 15,
                effect: (gameState) => {
        gameState.resources.richesse += 20;
        gameState.state.shadow_level = Math.min(100, gameState.state.shadow_level + 10);
        gameState.resources.espoir -= 15;
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
                label: "Forger les premières armes de bronze (-20 Richesse, +15 Renom)",
                canAfford: (gameState) => gameState.resources.richesse >= 20,
                effect: (gameState) => {
        gameState.resources.richesse -= 20;
        gameState.resources.renom += 15;
    },
                log: "Les hommes ont désormais de quoi se défendre face aux dangers du monde."
            },
            {
                label: "Se replier derrière des palissades (-15 Espoir)",
                canAfford: (gameState) => gameState.resources.espoir >= 15,
                effect: (gameState) => {
        gameState.resources.espoir -= 15;
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
                label: "Mener la contre-attaque (-5 Hommes, +30 Renom, +10 Espoir)",
                canAfford: (gameState) => gameState.population.hommes >= 5,
                effect: (gameState) => {
        gameState.population.hommes = Math.max(0, gameState.population.hommes - 5);
        gameState.resources.renom += 30;
        gameState.resources.espoir += 10;
    },
                log: "Le monstre a saigné. Votre peuple sait désormais que l'ennemi peut mourir."
            },
            {
                label: "Abandonner les rives du fleuve (-30 Richesse, -20 Espoir, +5 Ombre)",
                canAfford: (gameState) => gameState.resources.richesse >= 30 && gameState.resources.espoir >= 20,
                effect: (gameState) => {
        gameState.resources.richesse -= 30;
        gameState.resources.espoir -= 20;
        gameState.state.shadow_level = Math.min(100, gameState.state.shadow_level + 5);
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
                label: "Invoquer le nom d'Oromë (+40 Espoir, +10 Renom)",
                canAfford: () => true,
                effect: (gameState) => {
        gameState.resources.espoir += 40;
        gameState.resources.renom += 10;
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
        description: "Un émissaire des Elfes Gris (Sindar) s'arrête dans votre village et propose d'enseigner leur langue mélodieuse à vos enfants.",
        repeatable: false,
        condition: (gameState) => gameState.meta.current_age === 1 && (gameState.state.current_year >= 12 && gameState.resources.savoir > 20),
        choices: [
            {
                label: "Accepter leur enseignement (+60 Savoir, +10 Renom)",
                canAfford: () => true,
                effect: (gameState) => {
        gameState.resources.savoir += 60;
        gameState.resources.renom += 10;
    },
                log: "Vos enfants parlent désormais la langue des étoiles. Les ponts sont jetés."
            },
            {
                label: "Garder les parlers des Hommes (+20 Espoir, -10 Renom)",
                canAfford: (gameState) => gameState.resources.renom >= 10,
                effect: (gameState) => {
        gameState.resources.espoir += 20;
        gameState.resources.renom -= 10;
    },
                log: "Vous préservez vos coutumes, au prix d'un isolement culturel grandissant."
            }
        ]
    },
    {
        id: "age1_06_loup_angband",
        title: "La Gueule du Nord",
        description: "Un loup d'une taille monstrueuse, échappé des fosses d'Angband, s'installe sur la colline sacrée et hurle chaque nuit sous les étoiles.",
        repeatable: false,
        condition: (gameState) => gameState.meta.current_age === 1 && (gameState.state.current_year >= 15 && gameState.resources.renom > 10),
        choices: [
            {
                label: "Envoyer vos meilleurs guerriers (-10 Hommes, +50 Renom)",
                canAfford: (gameState) => gameState.population.hommes >= 10,
                effect: (gameState) => {
        gameState.population.hommes = Math.max(0, gameState.population.hommes - 10);
        gameState.resources.renom += 50;
    },
                log: "La bête a été percée de dix lances. Sa tête orne désormais vos remparts."
            },
            {
                label: "Lui offrir du bétail en sacrifice (-40 Richesse, +15 Ombre)",
                canAfford: (gameState) => gameState.resources.richesse >= 40,
                effect: (gameState) => {
        gameState.resources.richesse -= 40;
        gameState.state.shadow_level = Math.min(100, gameState.state.shadow_level + 15);
    },
                log: "Vous achetez une paix honteuse. L'Ombre s'engraisse de votre lâcheté."
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
                label: "Leur jurer amitié et soutien (+100 Renom, +40 Savoir, -30 Richesse)",
                canAfford: (gameState) => gameState.resources.richesse >= 30,
                effect: (gameState) => {
        gameState.resources.renom += 100;
        gameState.resources.savoir += 40;
        gameState.resources.richesse -= 30;
    },
                log: "Vous marchez dans l'ombre de géants. Leur gloire vous éclaire et vous condamne."
            },
            {
                label: "Refuser de vous mêler de leurs guerres (+30 Espoir, -40 Renom)",
                canAfford: (gameState) => gameState.resources.renom >= 40,
                effect: (gameState) => {
        gameState.resources.espoir += 30;
        gameState.resources.renom -= 40;
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
                label: "Livrer le charbon (-50 Richesse, +120 Savoir)",
                canAfford: (gameState) => gameState.resources.richesse >= 50,
                effect: (gameState) => {
        gameState.resources.richesse -= 50;
        gameState.resources.savoir += 120;
    },
                log: "Vos forges crachent un feu blanc. Vos armes coupent désormais le fer ennemi."
            },
            {
                label: "Préserver vos forêts sacrées (+20 Espoir, -20 Savoir)",
                canAfford: (gameState) => gameState.resources.savoir >= 20,
                effect: (gameState) => {
        gameState.resources.espoir += 20;
        gameState.resources.savoir -= 20;
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
                label: "Traquer et pendre les agitateurs (+15 Renom, -20 Espoir)",
                canAfford: (gameState) => gameState.resources.espoir >= 20,
                effect: (gameState) => {
        gameState.resources.renom += 15;
        gameState.resources.espoir -= 20;
    },
                log: "La sédition est étouffée dans le sang, mais la méfiance demeure."
            },
            {
                label: "Laisser le peuple débattre (-30 Espoir, +15 Ombre)",
                canAfford: (gameState) => gameState.resources.espoir >= 30,
                effect: (gameState) => {
        gameState.resources.espoir -= 30;
        gameState.state.shadow_level = Math.min(100, gameState.state.shadow_level + 15);
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
                label: "Les intégrer à votre domaine (+80 Hommes, -40 Richesse, +20 Espoir)",
                canAfford: (gameState) => gameState.resources.richesse >= 40,
                effect: (gameState) => {
        gameState.population.hommes += 80;
        gameState.resources.richesse -= 40;
        gameState.resources.espoir += 20;
    },
                log: "Votre colonie devient une cité. Les bras ne manqueront pas pour les récoltes."
            },
            {
                label: "Les repousser vers l'Ouest (-30 Renom)",
                canAfford: (gameState) => gameState.resources.renom >= 30,
                effect: (gameState) => {
        gameState.resources.renom -= 30;
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
                label: "L'offrir à un roi Elfe (+80 Renom, +40 Savoir)",
                canAfford: () => true,
                effect: (gameState) => {
        gameState.resources.renom += 80;
        gameState.resources.savoir += 40;
    },
                log: "Le Roi a pleuré en voyant la gemme et vous a comblé de bénédictions."
            },
            {
                label: "La garder dans vos coffres (+60 Richesse, +10 Ombre)",
                canAfford: () => true,
                effect: (gameState) => {
        gameState.resources.richesse += 60;
        gameState.state.shadow_level = Math.min(100, gameState.state.shadow_level + 10);
    },
                log: "La pierre brille dans le noir, excitant la cupidité de vos proches."
            }
        ]
    },
    {
        id: "age1_12_orages_fer",
        title: "L'Assaut des Nuées",
        description: "Des milliers d'orques déferlent des montagnes pour piller vos silos d'avant-garde. La garnison est encerclée.",
        repeatable: false,
        condition: (gameState) => gameState.meta.current_age === 1 && (gameState.state.current_year >= 40 && gameState.population.hommes > 40),
        choices: [
            {
                label: "Soutenir la garnison à tout prix (-25 Hommes, +60 Renom)",
                canAfford: (gameState) => gameState.population.hommes >= 25,
                effect: (gameState) => {
        gameState.population.hommes = Math.max(0, gameState.population.hommes - 25);
        gameState.resources.renom += 60;
    },
                log: "La position est tenue au prix d'un sacrifice héroïque. L'ennemi recule."
            },
            {
                label: "Abandonner l'avant-poste (-50 Richesse, -30 Espoir, +10 Ombre)",
                canAfford: (gameState) => gameState.resources.richesse >= 50 && gameState.resources.espoir >= 30,
                effect: (gameState) => {
        gameState.resources.richesse -= 50;
        gameState.resources.espoir -= 30;
        gameState.state.shadow_level = Math.min(100, gameState.state.shadow_level + 10);
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
                label: "Céder à leur effrayante fierté (-30 Richesse, +40 Renom, +10 Ombre)",
                canAfford: (gameState) => gameState.resources.richesse >= 30,
                effect: (gameState) => {
        gameState.resources.richesse -= 30;
        gameState.resources.renom += 40;
        gameState.state.shadow_level = Math.min(100, gameState.state.shadow_level + 10);
    },
                log: "Vous évitez leur colère, mais vous vous liez à une maison maudite."
            },
            {
                label: "Garder votre indépendance (-30 Renom, +20 Espoir)",
                canAfford: (gameState) => gameState.resources.renom >= 30,
                effect: (gameState) => {
        gameState.resources.renom -= 30;
        gameState.resources.espoir += 20;
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
                label: "Les escorter et cacher leur fuite (-30 Richesse, +80 Savoir, +30 Espoir)",
                canAfford: (gameState) => gameState.resources.richesse >= 30,
                effect: (gameState) => {
        gameState.resources.richesse -= 30;
        gameState.resources.savoir += 80;
        gameState.resources.espoir += 30;
    },
                log: "En remerciement, ils vous confient des parchemins d'une sagesse immense."
            },
            {
                label: "Piller leurs chariots (+150 Richesse, -60 Renom, +30 Ombre)",
                canAfford: (gameState) => gameState.resources.renom >= 60,
                effect: (gameState) => {
        gameState.resources.richesse += 150;
        gameState.resources.renom -= 60;
        gameState.state.shadow_level = Math.min(100, gameState.state.shadow_level + 30);
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
                label: "Acheter du grain aux Nains (-40 Richesse, +10 Espoir)",
                canAfford: (gameState) => gameState.resources.richesse >= 40,
                effect: (gameState) => {
        gameState.resources.richesse -= 40;
        gameState.resources.espoir += 10;
    },
                log: "L'or des coffres a sauvé le peuple de la faim noire."
            },
            {
                label: "Rationner et accepter les pertes (-20 Hommes, -20 Espoir)",
                canAfford: (gameState) => gameState.population.hommes >= 20 && gameState.resources.espoir >= 20,
                effect: (gameState) => {
        gameState.population.hommes = Math.max(0, gameState.population.hommes - 20);
        gameState.resources.espoir -= 20;
    },
                log: "Les ventres creux enterrent les enfants. Le désespoir grandit."
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
                label: "Fortifier les souterrains (-60 Richesse, +30 Espoir)",
                canAfford: (gameState) => gameState.resources.richesse >= 60,
                effect: (gameState) => {
        gameState.resources.richesse -= 60;
        gameState.resources.espoir += 30;
    },
                log: "Le domaine creuse la terre pour échapper à la fournaise future."
            },
            {
                label: "Ignorer les contes lointains (-20 Espoir, +10 Ombre)",
                canAfford: (gameState) => gameState.resources.espoir >= 20,
                effect: (gameState) => {
        gameState.resources.espoir -= 20;
        gameState.state.shadow_level = Math.min(100, gameState.state.shadow_level + 10);
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
                label: "Engager les Orientaux (+50 Hommes, -30 Richesse, +15 Ombre)",
                canAfford: (gameState) => gameState.resources.richesse >= 30,
                effect: (gameState) => {
        gameState.population.hommes += 50;
        gameState.resources.richesse -= 30;
        gameState.state.shadow_level = Math.min(100, gameState.state.shadow_level + 15);
    },
                log: "Leurs lames sont acérées, mais leurs murmures nocturnes sont inquiétants."
            },
            {
                label: "Refuser leur aide (-15 Renom, +10 Espoir)",
                canAfford: (gameState) => gameState.resources.renom >= 15,
                effect: (gameState) => {
        gameState.resources.renom -= 15;
        gameState.resources.espoir += 10;
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
                label: "Envoyer la délégation (-50 Richesse, +150 Savoir, +30 Renom)",
                canAfford: (gameState) => gameState.resources.richesse >= 50,
                effect: (gameState) => {
        gameState.resources.richesse -= 50;
        gameState.resources.savoir += 150;
        gameState.resources.renom += 30;
    },
                log: "Vos sages reviennent éblouis, porteurs des secrets de la Haute Magie."
            },
            {
                label: "Décliner par fierté (-20 Savoir)",
                canAfford: (gameState) => gameState.resources.savoir >= 20,
                effect: (gameState) => {
        gameState.resources.savoir -= 20;
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
                label: "Évacuer la vallée frontalière (-40 Richesse, -10 Espoir)",
                canAfford: (gameState) => gameState.resources.richesse >= 40 && gameState.resources.espoir >= 10,
                effect: (gameState) => {
        gameState.resources.richesse -= 40;
        gameState.resources.espoir -= 10;
    },
                log: "La zone est perdue, mais vous évitez une destruction totale."
            },
            {
                label: "Tenter de dresser des barrières sacrées (-40 Savoir, +10 Ombre)",
                canAfford: (gameState) => gameState.resources.savoir >= 40,
                effect: (gameState) => {
        gameState.resources.savoir -= 40;
        gameState.state.shadow_level = Math.min(100, gameState.state.shadow_level + 10);
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
                label: "Ouvrir grand vos portes (-60 Richesse, +40 Hommes, +20 Elfes)",
                canAfford: (gameState) => gameState.resources.richesse >= 60,
                effect: (gameState) => {
        gameState.resources.richesse -= 60;
        gameState.population.hommes += 40;
        gameState.population.elfes += 20;
    },
                log: "Le domaine étouffe sous le nombre, mais l'entraide ravive l'espoir."
            },
            {
                label: "Fermer les frontières (+20 Richesse, -40 Renom, -20 Espoir)",
                canAfford: (gameState) => gameState.resources.renom >= 40 && gameState.resources.espoir >= 20,
                effect: (gameState) => {
        gameState.resources.richesse += 20;
        gameState.resources.renom -= 40;
        gameState.resources.espoir -= 20;
    },
                log: "Vous survivez dans l'égoïsme, hantés par les cris des mourants."
            }
        ]
    },
    {
        id: "age1_21_silmaril_rumeur",
        title: "La Splendeur du Joyau",
        description: "La rumeur se répand qu'un mortel a réussi à arracher un joyau sacré de la couronne du Seigneur Sombre. L'espoir renaît partout.",
        repeatable: false,
        condition: (gameState) => gameState.meta.current_age === 1 && (gameState.state.current_year >= 78),
        choices: [
            {
                label: "Célébrer cet exploit par des chants (+50 Espoir, +25 Renom)",
                canAfford: () => true,
                effect: (gameState) => {
        gameState.resources.espoir += 50;
        gameState.resources.renom += 25;
    },
                log: "La foi dans la victoire finale enflamme les cœurs les plus sombres."
            },
            {
                label: "Rester sceptique et prudent (-10 Espoir)",
                canAfford: (gameState) => gameState.resources.espoir >= 10,
                effect: (gameState) => {
        gameState.resources.espoir -= 10;
    },
                log: "La lueur de l'espoir s'éteint rapidement derrière vos remparts."
            }
        ]
    },
    {
        id: "age1_22_nains_belegost",
        title: "Les Masques de Fer",
        description: "Les Nains de Belegost proposent de forger des masques de guerre capables de résister aux flammes des dragons en échange d'or pur.",
        repeatable: false,
        condition: (gameState) => gameState.meta.current_age === 1 && (gameState.state.current_year >= 82 && gameState.resources.richesse > 80),
        choices: [
            {
                label: "Acheter les masques (-80 Richesse, +100 Savoir, +30 Renom)",
                canAfford: (gameState) => gameState.resources.richesse >= 80,
                effect: (gameState) => {
        gameState.resources.richesse -= 80;
        gameState.resources.savoir += 100;
        gameState.resources.renom += 30;
    },
                log: "Vos armées possèdent désormais une défense légendaire contre le feu."
            },
            {
                label: "Économiser votre or (-20 Savoir)",
                canAfford: (gameState) => gameState.resources.savoir >= 20,
                effect: (gameState) => {
        gameState.resources.savoir -= 20;
    },
                log: "Vous gardez vos coffres pleins, mais vos boucliers restent en bois."
            }
        ]
    },
    {
        id: "age1_23_larme_unom",
        title: "Les Larmes sans Nombre",
        description: "Une immense armée alliée a été annihilée au Nord suite à une terrible trahison. Le deuil frappe toutes les familles du domaine.",
        repeatable: false,
        condition: (gameState) => gameState.meta.current_age === 1 && (gameState.state.current_year >= 85),
        choices: [
            {
                label: "Décréter un deuil national (-40 Espoir, +20 Renom)",
                canAfford: (gameState) => gameState.resources.espoir >= 40,
                effect: (gameState) => {
        gameState.resources.espoir -= 40;
        gameState.resources.renom += 20;
    },
                log: "La tristesse est immense, mais la dignité de votre peuple reste entière."
            },
            {
                label: "Forcer à travailler pour oublier (-20 Hommes, -30 Espoir, +10 Ombre)",
                canAfford: (gameState) => gameState.population.hommes >= 20 && gameState.resources.espoir >= 30,
                effect: (gameState) => {
        gameState.population.hommes = Math.max(0, gameState.population.hommes - 20);
        gameState.resources.espoir -= 30;
        gameState.state.shadow_level = Math.min(100, gameState.state.shadow_level + 10);
    },
                log: "Le désespoir pousse les ouvriers à la révolte."
            }
        ]
    },
    {
        id: "age1_24_ruines_doriath",
        title: "La Chute de l'Anneau",
        description: "Le royaume caché de Doriath est tombé, pillé par ses propres alliés. La panique s'empare des derniers bastions libres.",
        repeatable: false,
        condition: (gameState) => gameState.meta.current_age === 1 && (gameState.state.current_year >= 88),
        choices: [
            {
                label: "Accueillir les derniers survivants (+30 Elfes, -30 Richesse, -15 Espoir)",
                canAfford: (gameState) => gameState.resources.richesse >= 30 && gameState.resources.espoir >= 15,
                effect: (gameState) => {
        gameState.population.elfes += 30;
        gameState.resources.richesse -= 30;
        gameState.resources.espoir -= 15;
    },
                log: "Le domaine recueille les morceaux brisés d'un monde qui se meurt."
            },
            {
                label: "Se barricader totalement (+10 Richesse, +15 Ombre)",
                canAfford: () => true,
                effect: (gameState) => {
        gameState.resources.richesse += 10;
        gameState.state.shadow_level = Math.min(100, gameState.state.shadow_level + 15);
    },
                log: "Vous vous murez dans l'attente de la fin."
            }
        ]
    },
    {
        id: "age1_25_earandil_vol",
        title: "Le Voyage de l'Étoile",
        description: "Un grand navigateur a pris la mer pour supplier les Valar de sauver la Terre du Milieu. Une nouvelle étoile brille à l'Ouest.",
        repeatable: false,
        condition: (gameState) => gameState.meta.current_age === 1 && (gameState.state.current_year >= 92),
        choices: [
            {
                label: "Suivre l'Étoile du soir (+60 Espoir, -10 Ombre)",
                canAfford: () => true,
                effect: (gameState) => {
        gameState.resources.espoir += 60;
        gameState.state.shadow_level = Math.max(0, gameState.state.shadow_level - 10);
    },
                log: "Le peuple lève les yeux vers le ciel. La nuit semble moins noire."
            },
            {
                label: "Ignorer les signes célestes (-10 Espoir)",
                canAfford: (gameState) => gameState.resources.espoir >= 10,
                effect: (gameState) => {
        gameState.resources.espoir -= 10;
    },
                log: "Le quotidien morne étouffe les derniers rêves."
            }
        ]
    },
    {
        id: "age1_26_valar_colere",
        title: "Le Tonnerre de l'Ouest",
        description: "La terre tremble avec une violence inouïe. Les armées des Dieux débarquent au Nord. La guerre finale a commencé.",
        repeatable: false,
        condition: (gameState) => gameState.meta.current_age === 1 && (gameState.state.current_year >= 95),
        choices: [
            {
                label: "Mobiliser vos dernières forces (-20 Hommes, +80 Renom)",
                canAfford: (gameState) => gameState.population.hommes >= 20,
                effect: (gameState) => {
        gameState.population.hommes = Math.max(0, gameState.population.hommes - 20);
        gameState.resources.renom += 80;
    },
                log: "Vos bannières flottent aux côtés des armées de la Lumière."
            },
            {
                label: "Rester terrés dans les abris (+30 Espoir, -40 Renom)",
                canAfford: (gameState) => gameState.resources.renom >= 40,
                effect: (gameState) => {
        gameState.resources.espoir += 30;
        gameState.resources.renom -= 40;
    },
                log: "Vous survivez tapis dans l'ombre pendant que les montagnes s'effondrent."
            }
        ]
    },
    {
        id: "age1_27_beleriand_abyme",
        title: "L'Engloutissement",
        description: "Le Nord se brise sous l'impact des chocs géologiques. La mer s'engouffre dans les plaines. Votre domaine doit fuir vers l'Est.",
        repeatable: false,
        condition: (gameState) => gameState.meta.current_age === 1 && (gameState.state.current_year >= 97),
        choices: [
            {
                label: "Mener la grande migration (-50 Richesse, -30 Hommes, +40 Espoir)",
                canAfford: (gameState) => gameState.resources.richesse >= 50 && gameState.population.hommes >= 30,
                effect: (gameState) => {
        gameState.resources.richesse -= 50;
        gameState.population.hommes = Math.max(0, gameState.population.hommes - 30);
        gameState.resources.espoir += 40;
    },
                log: "Vous abandonnez vos anciennes terres, guidant les vôtres vers un nouveau continent."
            },
            {
                label: "S'accrocher aux vieux remparts (-50 Hommes, +20 Ombre)",
                canAfford: (gameState) => gameState.population.hommes >= 50,
                effect: (gameState) => {
        gameState.population.hommes = Math.max(0, gameState.population.hommes - 50);
        gameState.state.shadow_level = Math.min(100, gameState.state.shadow_level + 20);
    },
                log: "Les flots ont emporté vos fortifications et vos souvenirs."
            }
        ]
    },
    {
        id: "age1_28_morgoth_bannissement",
        title: "Le Vide Éternel",
        description: "Le Seigneur Sombre a été vaincu, enchaîné et jeté au-delà des Portes de la Nuit. Le Premier Âge s'achève dans un grand silence.",
        repeatable: false,
        condition: (gameState) => gameState.meta.current_age === 1 && (gameState.state.current_year >= 99),
        choices: [
            {
                label: "Bâtir le mémorial de l'Aube (-40 Richesse, +100 Renom)",
                canAfford: (gameState) => gameState.resources.richesse >= 40,
                effect: (gameState) => {
        gameState.resources.richesse -= 40;
        gameState.resources.renom += 100;
    },
                log: "L'histoire de vos sacrifices est gravée dans la pierre sacrée."
            },
            {
                label: "Savourer la paix retrouvée (+40 Espoir)",
                canAfford: () => true,
                effect: (gameState) => {
        gameState.resources.espoir += 40;
    },
                log: "La tension retombe enfin après un siècle de terreur."
            }
        ]
    },
    {
        id: "age1_29_heritage_choix",
        title: "L'Aube du Deuxième Âge",
        description: "Le monde est remodelé. En tant que Gardien, vous devez choisir l'orientation économique de votre peuple pour la reconstruction.",
        repeatable: false,
        condition: (gameState) => gameState.meta.current_age === 1 && (gameState.state.current_year >= 100),
        choices: [
            {
                label: "Bâtir des guildes de bâtisseurs (-50 Richesse, +50 Savoir)",
                canAfford: (gameState) => gameState.resources.richesse >= 50,
                effect: (gameState) => {
        gameState.resources.richesse -= 50;
        gameState.resources.savoir += 50;
    },
                log: "Vous jetez les bases d'un empire axé sur l'architecture et la science."
            },
            {
                label: "Établir un royaume de gardiens (+50 Renom, +20 Espoir)",
                canAfford: () => true,
                effect: (gameState) => {
        gameState.resources.renom += 50;
        gameState.resources.espoir += 20;
    },
                log: "Vous choisissez la voie de la vigilance militaire et de la tradition."
            }
        ]
    },
    {
        id: "age1_30_fin_ere",
        title: "La Fin du Premier Âge",
        description: "Les chroniques de cette époque de mythes sont closes. Votre peuple se tourne vers l'Est, prêt à rebâtir sur les terres du Lindon.",
        repeatable: false,
        condition: (gameState) => gameState.meta.current_age === 1 && (gameState.state.current_year >= 100),
        choices: [
            {
                label: "Passer au Deuxième Âge (Aucun effet)",
                canAfford: () => true,
                effect: () => {},
                log: "Le grand livre du Premier Âge se ferme dans la dignité."
            },
            {
                label: "Méditer sur les pertes (-20 Espoir)",
                canAfford: (gameState) => gameState.resources.espoir >= 20,
                effect: (gameState) => {
        gameState.resources.espoir -= 20;
    },
                log: "Les fantômes du Beleriand hantent encore vos mémoires."
            }
        ]
    },
    {
        id: "age2_01_fondation",
        title: "Les Nouvelles Assises",
        description: "Le monde a changé. Votre peuple s'installe sur des terres vierges et fertiles. Il faut choisir comment structurer les fondations de ce nouvel Âge.",
        repeatable: false,
        condition: (gameState) => gameState.meta.current_age === 2 && (gameState.state.current_year >= 1),
        choices: [
            {
                label: "Ériger de grandes cités de pierre (-50 Richesse, +40 Renom)",
                canAfford: (gameState) => gameState.resources.richesse >= 50,
                effect: (gameState) => {
        gameState.resources.richesse -= 50;
        gameState.resources.renom += 40;
    },
                log: "Les fondations sont solides, tournées vers la grandeur architecturale."
            },
            {
                label: "Privilégier l'agriculture et les bois (+40 Richesse, +10 Espoir)",
                canAfford: () => true,
                effect: (gameState) => {
        gameState.resources.richesse += 40;
        gameState.resources.espoir += 10;
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
                label: "Créer un comptoir commercial commun (-40 Richesse, +60 Savoir, +20 Renom)",
                canAfford: (gameState) => gameState.resources.richesse >= 40,
                effect: (gameState) => {
        gameState.resources.richesse -= 40;
        gameState.resources.savoir += 60;
        gameState.resources.renom += 20;
    },
                log: "Leurs technologies et leurs cartes maritimes enrichissent vos érudits."
            },
            {
                label: "Se méfier de leur fierté écrasante (+15 Espoir, -20 Renom)",
                canAfford: (gameState) => gameState.resources.renom >= 20,
                effect: (gameState) => {
        gameState.resources.espoir += 15;
        gameState.resources.renom -= 20;
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
                label: "Accepter ses cadeaux et ses leçons (+150 Savoir, +50 Richesse, +25 Ombre)",
                canAfford: () => true,
                effect: (gameState) => {
        gameState.resources.savoir += 150;
        gameState.resources.richesse += 50;
        gameState.state.shadow_level = Math.min(100, gameState.state.shadow_level + 25);
    },
                log: "Vos artisans réalisent des merveilles, mais un sentiment d'anxiété plane sur les forges."
            },
            {
                label: "Écouter les réticences des Elfes (-20 Renom, -10 Ombre)",
                canAfford: (gameState) => gameState.resources.renom >= 20,
                effect: (gameState) => {
        gameState.resources.renom -= 20;
        gameState.state.shadow_level = Math.max(0, gameState.state.shadow_level - 10);
    },
                log: "Vous refusez ses présents. Il repart vers l'Est, le regard brièvement noir."
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
                label: "Leur céder le contrôle (-40 Renom, +80 Richesse)",
                canAfford: (gameState) => gameState.resources.renom >= 40,
                effect: (gameState) => {
        gameState.resources.renom -= 40;
        gameState.resources.richesse += 80;
    },
                log: "L'économie explose, mais votre autorité politique s'effrite face aux marchands."
            },
            {
                label: "Maintenir l'autorité de l'Intendant (-40 Richesse, +30 Renom)",
                canAfford: (gameState) => gameState.resources.richesse >= 40,
                effect: (gameState) => {
        gameState.resources.richesse -= 40;
        gameState.resources.renom += 30;
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
                label: "Payer une compensation et reboiser (-40 Richesse, +20 Renom)",
                canAfford: (gameState) => gameState.resources.richesse >= 40,
                effect: (gameState) => {
        gameState.resources.richesse -= 40;
        gameState.resources.renom += 20;
    },
                log: "La paix est préservée avec le peuple des bois au détriment de vos chantiers."
            },
            {
                label: "Forcer le passage avec des gardes (+30 Richesse, -30 Renom, +10 Ombre)",
                canAfford: (gameState) => gameState.resources.renom >= 30,
                effect: (gameState) => {
        gameState.resources.richesse += 30;
        gameState.resources.renom -= 30;
        gameState.state.shadow_level = Math.min(100, gameState.state.shadow_level + 10);
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
                label: "Envoyer des érudits enquêter (-30 Richesse, +80 Savoir)",
                canAfford: (gameState) => gameState.resources.richesse >= 30,
                effect: (gameState) => {
        gameState.resources.richesse -= 30;
        gameState.resources.savoir += 80;
    },
                log: "Vos sages reviennent avec des croquis fascinants sur la géométrie sacrée."
            },
            {
                label: "Ignorer ces artefacts dangereux (+20 Espoir)",
                canAfford: () => true,
                effect: (gameState) => {
        gameState.resources.espoir += 20;
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
                label: "Acheter les captifs pour vos chantiers (+100 Richesse, -40 Espoir, +20 Ombre)",
                canAfford: (gameState) => gameState.resources.espoir >= 40,
                effect: (gameState) => {
        gameState.resources.richesse += 100;
        gameState.resources.espoir -= 40;
        gameState.state.shadow_level = Math.min(100, gameState.state.shadow_level + 20);
    },
                log: "Vos monuments sortent de terre à une vitesse prodigieuse, baignés de larmes."
            },
            {
                label: "Refuser cette infamie (+40 Espoir, -30 Richesse)",
                canAfford: (gameState) => gameState.resources.richesse >= 30,
                effect: (gameState) => {
        gameState.resources.espoir += 40;
        gameState.resources.richesse -= 30;
    },
                log: "Votre économie stagne, mais l'honneur de votre peuple reste intact."
            }
        ]
    },
    {
        id: "age2_08_numenor_tribut",
        title: "L'Ombre sur Númenor",
        description: "Les navires des Rois de la Mer reviennent, mais ils ne demandent plus l'amitié : ils exigent un lourd tribut en or et en bois, vous traitant comme des inférieurs.",
        repeatable: false,
        condition: (gameState) => gameState.meta.current_age === 2 && (gameState.state.current_year >= 35 && gameState.resources.richesse > 80),
        choices: [
            {
                label: "Payer le tribut sans broncher (-80 Richesse, -20 Renom)",
                canAfford: (gameState) => gameState.resources.richesse >= 80 && gameState.resources.renom >= 20,
                effect: (gameState) => {
        gameState.resources.richesse -= 80;
        gameState.resources.renom -= 20;
    },
                log: "Vous achetez la paix face à la plus grande flotte du monde."
            },
            {
                label: "Refuser et fortifier les côtes (-40 Richesse, +40 Renom, -20 Espoir)",
                canAfford: (gameState) => gameState.resources.richesse >= 40 && gameState.resources.espoir >= 20,
                effect: (gameState) => {
        gameState.resources.richesse -= 40;
        gameState.resources.renom += 40;
        gameState.resources.espoir -= 20;
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
                label: "Renforcer les garnisons frontalières (-50 Richesse, +30 Renom)",
                canAfford: (gameState) => gameState.resources.richesse >= 50,
                effect: (gameState) => {
        gameState.resources.richesse -= 50;
        gameState.resources.renom += 30;
    },
                log: "Vos soldats surveillent les cols, prêts à donner l'alerte."
            },
            {
                label: "Financer des rituels d'espoir (-40 Richesse, +40 Espoir)",
                canAfford: (gameState) => gameState.resources.richesse >= 40,
                effect: (gameState) => {
        gameState.resources.richesse -= 40;
        gameState.resources.espoir += 40;
    },
                log: "Les temples résonnent de prières pour dissiper l'angoisse ambiante."
            }
        ]
    },
    {
        id: "age2_10_anneaux_distribution",
        title: "Le Cadeau du Maître",
        description: "Un messager d'Annatar vous apporte un anneau d'or orné d'une gemme rouge, promettant une vie éternelle et une richesse infinie pour le dirigeant du domaine.",
        repeatable: false,
        condition: (gameState) => gameState.meta.current_age === 2 && (gameState.state.current_year >= 45 && gameState.resources.renom > 40),
        choices: [
            {
                label: "Enfiler l'Anneau (+300 Richesse, +100 Renom, +40 Ombre)",
                canAfford: () => true,
                effect: (gameState) => {
        gameState.resources.richesse += 300;
        gameState.resources.renom += 100;
        gameState.state.shadow_level = Math.min(100, gameState.state.shadow_level + 40);
    },
                log: "Votre volonté devient d'acier, la richesse abonde, mais vos nuits deviennent terrifiantes."
            },
            {
                label: "Jeter le présent dans les forges (+60 Espoir, -30 Richesse)",
                canAfford: (gameState) => gameState.resources.richesse >= 30,
                effect: (gameState) => {
        gameState.resources.espoir += 60;
        gameState.resources.richesse -= 30;
    },
                log: "Le messager s'est volatilisé dans un cri strident. Votre peuple loue votre sagesse."
            }
        ]
    },
    {
        id: "age2_11_erebor_alliance",
        title: "Le Pacte de la Pierre",
        description: "Les Nains de Khazad-dûm ouvrent les plus grandes portes de leur histoire. Ils proposent une route commerciale exclusive à travers la montagne.",
        repeatable: false,
        condition: (gameState) => gameState.meta.current_age === 2 && (gameState.state.current_year >= 50 && gameState.resources.richesse > 60),
        choices: [
            {
                label: "Investir dans la route de pierre (-60 Richesse, +120 Richesse, +40 Savoir)",
                canAfford: (gameState) => gameState.resources.richesse >= 60,
                effect: (gameState) => {
        gameState.resources.richesse -= 60;
        gameState.resources.richesse += 120;
        gameState.resources.savoir += 40;
    },
                log: "Le Mithril et l'or coulent dans votre économie. L'alliance est scellée."
            },
            {
                label: "Décliner par méfiance envers les Nains (-20 Renom)",
                canAfford: (gameState) => gameState.resources.renom >= 20,
                effect: (gameState) => {
        gameState.resources.renom -= 20;
    },
                log: "Les Nains s'allient avec vos rivaux, vous isolant économiquement."
            }
        ]
    },
    {
        id: "age2_12_guerre_elfes_sauron",
        title: "Le Masque Tombe",
        description: "Sauron s'est révélé. Ses armées de monstres envahissent l'Eregion et massacrent les forgerons elfes. Celebrimbor est mort. La guerre totale est là.",
        repeatable: false,
        condition: (gameState) => gameState.meta.current_age === 2 && (gameState.state.current_year >= 55 && gameState.population.hommes > 50),
        choices: [
            {
                label: "Envoyer votre armée soutenir les Elfes (-40 Hommes, +80 Renom)",
                canAfford: (gameState) => gameState.population.hommes >= 40,
                effect: (gameState) => {
        gameState.population.hommes = Math.max(0, gameState.population.hommes - 40);
        gameState.resources.renom += 80;
    },
                log: "Vos troupes subissent de lourdes pertes, mais sauvent les restes du peuple elfe."
            },
            {
                label: "Murer le domaine et stocker les vivres (-50 Richesse, +30 Espoir, -40 Renom)",
                canAfford: (gameState) => gameState.resources.richesse >= 50 && gameState.resources.renom >= 40,
                effect: (gameState) => {
        gameState.resources.richesse -= 50;
        gameState.resources.espoir += 30;
        gameState.resources.renom -= 40;
    },
                log: "Vous survivez lâchement pendant que l'Eregion brûle jusqu'aux fondations."
            }
        ]
    },
    {
        id: "age2_13_fondation_imladris",
        title: "La Vallée Cachée",
        description: "Elrond a fui le désastre et fondé un refuge secret dans une vallée profonde : Fondcombe. Il vous demande d'y envoyer vos reliques historiques.",
        repeatable: false,
        condition: (gameState) => gameState.meta.current_age === 2 && (gameState.state.current_year >= 60 && gameState.resources.savoir > 80),
        choices: [
            {
                label: "Envoyer vos archives sacrées (-60 Savoir, +40 Renom, +20 Espoir)",
                canAfford: (gameState) => gameState.resources.savoir >= 60,
                effect: (gameState) => {
        gameState.resources.savoir -= 60;
        gameState.resources.renom += 40;
        gameState.resources.espoir += 20;
    },
                log: "Vos parchemins sont en sécurité dans la maison d'Elrond pour les siècles futurs."
            },
            {
                label: "Garder vos écrits chez vous (+30 Savoir, -20 Espoir)",
                canAfford: (gameState) => gameState.resources.espoir >= 20,
                effect: (gameState) => {
        gameState.resources.savoir += 30;
        gameState.resources.espoir -= 20;
    },
                log: "Vous conservez votre savoir immédiat, mais risquez sa destruction future."
            }
        ]
    },
    {
        id: "age2_14_numenor_orgueil",
        title: "Les Temples de Sang",
        description: "Les Númenoréens installés sur vos côtes ont érigé un immense temple dédié à Melkor. Ils y pratiquent des sacrifices pour obtenir la vie éternelle.",
        repeatable: false,
        condition: (gameState) => gameState.meta.current_age === 2 && (gameState.state.current_year >= 65 && gameState.state.shadow_level > 30),
        choices: [
            {
                label: "Fermer les yeux pour garder leurs profits (+150 Richesse, +20 Ombre)",
                canAfford: () => true,
                effect: (gameState) => {
        gameState.resources.richesse += 150;
        gameState.state.shadow_level = Math.min(100, gameState.state.shadow_level + 20);
    },
                log: "L'or numénoréen emplit vos coffres, mais l'air empeste le soufre et la mort."
            },
            {
                label: "Chasser leurs prêtres par la force (-20 Hommes, +50 Espoir, -15 Ombre)",
                canAfford: (gameState) => gameState.population.hommes >= 20,
                effect: (gameState) => {
        gameState.population.hommes = Math.max(0, gameState.population.hommes - 20);
        gameState.resources.espoir += 50;
        gameState.state.shadow_level = Math.max(0, gameState.state.shadow_level - 15);
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
                label: "Soutenir le siège héroïquement (-20 Hommes, -40 Richesse, +50 Renom)",
                canAfford: (gameState) => gameState.population.hommes >= 20 && gameState.resources.richesse >= 40,
                effect: (gameState) => {
        gameState.population.hommes = Math.max(0, gameState.population.hommes - 20);
        gameState.resources.richesse -= 40;
        gameState.resources.renom += 50;
    },
                log: "Vos lignes tiennent bon grâce à votre courage. L'ennemi s'épuise sur vos murs."
            },
            {
                label: "Négocier une reddition partielle (-100 Richesse, -30 Renom, +25 Ombre)",
                canAfford: (gameState) => gameState.resources.richesse >= 100 && gameState.resources.renom >= 30,
                effect: (gameState) => {
        gameState.resources.richesse -= 100;
        gameState.resources.renom -= 30;
        gameState.state.shadow_level = Math.min(100, gameState.state.shadow_level + 25);
    },
                log: "Vous sauvez des vies au prix de votre honneur et de votre fortune."
            }
        ]
    },
    {
        id: "age2_16_ar_pharazon_debarquement",
        title: "L'Arrivée du Roi d'Or",
        description: "Le Roi de Númenor, Ar-Pharazôn, débarque avec une armée si colossale et terrifiante que les forces de Sauron s'enfuient sans combattre. Le Roi exige votre soumission.",
        repeatable: false,
        condition: (gameState) => gameState.meta.current_age === 2 && (gameState.state.current_year >= 75),
        choices: [
            {
                label: "S'incliner devant la toute-puissance de Númenor (+50 Renom, -30 Espoir)",
                canAfford: (gameState) => gameState.resources.espoir >= 30,
                effect: (gameState) => {
        gameState.resources.renom += 50;
        gameState.resources.espoir -= 30;
    },
                log: "Vous rejoignez l'allégeance de l'Empire, ébloui et soumis."
            },
            {
                label: "Rester neutre et distant (-40 Richesse)",
                canAfford: (gameState) => gameState.resources.richesse >= 40,
                effect: (gameState) => {
        gameState.resources.richesse -= 40;
    },
                log: "Vous payez de lourdes amendes pour votre manque d'enthousiasme."
            }
        ]
    },
    {
        id: "age2_17_sauron_captif",
        title: "Le Prisonnier de l'Ouest",
        description: "Sauron s'est rendu au Roi de Númenor et a été emmené enchaîné sur leur île. Une paix étrange et suspecte s'installe sur la Terre du Milieu.",
        repeatable: false,
        condition: (gameState) => gameState.meta.current_age === 2 && (gameState.state.current_year >= 78),
        choices: [
            {
                label: "Démanteler les industries de guerre (+60 Richesse, -20 Renom)",
                canAfford: (gameState) => gameState.resources.renom >= 20,
                effect: (gameState) => {
        gameState.resources.richesse += 60;
        gameState.resources.renom -= 20;
    },
                log: "L'or retourne à l'agriculture, mais vos soldats s'amollissent."
            },
            {
                label: "Rester vigilant et armé (-30 Richesse, +30 Espoir)",
                canAfford: (gameState) => gameState.resources.richesse >= 30,
                effect: (gameState) => {
        gameState.resources.richesse -= 30;
        gameState.resources.espoir += 30;
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
                label: "Établir une inquisition rigoureuse (-20 Hommes, -30 Espoir, -15 Ombre)",
                canAfford: (gameState) => gameState.population.hommes >= 20 && gameState.resources.espoir >= 30,
                effect: (gameState) => {
        gameState.population.hommes = Math.max(0, gameState.population.hommes - 20);
        gameState.resources.espoir -= 30;
        gameState.state.shadow_level = Math.max(0, gameState.state.shadow_level - 15);
    },
                log: "La chasse aux sorcières assombrit l'ambiance, mais le culte est éradiqué."
            },
            {
                label: "Laisser faire par tolérance (+40 Richesse, +20 Ombre)",
                canAfford: () => true,
                effect: (gameState) => {
        gameState.resources.richesse += 40;
        gameState.state.shadow_level = Math.min(100, gameState.state.shadow_level + 20);
    },
                log: "L'élite s'enrichit grâce à ces réseaux, mais la morale se décompose."
            }
        ]
    },
    {
        id: "age2_19_flotte_numenor",
        title: "L'Armada de l'Hubris",
        description: "Le Roi de Númenor a construit la plus grande flotte de l'histoire pour attaquer les Dieux à l'Ouest et leur voler l'immortalité. Ils coupent toutes vos forêts pour faire des mâts.",
        repeatable: false,
        condition: (gameState) => gameState.meta.current_age === 2 && (gameState.state.current_year >= 85 && gameState.resources.richesse > 50),
        choices: [
            {
                label: "Vendre tout votre bois à la flotte (+150 Richesse, -30 Espoir)",
                canAfford: (gameState) => gameState.resources.espoir >= 30,
                effect: (gameState) => {
        gameState.resources.richesse += 150;
        gameState.resources.espoir -= 30;
    },
                log: "La richesse abonde, mais vos collines sont nues et le ciel gronde d'une colère divine."
            },
            {
                label: "Saboter les chantiers navals de l'Empire (-15 Hommes, +50 Renom)",
                canAfford: (gameState) => gameState.population.hommes >= 15,
                effect: (gameState) => {
        gameState.population.hommes = Math.max(0, gameState.population.hommes - 15);
        gameState.resources.renom += 50;
    },
                log: "Vous ralentissez la folie du Roi au prix de vies humaines."
            }
        ]
    },
    {
        id: "age2_20_submersion",
        title: "La Chute de l'Étoile",
        description: "Un grondement cataclysmique secoue la planète. L'océan s'ouvre. L'Île de Númenor est engloutie sous les flots par la colère de Dieu. Une vague gigantesque frappe vos côtes.",
        repeatable: false,
        condition: (gameState) => gameState.meta.current_age === 2 && (gameState.state.current_year >= 90),
        choices: [
            {
                label: "Fuir vers les hauteurs de l'Est (-60 Richesse, -25 Hommes, +30 Espoir)",
                canAfford: (gameState) => gameState.resources.richesse >= 60 && gameState.population.hommes >= 25,
                effect: (gameState) => {
        gameState.resources.richesse -= 60;
        gameState.population.hommes = Math.max(0, gameState.population.hommes - 25);
        gameState.resources.espoir += 30;
    },
                log: "Le littoral est dévasté, mais le cœur de votre peuple survit sur la montagne."
            },
            {
                label: "Tenter de sauver les ports bas (-60 Hommes, +20 Ombre)",
                canAfford: (gameState) => gameState.population.hommes >= 60,
                effect: (gameState) => {
        gameState.population.hommes = Math.max(0, gameState.population.hommes - 60);
        gameState.state.shadow_level = Math.min(100, gameState.state.shadow_level + 20);
    },
                log: "La vague géante balaie vos infrastructures et emporte vos marins."
            }
        ]
    },
    {
        id: "age2_21_survivants_elendil",
        title: "Les Fidèles de la Tempête",
        description: "Des navires brisés par le cataclysme s'échouent. Menés par Elendil et ses fils, ces rescapés sont restés fidèles aux Dieux et aux Elfes. Ils demandent de la pierre pour bâtir de nouveaux royaumes.",
        repeatable: false,
        condition: (gameState) => gameState.meta.current_age === 2 && (gameState.state.current_year >= 92 && gameState.resources.richesse > 40),
        choices: [
            {
                label: "Fournir la pierre et sceller l'alliance (-40 Richesse, +100 Renom, +40 Espoir)",
                canAfford: (gameState) => gameState.resources.richesse >= 40,
                effect: (gameState) => {
        gameState.resources.richesse -= 40;
        gameState.resources.renom += 100;
        gameState.resources.espoir += 40;
    },
                log: "Vous posez les premières pierres du Gondor et de l'Arnor. Une amitié éternelle renaît."
            },
            {
                label: "Préserver vos matériaux pour vos propres besoins (-20 Renom)",
                canAfford: (gameState) => gameState.resources.renom >= 20,
                effect: (gameState) => {
        gameState.resources.renom -= 20;
    },
                log: "Les hauts rois s'installent plus loin, vous ignorant superbement."
            }
        ]
    },
    {
        id: "age2_22_retour_sauron",
        title: "L'Ombre se Réincarne",
        description: "Sauron a survécu à la submersion. Son esprit est revenu au Mordor, et il a revêtu une armure de feu et de haine. La Montagne du Destin entre en éruption.",
        repeatable: false,
        condition: (gameState) => gameState.meta.current_age === 2 && (gameState.state.current_year >= 94 && gameState.resources.espoir > 30),
        choices: [
            {
                label: "Décréter l'état de guerre totale (-30 Richesse, +30 Renom)",
                canAfford: (gameState) => gameState.resources.richesse >= 30,
                effect: (gameState) => {
        gameState.resources.richesse -= 30;
        gameState.resources.renom += 30;
    },
                log: "Le peuple s'arme. Personne ne se fait d'illusions sur la suite."
            },
            {
                label: "Paniquer et rationner (-20 Espoir, +5 Ombre)",
                canAfford: (gameState) => gameState.resources.espoir >= 20,
                effect: (gameState) => {
        gameState.resources.espoir -= 20;
        gameState.state.shadow_level = Math.min(100, gameState.state.shadow_level + 5);
    },
                log: "Le découragement paralyse les industries de votre domaine."
            }
        ]
    },
    {
        id: "age2_23_derniere_alliance",
        title: "La Dernière Alliance",
        description: "Elendil et le Roi Elfe Gil-galad lèvent une armée unie pour anéantir Sauron une fois pour toutes. Ils appellent toutes les forces libres à les rejoindre.",
        repeatable: false,
        condition: (gameState) => gameState.meta.current_age === 2 && (gameState.state.current_year >= 96 && gameState.population.hommes > 40),
        choices: [
            {
                label: "Mobiliser toutes vos troupes (-35 Hommes, +100 Renom)",
                canAfford: (gameState) => gameState.population.hommes >= 35,
                effect: (gameState) => {
        gameState.population.hommes = Math.max(0, gameState.population.hommes - 35);
        gameState.resources.renom += 100;
    },
                log: "Vos bannières marchent aux côtés des plus grands rois de l'Histoire humaine et elfique."
            },
            {
                label: "Rester pour défendre vos foyers (+20 Espoir, -50 Renom)",
                canAfford: (gameState) => gameState.resources.renom >= 50,
                effect: (gameState) => {
        gameState.resources.espoir += 20;
        gameState.resources.renom -= 50;
    },
                log: "La grande armée passe sans vous, vous marquant du sceau de la lâcheté."
            }
        ]
    },
    {
        id: "age2_24_siege_mordor",
        title: "La Longue Veille au Noir",
        description: "La guerre s'éternise aux portes du Mordor. Le siège dure depuis des années. On vous demande des convois constants de ravitaillement.",
        repeatable: false,
        condition: (gameState) => gameState.meta.current_age === 2 && (gameState.state.current_year >= 97 && gameState.resources.richesse > 50),
        choices: [
            {
                label: "Envoyer les convois de vivres (-50 Richesse, +40 Renom)",
                canAfford: (gameState) => gameState.resources.richesse >= 50,
                effect: (gameState) => {
        gameState.resources.richesse -= 50;
        gameState.resources.renom += 40;
    },
                log: "Vos paysans triment jour et nuit, mais l'armée de l'Alliance tient bon grâce à vous."
            },
            {
                label: "Garder la nourriture pour vos villages (-10 Hommes, -30 Renom)",
                canAfford: (gameState) => gameState.population.hommes >= 10 && gameState.resources.renom >= 30,
                effect: (gameState) => {
        gameState.population.hommes = Math.max(0, gameState.population.hommes - 10);
        gameState.resources.renom -= 30;
    },
                log: "Les armées souffrent de famine au front et votre nom est maudit."
            }
        ]
    },
    {
        id: "age2_25_montagne_destin_choc",
        title: "Le Duel des Sommets",
        description: "La nouvelle arrive : Gil-galad et Elendil sont tombés en terrassant Sauron, mais le fils du roi, Isildur, a coupé le Doigt du Monstre. L'Anneau Unique est pris. Sauron est vaincu.",
        repeatable: false,
        condition: (gameState) => gameState.meta.current_age === 2 && (gameState.state.current_year >= 98),
        choices: [
            {
                label: "Organiser des fêtes de délivrance (+50 Espoir, +20 Renom)",
                canAfford: () => true,
                effect: (gameState) => {
        gameState.resources.espoir += 50;
        gameState.resources.renom += 20;
    },
                log: "Le cauchemar s'achève enfin après des décennies de conflit."
            },
            {
                label: "Méditer sur la mort des grands rois (-20 Espoir)",
                canAfford: (gameState) => gameState.resources.espoir >= 20,
                effect: (gameState) => {
        gameState.resources.espoir -= 20;
    },
                log: "La victoire est totale, mais le monde semble soudain plus vide."
            }
        ]
    },
    {
        id: "age2_26_isildur_erreur",
        title: "La Faute d'Isildur",
        description: "Isildur refuse de détruire l'Anneau Unique dans le brasier du destin, le gardant comme compensation pour la mort de son père. Le mal n'est pas éradiqué à la racine.",
        repeatable: false,
        condition: (gameState) => gameState.meta.current_age === 2 && (gameState.state.current_year >= 99),
        choices: [
            {
                label: "Avertir vos sages en secret (-20 Richesse, +40 Savoir)",
                canAfford: (gameState) => gameState.resources.richesse >= 20,
                effect: (gameState) => {
        gameState.resources.richesse -= 20;
        gameState.resources.savoir += 40;
    },
                log: "Les érudits consignent cette folie dans les livres secrets du domaine."
            },
            {
                label: "Ignorer les affaires des grands rois (+10 Espoir)",
                canAfford: () => true,
                effect: (gameState) => {
        gameState.resources.espoir += 10;
    },
                log: "Vous savourez la paix immédiate, refusant de penser à l'avenir."
            }
        ]
    },
    {
        id: "age2_27_desastre_champs",
        title: "Le Désastre des Iris",
        description: "Isildur est tombé dans une embuscade d'orques au Nord. L'Anneau Unique est perdu dans les eaux profondes de la Grande Rivière. Les lignées de rois se divisent.",
        repeatable: false,
        condition: (gameState) => gameState.meta.current_age === 2 && (gameState.state.current_year >= 99 && gameState.state.shadow_level < 50),
        choices: [
            {
                label: "Sécuriser les frontières du Nord (-30 Richesse, +20 Renom)",
                canAfford: (gameState) => gameState.resources.richesse >= 30,
                effect: (gameState) => {
        gameState.resources.richesse -= 30;
        gameState.resources.renom += 20;
    },
                log: "Vous protégez les routes face aux orques enhardis par la mort du Roi."
            },
            {
                label: "Se replier sur vos terres locales (+10 Richesse, -15 Espoir)",
                canAfford: (gameState) => gameState.resources.espoir >= 15,
                effect: (gameState) => {
        gameState.resources.richesse += 10;
        gameState.resources.espoir -= 15;
    },
                log: "Le chaos politique du Nord jette un voile d'incertitude sur vos sujets."
            }
        ]
    },
    {
        id: "age2_28_depart_derniers_noldor",
        title: "Le Crépuscule des Rois",
        description: "Blessés par la perte de Gil-galad, de nombreux hauts elfes décident de quitter définitivement le domaine pour s'embarquer vers l'Ouest.",
        repeatable: false,
        condition: (gameState) => gameState.meta.current_age === 2 && (gameState.state.current_year >= 100 && gameState.population.elfes > 10),
        choices: [
            {
                label: "Leur offrir une garde d'honneur (-20 Richesse, +30 Renom, -10 Elfes)",
                canAfford: (gameState) => gameState.resources.richesse >= 20 && gameState.population.elfes >= 10,
                effect: (gameState) => {
        gameState.resources.richesse -= 20;
        gameState.resources.renom += 30;
        gameState.population.elfes = Math.max(0, gameState.population.elfes - 10);
    },
                log: "Leur départ affaiblit votre puissance magique, mais leur bénédiction demeure."
            },
            {
                label: "Tenter de les retenir de force (-15 Elfes, -30 Espoir, +10 Ombre)",
                canAfford: (gameState) => gameState.population.elfes >= 15 && gameState.resources.espoir >= 30,
                effect: (gameState) => {
        gameState.population.elfes = Math.max(0, gameState.population.elfes - 15);
        gameState.resources.espoir -= 30;
        gameState.state.shadow_level = Math.min(100, gameState.state.shadow_level + 10);
    },
                log: "La contrainte brise l'amitié. Ils partent en vous maudissant."
            }
        ]
    },
    {
        id: "age2_29_choix_heritage_ere",
        title: "L'Héritage du Gardien",
        description: "Le Deuxième Âge se ferme. Vous devez décider du testament spirituel et matériel que vous léguez à vos descendants pour affronter l'avenir.",
        repeatable: false,
        condition: (gameState) => gameState.meta.current_age === 2 && (gameState.state.current_year >= 100),
        choices: [
            {
                label: "Léguer un trésor de reliques sacrées (-50 Richesse, +60 Savoir)",
                canAfford: (gameState) => gameState.resources.richesse >= 50,
                effect: (gameState) => {
        gameState.resources.richesse -= 50;
        gameState.resources.savoir += 60;
    },
                log: "Vos successeurs hériteront de parchemins et d'objets protecteurs cruciaux."
            },
            {
                label: "Léguer une forteresse imprenable (+50 Renom, +20 Espoir)",
                canAfford: () => true,
                effect: (gameState) => {
        gameState.resources.renom += 50;
        gameState.resources.espoir += 20;
    },
                log: "Vous transmettez un bastion de pierre et une discipline militaire de fer."
            }
        ]
    },
    {
        id: "age2_30_fin_deuxieme_age",
        title: "La Fin du Deuxième Âge",
        description: "Les chroniques de l'essor et de la chute des empires de l'or sont closes. Le monde s'assombrit, la magie s'éteint. Bienvenue dans le Troisième Âge.",
        repeatable: false,
        condition: (gameState) => gameState.meta.current_age === 2 && (gameState.state.current_year >= 100),
        choices: [
            {
                label: "Passer au Troisième Âge (Aucun effet)",
                canAfford: () => true,
                effect: () => {},
                log: "Le grand livre du Deuxième Âge se ferme. Le déclin commence."
            },
            {
                label: "",
                canAfford: () => true,
                effect: () => {},
                log: ""
            }
        ]
    },
    {
        id: "age3_01_fardeau",
        title: "L'Héritage des Ruines",
        description: "Le Troisième Âge s'ouvre sur un monde fragmenté. Les grands empires d'autrefois ne sont plus que des souvenirs gravés sur des tombes. Il faut choisir la posture de vos premiers veilleurs.",
        repeatable: false,
        condition: (gameState) => gameState.meta.current_age === 3 && (gameState.state.current_year >= 1),
        choices: [
            {
                label: "Conserver les reliques du passé (-40 Richesse, +50 Savoir)",
                canAfford: (gameState) => gameState.resources.richesse >= 40,
                effect: (gameState) => {
        gameState.resources.richesse -= 40;
        gameState.resources.savoir += 50;
    },
                log: "Vous choisissez la voie de l'érudition et de la mémoire sacrée."
            },
            {
                label: "Fortifier les cols et les accès (+40 Renom, -10 Espoir)",
                canAfford: (gameState) => gameState.resources.espoir >= 10,
                effect: (gameState) => {
        gameState.resources.renom += 40;
        gameState.resources.espoir -= 10;
    },
                log: "Vous transformez vos cités en bastions austères, prêts pour l'usure du temps."
            }
        ]
    },
    {
        id: "age3_02_istari_arrivee",
        title: "Les Envoyés de l'Ouest",
        description: "Cinq voyageurs étranges, vêtus de longues robes de couleurs différentes, débarquent aux Havres Gris. L'un d'eux, habillé de gris, demande à consulter vos cartes.",
        repeatable: false,
        condition: (gameState) => gameState.meta.current_age === 3 && (gameState.state.current_year >= 5),
        choices: [
            {
                label: "Lui ouvrir vos cartes de géographie (+60 Savoir, +30 Espoir)",
                canAfford: () => true,
                effect: (gameState) => {
        gameState.resources.savoir += 60;
        gameState.resources.espoir += 30;
    },
                log: "Le magicien a partagé des paroles de réconfort. Un vent d'espoir souffle sur le domaine."
            },
            {
                label: "Le traiter comme un vagabond suspect (-20 Espoir)",
                canAfford: (gameState) => gameState.resources.espoir >= 20,
                effect: (gameState) => {
        gameState.resources.espoir -= 20;
    },
                log: "Il continue sa route en s'appuyant sur son bâton, le visage empreint de tristesse."
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
                label: "Envoyer des présents de bienvenue (-30 Richesse, +40 Renom)",
                canAfford: (gameState) => gameState.resources.richesse >= 30,
                effect: (gameState) => {
        gameState.resources.richesse -= 30;
        gameState.resources.renom += 40;
    },
                log: "Une alliance de sang et de fidélité se dessine avec les Seigneurs des Chevaux."
            },
            {
                label: "Ignorer ces barbares nomades (-15 Renom)",
                canAfford: (gameState) => gameState.resources.renom >= 15,
                effect: (gameState) => {
        gameState.resources.renom -= 15;
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
                label: "Acheter les secrets des herboristes elfes (-50 Richesse, +20 Espoir)",
                canAfford: (gameState) => gameState.resources.richesse >= 50,
                effect: (gameState) => {
        gameState.resources.richesse -= 50;
        gameState.resources.espoir += 20;
    },
                log: "Le remède limite les pertes et rassure la population terrifiée."
            },
            {
                label: "Fermer les frontières et laisser faire la mort (-30 Hommes, -30 Espoir)",
                canAfford: (gameState) => gameState.population.hommes >= 30 && gameState.resources.espoir >= 30,
                effect: (gameState) => {
        gameState.population.hommes = Math.max(0, gameState.population.hommes - 30);
        gameState.resources.espoir -= 30;
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
                label: "Envoyer vos guerriers au secours de l'Arnor (-20 Hommes, +60 Renom)",
                canAfford: (gameState) => gameState.population.hommes >= 20,
                effect: (gameState) => {
        gameState.population.hommes = Math.max(0, gameState.population.hommes - 20);
        gameState.resources.renom += 60;
    },
                log: "Le Nord est dévasté, mais vos lignes ont permis de sauver la lignée des rois."
            },
            {
                label: "Murer le domaine dans son isolement (-20 Renom, +10 Ombre)",
                canAfford: (gameState) => gameState.resources.renom >= 20,
                effect: (gameState) => {
        gameState.resources.renom -= 20;
        gameState.state.shadow_level = Math.min(100, gameState.state.shadow_level + 10);
    },
                log: "L'Arnor s'effondre dans les ruines. La menace se rapproche de vous."
            }
        ]
    },
    {
        id: "age3_06_moria_ombre",
        title: "Le Fléau de Durin",
        description: "Un grondement sourd retentit sous les Montagnes Brumeuses. Les Nains fuient en masse la Moria, affirmant qu'une terreur de feu et d'ombre s'est éveillée.",
        repeatable: false,
        condition: (gameState) => gameState.meta.current_age === 3 && (gameState.state.current_year >= 25),
        choices: [
            {
                label: "Accueillir les mineurs nains exilés (+40 Savoir, +20 Richesse, -10 Espoir)",
                canAfford: (gameState) => gameState.resources.espoir >= 10,
                effect: (gameState) => {
        gameState.resources.savoir += 40;
        gameState.resources.richesse += 20;
        gameState.resources.espoir -= 10;
    },
                log: "Leurs artisans enrichissent vos forges, mais leur désespoir est contagieux."
            },
            {
                label: "Leur refuser l'asile par peur du monstre (-30 Renom)",
                canAfford: (gameState) => gameState.resources.renom >= 30,
                effect: (gameState) => {
        gameState.resources.renom -= 30;
    },
                log: "Les Nains errent dans la nature, maudissant la lâcheté des Hommes."
            }
        ]
    },
    {
        id: "age3_07_gondor_sans_roi",
        title: "Le Trône Vide",
        description: "Le dernier roi du Gondor a disparu en relevant le défi du Roi-Sorcier. Ce sont désormais les Intendants qui gouvernent. La légitimité du pouvoir vacille.",
        repeatable: false,
        condition: (gameState) => gameState.meta.current_age === 3 && (gameState.state.current_year >= 30 && gameState.resources.renom > 30),
        choices: [
            {
                label: "Soutenir l'autorité des Intendants (+40 Renom, -20 Richesse)",
                canAfford: (gameState) => gameState.resources.richesse >= 20,
                effect: (gameState) => {
        gameState.resources.renom += 40;
        gameState.resources.richesse -= 20;
    },
                log: "Vous stabilisez la politique des Hommes en finançant les messagers."
            },
            {
                label: "Laisser le chaos s'installer chez vos voisins (-20 Espoir, +5 Ombre)",
                canAfford: (gameState) => gameState.resources.espoir >= 20,
                effect: (gameState) => {
        gameState.resources.espoir -= 20;
        gameState.state.shadow_level = Math.min(100, gameState.state.shadow_level + 5);
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
                label: "Financer des patrouilles de nettoyage (-40 Richesse, +30 Renom)",
                canAfford: (gameState) => gameState.resources.richesse >= 40,
                effect: (gameState) => {
        gameState.resources.richesse -= 40;
        gameState.resources.renom += 30;
    },
                log: "Les routes restent praticables au prix d'efforts constants de vos soldats."
            },
            {
                label: "Abandonner la lisière forestière (-30 Richesse, +10 Ombre)",
                canAfford: (gameState) => gameState.resources.richesse >= 30,
                effect: (gameState) => {
        gameState.resources.richesse -= 30;
        gameState.state.shadow_level = Math.min(100, gameState.state.shadow_level + 10);
    },
                log: "La forêt gagne du terrain, sombre, rampante et étouffante."
            }
        ]
    },
    {
        id: "age3_09_relique_perdue",
        title: "L'Épée Brisée",
        description: "Des éclaireurs rapportent qu'un fragment d'Andúril, l'épée qui coupa le doigt de Sauron, est enfoui dans de vieilles ruines infestées de trolls.",
        repeatable: false,
        condition: (gameState) => gameState.meta.current_age === 3 && (gameState.state.current_year >= 40 && gameState.resources.savoir > 60),
        choices: [
            {
                label: "Envoyer une expédition d'érudits et de gardes (-15 Hommes, +100 Savoir, +40 Renom)",
                canAfford: (gameState) => gameState.population.hommes >= 15,
                effect: (gameState) => {
        gameState.population.hommes = Math.max(0, gameState.population.hommes - 15);
        gameState.resources.savoir += 100;
        gameState.resources.renom += 40;
    },
                log: "Le fragment est retrouvé et placé en sécurité. L'honneur du passé est sauf."
            },
            {
                label: "Laisser la relique dans la boue (-20 Renom, +5 Ombre)",
                canAfford: (gameState) => gameState.resources.renom >= 20,
                effect: (gameState) => {
        gameState.resources.renom -= 20;
        gameState.state.shadow_level = Math.min(100, gameState.state.shadow_level + 5);
    },
                log: "Le souvenir des anciens rois s'efface un peu plus du monde."
            }
        ]
    },
    {
        id: "age3_10_dragon_erebor",
        title: "La Chute de la Montagne",
        description: "Un dragon de feu, Smaug le Doré, s'est abattu sur la montagne d'Erebor, massacrant les Nains et brûlant les cités humaines du lac.",
        repeatable: false,
        condition: (gameState) => gameState.meta.current_age === 3 && (gameState.state.current_year >= 45),
        choices: [
            {
                label: "Fournir des vivres d'urgence aux réfugiés (-50 Richesse, +40 Espoir)",
                canAfford: (gameState) => gameState.resources.richesse >= 50,
                effect: (gameState) => {
        gameState.resources.richesse -= 50;
        gameState.resources.espoir += 40;
    },
                log: "Vous sauvez des milliers de vies de la misère du givre."
            },
            {
                label: "Profiter de la crise pour doubler le prix du blé (+100 Richesse, -50 Renom, +20 Ombre)",
                canAfford: (gameState) => gameState.resources.renom >= 50,
                effect: (gameState) => {
        gameState.resources.richesse += 100;
        gameState.resources.renom -= 50;
        gameState.state.shadow_level = Math.min(100, gameState.state.shadow_level + 20);
    },
                log: "Vous vous enrichissez de la misère des autres. L'Ombre jubile."
            }
        ]
    },
    {
        id: "age3_11_conseil_blanc",
        title: "L'Alliance des Sages",
        description: "Saroumane le Blanc et Elrond convoquent les grands esprits pour analyser la puissance grandissante du Nécromancien de Dol Guldur.",
        repeatable: false,
        condition: (gameState) => gameState.meta.current_age === 3 && (gameState.state.current_year >= 50 && gameState.resources.savoir > 100),
        choices: [
            {
                label: "Envoyer vos rapports secrets à Saroumane (+80 Savoir, +25 Renom)",
                canAfford: () => true,
                effect: (gameState) => {
        gameState.resources.savoir += 80;
        gameState.resources.renom += 25;
    },
                log: "Votre érudition est saluée par le chef de l'Ordre des Magiciens."
            },
            {
                label: "Garder vos connaissances secrètes (+20 Savoir)",
                canAfford: () => true,
                effect: (gameState) => {
        gameState.resources.savoir += 20;
    },
                log: "Vous préférez rester en dehors des querelles des puissants."
            }
        ]
    },
    {
        id: "age3_12_rodeurs_du_nord",
        title: "Les Lignées Cachées",
        description: "Les derniers descendants du royaume déchu d'Arnor vivent désormais cachés sous l'apparence de pauvres Rôdeurs. Ils demandent des lances d'acier pour leur veille.",
        repeatable: false,
        condition: (gameState) => gameState.meta.current_age === 3 && (gameState.state.current_year >= 55 && gameState.resources.richesse > 50),
        choices: [
            {
                label: "Leur offrir vos meilleures armes (-50 Richesse, +40 Espoir)",
                canAfford: (gameState) => gameState.resources.richesse >= 50,
                effect: (gameState) => {
        gameState.resources.richesse -= 50;
        gameState.resources.espoir += 40;
    },
                log: "En secret, ces rois sans couronne protègent vos villages des pires monstres."
            },
            {
                label: "Les chasser comme des mendiants inquiétants (-20 Espoir)",
                canAfford: (gameState) => gameState.resources.espoir >= 20,
                effect: (gameState) => {
        gameState.resources.espoir -= 20;
    },
                log: "La frontière nord devient une passoire. La terreur s'infiltre."
            }
        ]
    },
    {
        id: "age3_13_saroumane_isengard",
        title: "L'Orgueil d'Orthanc",
        description: "Le magicien Saroumane s'installe définitivement dans la tour d'Isengard. Il propose d'acheter toutes vos anciennes chroniques sur l'or.",
        repeatable: false,
        condition: (gameState) => gameState.meta.current_age === 3 && (gameState.state.current_year >= 60 && gameState.resources.savoir > 50),
        choices: [
            {
                label: "Lui vendre vos parchemins (+100 Richesse, -40 Savoir, +15 Ombre)",
                canAfford: (gameState) => gameState.resources.savoir >= 40,
                effect: (gameState) => {
        gameState.resources.richesse += 100;
        gameState.resources.savoir -= 40;
        gameState.state.shadow_level = Math.min(100, gameState.state.shadow_level + 15);
    },
                log: "L'or emplit vos caisses, mais vos érudits pleurent la perte de l'histoire."
            },
            {
                label: "Refuser de céder vos écrits sacrés (+40 Savoir, +20 Espoir)",
                canAfford: () => true,
                effect: (gameState) => {
        gameState.resources.savoir += 40;
        gameState.resources.espoir += 20;
    },
                log: "Saroumane vous regarde désormais avec une froideur méprisante."
            }
        ]
    },
    {
        id: "age3_14_balade_hobbit",
        title: "Le Récit du Semi-Homme",
        description: "Un mage gris accompagne un petit Hobbit qui prétend avoir trompé un dragon et trouvé une bague magique dans les cavernes. L'histoire semble folle.",
        repeatable: false,
        condition: (gameState) => gameState.meta.current_age === 3 && (gameState.state.current_year >= 65),
        choices: [
            {
                label: "Consigner ce récit extraordinaire (+60 Savoir, +20 Espoir)",
                canAfford: () => true,
                effect: (gameState) => {
        gameState.resources.savoir += 60;
        gameState.resources.espoir += 20;
    },
                log: "Vos scribes rient de ces contes, mais l'histoire retiendra ce nom."
            },
            {
                label: "Chasser ces conteurs d'histoires (-10 Espoir)",
                canAfford: (gameState) => gameState.resources.espoir >= 10,
                effect: (gameState) => {
        gameState.resources.espoir -= 10;
    },
                log: "Vous passez à côté de l'événement qui va changer le destin du monde."
            }
        ]
    },
    {
        id: "age3_15_retour_mordor",
        title: "L'Oeil s'Ouvre",
        description: "Les trois spectres de l'Anneau réoccupent le Mordor. Les ciels du Sud se teintent de fumées noires permanentes. La terre tremble de terreur.",
        repeatable: false,
        condition: (gameState) => gameState.meta.current_age === 3 && (gameState.state.current_year >= 70 && gameState.resources.espoir > 30),
        choices: [
            {
                label: "Doublez la solde des sentinelles (-40 Richesse, +20 Renom)",
                canAfford: (gameState) => gameState.resources.richesse >= 40,
                effect: (gameState) => {
        gameState.resources.richesse -= 40;
        gameState.resources.renom += 20;
    },
                log: "La discipline maintient le calme face à la panique qui vient."
            },
            {
                label: "Rationner l'espoir et prier (-20 Espoir, +5 Ombre)",
                canAfford: (gameState) => gameState.resources.espoir >= 20,
                effect: (gameState) => {
        gameState.resources.espoir -= 20;
        gameState.state.shadow_level = Math.min(100, gameState.state.shadow_level + 5);
    },
                log: "La population s'enfonce doucement dans la léthargie du désespoir."
            }
        ]
    },
    {
        id: "age3_16_nazgul_chevauchee",
        title: "Les Cavaliers Noirs",
        description: "Neuf ombres vêtues de haillons noirs traversent vos plaines à bride abattue, cherchant un pays nommé 'Comté'. Leurs cris glacent le sang de vos chevaux.",
        repeatable: false,
        condition: (gameState) => gameState.meta.current_age === 3 && (gameState.state.current_year >= 75),
        choices: [
            {
                label: "Faire sonner les cloches de panique (-20 Espoir)",
                canAfford: (gameState) => gameState.resources.espoir >= 20,
                effect: (gameState) => {
        gameState.resources.espoir -= 20;
    },
                log: "Votre peuple se terre chez lui, évitant de croiser le regard des spectres."
            },
            {
                label: "Tenter de leur barrer la route (-15 Hommes, +50 Renom)",
                canAfford: (gameState) => gameState.population.hommes >= 15,
                effect: (gameState) => {
        gameState.population.hommes = Math.max(0, gameState.population.hommes - 15);
        gameState.resources.renom += 50;
    },
                log: "Vos braves ont affronté l'effroi pur. Peu ont survécu à leur lame empoisonnée."
            }
        ]
    },
    {
        id: "age3_17_minas_ithil_chute",
        title: "La Tour de la Lune de Sang",
        description: "La cité frontalière de Minas Ithil tombe aux mains de l'ennemi et devient Minas Morgul, la tour de la sorcellerie. Une lueur verte et fétide illumine les nuits lointaines.",
        repeatable: false,
        condition: (gameState) => gameState.meta.current_age === 3 && (gameState.state.current_year >= 78),
        choices: [
            {
                label: "Financer les fortifications du fleuve (-60 Richesse, +30 Renom)",
                canAfford: (gameState) => gameState.resources.richesse >= 60,
                effect: (gameState) => {
        gameState.resources.richesse -= 60;
        gameState.resources.renom += 30;
    },
                log: "Vous aidez à dresser la dernière ligne de défense des Hommes."
            },
            {
                label: "S'enfoncer dans le deuil et l'impuissance (-30 Espoir, +10 Ombre)",
                canAfford: (gameState) => gameState.resources.espoir >= 30,
                effect: (gameState) => {
        gameState.resources.espoir -= 30;
        gameState.state.shadow_level = Math.min(100, gameState.state.shadow_level + 10);
    },
                log: "La lueur verte semble consumer lentement l'espoir de vos sujets."
            }
        ]
    },
    {
        id: "age3_18_depart_fondcombe",
        title: "Les Havres Appellent",
        description: "Elrond se prépare à quitter Fondcombe pour toujours. Il propose d'emmener vos derniers enfants elfes pour les sauver de la guerre totale qui s'annonce.",
        repeatable: false,
        condition: (gameState) => gameState.meta.current_age === 3 && (gameState.state.current_year >= 82 && gameState.population.elfes > 10),
        choices: [
            {
                label: "Les laisser partir vers l'Ouest (-10 Elfes, +30 Renom, -20 Espoir)",
                canAfford: (gameState) => gameState.population.elfes >= 10 && gameState.resources.espoir >= 20,
                effect: (gameState) => {
        gameState.population.elfes = Math.max(0, gameState.population.elfes - 10);
        gameState.resources.renom += 30;
        gameState.resources.espoir -= 20;
    },
                log: "Vous acceptez le crépuscule de la magie chez vous pour assurer leur salut."
            },
            {
                label: "Les forcer à rester pour combattre (+10 Elfes, -30 Espoir, +15 Ombre)",
                canAfford: (gameState) => gameState.resources.espoir >= 30,
                effect: (gameState) => {
        gameState.population.elfes += 10;
        gameState.resources.espoir -= 30;
        gameState.state.shadow_level = Math.min(100, gameState.state.shadow_level + 15);
    },
                log: "Leur chant devient triste et amer, la magie s'éteint dans la contrainte."
            }
        ]
    },
    {
        id: "age3_19_trahison_isengard",
        title: "L'Effondrement du Blanc",
        description: "La nouvelle tombe, impensable : Saroumane s'est allié au Mordor. Sa forteresse produit des monstres hybrides qui attaquent le Rohan. Les repères s'effacent.",
        repeatable: false,
        condition: (gameState) => gameState.meta.current_age === 3 && (gameState.state.current_year >= 85),
        choices: [
            {
                label: "Envoyer des messages d'alerte au Gondor (-20 Richesse, +30 Savoir)",
                canAfford: (gameState) => gameState.resources.richesse >= 20,
                effect: (gameState) => {
        gameState.resources.richesse -= 20;
        gameState.resources.savoir += 30;
    },
                log: "Vous tentez de coordonner la résistance face à la trahison."
            },
            {
                label: "Nier l'évidence par peur (-30 Espoir, +10 Ombre)",
                canAfford: (gameState) => gameState.resources.espoir >= 30,
                effect: (gameState) => {
        gameState.resources.espoir -= 30;
        gameState.state.shadow_level = Math.min(100, gameState.state.shadow_level + 10);
    },
                log: "Le doute s'installe. Si le plus sage capitule, comment espérer vaincre ?"
            }
        ]
    },
    {
        id: "age3_20_guerre_anneau_debut",
        title: "Le Grand Orage",
        description: "Le Gondor allume les feux d'alarme. Le Mordor lance ses milliers d'orques sur Minas Tirith. C'est l'heure de la fin du monde des Hommes.",
        repeatable: false,
        condition: (gameState) => gameState.meta.current_age === 3 && (gameState.state.current_year >= 90 && gameState.population.hommes > 30),
        choices: [
            {
                label: "Mobiliser vos dernières forces valides (-25 Hommes, +80 Renom)",
                canAfford: (gameState) => gameState.population.hommes >= 25,
                effect: (gameState) => {
        gameState.population.hommes = Math.max(0, gameState.population.hommes - 25);
        gameState.resources.renom += 80;
    },
                log: "Vos bannières marchent vers la dernière guerre de cet Âge."
            },
            {
                label: "Défendre vos propres greniers (+10 Richesse, -40 Renom, -25 Espoir)",
                canAfford: (gameState) => gameState.resources.renom >= 40 && gameState.resources.espoir >= 25,
                effect: (gameState) => {
        gameState.resources.richesse += 10;
        gameState.resources.renom -= 40;
        gameState.resources.espoir -= 25;
    },
                log: "Vous attendez la fin, tapi dans votre coin de terre stérile."
            }
        ]
    },
    {
        id: "age3_21_rohan_charge",
        title: "Les Sabots de l'Aube",
        description: "Les rumeurs affirment que les cavaliers du Rohan ont brisé le siège du Gondor dans une charge héroïque au lever du soleil. Le Roi est mort, mais la cité tient.",
        repeatable: false,
        condition: (gameState) => gameState.meta.current_age === 3 && (gameState.state.current_year >= 92),
        choices: [
            {
                label: "Sonner le clairon de la joie (+50 Espoir, +20 Renom)",
                canAfford: () => true,
                effect: (gameState) => {
        gameState.resources.espoir += 50;
        gameState.resources.renom += 20;
    },
                log: "Un frisson de fierté traverse le domaine. Les Hommes résistent encore."
            },
            {
                label: "Attendre la suite avec prudence (-10 Espoir)",
                canAfford: (gameState) => gameState.resources.espoir >= 10,
                effect: (gameState) => {
        gameState.resources.espoir -= 10;
    },
                log: "La guerre n'est pas finie, la peur dicte vos silences."
            }
        ]
    },
    {
        id: "age3_22_porte_noire_defis",
        title: "La Dernière Chance",
        description: "Une armée désespérée de survivants marche vers la Porte Noire du Mordor pour attirer le Regard de l'Ennemi et offrir du temps à deux Hobbits perdus dans les ténèbres.",
        repeatable: false,
        condition: (gameState) => gameState.meta.current_age === 3 && (gameState.state.current_year >= 95),
        choices: [
            {
                label: "Envoyer vos derniers soldats se sacrifier (-15 Hommes, +100 Renom)",
                canAfford: (gameState) => gameState.population.hommes >= 15,
                effect: (gameState) => {
        gameState.population.hommes = Math.max(0, gameState.population.hommes - 15);
        gameState.resources.renom += 100;
    },
                log: "Vous donnez tout ce qu'il vous reste pour une cause invisible."
            },
            {
                label: "Garder vos derniers hommes pour reconstruire (+20 Espoir, -40 Renom)",
                canAfford: (gameState) => gameState.resources.renom >= 40,
                effect: (gameState) => {
        gameState.resources.espoir += 20;
        gameState.resources.renom -= 40;
    },
                log: "Vous refusez ce qui semble être un suicide collectif."
            }
        ]
    },
    {
        id: "age3_23_destruction_anneau",
        title: "La Chute de la Tour",
        description: "Un cri surnaturel déchire la planète. La tour de Barad-dûr s'effondre. La Montagne du Destin explose. L'Anneau Unique est détruit. Le Seigneur Sombre s'évanouit dans le néant.",
        repeatable: false,
        condition: (gameState) => gameState.meta.current_age === 3 && (gameState.state.current_year >= 96),
        choices: [
            {
                label: "Décréter sept jours de fête nationale (+100 Espoir, +40 Renom, -30 Richesse)",
                canAfford: (gameState) => gameState.resources.richesse >= 30,
                effect: (gameState) => {
        gameState.resources.espoir += 100;
        gameState.resources.renom += 40;
        gameState.resources.richesse -= 30;
    },
                log: "Les larmes de joie coulent. L'Ombre s'effondre instantanément partout."
            },
            {
                label: "S'effondrer de fatigue et de soulagement (+40 Espoir)",
                canAfford: () => true,
                effect: (gameState) => {
        gameState.resources.espoir += 40;
    },
                log: "Le poids de trois millénaires de terreur s'efface d'un coup."
            }
        ]
    },
    {
        id: "age3_24_couronnement_roi",
        title: "Le Retour du Roi",
        description: "Le Rôdeur du Nord a été couronné sous le nom d'Aragorn Elessar à Minas Tirith. Les deux royaumes sont réunis. Le Roi vous invite à sa cour.",
        repeatable: false,
        condition: (gameState) => gameState.meta.current_age === 3 && (gameState.state.current_year >= 97 && gameState.resources.renom > 40),
        choices: [
            {
                label: "Aller prêter serment au Roi (-40 Richesse, +80 Renom, +40 Espoir)",
                canAfford: (gameState) => gameState.resources.richesse >= 40,
                effect: (gameState) => {
        gameState.resources.richesse -= 40;
        gameState.resources.renom += 80;
        gameState.resources.espoir += 40;
    },
                log: "Vous intégrez la Pax Romana de la Terre du Milieu restaurée."
            },
            {
                label: "Garder votre autonomie locale (+20 Richesse, -30 Renom)",
                canAfford: (gameState) => gameState.resources.renom >= 30,
                effect: (gameState) => {
        gameState.resources.richesse += 20;
        gameState.resources.renom -= 30;
    },
                log: "Le Roi respecte votre indépendance, mais vous restez en marge de la Renaissance."
            }
        ]
    },
    {
        id: "age3_25_comte_epuration",
        title: "Le Dernier Sursaut de la Vermine",
        description: "Des brigands humains, reliquats des armées de Saroumane, pillent les petits villages des Hobbits à l'Ouest. Le Roi interdit d'y envoyer l'armée, exigeant que les Hobbits gèrent seuls.",
        repeatable: false,
        condition: (gameState) => gameState.meta.current_age === 3 && (gameState.state.current_year >= 98),
        choices: [
            {
                label: "Envoyer discrètement des provisions et du fer (-30 Richesse, +30 Espoir)",
                canAfford: (gameState) => gameState.resources.richesse >= 30,
                effect: (gameState) => {
        gameState.resources.richesse -= 30;
        gameState.resources.espoir += 30;
    },
                log: "Vous aidez les Semi-hommes à libérer leur Comté en secret."
            },
            {
                label: "Laisser faire la justice de la nature (+10 Richesse)",
                canAfford: () => true,
                effect: (gameState) => {
        gameState.resources.richesse += 10;
    },
                log: "Les petits villages brûlent, mais les Hobbits finissent par l'emporter."
            }
        ]
    },
    {
        id: "age3_26_depart_porteurs",
        title: "Le Dernier Navire",
        description: "Elrond, Galadriel, Gandalf et les porteurs de l'Anneau montent à bord d'un navire blanc aux Havres Gris. C'est la fin définitive des choses anciennes.",
        repeatable: false,
        condition: (gameState) => gameState.meta.current_age === 3 && (gameState.state.current_year >= 99 && gameState.population.elfes > 0),
        choices: [
            {
                label: "Esquisser un geste d'adieu (-20 Elfes, +40 Savoir, -30 Espoir)",
                canAfford: (gameState) => gameState.population.elfes >= 20 && gameState.resources.espoir >= 30,
                effect: (gameState) => {
        gameState.population.elfes = Math.max(0, gameState.population.elfes - 20);
        gameState.resources.savoir += 40;
        gameState.resources.espoir -= 30;
    },
                log: "Les derniers Elfes quittent vos forêts. Le monde devient purement humain."
            },
            {
                label: "Fermer les yeux pour ne pas pleurer (-10 Espoir)",
                canAfford: (gameState) => gameState.resources.espoir >= 10,
                effect: (gameState) => {
        gameState.resources.espoir -= 10;
    },
                log: "Le navire s'évanouit à l'horizon. L'air perd sa dernière once de magie."
            }
        ]
    },
    {
        id: "age3_27_quatrieme_age_aube",
        title: "L'Âge des Hommes",
        description: "Le Troisième Âge se ferme. Le monde n'appartient plus aux Dieux, ni aux monstres, ni aux Elfes. Il appartient à la responsabilité humaine.",
        repeatable: false,
        condition: (gameState) => gameState.meta.current_age === 3 && (gameState.state.current_year >= 100),
        choices: [
            {
                label: "Consacrer le domaine aux sciences et à la pierre (-50 Richesse, +80 Savoir)",
                canAfford: (gameState) => gameState.resources.richesse >= 50,
                effect: (gameState) => {
        gameState.resources.richesse -= 50;
        gameState.resources.savoir += 80;
    },
                log: "Vous tournez votre peuple vers l'avenir, la médecine et l'architecture."
            },
            {
                label: "Consacrer le domaine aux lois de la nature (+40 Espoir, +20 Richesse)",
                canAfford: () => true,
                effect: (gameState) => {
        gameState.resources.espoir += 40;
        gameState.resources.richesse += 20;
    },
                log: "Vous choisissez de vivre en harmonie simple avec la terre nourricière."
            }
        ]
    },
    {
        id: "age3_28_bilan_gardien",
        title: "Le Grand Livre du Gardien",
        description: "Toutes vos décisions à travers les siècles ont été consignées. Les scribes relisent l'histoire de vos choix moraux devant le peuple réuni.",
        repeatable: false,
        condition: (gameState) => gameState.meta.current_age === 3 && (gameState.state.current_year >= 100),
        choices: [
            {
                label: "Offrir le livre aux archives du Roi (+100 Renom)",
                canAfford: () => true,
                effect: (gameState) => {
        gameState.resources.renom += 100;
    },
                log: "Votre nom restera gravé à jamais parmi les grands protecteurs de la Terre du Milieu."
            },
            {
                label: "Le garder secret pour votre lignée (+40 Savoir)",
                canAfford: () => true,
                effect: (gameState) => {
        gameState.resources.savoir += 40;
    },
                log: "La sagesse accumulée reste un secret de famille bien gardé."
            }
        ]
    },
    {
        id: "age3_29_prestige_testament",
        title: "Le Legs du Troisième Âge",
        description: "Avant de fermer les yeux pour votre dernier sommeil, vous rédigez le testament qui accordera des bonus permanents de Prestige pour vos futures réincarnations.",
        repeatable: false,
        condition: (gameState) => gameState.meta.current_age === 3 && (gameState.state.current_year >= 100),
        choices: [
            {
                label: "Léguer un héritage de Sagesse antique (+100 Savoir)",
                canAfford: () => true,
                effect: (gameState) => {
        gameState.resources.savoir += 100;
    },
                log: "Vos futures parties commenceront avec une avance technologique majeure."
            },
            {
                label: "Léguer un héritage d'Honneur et de Gloire (+100 Renom)",
                canAfford: () => true,
                effect: (gameState) => {
        gameState.resources.renom += 100;
    },
                log: "Vos futurs descendants naîtront avec une autorité naturelle reconnue."
            }
        ]
    },
    {
        id: "age3_20_fin_histoire",
        title: "Les Chroniques du Gardien",
        description: "Le grand voyage à travers les trois Âges du Mythe est accompli. Le rideau tombe sur le monde ancien. Merci, Gardien.",
        repeatable: false,
        condition: (gameState) => gameState.meta.current_age === 3 && (gameState.state.current_year >= 100),
        choices: [
            {
                label: "Terminer la Légende (Aucun effet)",
                canAfford: () => true,
                effect: () => {},
                log: "Les Chroniques se ferment. Vous avez préservé l'essentiel."
            },
            {
                label: "",
                canAfford: () => true,
                effect: () => {},
                log: ""
            }
        ]
    },
    {
        id: "cri_01_culte_noir",
        title: "Les Autels de Sang",
        description: "L'Ombre étouffe le domaine. Des sentinelles découvrent que des villageois sacrifient secrètement du bétail à des divinités sombres dans les bois.",
        repeatable: false,
        condition: (gameState) => gameState.state.shadow_level >= 70,
        choices: [
            {
                label: "Purget le culte par le fer (-10 Hommes, -15 Ombre)",
                canAfford: (gameState) => gameState.population.hommes >= 10,
                effect: (gameState) => {
        gameState.population.hommes = Math.max(0, gameState.population.hommes - 10);
        gameState.state.shadow_level = Math.max(0, gameState.state.shadow_level - 15);
    },
                log: "Le sang a coulé dans la clairière. Les idoles sont brisées, mais la peur reste."
            },
            {
                label: "Tolérer ces pratiques par peur d'une révolte (-20 Espoir, +10 Ombre)",
                canAfford: (gameState) => gameState.resources.espoir >= 20,
                effect: (gameState) => {
        gameState.resources.espoir -= 20;
        gameState.state.shadow_level = Math.min(100, gameState.state.shadow_level + 10);
    },
                log: "Vous cédez du terrain. Les murmures des adeptes s'entendent désormais dans les rues."
            }
        ]
    },
    {
        id: "cri_02_mutinerie",
        title: "Le Pain de la Colère",
        description: "La garnison de votre avant-poste, affamée et terrifiée par les ténèbres environnantes, refuse d'obéir aux ordres et pille les réserves de grain.",
        repeatable: false,
        condition: (gameState) => gameState.state.shadow_level >= 72 && gameState.resources.richesse > 30,
        choices: [
            {
                label: "Acheter leur loyauté avec vos dernières pièces (-30 Richesse, -10 Ombre)",
                canAfford: (gameState) => gameState.resources.richesse >= 30,
                effect: (gameState) => {
        gameState.resources.richesse -= 30;
        gameState.state.shadow_level = Math.max(0, gameState.state.shadow_level - 10);
    },
                log: "L'or a calmé les esprits pour l'instant, mais la discipline est morte."
            },
            {
                label: "Décimer les meneurs pour l'exemple (-15 Hommes, -30 Espoir)",
                canAfford: (gameState) => gameState.population.hommes >= 15 && gameState.resources.espoir >= 30,
                effect: (gameState) => {
        gameState.population.hommes = Math.max(0, gameState.population.hommes - 15);
        gameState.resources.espoir -= 30;
    },
                log: "Les corps pendent aux remparts. L'obéissance est revenue, glaciale et haineuse."
            }
        ]
    },
    {
        id: "cri_03_famine_noire",
        title: "La Terre Stérile",
        description: "Vos sols, corrompus par une brume fétide, ne produisent plus rien. Les enfants pleurent de faim dans les chaumières.",
        repeatable: false,
        condition: (gameState) => gameState.state.shadow_level >= 75,
        choices: [
            {
                label: "Ouvrir les silos secrets des nobles (-40 Richesse, +20 Espoir, -5 Ombre)",
                canAfford: (gameState) => gameState.resources.richesse >= 40,
                effect: (gameState) => {
        gameState.resources.richesse -= 40;
        gameState.resources.espoir += 20;
        gameState.state.shadow_level = Math.max(0, gameState.state.shadow_level - 5);
    },
                log: "Vous sauvez des vies au prix de la colère des puissants de votre cour."
            },
            {
                label: "Laisser la faim purger les faibles (-25 Hommes, -30 Espoir, +15 Ombre)",
                canAfford: (gameState) => gameState.population.hommes >= 25 && gameState.resources.espoir >= 30,
                effect: (gameState) => {
        gameState.population.hommes = Math.max(0, gameState.population.hommes - 25);
        gameState.resources.espoir -= 30;
        gameState.state.shadow_level = Math.min(100, gameState.state.shadow_level + 15);
    },
                log: "Le deuil submerge les foyers. Les corbeaux s'engraissent sur vos terres."
            }
        ]
    },
    {
        id: "cri_04_poison_puits",
        title: "L'Eau de Cendres",
        description: "Le puits principal de la cité a été empoisonné avec une bave noire. Ceux qui en boivent meurent en quelques heures dans des convulsions.",
        repeatable: false,
        condition: (gameState) => gameState.state.shadow_level >= 70 && gameState.population.hommes > 20,
        choices: [
            {
                label: "Faire venir des purificateurs elfes en urgence (-30 Savoir, -10 Ombre)",
                canAfford: (gameState) => gameState.resources.savoir >= 30,
                effect: (gameState) => {
        gameState.resources.savoir -= 30;
        gameState.state.shadow_level = Math.max(0, gameState.state.shadow_level - 10);
    },
                log: "Leurs incantations ont lavé la pierre, mais vos érudits y ont laissé leurs forces."
            },
            {
                label: "Condamner le quartier infesté (-20 Hommes, -20 Espoir)",
                canAfford: (gameState) => gameState.population.hommes >= 20 && gameState.resources.espoir >= 20,
                effect: (gameState) => {
        gameState.population.hommes = Math.max(0, gameState.population.hommes - 20);
        gameState.resources.espoir -= 20;
    },
                log: "Vous murez des vivants avec les morts. L'angoisse est totale."
            }
        ]
    },
    {
        id: "cri_05_paranoia",
        title: "La Chasse aux Traîtres",
        description: "La paranoïa ronge les esprits. Les voisins s'accusent mutuellement d'être des espions du Mordor. La foule réclame des têtes.",
        repeatable: false,
        condition: (gameState) => gameState.state.shadow_level >= 74,
        choices: [
            {
                label: "Autoriser les tribunaux populaires (-30 Espoir, -15 Ombre)",
                canAfford: (gameState) => gameState.resources.espoir >= 30,
                effect: (gameState) => {
        gameState.resources.espoir -= 30;
        gameState.state.shadow_level = Math.max(0, gameState.state.shadow_level - 15);
    },
                log: "Les dénonciations calment la foule, mais le tissu social de votre peuple est détruit."
            },
            {
                label: "Interdire les lynchages au risque d'une émeute (-30 Renom, +10 Ombre)",
                canAfford: (gameState) => gameState.resources.renom >= 30,
                effect: (gameState) => {
        gameState.resources.renom -= 30;
        gameState.state.shadow_level = Math.min(100, gameState.state.shadow_level + 10);
    },
                log: "Vous protégez les innocents, mais le peuple vous accuse de complicité avec l'ennemi."
            }
        ]
    },
    {
        id: "cri_06_raids_orques",
        title: "Le Ciel de Fer",
        description: "Profitant de votre faiblesse morale, une immense bande d'orques passe vos palissades et brûle les faubourgs en massacrant les civils.",
        repeatable: false,
        condition: (gameState) => gameState.state.shadow_level >= 75 && gameState.population.hommes > 30,
        choices: [
            {
                label: "Sacrifier l'arrière-garde pour sauver la citadelle (-20 Hommes, +20 Renom)",
                canAfford: (gameState) => gameState.population.hommes >= 20,
                effect: (gameState) => {
        gameState.population.hommes = Math.max(0, gameState.population.hommes - 20);
        gameState.resources.renom += 20;
    },
                log: "La forteresse tient bon, mais le sacrifice de vos braves pèse sur votre conscience."
            },
            {
                label: "Payer une rançon en métaux précieux (-80 Richesse, +15 Ombre)",
                canAfford: (gameState) => gameState.resources.richesse >= 80,
                effect: (gameState) => {
        gameState.resources.richesse -= 80;
        gameState.state.shadow_level = Math.min(100, gameState.state.shadow_level + 15);
    },
                log: "Les monstres repartent chargés d'or, ricanant de votre impuissance."
            }
        ]
    },
    {
        id: "cri_07_desertion_masse",
        title: "La Grande Fuite",
        description: "Terrifiées par les présages de fin du monde, des familles entières de bûcherons et d'artisans plient bagage pour fuir vers les montagnes de l'Ouest.",
        repeatable: false,
        condition: (gameState) => gameState.state.shadow_level >= 70 && gameState.population.hommes > 40,
        choices: [
            {
                label: "Fermer les portes par la force des baïonnettes (-30 Espoir, +10 Ombre)",
                canAfford: (gameState) => gameState.resources.espoir >= 30,
                effect: (gameState) => {
        gameState.resources.espoir -= 30;
        gameState.state.shadow_level = Math.min(100, gameState.state.shadow_level + 10);
    },
                log: "Vous gardez vos bras pour le travail, mais votre domaine est devenu une prison."
            },
            {
                label: "Les laisser partir à leur triste destin (-30 Hommes, -20 Renom)",
                canAfford: (gameState) => gameState.population.hommes >= 30 && gameState.resources.renom >= 20,
                effect: (gameState) => {
        gameState.population.hommes = Math.max(0, gameState.population.hommes - 30);
        gameState.resources.renom -= 20;
    },
                log: "Les maisons vides se délabrent sous le vent gris. Le silence s'installe."
            }
        ]
    },
    {
        id: "cri_08_corruption_elite",
        title: "L'Or de la Honte",
        description: "Vos conseillers les plus éminents ont été achetés par des émissaires de l'Est. Ils sabotent discrètement vos défenses.",
        repeatable: false,
        condition: (gameState) => gameState.state.shadow_level >= 72 && gameState.resources.savoir > 30,
        choices: [
            {
                label: "Exécuter publiquement toute votre cour (-40 Savoir, +30 Renom, -20 Ombre)",
                canAfford: (gameState) => gameState.resources.savoir >= 40,
                effect: (gameState) => {
        gameState.resources.savoir -= 40;
        gameState.resources.renom += 30;
        gameState.state.shadow_level = Math.max(0, gameState.state.shadow_level - 20);
    },
                log: "La purge est brutale. Le gouvernement est décapité, mais la trahison est stoppée."
            },
            {
                label: "Faire semblant de ne rien voir pour éviter la guerre civile (-30 Espoir, +15 Ombre)",
                canAfford: (gameState) => gameState.resources.espoir >= 30,
                effect: (gameState) => {
        gameState.resources.espoir -= 30;
        gameState.state.shadow_level = Math.min(100, gameState.state.shadow_level + 15);
    },
                log: "L'élite festoie pendant que les fondations de votre pouvoir pourrissent."
            }
        ]
    },
    {
        id: "cri_09_spectre_visite",
        title: "Le Souffle Noir",
        description: "Une silhouette montée sur un cheval noir s'arrête devant vos portes. Sa seule présence fait s'effondrer les vieillards d'effroi. C'est un Nazgûl.",
        repeatable: false,
        condition: (gameState) => gameState.state.shadow_level >= 78,
        choices: [
            {
                label: "Lui livrer vos prisonniers de guerre (-40 Renom, +20 Ombre)",
                canAfford: (gameState) => gameState.resources.renom >= 40,
                effect: (gameState) => {
        gameState.resources.renom -= 40;
        gameState.state.shadow_level = Math.min(100, gameState.state.shadow_level + 20);
    },
                log: "Le spectre repart avec son sinistre convoi. Vous avez sauvé votre peau au prix de votre âme."
            },
            {
                label: "Tenter de le repousser avec des reliques sacrées (-50 Savoir, -15 Hommes, -10 Ombre)",
                canAfford: (gameState) => gameState.resources.savoir >= 50 && gameState.population.hommes >= 15,
                effect: (gameState) => {
        gameState.resources.savoir -= 50;
        gameState.population.hommes = Math.max(0, gameState.population.hommes - 15);
        gameState.state.shadow_level = Math.max(0, gameState.state.shadow_level - 10);
    },
                log: "Le monstre recule devant la lumière ancienne, mais son cri a brisé des cœurs."
            }
        ]
    },
    {
        id: "cri_10_folie_gardien",
        title: "Le Trône de Cendres",
        description: "Le désespoir vous gagne. Vous passez vos nuits à fixer les ténèbres, persuadé que toute résistance est inutile. Votre peuple panique en voyant votre regard fou.",
        repeatable: false,
        condition: (gameState) => gameState.state.shadow_level >= 80,
        choices: [
            {
                label: "S'enfermer dans une cellule pour méditer (-40 Renom, +20 Savoir)",
                canAfford: (gameState) => gameState.resources.renom >= 40,
                effect: (gameState) => {
        gameState.resources.renom -= 40;
        gameState.resources.savoir += 20;
    },
                log: "Votre absence affaiblit l'État, mais préserve un reste de votre lucidité."
            },
            {
                label: "Se livrer à la boisson et aux excès (-40 Espoir, +20 Ombre)",
                canAfford: (gameState) => gameState.resources.espoir >= 40,
                effect: (gameState) => {
        gameState.resources.espoir -= 40;
        gameState.state.shadow_level = Math.min(100, gameState.state.shadow_level + 20);
    },
                log: "Vous sombrez ouvertement, entraînant votre peuple dans votre déchéance."
            }
        ]
    },
    {
        id: "cri_11_incendie_archives",
        title: "Les Cendres du Savoir",
        description: "Un incendie criminel, allumé par des partisans de l'Ombre, ravage votre bibliothèque ancestrale. Des siècles d'histoire partent en fumée.",
        repeatable: false,
        condition: (gameState) => gameState.state.shadow_level >= 70 && gameState.resources.savoir > 50,
        choices: [
            {
                label: "Tenter de sauver les parchemins au péril des vies (-10 Hommes, -20 Savoir)",
                canAfford: (gameState) => gameState.population.hommes >= 10 && gameState.resources.savoir >= 20,
                effect: (gameState) => {
        gameState.population.hommes = Math.max(0, gameState.population.hommes - 10);
        gameState.resources.savoir -= 20;
    },
                log: "Quelques secrets sont sauvés des flammes au prix de terribles brûlures."
            },
            {
                label: "Laisser brûler et sécuriser l'or (-50 Savoir, +30 Richesse)",
                canAfford: (gameState) => gameState.resources.savoir >= 50,
                effect: (gameState) => {
        gameState.resources.savoir -= 50;
        gameState.resources.richesse += 30;
    },
                log: "Le passé est mort. Vos coffres sont pleins, mais vous êtes devenus aveugles."
            }
        ]
    },
    {
        id: "cri_12_betes_enragees",
        title: "La Rage des Bois",
        description: "Les loups et les ours des forêts environnantes, rendus fous par l'influence maléfique du Nord, attaquent les bergers en plein jour.",
        repeatable: false,
        condition: (gameState) => gameState.state.shadow_level >= 72,
        choices: [
            {
                label: "Abandonner l'élevage extérieur (-40 Richesse, -10 Espoir)",
                canAfford: (gameState) => gameState.resources.richesse >= 40 && gameState.resources.espoir >= 10,
                effect: (gameState) => {
        gameState.resources.richesse -= 40;
        gameState.resources.espoir -= 10;
    },
                log: "Le bétail est parqué à l'intérieur, les rations diminuent drastiquement."
            },
            {
                label: "Forcer les bergers à s'armer (-15 Hommes, +15 Renom)",
                canAfford: (gameState) => gameState.population.hommes >= 15,
                effect: (gameState) => {
        gameState.population.hommes = Math.max(0, gameState.population.hommes - 15);
        gameState.resources.renom += 15;
    },
                log: "Les pertes sont lourdes, mais la frontière agricole refuse de plier."
            }
        ]
    },
    {
        id: "cri_13_blocus_marchand",
        title: "Les Routes Mortes",
        description: "Les royaumes voisins, terrifiés par la corruption qui ronge vos terres, décrètent un blocus commercial total. Plus aucun marchand ne passe.",
        repeatable: false,
        condition: (gameState) => gameState.state.shadow_level >= 75 && gameState.resources.richesse > 40,
        choices: [
            {
                label: "Payer des contrebandiers de l'Est (-40 Richesse, +15 Ombre)",
                canAfford: (gameState) => gameState.resources.richesse >= 40,
                effect: (gameState) => {
        gameState.resources.richesse -= 40;
        gameState.state.shadow_level = Math.min(100, gameState.state.shadow_level + 15);
    },
                log: "Les vivres arrivent par des réseaux clandestins fétides."
            },
            {
                label: "Accepter l'autarcie forcée (-30 Espoir, -20 Richesse)",
                canAfford: (gameState) => gameState.resources.espoir >= 30 && gameState.resources.richesse >= 20,
                effect: (gameState) => {
        gameState.resources.espoir -= 30;
        gameState.resources.richesse -= 20;
    },
                log: "Le domaine s'appauvrit et s'isole du reste du monde libre."
            }
        ]
    },
    {
        id: "cri_14_monstre_mines",
        title: "La Chose des Profondeurs",
        description: "Vos mineurs ont creusé trop profondément dans une galerie interdite et réveillé une créature rampante et aveugle qui massacre les ouvriers.",
        repeatable: false,
        condition: (gameState) => gameState.state.shadow_level >= 74,
        choices: [
            {
                label: "Sceller la mine définitivement (-60 Richesse, -10 Ombre)",
                canAfford: (gameState) => gameState.resources.richesse >= 60,
                effect: (gameState) => {
        gameState.resources.richesse -= 60;
        gameState.state.shadow_level = Math.max(0, gameState.state.shadow_level - 10);
    },
                log: "Vous murez le monstre au prix de l'effondrement de vos revenus miniers."
            },
            {
                label: "Envoyer des soldats nettoyer les galeries (-20 Hommes, +30 Renom)",
                canAfford: (gameState) => gameState.population.hommes >= 20,
                effect: (gameState) => {
        gameState.population.hommes = Math.max(0, gameState.population.hommes - 20);
        gameState.resources.renom += 30;
    },
                log: "Le sang inonde les tunnels. La créature est blessée, mais pas morte."
            }
        ]
    },
    {
        id: "cri_15_temple_profane",
        title: "Le Sanctuaire Souillé",
        description: "Le grand temple de l'Espoir du domaine a été vandalisé. Des symboles de deuil et de haine recouvrent les murs sacrés.",
        repeatable: false,
        condition: (gameState) => gameState.state.shadow_level >= 70 && gameState.resources.espoir > 40,
        choices: [
            {
                label: "Financer une longue purification (-30 Richesse, -20 Espoir, -15 Ombre)",
                canAfford: (gameState) => gameState.resources.richesse >= 30 && gameState.resources.espoir >= 20,
                effect: (gameState) => {
        gameState.resources.richesse -= 30;
        gameState.resources.espoir -= 20;
        gameState.state.shadow_level = Math.max(0, gameState.state.shadow_level - 15);
    },
                log: "Les rituels lavent l'affront, mais les cœurs restent profondément ébranlés."
            },
            {
                label: "Laisser le sanctuaire en ruines (-40 Espoir, +15 Ombre)",
                canAfford: (gameState) => gameState.resources.espoir >= 40,
                effect: (gameState) => {
        gameState.resources.espoir -= 40;
        gameState.state.shadow_level = Math.min(100, gameState.state.shadow_level + 15);
    },
                log: "Le phare de votre foi s'éteint, laissant le domaine dans le noir moral."
            }
        ]
    },
    {
        id: "cri_16_enfants_perdus",
        title: "Les Disparus de l'Automne",
        description: "Une rumeur terrifiante se confirme : plusieurs enfants ont disparu des lisières des villages, enlevés par des silhouettes encapuchonnées.",
        repeatable: false,
        condition: (gameState) => gameState.state.shadow_level >= 73,
        choices: [
            {
                label: "Déployer l'armée pour traquer les ravisseuses (-15 Hommes, +30 Renom)",
                canAfford: (gameState) => gameState.population.hommes >= 15,
                effect: (gameState) => {
        gameState.population.hommes = Math.max(0, gameState.population.hommes - 15);
        gameState.resources.renom += 30;
    },
                log: "Une loge de sorcières est détruite, mais certains enfants manquent à l'appel."
            },
            {
                label: "Instaurer un couvre-feu strict (-25 Espoir, +5 Ombre)",
                canAfford: (gameState) => gameState.resources.espoir >= 25,
                effect: (gameState) => {
        gameState.resources.espoir -= 25;
        gameState.state.shadow_level = Math.min(100, gameState.state.shadow_level + 5);
    },
                log: "La terreur paralyse les chaumières. On s'enferme dès le coucher du soleil."
            }
        ]
    },
    {
        id: "cri_17_or_maudit",
        title: "La Fièvre du Mithril",
        description: "Un coffre d'or ancien, déterré dans des ruines numénoréennes maudites, provoque une folie de cupidité chez vos intendants. Ils s'entretuent.",
        repeatable: false,
        condition: (gameState) => gameState.state.shadow_level >= 76 && gameState.resources.richesse > 50,
        choices: [
            {
                label: "Jeter le trésor maudit dans le fleuve (-50 Richesse, -10 Ombre, +20 Espoir)",
                canAfford: (gameState) => gameState.resources.richesse >= 50,
                effect: (gameState) => {
        gameState.resources.richesse -= 50;
        gameState.state.shadow_level = Math.max(0, gameState.state.shadow_level - 10);
        gameState.resources.espoir += 20;
    },
                log: "Le sacrifice de l'or guérit la folie des esprits. La paix revient."
            },
            {
                label: "Garder le trésor malgré la malédiction (+150 Richesse, +30 Ombre, -30 Espoir)",
                canAfford: (gameState) => gameState.resources.espoir >= 30,
                effect: (gameState) => {
        gameState.resources.richesse += 150;
        gameState.state.shadow_level = Math.min(100, gameState.state.shadow_level + 30);
        gameState.resources.espoir -= 30;
    },
                log: "L'or brille dans vos caisses, mais la paranoïa s'installe à votre table."
            }
        ]
    },
    {
        id: "cri_18_maladie_bétail_noir",
        title: "La Lèpre des Étables",
        description: "Vos vaches et vos chevaux crèvent les uns après les autres, touchés par une gangrène noire qui liquéfie la chair.",
        repeatable: false,
        condition: (gameState) => gameState.state.shadow_level >= 72,
        choices: [
            {
                label: "Brûler les fermes et indemniser (-40 Richesse, -5 Ombre)",
                canAfford: (gameState) => gameState.resources.richesse >= 40,
                effect: (gameState) => {
        gameState.resources.richesse -= 40;
        gameState.state.shadow_level = Math.max(0, gameState.state.shadow_level - 5);
    },
                log: "Le feu assainit la terre, ruinant vos économies immédiates."
            },
            {
                label: "Laisser le mal s'éteindre seul (-20 Hommes, -30 Espoir, +10 Ombre)",
                canAfford: (gameState) => gameState.population.hommes >= 20 && gameState.resources.espoir >= 30,
                effect: (gameState) => {
        gameState.population.hommes = Math.max(0, gameState.population.hommes - 20);
        gameState.resources.espoir -= 30;
        gameState.state.shadow_level = Math.min(100, gameState.state.shadow_level + 10);
    },
                log: "La puanteur de la charogne empeste le domaine. Les ventres s'évidents."
            }
        ]
    },
    {
        id: "cri_19_ambassade_fausse",
        title: "L'Émissaire de Panique",
        description: "Un homme pâle se présente comme un messager de paix des Valar, mais ses paroles distillent subtilement le découragement et l'abandon.",
        repeatable: false,
        condition: (gameState) => gameState.state.shadow_level >= 70,
        choices: [
            {
                label: "L'exécuter comme un faux prophète (+20 Renom, -20 Espoir)",
                canAfford: (gameState) => gameState.resources.espoir >= 20,
                effect: (gameState) => {
        gameState.resources.espoir -= 20;
        gameState.resources.renom += 20;
    },
                log: "Vous tuez le menteur, mais ses paroles continuent de hanter les esprits."
            },
            {
                label: "L'écouter et publier ses décrets (-40 Espoir, +20 Ombre)",
                canAfford: (gameState) => gameState.resources.espoir >= 40,
                effect: (gameState) => {
        gameState.resources.espoir -= 40;
        gameState.state.shadow_level = Math.min(100, gameState.state.shadow_level + 20);
    },
                log: "Le découragement brise les dernières volontés de résistance."
            }
        ]
    },
    {
        id: "cri_20_pillage_reliques",
        title: "Le Vol du Passé",
        description: "Des voleurs profanent les tombes de vos ancêtres pour y dérober les couronnes et les épées antiques afin de les vendre.",
        repeatable: false,
        condition: (gameState) => gameState.state.shadow_level >= 74 && gameState.resources.savoir > 40,
        choices: [
            {
                label: "Traquer les receleurs d'or (-20 Richesse, +20 Renom)",
                canAfford: (gameState) => gameState.resources.richesse >= 20,
                effect: (gameState) => {
        gameState.resources.richesse -= 20;
        gameState.resources.renom += 20;
    },
                log: "Vous récupérez les reliques, mais l'affront à la lignée reste entier."
            },
            {
                label: "Laisser faire par manque de moyens (-30 Savoir, +10 Ombre)",
                canAfford: (gameState) => gameState.resources.savoir >= 30,
                effect: (gameState) => {
        gameState.resources.savoir -= 30;
        gameState.state.shadow_level = Math.min(100, gameState.state.shadow_level + 10);
    },
                log: "Le passé est pillé. Votre domaine perd son identité historique."
            }
        ]
    },
    {
        id: "cri_21_orques_otages",
        title: "Les Fils Prise",
        description: "Des éclaireurs orques ont capturé les enfants de vos principaux généraux et exigent l'ouverture de vos portes ouest en échange de leur vie.",
        repeatable: false,
        condition: (gameState) => gameState.state.shadow_level >= 77 && gameState.population.hommes > 20,
        choices: [
            {
                label: "Refuser le chantage et attaquer (-15 Hommes, -30 Espoir, +50 Renom)",
                canAfford: (gameState) => gameState.population.hommes >= 15 && gameState.resources.espoir >= 30,
                effect: (gameState) => {
        gameState.population.hommes = Math.max(0, gameState.population.hommes - 15);
        gameState.resources.espoir -= 30;
        gameState.resources.renom += 50;
    },
                log: "Les otages meurent, mais l'honneur militaire et les remparts sont sauvés."
            },
            {
                label: "Céder et livrer le bastion ouest (-50 Richesse, -40 Renom, +25 Ombre)",
                canAfford: (gameState) => gameState.resources.richesse >= 50 && gameState.resources.renom >= 40,
                effect: (gameState) => {
        gameState.resources.richesse -= 50;
        gameState.resources.renom -= 40;
        gameState.state.shadow_level = Math.min(100, gameState.state.shadow_level + 25);
    },
                log: "Vous sauvez les enfants au prix d'une brèche majeure dans vos défenses."
            }
        ]
    },
    {
        id: "cri_22_mutinerie_ouvriers",
        title: "La Révolte des Pioches",
        description: "Les ouvriers de vos carrières, épuisés par les cadences et terrifiés par l'Ombre, cessent le travail et menacent de brûler vos engins.",
        repeatable: false,
        condition: (gameState) => gameState.state.shadow_level >= 71,
        choices: [
            {
                label: "Augmenter les rations et céder (-30 Richesse, +15 Espoir)",
                canAfford: (gameState) => gameState.resources.richesse >= 30,
                effect: (gameState) => {
        gameState.resources.richesse -= 30;
        gameState.resources.espoir += 15;
    },
                log: "Le travail reprend, mais vos finances sont exsangues."
            },
            {
                label: "Envoyer la milice briser la grève (-15 Hommes, -20 Espoir, +10 Ombre)",
                canAfford: (gameState) => gameState.population.hommes >= 15 && gameState.resources.espoir >= 20,
                effect: (gameState) => {
        gameState.population.hommes = Math.max(0, gameState.population.hommes - 15);
        gameState.resources.espoir -= 20;
        gameState.state.shadow_level = Math.min(100, gameState.state.shadow_level + 10);
    },
                log: "Les fouets ont parlé. Les pioches creusent à nouveau dans une rancœur sourde."
            }
        ]
    },
    {
        id: "cri_23_poison_esprit",
        title: "La Brume Folle",
        description: "Une brume violette et lourde descend des collines. Ceux qui la respirent tombent dans une léthargie proche de la mort ou deviennent fous furieux.",
        repeatable: false,
        condition: (gameState) => gameState.state.shadow_level >= 75,
        choices: [
            {
                label: "Acheter des masques de charbon aux Nains (-50 Richesse, +10 Espoir)",
                canAfford: (gameState) => gameState.resources.richesse >= 50,
                effect: (gameState) => {
        gameState.resources.richesse -= 50;
        gameState.resources.espoir += 10;
    },
                log: "La technique naine protège votre population au prix fort."
            },
            {
                label: "Se calfeutrer et attendre (-20 Hommes, -20 Espoir)",
                canAfford: (gameState) => gameState.population.hommes >= 20 && gameState.resources.espoir >= 20,
                effect: (gameState) => {
        gameState.population.hommes = Math.max(0, gameState.population.hommes - 20);
        gameState.resources.espoir -= 20;
    },
                log: "La folie décime les faubourgs avant que le vent ne tourne."
            }
        ]
    },
    {
        id: "cri_24_desertion_gardes",
        title: "Les Murs sans Guetteurs",
        description: "Vos sentinelles abandonnent leurs postes de nuit, terrifiées par des voix qui chuchotent leur nom depuis l'obscurité extérieure.",
        repeatable: false,
        condition: (gameState) => gameState.state.shadow_level >= 73,
        choices: [
            {
                label: "Remplacer les hommes par des feux automatiques (-40 Richesse, +10 Renom)",
                canAfford: (gameState) => gameState.resources.richesse >= 40,
                effect: (gameState) => {
        gameState.resources.richesse -= 40;
        gameState.resources.renom += 10;
    },
                log: "Le domaine dépense des fortunes en huile pour éclairer le Noir."
            },
            {
                label: "Punir de mort les déserteurs (-10 Hommes, -30 Espoir, +10 Ombre)",
                canAfford: (gameState) => gameState.population.hommes >= 10 && gameState.resources.espoir >= 30,
                effect: (gameState) => {
        gameState.population.hommes = Math.max(0, gameState.population.hommes - 10);
        gameState.resources.espoir -= 30;
        gameState.state.shadow_level = Math.min(100, gameState.state.shadow_level + 10);
    },
                log: "La terreur interne remplace la discipline. Les murs restent vides."
            }
        ]
    },
    {
        id: "cri_25_sombre_sommation",
        title: "L'Ultime Sommation",
        description: "L'Ombre atteint son paroxysme. Un héraut noir se présente, exigeant votre capitulation inconditionnelle avant la fin de l'année sous peine d'annihilation totale.",
        repeatable: false,
        condition: (gameState) => gameState.state.shadow_level >= 80,
        choices: [
            {
                label: "Brûler le messager et sonner le glas (+60 Renom, +30 Espoir, -20 Richesse)",
                canAfford: (gameState) => gameState.resources.richesse >= 20,
                effect: (gameState) => {
        gameState.resources.richesse -= 20;
        gameState.resources.renom += 60;
        gameState.resources.espoir += 30;
    },
                log: "Vous choisissez de mourir debout. L'espoir brille d'un éclat désespéré."
            },
            {
                label: "Accepter la vassalité (Game Over Sombre)",
                canAfford: () => true,
                effect: () => {},
                log: "Vous tendez les clés du domaine. Votre histoire s'achève dans les ténèbres."
            }
        ]
    },
];
