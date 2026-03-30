// ─── ÉTAT GLOBAL ──────────────────────────────────────────────────────────────

let role = null; // 'accueilli' | 'aidant'
let elemSelectionne = null; // Pour le fallback clic (Correction #3)

let compteurErreurs = 0;
const SEUIL_AIDE = 8;

let premiereCarte = null;
let deuxiemeCarte = null;
let estBloque = false;

let objetGlisse = null;
let ordreCorrect = [];
let messageTimer = null;

// ─── CHOIX DU RÔLE (Correction #2) ────────────────────────────────────────────

function choisirRole(r) {
    role = r;
    document.getElementById('choixRole').style.display = 'none';
    document.getElementById('accueil').style.display = 'block';

    // Badge rôle actif
    const badge = document.getElementById('roleActifBadge');
    if (r === 'accueilli') {
        badge.innerHTML = '🧓 Mode accueilli activé';
        badge.className = 'role-badge badge-accueilli';
    } else {
        badge.innerHTML = '🤝 Mode aidant activé';
        badge.className = 'role-badge badge-aidant';
    }

    // Adapter l'aide de la modale
    document.getElementById('aideAccueilli').style.display = r === 'accueilli' ? 'block' : 'none';
    document.getElementById('aideAidant').style.display = r === 'aidant' ? 'block' : 'none';
}

// ─── DÉMARRAGE ────────────────────────────────────────────────────────────────

document.getElementById("btnCommencer").addEventListener("click", function () {
    document.getElementById("accueil").style.display = "none";
    document.getElementById("jeu").style.display = "block";
});

// ─── MEMORY ───────────────────────────────────────────────────────────────────

let cartes = document.querySelectorAll(".carte");
cartes.forEach(function (carte) {
    carte.addEventListener("click", function () {
        if (estBloque) return;
        carte.classList.add("retournee");
        if (premiereCarte == null) {
            premiereCarte = carte;
        } else {
            deuxiemeCarte = carte;
            estBloque = true;
            let type1 = premiereCarte.querySelector(".face").classList[1];
            let type2 = deuxiemeCarte.querySelector(".face").classList[1];

            if (type1 === type2) {
                premiereCarte = null;
                deuxiemeCarte = null;
                estBloque = false;
                verifierFinMemory();
            } else {
                compteurErreurs++;
                if (compteurErreurs >= SEUIL_AIDE) {
                    aideMemo.click();
                    compteurErreurs = 0;
                }
                setTimeout(function () {
                    premiereCarte.classList.remove("retournee");
                    deuxiemeCarte.classList.remove("retournee");
                    premiereCarte = null;
                    deuxiemeCarte = null;
                    estBloque = false;
                }, 1000);
            }
        }
    });
});

let startAssocia = document.getElementById("passerAAssociation");
startAssocia.addEventListener("click", lancerAssociation);

function verifierFinMemory() {
    let cartesRetournees = document.querySelectorAll(".carte.retournee");
    if (cartes.length === cartesRetournees.length) {
        startAssocia.style.display = "block";
        aideMemo.style.display = "none";
        declencherVictoire();
    }
}

// ─── ASSOCIATION ──────────────────────────────────────────────────────────────

function lancerAssociation() {
    document.getElementById("plateau").style.display = "none";
    startAssocia.style.display = "none";
    document.getElementById("association").style.display = "block";
    document.getElementById("btnVerifier").style.display = "none";
    document.getElementById("aideAssociation").style.display = "block";

    // Afficher la légende fixe
    document.getElementById("legendeFixe").style.display = "flex";

    let nombre = document.querySelectorAll(".elem[id]").length;
    genererCellules(nombre);
    initDrag();
    initClick(); // Correction #3 — fallback clic
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

// ─── FALLBACK CLIC (Correction #3) ────────────────────────────────────────────

function initClick() {
    // Sélection d'un élément disponible
    document.getElementById("elementsDispo").addEventListener("click", function (e) {
        let elem = e.target.closest(".elem");
        if (!elem) return;

        // Déselectionner si déjà sélectionné
        if (elemSelectionne === elem) {
            elem.classList.remove("selectionne");
            elemSelectionne = null;
            return;
        }

        // Désélectionner l'ancien
        if (elemSelectionne) elemSelectionne.classList.remove("selectionne");
        elemSelectionne = elem;
        elem.classList.add("selectionne");
    });

    // Clic sur une cellule pour y déposer l'élément sélectionné
    document.getElementById("zoneAssociation").addEventListener("click", function (e) {
        let cellule = e.target.closest(".cellule");
        if (!cellule || !elemSelectionne) return;
        if (cellule.classList.contains("remplie")) {
            afficherMessageErreur("Cette case est déjà occupée !", false);
            return;
        }
        let numCellule = Number(cellule.id.replace("cellule-", ""));
        objetGlisse = elemSelectionne;
        deposerElement(numCellule, elemSelectionne);
        elemSelectionne.classList.remove("selectionne");
        elemSelectionne = null;
        verifierCellulesRemplies();
    });
}

// ─── DRAG & DROP ──────────────────────────────────────────────────────────────

function initDrop() {
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
            handleDrop(numCellule);
        });
    });

    let dispo = document.getElementById("elementsDispo");
    dispo.addEventListener("dragover", e => e.preventDefault());
    dispo.addEventListener("drop", e => {
        e.preventDefault();
        if (!objetGlisse) return;
        let celluleParente = objetGlisse.closest(".cellule");
        if (celluleParente) {
            let numCellule = Number(celluleParente.id.replace("cellule-", ""));
            retirerElement(numCellule, objetGlisse);
        }
    });
}

function initDrag() {
    document.querySelectorAll(".elem").forEach(elem => {
        elem.addEventListener("dragstart", e => {
            objetGlisse = e.target.closest(".elem");
        });
    });
}

function handleDrop(numCellule) {
    if (!objetGlisse) return;
    let cellule = document.getElementById("cellule-" + numCellule);
    if (cellule.classList.contains("remplie")) {
        afficherMessageErreur("Cette case est déjà occupée !", false);
        return;
    }
    let celluleParente = objetGlisse.closest(".cellule");
    if (celluleParente && celluleParente.id !== cellule.id) {
        let numParente = Number(celluleParente.id.replace("cellule-", ""));
        celluleParente.classList.remove("remplie", "correcte", "incorrecte", "incorrecte-theme", "incorrecte-ordre");
        celluleParente.querySelector(".cellule-contenu").innerHTML = "";
    }
    deposerElement(numCellule, objetGlisse);
    verifierCellulesRemplies();
}

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
    cellule.classList.remove("remplie", "correcte", "incorrecte", "incorrecte-theme", "incorrecte-ordre");
    cellule.querySelector(".cellule-contenu").innerHTML = "";
    document.getElementById("btnVerifier").style.display = "none";
    verifierCellulesRemplies();
}

function verifierCellulesRemplies() {
    let cellules = document.querySelectorAll(".cellule");
    let toutesRemplies = Array.from(cellules).every(c => c.classList.contains("remplie"));
    document.getElementById("btnVerifier").style.display = toutesRemplies ? "inline-block" : "none";
    document.getElementById("aideAssociation").style.display = toutesRemplies ? "none" : "block";
}

// ─── VÉRIFICATION ASSOCIATION ─────────────────────────────────────────────────

function verifierAssociation() {
    let cellules = document.querySelectorAll(".cellule");
    let toutCorrect = true;
    let messagesAidant = [];

    cellules.forEach(cellule => {
        let numCellule = Number(cellule.id.replace("cellule-", ""));
        let elem = cellule.querySelector(".elem");
        let idElem = elem ? Number(elem.id) : null;

        if (idElem === numCellule) {
            cellule.classList.add("correcte");
        } else {
            toutCorrect = false;

            // Analyse du type d'erreur
            let elemsAvecId = Array.from(document.querySelectorAll(".elem[id]"));
            let appartientAuTheme = elemsAvecId.some(e => Number(e.id) === idElem);
            let nomElem = elem ? elem.querySelector("p").textContent : "?";

            if (!appartientAuTheme) {
                // Mauvais thème → orange
                cellule.classList.add("incorrecte-theme");
                messagesAidant.push(`🚫 "${nomElem}" n'appartient pas à ce thème`);
            } else {
                // Bon thème mais mauvais ordre → rouge
                cellule.classList.add("incorrecte-ordre");
                messagesAidant.push(`🔀 "${nomElem}" est dans le bon thème mais pas au bon endroit`);
            }

            // Animation + retrait après délai
            cellule.classList.add("shake");
            setTimeout(() => {
                cellule.classList.remove("shake");
                retirerElement(numCellule, elem);
            }, 1200);
        }
    });

    if (toutCorrect) {
        terminerJeu();
    } else {
        // Déterminer le type d'erreur dominant
        let aTheme = messagesAidant.some(m => m.includes("n'appartient pas"));
        let aOrdre = messagesAidant.some(m => m.includes("bon thème"));
        let typeErreur = (aTheme && aOrdre) ? 'mixte' : aTheme ? 'theme' : 'ordre';

        if (role === 'accueilli') {
            afficherMessageErreur(messagesAidant.join("<br>"), true, typeErreur);
        } else {
            afficherMessageErreur("Pas tout à fait... Essaie encore !", true, typeErreur);
        }
    }
}

// ─── AFFICHAGE MESSAGE ERREUR AMÉLIORÉ (Correction #1) ────────────────────────

function afficherMessageErreur(texte, estErreur, typeErreur) {
    let message = document.getElementById("messageAssociation");
    if (messageTimer) {
        clearTimeout(messageTimer);
        messageTimer = null;
    }

    message.innerHTML = texte;

    // typeErreur : 'theme' = orange, 'ordre' = rouge, undefined = info (violet)
    if (!estErreur) {
        message.className = "message-info visible";
    } else if (typeErreur === 'theme') {
        message.className = "message-erreur-theme visible";
    } else if (typeErreur === 'ordre') {
        message.className = "message-erreur-ordre visible";
    } else if (typeErreur === 'mixte') {
        message.className = "message-erreur-mixte visible";
    } else {
        message.className = "message-erreur visible";
    }

    message.style.display = "block";

    messageTimer = setTimeout(() => {
        message.classList.remove("visible");
        setTimeout(() => { message.style.display = "none"; }, 300);
        messageTimer = null;
    }, 4000);
}

document.getElementById("btnVerifier").addEventListener("click", verifierAssociation);

// ─── AIDE ─────────────────────────────────────────────────────────────────────

let aideMemo = document.getElementById("aideMemo");
aideMemo.addEventListener("click", surbrillanceUnePaire);

let aideAssoc = document.getElementById("aideAssociation");
aideAssoc.addEventListener("click", donnerIndiceAssociation);

function surbrillanceUnePaire() {
    let cartesNonRetournees = Array.from(document.querySelectorAll(".carte:not(.retournee)"));
    for (let i = 0; i < cartesNonRetournees.length; i++) {
        for (let j = i + 1; j < cartesNonRetournees.length; j++) {
            if (cartesNonRetournees[i].querySelector(".face").classList[1] ===
                cartesNonRetournees[j].querySelector(".face").classList[1]) {
                cartesNonRetournees[i].classList.add("surbrillance");
                cartesNonRetournees[j].classList.add("surbrillance");
                setTimeout(() => {
                    cartesNonRetournees[i].classList.remove("surbrillance");
                    cartesNonRetournees[j].classList.remove("surbrillance");
                }, 2000);
                return;
            }
        }
    }
}

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
    }, 2500);
}

// ─── FIN DE JEU + RÉCAP VISUEL (différenciateur) ─────────────────────────────

function terminerJeu() {
    document.getElementById("association").style.display = "none";
    document.getElementById("jeu").style.display = "none";
    document.getElementById("legendeFixe").style.display = "none";

    declencherVictoire();

    // Construire le récap visuel de la séquence correcte
    let elemsAvecId = Array.from(document.querySelectorAll(".elem[id]"));
    elemsAvecId.sort((a, b) => Number(a.id) - Number(b.id));

    let recapSeq = document.getElementById("recapSequence");
    recapSeq.innerHTML = "";
    elemsAvecId.forEach((elem, idx) => {
        let item = document.createElement("div");
        item.className = "recap-item";
        let img = elem.querySelector("img").cloneNode(true);
        let p = elem.querySelector("p").cloneNode(true);
        let num = document.createElement("div");
        num.className = "recap-num";
        num.textContent = idx + 1;
        item.appendChild(num);
        item.appendChild(img);
        item.appendChild(p);
        recapSeq.appendChild(item);
        if (idx < elemsAvecId.length - 1) {
            let fleche = document.createElement("div");
            fleche.className = "recap-fleche";
            fleche.textContent = "→";
            recapSeq.appendChild(fleche);
        }
    });

    document.getElementById("recapFin").style.display = "block";
    let recapFin = document.getElementById("recapFin");
    recapFin.style.display = "flex";
    recapFin.style.flexDirection = "column";
    recapFin.style.alignItems = "center";

    // Reset après affichage du récap (via bouton Rejouer)
}

function relancerJeu() {
    document.getElementById("recapFin").style.display = "none";

    // Reset des éléments disponibles
    let elemsAvecId = document.querySelectorAll(".elem[id]");
    elemsAvecId.forEach(elem => {
        elem.style.background = "";
        elem.classList.remove("selectionne", "indice-surbrillance");
        document.getElementById("elementsDispo").appendChild(elem);
    });

    ordreCorrect = [];
    objetGlisse = null;
    elemSelectionne = null;

    // Reset association
    document.getElementById("association").style.display = "none";
    document.getElementById("zoneAssociation").innerHTML = "";
    document.getElementById("legendeFixe").style.display = "none";

    // Reset memory
    premiereCarte = null;
    deuxiemeCarte = null;
    estBloque = false;
    compteurErreurs = 0;
    document.querySelectorAll(".carte").forEach(c => c.classList.remove("retournee", "surbrillance"));
    document.getElementById("plateau").style.display = "grid";
    document.getElementById("passerAAssociation").style.display = "none";
    document.getElementById("aideMemo").style.display = "";

    // Retour à l'écran d'accueil (avant le jeu)
    document.getElementById("jeu").style.display = "none";
    document.getElementById("choixRole").style.display = "none";
    document.getElementById("accueil").style.display = "block";
}

// ─── CONFETTIS ────────────────────────────────────────────────────────────────

function declencherVictoire() {
    const canvas = document.getElementById('confetti-canvas');
    if (!canvas) return;
    var myConfetti = confetti.create(canvas, { resize: true, useWorker: true });
    myConfetti({
        particleCount: 80,
        spread: 100,
        origin: { y: 0.6 },
        gravity: 0.6,
        colors: ['#875C74', '#B79D94', '#BBCDE5', '#453750']
    });
}

// ─── MODALE AIDE ──────────────────────────────────────────────────────────────

document.getElementById('btnHelp').addEventListener('click', function () {
    document.getElementById('modaleHelp').style.display = 'flex';
});