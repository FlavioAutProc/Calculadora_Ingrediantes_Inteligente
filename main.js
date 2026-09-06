// ============================================================
// DADOS DAS RECEITAS
// Cada receita tem uma lista de ingredientes e um "baseIngredient":
// o ingrediente usado como referência para calcular a proporção
// de todos os outros (regra: ratio = quantidade_desejada / quantidade_base_original;
// cada ingrediente é multiplicado por esse ratio). Essa regra é genérica:
// funciona igual para uma receita com 6 ingredientes ou para o Panetone,
// que tem só 2 (farinha + pasta base).
// ============================================================
const breadRecipes = {
    pao_frances: {
        id: "pao_frances",
        name: "Massa Pão Francês",
        category: "Pães",
        favorite: true,
        icon: "fas fa-bread-slice",
        color: "#A5481C",
        ingredients: [
            { name: "Farinha de trigo", originalAmount: 25, unit: "kg" },
            { name: "Melhorador", originalAmount: 250, unit: "g" },
            { name: "Fermento", originalAmount: 150, unit: "g" },
            { name: "Sal", originalAmount: 500, unit: "g" },
            { name: "Açúcar", originalAmount: 250, unit: "g" },
            { name: "Margarina", originalAmount: 400, unit: "g" }
        ],
        baseIngredient: "Farinha de trigo"
    },
    pao_doce: {
        id: "pao_doce",
        name: "Massa Pão Doce",
        category: "Pães",
        favorite: false,
        icon: "fas fa-cookie-bite",
        color: "#C4922E",
        ingredients: [
            { name: "Farinha de trigo", originalAmount: 30, unit: "kg" },
            { name: "Melhorador", originalAmount: 300, unit: "g" },
            { name: "Leite em pó", originalAmount: 600, unit: "g" },
            { name: "Sal", originalAmount: 350, unit: "g" },
            { name: "Açúcar", originalAmount: 5, unit: "kg" },
            { name: "Margarina", originalAmount: 1.500, unit: "kg" },
            { name: "Ovos", originalAmount: 3, unit: "kg" },
            { name: "Fermento", originalAmount: 300, unit: "g" }
        ],
        baseIngredient: "Farinha de trigo"
    },
    regalia_integral: {
        id: "regalia_integral",
        name: "Massa Integral",
        category: "Especiais",
        favorite: true,
        icon: "fas fa-seedling",
        color: "#5B7A43",
        ingredients: [
            { name: "Farinha de trigo", originalAmount: 5, unit: "kg" },
            { name: "Farinha de trigo integral", originalAmount: 5, unit: "kg" },
            { name: "Sal", originalAmount: 50, unit: "g" },
            { name: "Melhorador", originalAmount: 10, unit: "g" },
            { name: "Esponja de francês", originalAmount: 2, unit: "kg" }
        ],
        baseIngredient: "Farinha de trigo"
    },
    bolacha_sete_capas: {
        id: "bolacha_sete_capas",
        name: "Bolacha 7 Capas",
        category: "Bolachas",
        favorite: false,
        icon: "fas fa-cookie",
        color: "#A63B2E",
        ingredients: [
            { name: "Açúcar", originalAmount: 1.5, unit: "kg" },
            { name: "Sal", originalAmount: 200, unit: "g" },
            { name: "Coco Ralado", originalAmount: 4, unit: "un" },
            { name: "Leite", originalAmount: 3, unit: "litros" },
            { name: "Leite em pó", originalAmount: 200, unit: "g" },
            // Corrigido: estava "200 kg" no arquivo original (dado impossível
            // para uma receita de 10kg de farinha). Ajustado para 200g,
            // proporcional às demais receitas da mesma escala.
            { name: "Margarina", originalAmount: 200, unit: "g" },
            { name: "Farinha", originalAmount: 10, unit: "kg" }
        ],
        baseIngredient: "Farinha"
    },
    cacetinho_rosquinha: {
        id: "cacetinho_rosquinha",
        name: "Cacetinho & Rosquinha",
        category: "Pães",
        favorite: true,
        icon: "fas fa-bread-slice",
        color: "#8b5cf6",
        ingredients: [
            { name: "Sal", originalAmount: 100, unit: "g" },
            { name: "Açúcar", originalAmount: 50, unit: "g" },
            { name: "Fermento", originalAmount: 40, unit: "g" },
            { name: "Margarina", originalAmount: 300, unit: "g" },
            // Corrigido: unidades "unidade" e "litro" não batiam com as strings
            // que formatQuantity() reconhece ("un" e "litros"/"L"), então a
            // formatação de saída caía no caso genérico e exibia valores errados
            // (ex: "1.000" em vez de "1").
            { name: "Coco ralado", originalAmount: 1, unit: "un" },
            { name: "Leite de coco", originalAmount: 1.5, unit: "litros" },
            { name: "Farinha", originalAmount: 5, unit: "kg" }
        ],
        baseIngredient: "Farinha"
    },
    ragalia: {
        id: "ragalia",
        name: "Massa Ragalia",
        category: "Especiais",
        favorite: false,
        icon: "fas fa-bread-slice",
        color: "#3E6E80",
        ingredients: [
            { name: "Farinha", originalAmount: 10, unit: "kg" },
            { name: "Sal", originalAmount: 200, unit: "g" },
            { name: "Óleo", originalAmount: 800, unit: "g" },
            { name: "Fermento", originalAmount: 10, unit: "g" },
            { name: "Esponja de francês", originalAmount: 2, unit: "kg" }
        ],
        baseIngredient: "Farinha"
    },
    // Receita adicionada: Panetone. Base = 6.300kg de farinha de trigo para
    // 2.300kg de pasta base para panetone. A proporcionalidade (ratio) é
    // calculada automaticamente pelo mesmo motor usado nas demais receitas.
    panetone: {
        id: "panetone",
        name: "Panetone",
        category: "Panetone",
        favorite: true,
        icon: "fas fa-gift",
        color: "#C4922E",
        ingredients: [
            { name: "Farinha de trigo", originalAmount: 6.300, unit: "kg" },
            { name: "Pasta base para panetone", originalAmount: 2.300, unit: "kg" }
        ],
        baseIngredient: "Farinha de trigo"
    }
};

// Ordem preferida de exibição das categorias no seletor e nos filtros.
// Qualquer categoria fora dessa lista (ex: uma nova categoria de receita
// personalizada) é adicionada ao final automaticamente — nada some do app.
const CATEGORY_ORDER = ["Pães", "Especiais", "Bolachas", "Panetone", "Personalizada"];

// ============================================================
// ESTADO DA APLICAÇÃO
// ============================================================
let currentRecipe = null;
let customRecipes = JSON.parse(localStorage.getItem('customRecipes')) || {};
let savedRecipes = JSON.parse(localStorage.getItem('savedRecipes')) || {};
let recentCalculations = JSON.parse(localStorage.getItem('recentCalculations')) || [];
let currentCalculatedRecipe = null;
let currentViewRecipe = null;
let currentFilter = 'all';
let searchQuery = '';

// ============================================================
// ELEMENTOS DOM
// ============================================================
const recipeSelect = document.getElementById('recipe-select');
const flourInput = document.getElementById('flour-input');
const flourLabel = document.getElementById('flour-label');
const calculateBtn = document.getElementById('calculate-btn');
const resultModal = document.getElementById('result-modal');
const modalRecipeTitle = document.getElementById('modal-recipe-title');
const modalIngredientsBody = document.getElementById('modal-ingredients-body');
const printBtn = document.getElementById('print-btn');
const shareBtn = document.getElementById('share-btn');
const saveCustomBtn = document.getElementById('save-custom-btn');
const closeModalBtns = document.querySelectorAll('.modal-close');
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toast-message');
const recipesGrid = document.getElementById('recipes-grid');
const savedRecipesGrid = document.getElementById('saved-recipes-grid');
const bottomNavItems = document.querySelectorAll('.bottom-nav-item[data-tab]');
const calculatorSection = document.getElementById('calculator-section');
const recipesSection = document.getElementById('recipes-section');
const savedSection = document.getElementById('saved-section');
const editModal = document.getElementById('edit-modal');
const editRecipeName = document.getElementById('edit-recipe-name');
const editIngredientsList = document.getElementById('edit-ingredients-list');
const baseIngredientSelect = document.getElementById('base-ingredient');
const saveRecipeBtn = document.getElementById('save-recipe-btn');
const ingredientNameInput = document.getElementById('ingredient-name');
const ingredientAmountInput = document.getElementById('ingredient-amount');
const ingredientUnitSelect = document.getElementById('ingredient-unit');
const addIngredientBtn = document.getElementById('add-ingredient');
const editModalTitle = document.getElementById('edit-modal-title');
const viewModal = document.getElementById('view-modal');
const viewModalTitle = document.getElementById('view-modal-title');
const viewIngredientsList = document.getElementById('view-ingredients-list');
const editRecipeBtn = document.getElementById('edit-recipe-btn');
const favoriteRecipeBtn = document.getElementById('favorite-recipe-btn');
const duplicateRecipeBtn = document.getElementById('duplicate-recipe-btn');
const cancelEditBtn = document.getElementById('cancel-edit-btn');
const deleteRecipeBtn = document.getElementById('delete-recipe-btn');
const totalCount = document.getElementById('total-count');
const savedCount = document.getElementById('saved-count');
const recentCalculationsEl = document.getElementById('recent-calculations');
const clearHistoryBtn = document.getElementById('clear-history');
const searchBtn = document.getElementById('search-btn');
const searchBar = document.getElementById('search-bar');
const searchInput = document.getElementById('search-input');
const clearSearchBtn = document.getElementById('clear-search');
const addRecipeBtn = document.getElementById('add-recipe-btn');
const settingsBtn = document.getElementById('settings-btn');
const settingsNavBtn = document.getElementById('settings-nav-btn');
const settingsModal = document.getElementById('settings-modal');
const generatePdfBtn = document.getElementById('generate-pdf-btn');
const exportDataBtn = document.getElementById('export-data-btn');
const importDataBtn = document.getElementById('import-data-btn');
const importFile = document.getElementById('import-file');
const clearAllBtn = document.getElementById('clear-all-btn');
const loadingOverlay = document.getElementById('loading');
const bulkModal = document.getElementById('bulk-modal');
const bulkAddBtn = document.getElementById('bulk-add-btn');
const bulkIngredients = document.getElementById('bulk-ingredients');
const processBulkBtn = document.getElementById('process-bulk-btn');
const bulkModalClose = document.querySelector('.bulk-modal-close');
const calculatorHelpBtn = document.getElementById('calculator-help');
const editRecipeCategory = document.getElementById('edit-recipe-category');
const filtersRow = document.getElementById('filters-row');
const baseInfo = document.getElementById('base-info');
const dateInfo = document.getElementById('date-info');
const appHeader = document.getElementById('app-header');
const previewComposition = document.getElementById('preview-composition');
const resultComposition = document.getElementById('result-composition');

const bakerTips = [
    "Sempre pese seus ingredientes com precisão para resultados consistentes.",
    "A temperatura da água influencia diretamente na fermentação.",
    "Deixe a massa descansar coberta para desenvolver melhor o glúten.",
    "Use farinha de boa qualidade para obter melhores resultados.",
    "Controle a temperatura do ambiente durante a fermentação.",
    "Mantenha seus utensílios sempre limpos e secos.",
    "Registre suas observações para aprimorar as receitas.",
    "Ajuste a hidratação conforme a umidade do ambiente.",
    "Respeite os tempos de fermentação para um pão perfeito.",
    "Use prefermentos para desenvolver mais sabor."
];

// ============================================================
// INICIALIZAÇÃO
// ============================================================
document.addEventListener('DOMContentLoaded', function () {
    initApp();
    setupEventListeners();
    setupReveal();
    updateBakerTip();
});

function initApp() {
    populateRecipeSelect();
    renderFilterChips();
    loadRecipes();
    loadRecentCalculations();
    updateCounts();
    updateSavedCount();
    updatePreviewComposition();
}

function setupReveal() {
    if (typeof IntersectionObserver === 'undefined') {
        document.querySelectorAll('.card').forEach(card => card.classList.add('reveal-in'));
        return;
    }
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-in');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.card').forEach(card => observer.observe(card));
}

function getAllRecipes() {
    return [...Object.values(breadRecipes), ...Object.values(customRecipes)];
}

// Agrupa por categoria de forma dinâmica: nenhuma categoria fica de fora
// (o bug original só reconhecia 3 categorias fixas e descartava o resto).
function groupByCategory(recipes) {
    const groups = {};
    recipes.forEach(recipe => {
        const cat = recipe.category || 'Outros';
        if (!groups[cat]) groups[cat] = [];
        groups[cat].push(recipe);
    });
    return groups;
}

function orderedCategories(groups) {
    const known = CATEGORY_ORDER.filter(c => groups[c]);
    const extra = Object.keys(groups).filter(c => !CATEGORY_ORDER.includes(c)).sort();
    return [...known, ...extra];
}

function populateRecipeSelect() {
    recipeSelect.innerHTML = '<option value="">-- Selecione uma receita --</option>';
    const groups = groupByCategory(getAllRecipes());

    orderedCategories(groups).forEach(category => {
        const optgroup = document.createElement('optgroup');
        optgroup.label = category;
        groups[category]
            .slice()
            .sort((a, b) => a.name.localeCompare(b.name))
            .forEach(recipe => {
                const option = document.createElement('option');
                option.value = recipe.id;
                option.textContent = recipe.name + (customRecipes[recipe.id] ? ' ★' : '');
                optgroup.appendChild(option);
            });
        recipeSelect.appendChild(optgroup);
    });
}

function renderFilterChips() {
    const groups = groupByCategory(getAllRecipes());
    const categories = orderedCategories(groups);
    const chips = [
        { filter: 'all', label: 'Todas' },
        { filter: 'favorite', label: '<i class="fas fa-star"></i> Favoritas' },
        ...categories.map(c => ({ filter: 'cat:' + c, label: c })),
        { filter: 'custom', label: 'Personalizadas' }
    ];
    filtersRow.innerHTML = '';
    chips.forEach(chip => {
        const btn = document.createElement('button');
        btn.className = 'filter-btn' + (chip.filter === currentFilter ? ' active' : '');
        btn.dataset.filter = chip.filter;
        btn.innerHTML = chip.label;
        btn.addEventListener('click', function () {
            filtersRow.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentFilter = this.dataset.filter;
            loadRecipes();
        });
        filtersRow.appendChild(btn);
    });
}

function updateCounts() {
    const total = Object.keys(breadRecipes).length + Object.keys(customRecipes).length;
    totalCount.textContent = `${total} receitas`;
}

function updateSavedCount() {
    savedCount.textContent = `${Object.keys(savedRecipes).length} receitas`;
}

function loadRecipes() {
    recipesGrid.innerHTML = '';
    let list = getAllRecipes().filter(recipe => {
        if (searchQuery) return recipe.name.toLowerCase().includes(searchQuery.toLowerCase());
        return true;
    });

    if (currentFilter === 'original') {
        list = list.filter(r => breadRecipes[r.id]);
    } else if (currentFilter === 'custom') {
        list = list.filter(r => customRecipes[r.id]);
    } else if (currentFilter === 'favorite') {
        list = list.filter(r => r.favorite || savedRecipes[r.id]);
    } else if (currentFilter.startsWith('cat:')) {
        const cat = currentFilter.slice(4);
        list = list.filter(r => (r.category || 'Outros') === cat);
    }

    if (list.length === 0) {
        recipesGrid.innerHTML = `
            <div style="grid-column: 1 / -1;">
                <div class="empty-state">
                    <i class="fas fa-magnifying-glass"></i>
                    <p>${searchQuery ? 'Nenhuma receita encontrada' : 'Nenhuma receita disponível'}</p>
                    ${searchQuery ? '' : `<button class="btn btn-outline btn-sm" style="margin-top:12px;" onclick="showCreateRecipeModal()"><i class="fas fa-plus"></i> Criar receita</button>`}
                </div>
            </div>`;
        return;
    }

    list.sort((a, b) => a.name.localeCompare(b.name));
    list.forEach(recipe => {
        const isCustom = customRecipes[recipe.id] !== undefined;
        recipesGrid.appendChild(createRecipeCard(recipe, isCustom));
    });
}

function loadSavedRecipes() {
    savedRecipesGrid.innerHTML = '';
    if (Object.keys(savedRecipes).length === 0) {
        savedRecipesGrid.innerHTML = `
            <div style="grid-column: 1 / -1;">
                <div class="empty-state">
                    <i class="fas fa-star"></i>
                    <p>Nenhuma receita salva</p>
                    <p style="font-size:.82rem;color:var(--ink-faint);">Toque na estrela de uma receita para salvar</p>
                </div>
            </div>`;
        return;
    }
    Object.values(savedRecipes).forEach(recipe => {
        const isCustom = customRecipes[recipe.id] !== undefined;
        savedRecipesGrid.appendChild(createRecipeCard(recipe, isCustom, true));
    });
    updateSavedCount();
}

function createRecipeCard(recipe, isCustom = false, isSaved = false) {
    const card = document.createElement('div');
    card.className = `recipe-card ${recipe.favorite || savedRecipes[recipe.id] ? 'favorite' : ''}`;
    card.dataset.id = recipe.id;
    card.dataset.custom = isCustom;

    const icon = recipe.icon || 'fas fa-bread-slice';
    const color = recipe.color || '#A5481C';

    card.innerHTML = `
        <div class="recipe-icon" style="background:${color}"><i class="${icon}"></i></div>
        <div class="recipe-actions">
            <button class="btn-icon btn-sm" style="width:32px;height:32px;background:transparent;" onclick="toggleFavorite('${recipe.id}', ${isCustom}, event)">
                <i class="fas fa-star" style="color:${recipe.favorite || savedRecipes[recipe.id] ? 'var(--wheat)' : 'var(--ink-faint)'}"></i>
            </button>
        </div>
        <div class="recipe-name">${recipe.name}</div>
        <div class="recipe-meta"><i class="fas fa-list"></i> ${recipe.ingredients.length} ingred.${isCustom ? ' <i class="fas fa-user-pen"></i>' : ''}</div>
    `;

    card.addEventListener('click', (e) => {
        if (!e.target.closest('.recipe-actions')) showViewModal(recipe, isSaved ? isCustom : isCustom);
    });
    return card;
}

// ============================================================
// EDIÇÃO INLINE DE INGREDIENTES
// ============================================================
function editIngredient(el) {
    const name = el.querySelector('.ingredient-name').textContent;
    const [amount, unit] = el.querySelector('.ingredient-details span').textContent.split(' ');
    el.innerHTML = `
        <div class="ingredient-input-row" style="width:100%;margin-bottom:0;">
            <input type="text" value="${name}" class="edit-ingredient-name">
            <input type="number" value="${amount}" step="0.001" class="edit-ingredient-amount">
            <div class="select-wrapper">
                <select class="edit-ingredient-unit">
                    <option value="kg" ${unit === 'kg' ? 'selected' : ''}>kg</option>
                    <option value="g" ${unit === 'g' ? 'selected' : ''}>g</option>
                    <option value="un" ${unit === 'un' ? 'selected' : ''}>un</option>
                    <option value="litros" ${(unit === 'litros' || unit === 'L') ? 'selected' : ''}>L</option>
                    <option value="ml" ${unit === 'ml' ? 'selected' : ''}>ml</option>
                </select>
            </div>
            <button class="btn btn-success btn-icon save-edit-ingredient"><i class="fas fa-check"></i></button>
            <button class="btn btn-secondary btn-icon cancel-edit-ingredient"><i class="fas fa-xmark"></i></button>
        </div>`;
    el.querySelector('.save-edit-ingredient').addEventListener('click', () => saveIngredientEdit(el));
    el.querySelector('.cancel-edit-ingredient').addEventListener('click', () => updateBaseIngredientSelect());
}

function removeIngredient(el) {
    el.remove();
    updateBaseIngredientSelect();
}

function saveIngredientEdit(el) {
    const name = el.querySelector('.edit-ingredient-name').value.trim();
    const amount = el.querySelector('.edit-ingredient-amount').value;
    const unit = el.querySelector('.edit-ingredient-unit').value;
    if (!name || !amount) { showToast('Preencha todos os campos', 'error'); return; }

    el.innerHTML = `
        <div class="ingredient-info">
            <div class="ingredient-name">${name}</div>
            <div class="ingredient-details"><span>${amount} ${unit}</span></div>
        </div>
        <div class="ingredient-actions">
            <button class="btn-icon btn-sm btn-primary edit-ingredient-btn"><i class="fas fa-pen"></i></button>
            <button class="btn-icon btn-sm btn-danger remove-ingredient-btn"><i class="fas fa-trash"></i></button>
        </div>`;
    el.querySelector('.edit-ingredient-btn').addEventListener('click', () => editIngredient(el));
    el.querySelector('.remove-ingredient-btn').addEventListener('click', () => removeIngredient(el));
    updateBaseIngredientSelect();
}

// ============================================================
// COMPOSIÇÃO / PROPORÇÃO (elemento central da regra de proporcionalidade)
// Converte cada ingrediente para gramas (aproximando 1L ≈ 1000g para
// líquidos de padaria) e mostra: ingrediente base vs. soma dos demais.
// Itens em "un" não têm peso e são ignorados no cálculo da barra.
// ============================================================
function toGrams(amount, unit) {
    switch (unit) {
        case 'kg': return amount * 1000;
        case 'g': return amount;
        case 'litros': case 'L': return amount * 1000;
        case 'ml': return amount;
        default: return null; // un, colheres, xícaras etc. — não convertível
    }
}

function computeComposition(recipe) {
    const baseIng = recipe.ingredients.find(i => i.name === recipe.baseIngredient);
    if (!baseIng) return null;
    const baseGrams = toGrams(baseIng.originalAmount, baseIng.unit);
    if (baseGrams === null) return null;

    let restGrams = 0;
    let skipped = false;
    recipe.ingredients.forEach(ing => {
        if (ing.name === recipe.baseIngredient) return;
        const g = toGrams(ing.originalAmount, ing.unit);
        if (g === null) { skipped = true; return; }
        restGrams += g;
    });

    const total = baseGrams + restGrams;
    if (total <= 0) return null;
    return {
        baseLabel: recipe.baseIngredient,
        basePct: (baseGrams / total) * 100,
        restPct: (restGrams / total) * 100,
        baseGrams, restGrams, skipped
    };
}

function gramsToDisplay(g) {
    if (g >= 1000) return (g / 1000).toFixed(3).replace(/\.?0+$/, '') + ' kg';
    return Math.round(g) + ' g';
}

function renderCompositionInto(container, comp, { scale = 1 } = {}) {
    if (!comp) { container.style.display = 'none'; return; }
    container.style.display = 'block';
    const baseEl = container.querySelector('.seg.base');
    const restEl = container.querySelector('.seg.rest');
    const legendBase = container.querySelector('[id$="legend-base"]');
    const legendRest = container.querySelector('[id$="legend-rest"]');

    baseEl.style.width = comp.basePct + '%';
    restEl.style.width = comp.restPct + '%';
    legendBase.innerHTML = `${comp.baseLabel} <strong>${comp.basePct.toFixed(1)}%</strong>${scale !== 1 ? ` · ${gramsToDisplay(comp.baseGrams * scale)}` : ''}`;
    legendRest.innerHTML = `Demais ingredientes${comp.skipped ? '*' : ''} <strong>${comp.restPct.toFixed(1)}%</strong>${scale !== 1 ? ` · ${gramsToDisplay(comp.restGrams * scale)}` : ''}`;
}

function updatePreviewComposition() {
    const recipeId = recipeSelect.value;
    const recipe = recipeId ? (breadRecipes[recipeId] || customRecipes[recipeId]) : null;
    const comp = recipe ? computeComposition(recipe) : null;
    renderCompositionInto(previewComposition, comp);
}

// ============================================================
// CÁLCULO PRINCIPAL — a regra de proporcionalidade
// ============================================================
function calculateRecipe() {
    const recipeId = recipeSelect.value;
    const desiredAmount = parseFloat(flourInput.value);

    if (!recipeId) { showToast('Selecione uma receita', 'error'); recipeSelect.focus(); return; }
    if (isNaN(desiredAmount) || desiredAmount <= 0) { showToast('Digite uma quantidade válida', 'error'); flourInput.focus(); return; }

    const recipe = breadRecipes[recipeId] || customRecipes[recipeId];
    if (!recipe) { showToast('Receita não encontrada', 'error'); return; }
    currentRecipe = recipe;

    const baseIng = recipe.ingredients.find(ing => ing.name === recipe.baseIngredient);
    if (!baseIng) { showToast('Ingrediente base não encontrado', 'error'); return; }

    // Regra de proporcionalidade: todo ingrediente escala pela mesma razão
    // entre a quantidade desejada e a quantidade original do ingrediente base.
    const ratio = desiredAmount / baseIng.originalAmount;
    const calculatedIngredients = recipe.ingredients.map(ing => ({
        name: ing.name,
        amount: ing.originalAmount * ratio,
        unit: ing.unit
    }));

    currentCalculatedRecipe = {
        id: 'calc_' + Date.now(),
        name: recipe.name,
        ingredients: calculatedIngredients,
        flourAmount: desiredAmount,
        baseIngredientName: recipe.baseIngredient,
        originalRecipeId: recipe.id,
        ratio,
        date: new Date().toLocaleDateString('pt-BR'),
        time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    };

    saveToRecentCalculations(currentCalculatedRecipe);
    showResultsModal(currentCalculatedRecipe);
}

function saveToRecentCalculations(calculation) {
    recentCalculations = recentCalculations.filter(c => c.originalRecipeId !== calculation.originalRecipeId);
    recentCalculations.unshift(calculation);
    if (recentCalculations.length > 10) recentCalculations.pop();
    localStorage.setItem('recentCalculations', JSON.stringify(recentCalculations));
    loadRecentCalculations();
}

function loadRecentCalculations() {
    recentCalculationsEl.innerHTML = '';
    if (recentCalculations.length === 0) {
        recentCalculationsEl.innerHTML = `<div class="empty-state"><i class="fas fa-clock"></i><p>Nenhum cálculo recente</p></div>`;
        return;
    }
    recentCalculations.slice(0, 3).forEach(calc => {
        const el = document.createElement('div');
        el.className = 'ingredient-item';
        el.innerHTML = `
            <div class="ingredient-info">
                <div class="ingredient-name">${calc.name}</div>
                <div class="ingredient-details"><span>${calc.flourAmount}kg de ${calc.baseIngredientName || 'base'}</span><span>${calc.date}</span></div>
            </div>
            <button class="btn btn-icon btn-sm" style="background:var(--surface);" onclick="loadRecentCalculation('${calc.id}')"><i class="fas fa-rotate-right"></i></button>`;
        recentCalculationsEl.appendChild(el);
    });
}

function clearRecentCalculations() {
    if (recentCalculations.length === 0) { showToast('Nenhum cálculo para limpar', 'info'); return; }
    if (confirm('Limpar todo o histórico de cálculos?')) {
        recentCalculations = [];
        localStorage.setItem('recentCalculations', JSON.stringify(recentCalculations));
        loadRecentCalculations();
        showToast('Histórico limpo', 'success');
    }
}

function loadRecentCalculation(calcId) {
    const calc = recentCalculations.find(c => c.id === calcId);
    if (calc) {
        recipeSelect.value = calc.originalRecipeId;
        flourInput.value = calc.flourAmount;
        updatePreviewComposition();
        updateFlourLabel();
        calculateRecipe();
    }
}

function showResultsModal(recipe) {
    modalRecipeTitle.innerHTML = `<i class="fas fa-calculator"></i> ${recipe.name}`;
    modalIngredientsBody.innerHTML = '';
    baseInfo.textContent = `${recipe.flourAmount}kg de ${recipe.baseIngredientName}`;
    dateInfo.textContent = `${recipe.date} às ${recipe.time}`;

    recipe.ingredients.forEach(ing => {
        const row = document.createElement('tr');
        const d = formatQuantity(ing.amount, ing.unit);
        row.innerHTML = `<td>${ing.name}</td><td>${d.value}</td><td>${d.unit}</td>`;
        modalIngredientsBody.appendChild(row);
    });

    const comp = currentRecipe ? computeComposition(currentRecipe) : null;
    renderCompositionInto(resultComposition, comp, { scale: recipe.ratio });

    resultModal.classList.add('active');
}

function formatQuantity(amount, unit) {
    let formattedAmount = amount, formattedUnit = unit;
    switch (unit) {
        case 'g':
            if (amount >= 1000) { formattedAmount = (amount / 1000).toFixed(3); formattedUnit = 'kg'; }
            else formattedAmount = amount.toFixed(0);
            break;
        case 'kg':
            if (amount < 1) { formattedAmount = (amount * 1000).toFixed(0); formattedUnit = 'g'; }
            else formattedAmount = amount.toFixed(3);
            break;
        case 'litros': case 'L':
            if (amount < 1) { formattedAmount = (amount * 1000).toFixed(0); formattedUnit = 'ml'; }
            else formattedAmount = amount.toFixed(3);
            break;
        case 'un':
            formattedAmount = Math.round(amount * 10) / 10;
            break;
        default:
            formattedAmount = amount.toFixed(3);
    }
    formattedAmount = parseFloat(formattedAmount).toString();
    return { value: formattedAmount, unit: formattedUnit };
}

// ============================================================
// VISUALIZAÇÃO / EDIÇÃO DE RECEITAS
// ============================================================
function showViewModal(recipe, isCustom = false) {
    currentViewRecipe = recipe;
    viewModalTitle.innerHTML = `<i class="${recipe.icon || 'fas fa-book-open'}"></i> ${recipe.name}`;
    viewIngredientsList.innerHTML = '';
    document.getElementById('view-recipe-type').textContent = recipe.category || 'Personalizada';
    document.getElementById('view-ingredients-count').textContent = `${recipe.ingredients.length} ingredientes`;

    recipe.ingredients.forEach(ing => {
        const item = document.createElement('div');
        item.className = 'ingredient-item';
        item.innerHTML = `
            <div class="ingredient-info">
                <div class="ingredient-name">${ing.name}${ing.name === recipe.baseIngredient ? ' <i class="fas fa-scale-balanced" style="color:var(--crust);font-size:.75rem;" title="Ingrediente base"></i>' : ''}</div>
                <div class="ingredient-details"><span>${ing.originalAmount} ${ing.unit}</span></div>
            </div>`;
        viewIngredientsList.appendChild(item);
    });

    const isSaved = savedRecipes[recipe.id];
    favoriteRecipeBtn.innerHTML = isSaved ? '<i class="fas fa-star"></i> Remover dos favoritos' : '<i class="fas fa-star"></i> Favoritar';
    viewModal.dataset.recipeId = recipe.id;
    viewModal.dataset.isCustom = isCustom;
    viewModal.classList.add('active');
}

function toggleFavorite(recipeId, isCustom = false, event = null) {
    if (event) { event.stopPropagation(); event.preventDefault(); }
    const recipe = isCustom ? customRecipes[recipeId] : breadRecipes[recipeId];
    if (!recipe) return;

    if (savedRecipes[recipeId]) {
        delete savedRecipes[recipeId];
        showToast('Removida dos favoritos', 'warning');
    } else {
        savedRecipes[recipeId] = { ...recipe, isCustom };
        showToast('Adicionada aos favoritos!', 'success');
    }
    localStorage.setItem('savedRecipes', JSON.stringify(savedRecipes));
    loadSavedRecipes();

    if (viewModal.classList.contains('active')) {
        const isSaved = savedRecipes[recipeId];
        favoriteRecipeBtn.innerHTML = isSaved ? '<i class="fas fa-star"></i> Remover dos favoritos' : '<i class="fas fa-star"></i> Favoritar';
    }
    if (currentFilter === 'favorite') loadRecipes();
}

function duplicateRecipe() {
    const recipeId = viewModal.dataset.recipeId;
    const isCustom = viewModal.dataset.isCustom === 'true';
    const recipe = isCustom ? customRecipes[recipeId] : breadRecipes[recipeId];
    if (!recipe) return;

    const newId = 'custom_' + Date.now();
    customRecipes[newId] = { ...recipe, id: newId, name: `${recipe.name} (Cópia)`, favorite: false };
    localStorage.setItem('customRecipes', JSON.stringify(customRecipes));

    showToast('Receita duplicada!', 'success');
    viewModal.classList.remove('active');
    loadRecipes(); populateRecipeSelect(); renderFilterChips(); updateCounts();
}

function saveCustomRecipe() {
    if (!currentCalculatedRecipe) return;
    const recipeId = 'custom_' + Date.now();
    customRecipes[recipeId] = {
        id: recipeId,
        name: `${currentCalculatedRecipe.name} (Personalizada)`,
        category: 'Personalizada',
        icon: 'fas fa-star',
        color: '#C4922E',
        ingredients: currentCalculatedRecipe.ingredients.map(ing => ({ name: ing.name, originalAmount: ing.amount, unit: ing.unit })),
        baseIngredient: currentRecipe.baseIngredient,
        favorite: false
    };
    localStorage.setItem('customRecipes', JSON.stringify(customRecipes));
    showToast('Receita personalizada salva!', 'success');
    loadRecipes(); populateRecipeSelect(); renderFilterChips(); updateCounts();
    resultModal.classList.remove('active');
}

function printRecipe() {
    const c = currentCalculatedRecipe;
    const printContent = `<!DOCTYPE html><html><head><title>${c.name}</title><style>
        body{font-family:Arial,sans-serif;padding:20px;max-width:800px;margin:0 auto;color:#241811}
        .header{text-align:center;margin-bottom:30px;border-bottom:2px solid #A5481C;padding-bottom:20px}
        h1{margin-bottom:10px} .recipe-info{display:flex;justify-content:space-between;margin-bottom:20px;color:#666}
        table{width:100%;border-collapse:collapse;margin:20px 0} th,td{padding:12px;text-align:left;border-bottom:1px solid #ddd}
        th{background:#F1E9D9;font-weight:bold;color:#A5481C} .footer{margin-top:30px;text-align:center;color:#666;font-size:.9em;border-top:1px solid #eee;padding-top:20px}
        @media print{body{padding:0}.no-print{display:none}}</style></head><body>
        <div class="header"><h1>${c.name}</h1><p>Receita calculada</p></div>
        <div class="recipe-info"><div>Data: ${c.date}</div><div>Hora: ${c.time}</div><div>Base: ${c.flourAmount}kg de ${c.baseIngredientName}</div></div>
        <table><thead><tr><th>Ingrediente</th><th>Quantidade</th><th>Unidade</th></tr></thead><tbody>
        ${c.ingredients.map(ing => { const f = formatQuantity(ing.amount, ing.unit); return `<tr><td>${ing.name}</td><td>${f.value}</td><td>${f.unit}</td></tr>`; }).join('')}
        </tbody></table><div class="footer"><p>Gerado em ${new Date().toLocaleDateString('pt-BR')}</p></div></body></html>`;

    const printWindow = window.open('', '_blank');
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => { printWindow.print(); printWindow.close(); }, 250);
}

function shareRecipe() {
    if (!currentCalculatedRecipe) return;
    const c = currentCalculatedRecipe;
    const text = `${c.name}\n\n` + c.ingredients.map(ing => { const f = formatQuantity(ing.amount, ing.unit); return `${ing.name}: ${f.value} ${f.unit}`; }).join('\n');
    if (navigator.share) {
        navigator.share({ title: c.name, text }).then(() => showToast('Receita compartilhada!', 'success'))
            .catch(err => { if (err.name !== 'AbortError') fallbackCopy(text); });
    } else {
        fallbackCopy(text);
    }
}
function fallbackCopy(text) {
    navigator.clipboard.writeText(text).then(() => showToast('Receita copiada!', 'success')).catch(() => showToast('Erro ao copiar receita', 'error'));
}

function openEditModal(recipeId, isCustom) {
    let recipe;
    if (!isCustom) { recipe = breadRecipes[recipeId]; editModalTitle.textContent = 'Editar receita'; }
    else { recipe = customRecipes[recipeId]; editModalTitle.textContent = recipeId === 'new' ? 'Criar nova receita' : 'Editar receita'; }
    if (!recipe && recipeId !== 'new') return;

    editRecipeName.value = recipe ? recipe.name : '';
    editRecipeCategory.value = recipe ? recipe.category : 'Personalizada';
    editIngredientsList.innerHTML = '';
    if (recipe) recipe.ingredients.forEach(ing => addIngredientToEditList(ing.name, ing.originalAmount, ing.unit));
    updateBaseIngredientSelect();
    if (recipe) baseIngredientSelect.value = recipe.baseIngredient;

    editModal.dataset.recipeId = recipeId;
    editModal.dataset.isCustom = isCustom;
    editModal.classList.add('active');
    setTimeout(() => editRecipeName.focus(), 300);
}

function addIngredientToEditList(name, amount, unit) {
    const item = document.createElement('div');
    item.className = 'ingredient-item';
    item.innerHTML = `
        <div class="ingredient-info">
            <div class="ingredient-name">${name}</div>
            <div class="ingredient-details"><span>${amount} ${unit}</span></div>
        </div>
        <div class="ingredient-actions">
            <button class="btn-icon btn-sm btn-primary edit-ingredient-btn"><i class="fas fa-pen"></i></button>
            <button class="btn-icon btn-sm btn-danger remove-ingredient-btn"><i class="fas fa-trash"></i></button>
        </div>`;
    item.querySelector('.edit-ingredient-btn').addEventListener('click', () => editIngredient(item));
    item.querySelector('.remove-ingredient-btn').addEventListener('click', () => removeIngredient(item));
    editIngredientsList.appendChild(item);
}

function updateBaseIngredientSelect() {
    const prev = baseIngredientSelect.value;
    baseIngredientSelect.innerHTML = '<option value="">Selecione um ingrediente</option>';
    const names = Array.from(editIngredientsList.querySelectorAll('.ingredient-item .ingredient-name')).map(s => s.textContent);
    names.forEach(name => {
        const opt = document.createElement('option');
        opt.value = name; opt.textContent = name;
        baseIngredientSelect.appendChild(opt);
    });
    if (names.includes(prev)) baseIngredientSelect.value = prev;
}

function saveEditedRecipe() {
    const recipeId = editModal.dataset.recipeId;
    const isCustom = editModal.dataset.isCustom === 'true';
    const recipeName = editRecipeName.value.trim();
    const recipeCategory = editRecipeCategory.value;
    const baseIngredient = baseIngredientSelect.value;

    if (!recipeName) { showToast('Digite um nome para a receita', 'error'); editRecipeName.focus(); return; }
    if (!baseIngredient) { showToast('Selecione um ingrediente base', 'error'); baseIngredientSelect.focus(); return; }

    const ingredients = [];
    editIngredientsList.querySelectorAll('.ingredient-item').forEach(item => {
        const name = item.querySelector('.ingredient-name').textContent;
        const [amount, unit] = item.querySelector('.ingredient-details span').textContent.split(' ');
        ingredients.push({ name, originalAmount: parseFloat(amount), unit });
    });
    if (ingredients.length === 0) { showToast('Adicione pelo menos um ingrediente', 'error'); return; }

    const newRecipe = {
        id: recipeId === 'new' ? 'custom_' + Date.now() : recipeId,
        name: recipeName, category: recipeCategory,
        icon: 'fas fa-pen', color: '#A5481C',
        ingredients, baseIngredient, favorite: false
    };

    if (recipeId === 'new' || isCustom) {
        customRecipes[newRecipe.id] = newRecipe;
    } else {
        const newId = 'custom_' + Date.now();
        newRecipe.id = newId;
        customRecipes[newId] = newRecipe;
    }
    localStorage.setItem('customRecipes', JSON.stringify(customRecipes));

    showToast('Receita salva com sucesso!', 'success');
    editModal.classList.remove('active');
    viewModal.classList.remove('active');
    loadRecipes(); populateRecipeSelect(); renderFilterChips(); updateCounts();
}

function deleteCurrentRecipe() {
    const recipeId = editModal.dataset.recipeId;
    const isCustom = editModal.dataset.isCustom === 'true';
    if (!isCustom) { showToast('Receitas originais não podem ser excluídas', 'warning'); return; }
    if (!confirm('Tem certeza que deseja excluir esta receita?')) return;

    delete customRecipes[recipeId];
    localStorage.setItem('customRecipes', JSON.stringify(customRecipes));
    showToast('Receita excluída', 'success');
    editModal.classList.remove('active');
    loadRecipes(); populateRecipeSelect(); renderFilterChips(); updateCounts();
}

function addNewIngredient() {
    const name = ingredientNameInput.value.trim();
    const amount = parseFloat(ingredientAmountInput.value);
    const unit = ingredientUnitSelect.value;
    if (!name || isNaN(amount) || amount <= 0) { showToast('Preencha todos os campos do ingrediente', 'error'); return; }

    addIngredientToEditList(name, amount, unit);
    ingredientNameInput.value = ''; ingredientAmountInput.value = ''; ingredientUnitSelect.value = 'kg';
    updateBaseIngredientSelect();
    ingredientNameInput.focus();
}

// ============================================================
// UI HELPERS
// ============================================================
function showToast(message, type = 'info') {
    toastMessage.textContent = message;
    toast.className = `toast ${type}`;
    requestAnimationFrame(() => toast.classList.add('show'));
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => toast.classList.remove('show'), 3000);
}

function showLoading(show = true) { loadingOverlay.classList.toggle('active', show); }

function updateBakerTip() {
    document.getElementById('baker-tip').textContent = bakerTips[Math.floor(Math.random() * bakerTips.length)];
}

function updateFlourLabel() {
    const recipeId = recipeSelect.value;
    const recipe = recipeId ? (breadRecipes[recipeId] || customRecipes[recipeId]) : null;
    const name = recipe ? recipe.baseIngredient : 'farinha';
    flourLabel.innerHTML = `<i class="fas fa-weight-hanging"></i> Quantidade de ${name.toLowerCase()} (kg)`;
}

// ============================================================
// PDF / EXPORT / IMPORT
// ============================================================
async function generatePDF() {
    showLoading(true);
    try {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        let y = 20;
        const pageWidth = doc.internal.pageSize.width;
        const pageHeight = doc.internal.pageSize.height;
        const margin = 20;

        doc.setFontSize(22); doc.setTextColor(165, 72, 28);
        doc.text("Padaria — Receitas", pageWidth / 2, y, { align: 'center' });
        y += 12;
        doc.setFontSize(10); doc.setTextColor(100, 100, 100);
        doc.text(`Gerado em ${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR')}`, pageWidth / 2, y, { align: 'center' });
        y += 18;

        const allRecipes = getAllRecipes();
        doc.setFontSize(16); doc.setTextColor(0, 0, 0);
        doc.text("Índice", margin, y); y += 10;
        doc.setFontSize(10);
        allRecipes.forEach((recipe, i) => {
            const type = customRecipes[recipe.id] ? 'Personalizada' : 'Original';
            doc.text(`${i + 1}. ${recipe.name} (${type})`, margin, y);
            y += 8;
            if (y > pageHeight - 30) { doc.addPage(); y = 20; }
        });

        allRecipes.forEach((recipe, index) => {
            doc.addPage(); y = 20;
            doc.setFontSize(18); doc.setTextColor(165, 72, 28);
            doc.text(`${index + 1}. ${recipe.name}`, margin, y); y += 10;
            doc.setFontSize(10); doc.setTextColor(100, 100, 100);
            const type = customRecipes[recipe.id] ? 'Personalizada' : 'Original';
            doc.text(`Categoria: ${recipe.category || 'Não especificada'} | Tipo: ${type}`, margin, y); y += 15;
            doc.setFontSize(14); doc.setTextColor(0, 0, 0);
            doc.text("Ingredientes:", margin, y); y += 10;
            doc.setFontSize(10);
            recipe.ingredients.forEach(ing => {
                const f = formatQuantity(ing.originalAmount, ing.unit);
                doc.text(`• ${ing.name}: ${f.value} ${f.unit}`, margin, y); y += 8;
                if (y > pageHeight - 30) { doc.addPage(); y = 20; }
            });
            y += 8;
            doc.setFontSize(11); doc.setTextColor(165, 72, 28);
            doc.text(`Ingrediente base para cálculo: ${recipe.baseIngredient}`, margin, y);
        });

        doc.save(`padaria-receitas-${Date.now()}.pdf`);
        showLoading(false);
        showToast('PDF gerado com sucesso!', 'success');
    } catch (error) {
        console.error('Erro ao gerar PDF:', error);
        showLoading(false);
        showToast('Erro ao gerar PDF', 'error');
    }
}

function exportData() {
    const data = { customRecipes, savedRecipes, recentCalculations, exportDate: new Date().toISOString(), version: '2.0.0' };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url; link.download = `padaria-backup-${Date.now()}.json`;
    document.body.appendChild(link); link.click(); document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast('Dados exportados com sucesso!', 'success');
}

function importData() { importFile.click(); }

function handleImportFile(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function (e) {
        try {
            const data = JSON.parse(e.target.result);
            if (confirm('Importar dados? Isso substituirá suas receitas personalizadas atuais.')) {
                if (data.customRecipes) customRecipes = data.customRecipes;
                if (data.savedRecipes) savedRecipes = data.savedRecipes;
                if (data.recentCalculations) recentCalculations = data.recentCalculations;
                localStorage.setItem('customRecipes', JSON.stringify(customRecipes));
                localStorage.setItem('savedRecipes', JSON.stringify(savedRecipes));
                localStorage.setItem('recentCalculations', JSON.stringify(recentCalculations));
                initApp();
                showToast('Dados importados com sucesso!', 'success');
            }
        } catch (error) {
            showToast('Erro ao importar arquivo', 'error');
            console.error('Erro na importação:', error);
        }
    };
    reader.readAsText(file);
    importFile.value = '';
}

function clearAllData() {
    if (confirm('Tem certeza que deseja limpar TODOS os dados? Isso removerá receitas personalizadas, favoritas e histórico.')) {
        customRecipes = {}; savedRecipes = {}; recentCalculations = [];
        localStorage.setItem('customRecipes', JSON.stringify(customRecipes));
        localStorage.setItem('savedRecipes', JSON.stringify(savedRecipes));
        localStorage.setItem('recentCalculations', JSON.stringify(recentCalculations));
        initApp();
        showToast('Todos os dados foram limpos', 'success');
    }
}

function processBulkIngredients() {
    const text = bulkIngredients.value.trim();
    if (!text) { showToast('Digite os ingredientes', 'error'); return; }
    let processedCount = 0;
    text.split('\n').forEach(line => {
        line = line.trim();
        if (!line) return;
        const parts = line.match(/(.+?)\s+([\d,.]+)\s*(kg|g|un|litros?|L|ml|colheres?|xícaras?)?$/i);
        if (parts && parts.length >= 3) {
            const name = parts[1].trim();
            const amount = parseFloat(parts[2].replace(',', '.'));
            const unit = parts[3] ? parts[3].toLowerCase() : 'kg';
            if (name && !isNaN(amount)) { addIngredientToEditList(name, amount, unit); processedCount++; }
        }
    });
    if (processedCount > 0) {
        showToast(`${processedCount} ingredientes adicionados`, 'success');
        updateBaseIngredientSelect();
        bulkModal.classList.remove('active');
        bulkIngredients.value = '';
    } else {
        showToast('Formato inválido. Use: nome quantidade unidade', 'error');
    }
}

// ============================================================
// NAVEGAÇÃO E EVENTOS
// ============================================================
function switchTab(tabName) {
    bottomNavItems.forEach(i => i.classList.toggle('active', i.dataset.tab === tabName));
    calculatorSection.classList.toggle('hidden', tabName !== 'calculator');
    recipesSection.classList.toggle('hidden', tabName !== 'recipes');
    savedSection.classList.toggle('hidden', tabName !== 'saved');
    if (tabName === 'recipes') loadRecipes();
    else if (tabName === 'saved') loadSavedRecipes();
}

function setupEventListeners() {
    bottomNavItems.forEach(item => item.addEventListener('click', function () { switchTab(this.dataset.tab); }));

    calculateBtn.addEventListener('click', calculateRecipe);
    flourInput.addEventListener('keypress', e => { if (e.key === 'Enter') calculateRecipe(); });

    document.querySelectorAll('.quick-action-btn').forEach(button => {
        button.addEventListener('click', function () {
            const multiplier = parseFloat(this.dataset.mult);
            if (!isNaN(multiplier)) {
                const currentValue = parseFloat(flourInput.value) || 1;
                flourInput.value = (currentValue * multiplier).toFixed(2).replace(/\.?0+$/, '');
                this.classList.add('active');
                setTimeout(() => this.classList.remove('active'), 200);
            }
        });
    });

    closeModalBtns.forEach(btn => btn.addEventListener('click', function () { this.closest('.modal-overlay').classList.remove('active'); }));
    document.querySelectorAll('.modal-overlay').forEach(modal => modal.addEventListener('click', function (e) { if (e.target === this) this.classList.remove('active'); }));

    printBtn.addEventListener('click', printRecipe);
    shareBtn.addEventListener('click', shareRecipe);
    saveCustomBtn.addEventListener('click', saveCustomRecipe);

    favoriteRecipeBtn.addEventListener('click', () => toggleFavorite(viewModal.dataset.recipeId, viewModal.dataset.isCustom === 'true'));
    duplicateRecipeBtn.addEventListener('click', duplicateRecipe);

    addIngredientBtn.addEventListener('click', addNewIngredient);
    saveRecipeBtn.addEventListener('click', saveEditedRecipe);
    cancelEditBtn.addEventListener('click', () => editModal.classList.remove('active'));
    deleteRecipeBtn.addEventListener('click', deleteCurrentRecipe);

    ingredientNameInput.addEventListener('keypress', e => { if (e.key === 'Enter') { e.preventDefault(); ingredientAmountInput.focus(); } });
    ingredientAmountInput.addEventListener('keypress', e => { if (e.key === 'Enter') addNewIngredient(); });

    editRecipeBtn.addEventListener('click', function () {
        const recipeId = viewModal.dataset.recipeId;
        const isCustom = viewModal.dataset.isCustom === 'true';
        viewModal.classList.remove('active');
        openEditModal(recipeId, isCustom);
    });

    recipeSelect.addEventListener('change', function () {
        updateFlourLabel();
        updatePreviewComposition();
        const recipeId = this.value;
        const recipe = recipeId ? (breadRecipes[recipeId] || customRecipes[recipeId]) : null;
        if (recipe) {
            const baseIng = recipe.ingredients.find(ing => ing.name === recipe.baseIngredient);
            if (baseIng) {
                const grams = toGrams(baseIng.originalAmount, baseIng.unit);
                if (grams !== null) flourInput.value = (grams / 1000).toFixed(3).replace(/\.?0+$/, '');
            }
        }
    });

    clearHistoryBtn.addEventListener('click', clearRecentCalculations);

    searchBtn.addEventListener('click', () => {
        searchBar.classList.toggle('hidden');
        if (!searchBar.classList.contains('hidden')) searchInput.focus();
    });
    searchInput.addEventListener('input', e => { searchQuery = e.target.value; loadRecipes(); });
    clearSearchBtn.addEventListener('click', () => { searchInput.value = ''; searchQuery = ''; loadRecipes(); });

    addRecipeBtn.addEventListener('click', showCreateRecipeModal);
    settingsBtn.addEventListener('click', () => settingsModal.classList.add('active'));
    settingsNavBtn.addEventListener('click', () => settingsModal.classList.add('active'));

    generatePdfBtn.addEventListener('click', generatePDF);
    exportDataBtn.addEventListener('click', exportData);
    importDataBtn.addEventListener('click', importData);
    importFile.addEventListener('change', handleImportFile);
    clearAllBtn.addEventListener('click', clearAllData);

    bulkAddBtn.addEventListener('click', () => bulkModal.classList.add('active'));
    processBulkBtn.addEventListener('click', processBulkIngredients);
    bulkModalClose.addEventListener('click', () => bulkModal.classList.remove('active'));

    calculatorHelpBtn.addEventListener('click', () => {
        showToast('Selecione uma receita e informe a quantidade do ingrediente base. Os demais ingredientes escalam na mesma proporção.', 'info');
    });

    window.addEventListener('scroll', () => appHeader.classList.toggle('scrolled', window.scrollY > 4));

    let touchStartX = 0, touchEndX = 0;
    const tabs = ['calculator', 'recipes', 'saved'];
    document.addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].screenX; });
    document.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        const delta = touchEndX - touchStartX;
        if (Math.abs(delta) > 60) {
            const current = Array.from(bottomNavItems).findIndex(i => i.classList.contains('active'));
            const next = current + (delta > 0 ? -1 : 1);
            if (next >= 0 && next < tabs.length) switchTab(tabs[next]);
        }
    });
}

// ============================================================
// FUNÇÕES EXPOSTAS GLOBALMENTE (usadas em atributos onclick)
// ============================================================
window.showCreateRecipeModal = function () {
    editRecipeName.value = '';
    editIngredientsList.innerHTML = '';
    editRecipeCategory.value = 'Personalizada';
    baseIngredientSelect.innerHTML = '<option value="">Selecione um ingrediente</option>';
    editModal.dataset.recipeId = 'new';
    editModal.dataset.isCustom = true;
    editModalTitle.textContent = 'Criar nova receita';
    editModal.classList.add('active');
};
window.loadRecentCalculation = loadRecentCalculation;
window.toggleFavorite = toggleFavorite;