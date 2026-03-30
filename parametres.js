// ─── Template Helper ─────────────────────────────────────────────────────────

function parseTemplate(htmlString) {
    return new DOMParser()
        .parseFromString(htmlString, 'text/html')
        .querySelector('template').content;
}


// ─── ParamSlider ─────────────────────────────────────────────────────────────

const paramSliderTemplate = `
<template>
    <link rel="stylesheet" href="parametres.css">
    <style>
        .param-label { font-size: var(--font-size-base); }
        .param-value { font-size: var(--font-size-base); }
    </style>
    <div class="param-card">
        <div class="param-row">
            <span class="param-label"></span>
            <span class="param-value"></span>
        </div>
        <div class="slider-wrapper">
            <span class="slider-icon icon-min"></span>
            <input type="range">
            <span class="slider-icon icon-max" style="font-size:1.4rem"></span>
        </div>
    </div>
</template>`;

class ParamSlider extends HTMLElement {
    static get observedAttributes() {
        return ['label', 'min', 'max', 'value', 'step', 'unit', 'icon-min', 'icon-max'];
    }

    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(parseTemplate(paramSliderTemplate).cloneNode(true));
    }

    connectedCallback() {
        this._render();

        const input   = this.shadowRoot.querySelector('input');
        const display = this.shadowRoot.querySelector('.param-value');

        input.addEventListener('input', () => {
            const unit = this.getAttribute('unit') || '';
            display.textContent = input.value + unit;
            if (this.getAttribute('label') === 'Taille de la police') {
                document.documentElement.style.setProperty('--font-size-base', input.value + 'px');
            }

            this.dispatchEvent(new CustomEvent('change', {
                bubbles: true, composed: true,
                detail: { value: input.value }
            }));
        });
    }

    attributeChangedCallback(key, oldValue, newValue) {
        if (oldValue !== newValue && this.shadowRoot.querySelector('.param-label')) {
            this._render();
        }
    }

    _render() {
        const label   = this.getAttribute('label')    || '';
        const min     = this.getAttribute('min')      || 0;
        const max     = this.getAttribute('max')      || 100;
        const value   = this.getAttribute('value')    || 50;
        const step    = this.getAttribute('step')     || 1;
        const unit    = this.getAttribute('unit')     || '';
        const iconMin = this.getAttribute('icon-min') || '';
        const iconMax = this.getAttribute('icon-max') || '';

        this.shadowRoot.querySelector('.param-label').textContent = label;
        this.shadowRoot.querySelector('.param-value').textContent = value + unit;
        this.shadowRoot.querySelector('.icon-min').textContent    = iconMin;
        this.shadowRoot.querySelector('.icon-max').textContent    = iconMax;

        const input = this.shadowRoot.querySelector('input');
        input.min   = min;
        input.max   = max;
        input.value = value;
        input.step  = step;
    }
}
customElements.define('param-slider', ParamSlider);


// ─── ParamCounter ─────────────────────────────────────────────────────────────

const paramCounterTemplate = `
<template>
    <link rel="stylesheet" href="parametres.css">
    <style>
        .param-label                { font-size: var(--font-size-base); }
        .param-description          { font-size: var(--font-size-base); }
        .number-control input       { font-size: var(--font-size-base); }
        .number-control button      { font-size: var(--font-size-base); }
    </style>
    <div class="param-card">
        <span class="param-label"></span>
        <div class="param-row">
            <span class="param-description"></span>
            <div class="number-control">
                <button class="btn-minus">−</button>
                <input type="number">
                <button class="btn-plus">+</button>
            </div>
        </div>
    </div>
</template>`;

class ParamCounter extends HTMLElement {
    static get observedAttributes() {
        return ['label', 'description', 'min', 'max', 'value'];
    }

    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(parseTemplate(paramCounterTemplate).cloneNode(true));
        this._value = null;
    }

    connectedCallback() {
        this._render();

        const input    = this.shadowRoot.querySelector('input');
        const btnMinus = this.shadowRoot.querySelector('.btn-minus');
        const btnPlus  = this.shadowRoot.querySelector('.btn-plus');

        const update = (val) => {
            const min = parseInt(this.getAttribute('min')) || 1;
            const max = parseInt(this.getAttribute('max')) || 10;
            this._value = Math.max(min, Math.min(max, val));
            input.value = this._value;
            const inlineVal = this.shadowRoot.querySelector('.inline-value');
            if (inlineVal) inlineVal.textContent = this._value;
            this.dispatchEvent(new CustomEvent('change', {
                bubbles: true, composed: true,
                detail: { value: this._value }
            }));
        };

        btnMinus.addEventListener('click', () => update(this._value - 1));
        btnPlus.addEventListener('click',  () => update(this._value + 1));
        input.addEventListener('input',    () => update(parseInt(input.value)));
    }

    attributeChangedCallback(key, oldValue, newValue) {
        if (oldValue !== newValue && this.shadowRoot.querySelector('.param-label')) {
            this._render();
        }
    }

    _render() {
        const label       = this.getAttribute('label')       || '';
        const description = this.getAttribute('description') || '';
        const min         = parseInt(this.getAttribute('min'))   || 1;
        const max         = parseInt(this.getAttribute('max'))   || 10;
        const value       = parseInt(this.getAttribute('value')) || min;

        if (this._value === null) this._value = value;

        this.shadowRoot.querySelector('.param-label').textContent = label;

        const descEl     = this.shadowRoot.querySelector('.param-description');
        descEl.innerHTML = description.replace(
            '{value}',
            `<strong class="inline-value">${this._value}</strong>`
        );

        const input = this.shadowRoot.querySelector('input');
        input.min   = min;
        input.max   = max;
        input.value = this._value;
    }
}
customElements.define('param-counter', ParamCounter);


// ─── ParamQCM ───────────────────────────────────────────────────────────────

const paramQCMTemplate = `
<template>
    <link rel="stylesheet" href="parametres.css">
    <style>
        .param-label  { font-size: var(--font-size-base); }
        .qcm-option label { font-size: var(--font-size-base); }
    </style>
    <div class="param-card">
        <span class="param-label"></span>
        <div class="qcm-group"></div>
    </div>
</template>`;

class ParamQCM extends HTMLElement {
    static get observedAttributes() {
        return ['label', 'options', 'checked'];
    }

    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(parseTemplate(paramQCMTemplate).cloneNode(true));
    }

    connectedCallback() {
        this._render();
    }

    attributeChangedCallback(key, oldValue, newValue) {
        if (oldValue !== newValue && this.shadowRoot.querySelector('.param-label')) {
            this._render();
        }
    }

    _render() {
        const label   = this.getAttribute('label')    || '';
        const options = (this.getAttribute('options') || '').split(',').map(o => o.trim());
        const checked = (this.getAttribute('checked') || '').split(',').map(o => o.trim());

        this.shadowRoot.querySelector('.param-label').textContent = label;

        const group = this.shadowRoot.querySelector('.qcm-group');
        group.innerHTML = options.map(opt => `
            <div class="qcm-option">
                <input type="checkbox" id="qcm-${opt}" value="${opt}"
                    ${checked.includes(opt) ? 'checked' : ''}>
                <label for="qcm-${opt}">${opt}</label>
            </div>
        `).join('');

        group.querySelectorAll('input').forEach(input => {
            input.addEventListener('change', () => {
                if (this.getSelected().length === 0) {
                    input.checked = true;
                    return;
                }
                this.dispatchEvent(new CustomEvent('change', {
                    bubbles: true, composed: true,
                    detail: { value: this.getSelected() }
                }));
            });
        });
    }

    getSelected() {
        return [...this.shadowRoot.querySelectorAll('input:checked')].map(i => i.value);
    }
}
customElements.define('param-qcm', ParamQCM);


// ─── ParamPlateau ─────────────────────────────────────────────────────────────

const paramPlateauTemplate = `
<template>
    <link rel="stylesheet" href="parametres.css">
    <style>
        .param-label        { font-size: var(--font-size-base); }
        .radio-option label { font-size: var(--font-size-base); }
    </style>
    <div class="param-card">
        <span class="param-label"></span>
        <div class="radio-group"></div>
    </div>
</template>`;

class ParamPlateau extends HTMLElement {
    static get observedAttributes() {
        return ['label', 'checked'];
    }

    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(parseTemplate(paramPlateauTemplate).cloneNode(true));
    }

    connectedCallback() {
        this._render();
    }

    attributeChangedCallback(key, oldValue, newValue) {
        if (oldValue !== newValue && this.shadowRoot.querySelector('.param-label')) {
            this._render();
        }
    }

    _render() {
        const label   = this.getAttribute('label')   || '';
        const checked = this.getAttribute('checked') || '4x4';

        const options = [
            { value: '4x2', cols: 4, rows: 2 },
            { value: '4x3', cols: 4, rows: 3 },
            { value: '4x4', cols: 4, rows: 4 },
            { value: '5x4', cols: 5, rows: 4 },
            { value: '6x5', cols: 6, rows: 5 },
        ];

        const renderCells = (cols, rows) =>
            Array(cols * rows).fill('<div class="grid-cell"></div>').join('');

        this.shadowRoot.querySelector('.param-label').textContent = label;

        const group = this.shadowRoot.querySelector('.radio-group');
        group.innerHTML = options.map(opt => `
            <div class="radio-option">
                <input type="radio" name="plateau"
                    id="p${opt.value}" value="${opt.value}"
                    ${opt.value === checked ? 'checked' : ''}>
                <label for="p${opt.value}">
                    <div class="grid-preview"
                        style="grid-template-columns: repeat(${opt.cols}, 8px)">
                        ${renderCells(opt.cols, opt.rows)}
                    </div>
                    ${opt.value.replace('x', ' × ')}
                </label>
            </div>
        `).join('');

        group.querySelectorAll('input').forEach(input => {
            input.addEventListener('change', () => {
                this.dispatchEvent(new CustomEvent('change', {
                    bubbles: true, composed: true,
                    detail: { value: input.value }
                }));
            });
        });
    }
}
customElements.define('param-plateau', ParamPlateau);

// ---Sélecteur de Stades--------------------------------------------------------

const paramStageTemplate = `
<template>
    <link rel="stylesheet" href="parametres.css">
    <div class="param-card">
        <span class="param-label"></span>
        <p class="param-description"></p>
        <div class="stage-group"></div>
    </div>
</template>`;

const STAGES = [
    {
        value: 'leger',
        name: 'Niveau élevé',
        desc: 'Aides ponctuelles',
        color: '#B79D94', 
        bg: '#F8F4F2',    
    },
    {
        value: 'modere',
        name: 'Niveau modéré',
        desc: 'Aides régulières',
        color: '#875C74', 
        bg: '#F4F0F2',    
    },
    {
        value: 'severe',
        name: 'Niveau facile',
        desc: 'Aides continues',
        color: '#453750', 
        bg: '#F0EFF2',    
    },
];

class ParamStage extends HTMLElement {
    static get observedAttributes() {
        return ['label', 'description', 'checked'];
    }
    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(parseTemplate(paramStageTemplate).cloneNode(true));
    }
    connectedCallback() {
        this._render();
    }
    attributeChangedCallback(key, oldValue, newValue) {
        if (oldValue !== newValue && this.shadowRoot.querySelector('.param-label')) {
            this._render();
        }
    }
    _render() {
        const label       = this.getAttribute('label')       || '';
        const description = this.getAttribute('description') || '';
        const checked     = this.getAttribute('checked')     || 'leger';

        this.shadowRoot.querySelector('.param-label').textContent = label;

        const descEl = this.shadowRoot.querySelector('.param-description');
        descEl.textContent = description;
        descEl.hidden = !description;

        const group = this.shadowRoot.querySelector('.stage-group');
        group.innerHTML = STAGES.map(s => `
            <label class="stage-option ${checked === s.value ? 'selected' : ''}"
                   style="--stage-color: ${s.color}; --stage-bg: ${s.bg};">
                <input type="radio" name="stage-${this._uid()}" value="${s.value}"
                    ${checked === s.value ? 'checked' : ''}>
                <span class="stage-dot"></span>
                <span class="stage-text">
                    <span class="stage-name">${s.name}</span>
                    <span class="stage-desc">${s.desc}</span>
                </span>
            </label>
        `).join('');

        group.querySelectorAll('input').forEach(input => {
            input.addEventListener('change', () => {
                group.querySelectorAll('.stage-option').forEach(opt => opt.classList.remove('selected'));
                input.closest('.stage-option').classList.add('selected'); 
    
                this.dispatchEvent(new CustomEvent('change', {
                    bubbles: true, composed: true,
                    detail: { value: input.value }
                }));
            });
        });
    }
    _uid() {
        return this._id || (this._id = Math.random().toString(36).slice(2, 7));
    }
    getSelected() {
        const input = this.shadowRoot.querySelector('input:checked');
        return input ? input.value : null;
    }
}
customElements.define('param-stage', ParamStage);

// ─── Utilitaire ───────────────────────────────────────────────────────────────

function sauvegarder() {
    const toast = document.getElementById('toast');
    toast.classList.add('visible');
    setTimeout(() => {
        toast.classList.remove('visible');
    }, 2500);
}