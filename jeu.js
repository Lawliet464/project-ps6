let compteurErreurs = 0;
const SEUIL_AIDE = 8;

let premiereCarte = null;
let deuxiemeCarte = null;
let estBloque = false;

let button = document.getElementById("btnCommencer");
button.addEventListener("click", function(){
    let accueil = document.getElementById("accueil");
    let jeu = document.getElementById("jeu");
    accueil.style.display = "none";
    jeu.style.display = "block";
})

let cartes = document.querySelectorAll(".carte");
cartes.forEach(function(carte){
    carte.addEventListener("click", function(){
        if(estBloque == true) return;
        carte.classList.add("retournee");
        if (premiereCarte == null) premiereCarte = carte;
        else {
            deuxiemeCarte = carte;
            estBloque = true;
            let type1 = premiereCarte.querySelector(".face").classList[1];
            let type2 = deuxiemeCarte.querySelector(".face").classList[1];

            if(type1 === type2){
                console.log("Bonne paire!!");
                premiereCarte = null;
                deuxiemeCarte = null;
                estBloque = false;

                verifierFinMemory();
            }
            else {
                compteurErreurs++;
                console.log("mauvaise paire !");

                if(compteurErreurs >= SEUIL_AIDE) {
                    aideMemo.click();
                    compteurErreurs = 0;
                }
                setTimeout(function(){
                    premiereCarte.classList.remove("retournee");
                    deuxiemeCarte.classList.remove("retournee");
                    premiereCarte = null;
                    deuxiemeCarte = null;
                    estBloque = false;
                }, 1000);
            }
        }
    })
})

let startAssocia = document.getElementById("passerAAssociation");
startAssocia.addEventListener("click", lancerAssociation);

function verifierFinMemory(){
    let cartesRetournees = document.querySelectorAll(".carte.retournee");

    if(cartes.length === cartesRetournees.length){
        console.log("Memory terminé !");
        startAssocia.style.display = "block";
        aideMemo.style.display = "none";
    }
}

// Variables globales
let objetGlisse = null;
let ordreCorrect = [];
let messageTimer = null;

// Lancer la phase association
function lancerAssociation() {
    console.log("Passage à la phase association");

    document.getElementById("plateau").style.display = "none";
    startAssocia.style.display = "none";
    document.getElementById("association").style.display = "block";
    document.getElementById("btnVerifier").style.display = "none";
    document.getElementById("aideAssociation").style.display = "block";

    genererCellules(document.querySelectorAll(".elem[id]").length);

    initDrag();
    initDrop();
}

function genererCellules(nombre) {
    let zone = document.getElementById("zoneAssociation");
    zone.innerHTML = "";

    for (let i = 1; i <= nombre; i++) {
        let cellule = document.createElement("div");
        cellule.classList.add("cellule");
        cellule.id = "cellule-" + i;

        let num = document.createElement("div");
        num.classList.add("cellule-num");
        num.textContent = i;

        let contenu = document.createElement("div");
        contenu.classList.add("cellule-contenu");

        cellule.appendChild(num);
        cellule.appendChild(contenu);
        zone.appendChild(cellule);
    }
}

// Initialiser la zone de drop
function initDrop() {
    let message = document.getElementById("messageAssociation");

    document.querySelectorAll(".cellule").forEach(cellule => {
        cellule.addEventListener("dragover", e => {
            e.preventDefault();
            e.stopPropagation();
            cellule.classList.add("survol");
        });
        cellule.addEventListener("dragleave", () => {
            cellule.classList.remove("survol");
        });
        cellule.addEventListener("drop", e => {
            e.preventDefault();
            e.stopPropagation();
            cellule.classList.remove("survol");
            let numCellule = Number(cellule.id.replace("cellule-", ""));
            handleDrop(numCellule, message);
        });
    });

    // Drop sur elementsDispo pour retirer un élément d'une cellule
    let dispo = document.getElementById("elementsDispo");
    dispo.addEventListener("dragover", e => e.preventDefault());
    dispo.addEventListener("drop", e => {
        e.preventDefault();
        if (!objetGlisse) return;

        // Trouver la cellule parente si l'élément vient d'une cellule
        let celluleParente = objetGlisse.closest(".cellule");
        if (celluleParente) {
            let numCellule = Number(celluleParente.id.replace("cellule-", ""));
            retirerElement(numCellule, objetGlisse);
        }
    });
}

function initDrag() {
    let elems = document.querySelectorAll(".elem");
    elems.forEach(elem => {
        elem.addEventListener("dragstart", e => { objetGlisse = e.target.closest(".elem"); });
    });
}


// Vérifie l'ordre et dépose l'élément
function handleDrop(numCellule, message) {
    if (!objetGlisse) return;

    let cellule = document.getElementById("cellule-" + numCellule);
    if (cellule.classList.contains("remplie")) {
        afficherMessage(message, "Cette case est déjà occupée !");
        return;
    }

    // Si l'élément vient d'une autre cellule, vider la cellule d'origine
    let celluleParente = objetGlisse.closest(".cellule");
    if (celluleParente && celluleParente.id !== cellule.id) {
        let numParente = Number(celluleParente.id.replace("cellule-", ""));
        celluleParente.classList.remove("remplie", "correcte", "incorrecte");
        celluleParente.querySelector(".cellule-contenu").innerHTML = "";
    }

    deposerElement(numCellule, objetGlisse);
    verifierCellulesRemplies();
}

// Dépose l'élément correctement
function deposerElement(numCellule, elem) {
    let cellule = document.getElementById("cellule-" + numCellule);
    if (!cellule) return;

    cellule.classList.add("remplie");
    cellule.querySelector(".cellule-contenu").appendChild(elem);
}

function retirerElement(numCellule, elem) {
    let cellule = document.getElementById("cellule-" + numCellule);
    
    elem.style.background = "";
    document.getElementById("elementsDispo").appendChild(elem);
    
    cellule.classList.remove("remplie", "correcte", "incorrecte");
    cellule.querySelector(".cellule-contenu").innerHTML = "";
    let croix = cellule.querySelector(".cellule-croix");
    if (croix) croix.remove();

    document.getElementById("btnVerifier").style.display = "none";
    verifierCellulesRemplies(); // ← ajouter cet appel
}

function verifierCellulesRemplies() {
    let cellules = document.querySelectorAll(".cellule");
    let toutesRemplies = Array.from(cellules).every(c => c.classList.contains("remplie"));
    
    document.getElementById("btnVerifier").style.display = toutesRemplies ? "inline-block" : "none";
    document.getElementById("aideAssociation").style.display = toutesRemplies ? "none" : "block";
}

function verifierAssociation() {
    let cellules = document.querySelectorAll(".cellule");
    let message = document.getElementById("messageAssociation");
    let toutCorrect = true;
    let messages = [];

    cellules.forEach(cellule => {
        let numCellule = Number(cellule.id.replace("cellule-", ""));
        let elem = cellule.querySelector(".elem");
        let idElem = elem ? Number(elem.id) : null;

        if (idElem === numCellule) {
            cellule.classList.add("correcte");
        } else {
            cellule.classList.add("incorrecte");
            toutCorrect = false;

            let elemsAvecId = Array.from(document.querySelectorAll(".elem[id]"));
            let appartientAuTheme = elemsAvecId.some(e => Number(e.id) === idElem);
            let nomElem = elem.querySelector("p").textContent;

            if (!appartientAuTheme) {
                messages.push(nomElem + " (case " + numCellule + ") n'appartient pas à ce thème !");
            } else {
                messages.push(nomElem + " (case " + numCellule + ") appartient à ce thème mais n'est pas dans le bon ordre !");
            }

            setTimeout(() => retirerElement(numCellule, elem), 1500);
        }
    });

    if (toutCorrect) {
        terminerJeu();
    } else {
        // Afficher tous les messages d'un coup
        message.innerHTML = messages.join("<br>");
        message.style.display = "block";

        if (messageTimer) clearTimeout(messageTimer);
        messageTimer = setTimeout(() => {
            message.style.display = "none";
            messageTimer = null;
        }, 3000);
    }
}

let btnVerifier = document.getElementById("btnVerifier");
btnVerifier.addEventListener("click", verifierAssociation);

function afficherMessage(message, texte) {
    if (messageTimer) {
        clearTimeout(messageTimer);
        messageTimer = null;
    }

    message.style.display = "none";
    void message.offsetHeight; 

    message.textContent = texte;
    message.style.display = "block";

    messageTimer = setTimeout(() => {
        message.style.display = "none";
        messageTimer = null;
    }, 1500);
}

// Termine le jeu et revient à l'accueil
function terminerJeu() {
    document.getElementById("association").style.display="none";
    document.getElementById("jeu").style.display = "none";
    let felicitation = document.getElementById("messageFelicitation");
    felicitation.style.display = "block";

    setTimeout(() => {
        felicitation.style.display = "none";

        // 1. Récupérer les éléments AVANT tout reset
        let elemsAvecId = document.querySelectorAll(".elem[id]");
        elemsAvecId.forEach(elem => {
            elem.style.background = "";
            document.getElementById("elementsDispo").appendChild(elem);
        });

        // 2. Maintenant on peut vider la zone sans perdre les éléments
        document.getElementById("zoneAssociation").innerHTML = "";

        // 3. Reset association
        ordreCorrect = [];
        objetGlisse = null;
        document.getElementById("association").style.display = "none";

        // 4. Reset memory
        document.getElementById("plateau").style.display = "grid";
        premiereCarte = null;
        deuxiemeCarte = null;
        estBloque = false;
        compteurErreurs = 0;

        let toutesCartes = document.querySelectorAll(".carte");
        toutesCartes.forEach(c => {
            c.classList.remove("retournee", "surbrillance");
        });

        document.getElementById("passerAAssociation").style.display = "none";
        document.getElementById("aideMemo").style.display = "";

        // 5. Afficher l'accueil en dernier
        document.getElementById("accueil").style.display = "block";

    }, 4000);
}


function retournerTemporairementToutesCartes() {
    let cartes = Array.from(document.querySelectorAll(".carte:not(.retournee)"));

    cartes.forEach(c => c.classList.add("retournee"));

    setTimeout(() => {
        cartes.forEach(c => c.classList.remove("retournee"));
    }, 3000);
}

function retournerMoitiePaires() {
    let cartes = Array.from(document.querySelectorAll(".carte:not(.retournee)"));
    let paires = {};

    cartes.forEach(c => {
        let val = c.querySelector(".face").classList[1];
        if (!paires[val]) paires[val] = [];
        paires[val].push(c);
    });

    let pairesCompletes = [];
    for (let key in paires) {
        if (paires[key].length === 2) pairesCompletes.push(paires[key]);
    }

    let moitie = Math.floor(pairesCompletes.length / 2);

    for (let i = 0; i < moitie; i++) {
        pairesCompletes[i].forEach(c => c.classList.add("retournee"));
    }

    premiereCarte = null;
    deuxiemeCarte = null;
    estBloque = false;

    verifierFinMemory();
}

function surbrillanceUnePaire() {
    let cartes = Array.from(document.querySelectorAll(".carte:not(.retournee)"));
    for (let i = 0; i < cartes.length; i++) {
        for (let j = i + 1; j < cartes.length; j++) {
            if (cartes[i].querySelector(".face").classList[1] === cartes[j].querySelector(".face").classList[1]) {
                cartes[i].classList.add("surbrillance");
                cartes[j].classList.add("surbrillance");
                setTimeout(() => {
                    cartes[i].classList.remove("surbrillance");
                    cartes[j].classList.remove("surbrillance");
                }, 2000);
                return;
            }
        }
    }
}

let aideMemo = document.getElementById("aideMemo");
aideMemo.addEventListener("click", surbrillanceUnePaire);

let aideAssoc = document.getElementById("aideAssociation");
aideAssoc.addEventListener("click", donnerIndiceAssociation);

function donnerIndiceAssociation() {
    let elemsAvecId = Array.from(document.querySelectorAll("#elementsDispo .elem[id]"));

    if (elemsAvecId.length === 0) return;

    elemsAvecId.sort((a, b) => Number(a.id) - Number(b.id));
    let prochain = elemsAvecId[0];

    let numProchain = Number(prochain.id);
    let celluleCible = document.getElementById("cellule-" + numProchain);

    prochain.classList.add("indice-surbrillance");
    if (celluleCible) celluleCible.classList.add("indice-surbrillance");

    setTimeout(() => {
        prochain.classList.remove("indice-surbrillance");
        if (celluleCible) celluleCible.classList.remove("indice-surbrillance");
    }, 2000);

    let message = document.getElementById("messageAssociation");
}