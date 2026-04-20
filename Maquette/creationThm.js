let elements = [];

function ajouterElement() {
    elements.push({
        id: Date.now(),
        mot: "",
        image: "",
        audio: "",
        ordre: null,
        valide: false
    });
    render();
}

function render() {
    const container = document.getElementById("elementsList");

    container.innerHTML = elements.map(el => {

        // MODE VALIDÉ (preview carte)
        if (el.valide) {
            return `
            <div class="element">
                <div class="carte-preview">
                    
                    <div class="card-buttons">
                        <button class="btn-secondary" onclick="modifierElement(${el.id})">Modifier</button>
                        <button class="btn-remove" onclick="supprimerElement(${el.id})">Supprimer</button>
                    </div>
        
                    <img src="${el.image}" class="preview-img">
                    <div class="mot">${el.mot}</div>
                    ${el.audio ? `<audio controls src="${el.audio}"></audio>` : ""}
                    <div class="ordre-badge">#${el.ordre}</div>
                </div>
            </div>
            `;
        }

        // MODE EDITION
        return `
        <div class="element">
        
            <label>Description de l'élément (3 mots max)</label>
            <input type="text" value="${el.mot}" 
                onchange="updateMot(${el.id}, this.value)">
        
            <label>Image</label>
            <input type="file" accept="image/*" onchange="updateImageFile(${el.id}, this)">
            ${el.image ? `<img src="${el.image}" class="preview-img">` : ""}
        
            <label>Audio (optionnel)</label>
            <input type="file" accept="audio/*" onchange="updateAudioFile(${el.id}, this)">
            ${el.audio ? `<audio controls src="${el.audio}"></audio>` : ""}
        
            <label>Ordre</label>
            <input 
                type="number" 
                min="1" 
                value="${el.ordre || ''}" 
                onchange="updateOrdre(${el.id}, this.value)"
                style="width: 60px; padding: 6px; border-radius: 6px; border: 2px solid var(--beige);"
            />
        
            <div id="msg-${el.id}" class="msg-erreur"></div>
        
            <button class="btn-primary" onclick="validerElement(${el.id})">
                Valider cet élément
            </button>
        
        </div>
        `;
    }).join("");
}

function updateMot(id, value) { elements.find(e=>e.id===id).mot=value; }

function updateImageFile(id, input) {
    const file = input.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => {
        elements.find(e=>e.id===id).image = e.target.result;
    };
    reader.readAsDataURL(file);
}

function updateAudioFile(id, input) {
    const file = input.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => {
        elements.find(e=>e.id===id).audio = e.target.result;
    };
    reader.readAsDataURL(file);
}

function updateOrdre(id, value) {
    const val = parseInt(value);
    elements.find(e => e.id === id).ordre = !isNaN(val) ? val : null;
}

function afficherMessage(msg, type="erreur") {
    const msgDiv = document.getElementById("messageTheme");
    msgDiv.textContent = msg;
    if(type==="erreur") {
        msgDiv.classList.add("visible");
    } else if(type==="success") {
        msgDiv.classList.add("visible");
        msgDiv.style.background="#e0f8e9";
        msgDiv.style.color="#2e7d32";
    }
}


function sauvegarderTheme() {
    const nomTheme = document.getElementById("themeNom").value.trim();

    if (!nomTheme) {
        afficherMessage("Veuillez saisir un nom pour le thème");
        return;
    }

    const valides = elements.filter(e => e.valide);

    if (valides.length < 2) {
        afficherMessage("Ajoutez au moins 2 éléments valides");
        return;
    }

    const ordres = valides.map(e => parseInt(e.ordre)).sort((a, b) => a - b);

    for (let i = 0; i < ordres.length; i++) {
        if (ordres[i] !== i + 1) {
            afficherMessage("Les ordres doivent être consécutifs à partir de 1");
            return;
        }
    }

    const theme = {
        nom: nomTheme,
        elements
    };

    localStorage.setItem("ml_theme_" + Date.now(), JSON.stringify(theme));

    afficherMessage("Thème enregistré !", "success");
}

function supprimerElement(id) {
    elements = elements.filter(e => e.id !== id);
    render();
}

function validerElement(id) {
    const el = elements.find(e => e.id === id);
    clearMessageElement(id);

    if (!el.mot) return afficherMessageElement(id, "Ajoutez une description");
    if (!el.image) return afficherMessageElement(id, "Ajoutez une image");
    if (!el.ordre || el.ordre < 1) return afficherMessageElement(id, "L'ordre doit être ≥ 1");


    // Vérifier ordre unique
    const dejaPris = elements.find(e => e.id !== id && e.ordre === el.ordre);
    if (dejaPris) return afficherMessageElement(id, "Cet ordre est déjà utilisé pour un autre élément");

    el.valide = true;
    render();
}

function modifierElement(id) {
    const el = elements.find(e => e.id === id);
    el.valide = false;
    render();
}

function afficherMessageElement(id, msg) {
    const msgDiv = document.getElementById(`msg-${id}`);
    if(msgDiv) {
        msgDiv.textContent = msg;
        msgDiv.classList.add("visible");
    }
}

function clearMessageElement(id) {
    const msgDiv = document.getElementById(`msg-${id}`);
    if(msgDiv) {
        msgDiv.textContent = "";
        msgDiv.classList.remove("visible");
    }
}
