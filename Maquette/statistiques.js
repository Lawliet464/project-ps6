const accueillisData = {
    "jean": {
        nom: "Claudine Dupont",
        age: "82 ans",
        stade: "Modéré",
        couleurStade: "#F4F0F2", colorTexte: "#875C74",
        objectif: "Ralentissement de l'oubli à court terme, stimulation spatiale via le Memory 4x3."
    },
    "marie": {
        nom: "Marie Martin",
        age: "76 ans",
        stade: "Léger",
        couleurStade: "#F8F4F2", colorTexte: "#B79D94",
        objectif: "Maintien du vocabulaire via l'association d'images (thème quotidien)."
    },
    "claude": {
        nom: "Jean Dubois",
        age: "88 ans",
        stade: "Sévère",
        couleurStade: "#F0EFF2", colorTexte: "#453750",
        objectif: "Thérapie par la réussite. Maintien de l'attention visuelle simple (Memory 4x2)."
    }
};

function changerAccueilli(idAccueilli) {
    const data = accueillisData[idAccueilli];
    
    document.getElementById('accueilli-name').textContent = data.nom;
    document.getElementById('accueilli-age').textContent = data.age;
    document.getElementById('accueilli-objectif').textContent = data.objectif;
    
    // Mise à jour du badge de stade
    const badgeStade = document.getElementById('accueilli-stade');
    badgeStade.textContent = data.stade;
    badgeStade.style.backgroundColor = data.couleurStade;
    badgeStade.style.color = data.colorTexte;
}