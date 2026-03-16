
let compteurErreurs = 0;
const SEUIL_AIDE = 8;


let premiereCarte = null;
let deuxiemeCarte = null;
let estBloque = false;

let button = document.getElementById("btnCommencer");
button.addEventListener("click", function(){
    let accueil = document.getElementById("accueil");
    let jeu = document.getElementById("jeu");
    accueil.style.display ="none";
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
                } , 1000);
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
        aideMemo.style.display="none";

    }

}

// Variables globales
let objetGlisse = null;
let ordreCorrect = [];

// Lancer la phase association
function lancerAssociation() {
    console.log("Passage à la phase association");

    document.getElementById("plateau").style.display = "none";
    startAssocia.style.display = "none";
    document.getElementById("association").style.display = "block";

    initDrag();
    initDrop();
}

// Initialiser le drag des éléments
function initDrag() {
    let elems = document.querySelectorAll(".elem");
    elems.forEach(elem => {
        elem.addEventListener("dragstart", e => { objetGlisse = e.target; });
    });
}

// Initialiser la zone de drop
function initDrop() {
    let zone = document.getElementById("zoneAssociation");
    let message = document.getElementById("messageAssociation");

    zone.addEventListener("dragover", e => e.preventDefault());
    zone.addEventListener("drop", e => {
        e.preventDefault();
        handleDrop(zone, message);
    });
}

// Vérifie l'ordre et dépose l'élément
function handleDrop(zone, message) {
    if(!objetGlisse || !objetGlisse.id) return;

    let idObjet = Number(objetGlisse.id);
    if(!verifierOrdre(idObjet, message)) return;

    deposerElement(zone, objetGlisse);
    ordreCorrect.push(idObjet);

    if(verifierFinAssociation(zone)) terminerJeu();
}

// Vérifie si l'ordre est correct
function verifierOrdre(idObjet, message) {
    for(let i = 1; i < idObjet; i++){
        if(!ordreCorrect.includes(i)){
            afficherMessage(message, "Mauvais ordre d'association !");
            return false;
        }
    }
    return true;
}

// Dépose l'élément correctement
function deposerElement(zone, elem) {
    elem.style.background = "lightgreen";
    zone.appendChild(elem);
}

// Vérifie si tous les éléments avec id sont déposés
function verifierFinAssociation(zone) {
    let elemsAvecId = document.querySelectorAll(".elem[id]");
    return Array.from(elemsAvecId).every(elem => zone.contains(elem));
}

// Affiche le message temporairement
function afficherMessage(message, texte) {
    message.textContent = texte;
    message.style.display = "block";
    setTimeout(() => message.style.display = "none", 1500);
}

// Termine le jeu et revient à l'accueil
function terminerJeu() {
    document.getElementById("jeu").style.display = "none";
    let felicitation = document.getElementById("messageFelicitation");
    felicitation.style.display = "block";

    setTimeout(() => {
        felicitation.style.display = "none"
        document.getElementById("accueil").style.display = "block";

        ordreCorrect = [];
        objetGlisse = null;
        let elemsAvecId = document.querySelectorAll(".elem[id]");
        elemsAvecId.forEach(elem => {
            elem.style.background = "";
            document.getElementById("elementsDispo").appendChild(elem);
        });

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
