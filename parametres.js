function updateSlider(inputId, valueId, unit) {
    const val = document.getElementById(inputId).value;
    document.getElementById(valueId).textContent = val + unit;
}

function changeAide(delta) {
    const input = document.getElementById('aide-frequence');
    let val = parseInt(input.value) + delta;
    val = Math.max(1, Math.min(10, val));
    input.value = val;
    document.getElementById('aide-inline').textContent = val;
}

function syncAide() {
    const val = document.getElementById('aide-frequence').value;
    document.getElementById('aide-inline').textContent = val || '—';
}

function sauvegarder() {
    const toast = document.getElementById('toast');
    toast.classList.add('visible');
    setTimeout(() => toast.classList.remove('visible'), 2500);
}
