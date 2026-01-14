
        // Dados das receitas (mantido do original)
        const breadRecipes = {
            pao_frances: {
                id: "pao_frances",
                name: "Massa Pão Francês",
                favorite: true,
                icon: "fas fa-bread-slice",
                color: "#4361ee",
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
                favorite: false,
                icon: "fas fa-cookie-bite",
                color: "#f59e0b",
                ingredients: [
                    { name: "Farinha de trigo", originalAmount: 30, unit: "kg" },
                    { name: "Melhorador", originalAmount: 300, unit: "g" },
                    { name: "Leite em pó", originalAmount: 600, unit: "g" },
                    { name: "Sal", originalAmount: 350, unit: "g" },
                    { name: "Açúcar", originalAmount: 5, unit: "kg" },
                    { name: "Margarina", originalAmount: 1, unit: "kg" },
                    { name: "Ovos", originalAmount: 3, unit: "kg" },
                    { name: "Fermento", originalAmount: 300, unit: "g" }
                ],
                baseIngredient: "Farinha de trigo"
            },
            regalia_integral: {
                id: "regalia_integral",
                name: "Massa Integral",
                favorite: true,
                icon: "fas fa-seedling",
                color: "#22c55e",
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
                favorite: false,
                icon: "fas fa-cookie",
                color: "#ef4444",
                ingredients: [
                    { name: "Açúcar", originalAmount: 1.500, unit: "kg" },
                    { name: "Sal", originalAmount: 200, unit: "g" },
                    { name: "Coco Ralado", originalAmount: 4, unit: "un" },
                    { name: "Leite", originalAmount: 3, unit: "litros" },
                    { name: "Leite em pó", originalAmount: 200, unit: "g" },
                    { name: "Margarina", originalAmount: 200, unit: "kg" },
                    { name: "Farinha", originalAmount: 10, unit: "kg" }
                ],
                baseIngredient: "Farinha"
            },
            cacetinho_rosquinha: {
                id: "cacetinho_rosquinha",
                name: "Cacetinho & Rosquinha",
                favorite: true,
                icon: "fas fa-donut",
                color: "#8b5cf6",
                ingredients: [
                    { name: "Sal", originalAmount: 100, unit: "g" },
                    { name: "Açúcar", originalAmount: 50, unit: "g" },
                    { name: "Fermento", originalAmount: 40, unit: "g" },
                    { name: "Margarina", originalAmount: 300, unit: "g" },
                    { name: "Coco ralado", originalAmount: 1, unit: "unidade" },
                    { name: "Leite de coco", originalAmount: 1.500, unit: "litro" },
                    { name: "Farinha", originalAmount: 5, unit: "kg" }
                ],
                baseIngredient: "Farinha"
            },
            ragalia: {
                id: "ragalia",
                name: "Massa Ragalia",
                favorite: false,
                icon: "fas fa-bread-slice",
                color: "#06b6d4",
                ingredients: [
                    { name: "Farinha", originalAmount: 10, unit: "kg" },
                    { name: "Sal", originalAmount: 200, unit: "g" },
                    { name: "Óleo", originalAmount: 800, unit: "g" },
                    { name: "Fermento", originalAmount: 10, unit: "g" },
                    { name: "Esponja de francês", originalAmount: 2, unit: "kg" }
                ],
                baseIngredient: "Farinha"
            }
        };

        // Estado da aplicação
        let currentRecipe = null;
        let customRecipes = JSON.parse(localStorage.getItem('customRecipes')) || {};
        let savedRecipes = JSON.parse(localStorage.getItem('savedRecipes')) || {};
        let recentCalculations = JSON.parse(localStorage.getItem('recentCalculations')) || [];
        let currentCalculatedRecipe = null;
        let currentViewRecipe = null;

        // Elementos DOM
        const recipeSelect = document.getElementById('recipe-select');
        const flourInput = document.getElementById('flour-input');
        const calculateBtn = document.getElementById('calculate-btn');
        const resultModal = document.getElementById('result-modal');
        const modalRecipeTitle = document.getElementById('modal-recipe-title');
        const modalIngredientsBody = document.getElementById('modal-ingredients-body');
        const printBtn = document.getElementById('print-btn');
        const shareBtn = document.getElementById('share-btn');
        const saveCustomBtn = document.getElementById('save-custom-btn');
        const closeModalBtns = document.querySelectorAll('.modal-close');
        const toast = document.getElementById('toast');
        const originalRecipesGrid = document.getElementById('original-recipes-grid');
        const customRecipesGrid = document.getElementById('custom-recipes-grid');
        const savedRecipesGrid = document.getElementById('saved-recipes-grid');
        const segments = document.querySelectorAll('.segment');
        const bottomNavItems = document.querySelectorAll('.bottom-nav-item');
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
        const cancelEditBtn = document.getElementById('cancel-edit-btn');
        const originalCount = document.getElementById('original-count');
        const customCount = document.getElementById('custom-count');
        const recentCalculationsEl = document.getElementById('recent-calculations');

        // Inicialização
        document.addEventListener('DOMContentLoaded', function() {
            initApp();
            setupEventListeners();
            setupAnimations();
        });

        // Funções principais
        function initApp() {
            populateRecipeSelect();
            loadRecipes();
            loadRecentCalculations();
            updateCounts();
        }

        function setupAnimations() {
            // Adiciona animações aos elementos
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate__animated', 'animate__fadeInUp');
                        observer.unobserve(entry.target);
                    }
                });
            }, observerOptions);

            // Observa os cards
            document.querySelectorAll('.card').forEach(card => {
                observer.observe(card);
            });
        }

        function populateRecipeSelect() {
            recipeSelect.innerHTML = '<option value="">-- Selecione uma receita --</option>';
            
            // Agrupa receitas por categoria
            const categories = {
                'Pães Tradicionais': [],
                'Pães Especiais': [],
                'Bolachas': [],
                'Personalizadas': []
            };
            
            // Adiciona receitas originais às categorias
            Object.values(breadRecipes).forEach(recipe => {
                if (recipe.name.includes('Francês') || recipe.name.includes('Doce')) {
                    categories['Pães Tradicionais'].push(recipe);
                } else if (recipe.name.includes('Integral') || recipe.name.includes('Ragalia')) {
                    categories['Pães Especiais'].push(recipe);
                } else if (recipe.name.includes('Bolacha')) {
                    categories['Bolachas'].push(recipe);
                }
            });
            
            // Adiciona receitas personalizadas
            Object.values(customRecipes).forEach(recipe => {
                categories['Personalizadas'].push(recipe);
            });
            
            // Preenche o select com grupos
            Object.keys(categories).forEach(category => {
                if (categories[category].length > 0) {
                    const optgroup = document.createElement('optgroup');
                    optgroup.label = category;
                    
                    categories[category].forEach(recipe => {
                        const option = document.createElement('option');
                        option.value = recipe.id;
                        option.textContent = recipe.name;
                        if (customRecipes[recipe.id]) {
                            option.textContent += ' ★';
                        }
                        optgroup.appendChild(option);
                    });
                    
                    recipeSelect.appendChild(optgroup);
                }
            });
        }

        function updateCounts() {
            originalCount.textContent = `${Object.keys(breadRecipes).length} receitas`;
            customCount.textContent = `${Object.keys(customRecipes).length} receitas`;
        }

        function loadRecipes() {
            // Carrega receitas originais
            originalRecipesGrid.innerHTML = '';
            Object.values(breadRecipes).forEach(recipe => {
                const recipeCard = createRecipeCard(recipe, false);
                originalRecipesGrid.appendChild(recipeCard);
            });
            
            // Carrega receitas personalizadas
            customRecipesGrid.innerHTML = '';
            if (Object.keys(customRecipes).length === 0) {
                customRecipesGrid.innerHTML = `
                    <div style="grid-column: 1 / -1;">
                        <div class="empty-state">
                            <i class="fas fa-plus-circle"></i>
                            <p>Nenhuma receita personalizada</p>
                            <button class="btn btn-outline mt-4" onclick="showCreateRecipeModal()">
                                <i class="fas fa-plus"></i> Criar Receita
                            </button>
                        </div>
                    </div>
                `;
            } else {
                Object.values(customRecipes).forEach(recipe => {
                    const recipeCard = createRecipeCard(recipe, true);
                    customRecipesGrid.appendChild(recipeCard);
                });
            }
            
            // Carrega receitas salvas
            loadSavedRecipes();
        }

        function loadSavedRecipes() {
            savedRecipesGrid.innerHTML = '';
            if (Object.keys(savedRecipes).length === 0) {
                savedRecipesGrid.innerHTML = `
                    <div style="grid-column: 1 / -1;">
                        <div class="empty-state">
                            <i class="fas fa-star"></i>
                            <p>Nenhuma receita salva</p>
                            <p class="mt-4" style="font-size: 0.9rem; color: var(--gray-400);">
                                Clique na estrela em qualquer receita para salvar
                            </p>
                        </div>
                    </div>
                `;
            } else {
                Object.values(savedRecipes).forEach(recipe => {
                    const recipeCard = createRecipeCard(recipe, true, true);
                    savedRecipesGrid.appendChild(recipeCard);
                });
            }
        }

        function loadRecentCalculations() {
            recentCalculationsEl.innerHTML = '';
            
            if (recentCalculations.length === 0) {
                recentCalculationsEl.innerHTML = `
                    <div class="empty-state">
                        <i class="fas fa-clock"></i>
                        <p>Nenhum cálculo recente</p>
                    </div>
                `;
                return;
            }
            
            recentCalculations.slice(0, 3).forEach(calc => {
                const calcEl = document.createElement('div');
                calcEl.className = 'ingredient-item';
                calcEl.innerHTML = `
                    <div class="ingredient-info">
                        <div class="ingredient-name">${calc.name}</div>
                        <div class="ingredient-details">
                            <span>${calc.flourAmount}kg farinha</span>
                            <span>${calc.date}</span>
                        </div>
                    </div>
                    <button class="btn btn-icon btn-sm" onclick="loadRecentCalculation('${calc.id}')">
                        <i class="fas fa-redo"></i>
                    </button>
                `;
                recentCalculationsEl.appendChild(calcEl);
            });
        }

        function createRecipeCard(recipe, isCustom = false, isSaved = false) {
            const card = document.createElement('div');
            card.className = `recipe-card ${recipe.favorite ? 'favorite' : ''}`;
            card.dataset.id = recipe.id;
            card.dataset.custom = isCustom;
            
            const icon = recipe.icon || 'fas fa-bread-slice';
            const color = recipe.color || '#4361ee';
            
            card.innerHTML = `
                <div class="recipe-icon" style="background: ${color}">
                    <i class="${icon}"></i>
                </div>
                <div class="recipe-name">${recipe.name}</div>
                <div class="recipe-meta">
                    <span><i class="fas fa-list"></i> ${recipe.ingredients.length} ingred.</span>
                </div>
            `;
            
            card.addEventListener('click', () => {
                if (isSaved) {
                    showViewModal(recipe, true);
                } else {
                    showViewModal(recipe, isCustom);
                }
            });
            
            return card;
        }

        function calculateRecipe() {
            const recipeId = recipeSelect.value;
            const desiredAmount = parseFloat(flourInput.value);
            
            if (!recipeId) {
                showToast('Selecione uma receita', 'error');
                recipeSelect.focus();
                return;
            }
            
            if (isNaN(desiredAmount) || desiredAmount <= 0) {
                showToast('Digite uma quantidade válida', 'error');
                flourInput.focus();
                return;
            }
            
            // Encontra a receita
            let recipe = breadRecipes[recipeId] || customRecipes[recipeId];
            
            if (!recipe) {
                showToast('Receita não encontrada', 'error');
                return;
            }
            
            currentRecipe = recipe;
            
            // Calcula as quantidades
            const baseIng = recipe.ingredients.find(ing => ing.name === recipe.baseIngredient);
            if (!baseIng) {
                showToast('Ingrediente base não encontrado', 'error');
                return;
            }
            
            const ratio = desiredAmount / baseIng.originalAmount;
            const calculatedIngredients = recipe.ingredients.map(ing => {
                const adjustedAmount = ing.originalAmount * ratio;
                return {
                    name: ing.name,
                    amount: adjustedAmount,
                    unit: ing.unit
                };
            });
            
            // Prepara o resultado
            currentCalculatedRecipe = {
                id: 'calc_' + Date.now(),
                name: recipe.name,
                ingredients: calculatedIngredients,
                flourAmount: desiredAmount,
                originalRecipeId: recipe.id,
                date: new Date().toLocaleDateString('pt-BR')
            };
            
            // Salva nos cálculos recentes
            saveToRecentCalculations(currentCalculatedRecipe);
            
            // Exibe o modal com os resultados
            showResultsModal(currentCalculatedRecipe);
        }

        function saveToRecentCalculations(calculation) {
            recentCalculations = recentCalculations.filter(calc => 
                calc.id !== calculation.id && calc.originalRecipeId !== calculation.originalRecipeId
            );
            
            recentCalculations.unshift(calculation);
            if (recentCalculations.length > 10) {
                recentCalculations.pop();
            }
            
            localStorage.setItem('recentCalculations', JSON.stringify(recentCalculations));
            loadRecentCalculations();
        }

        function loadRecentCalculation(calcId) {
            const calculation = recentCalculations.find(calc => calc.id === calcId);
            if (calculation) {
                recipeSelect.value = calculation.originalRecipeId;
                flourInput.value = calculation.flourAmount;
                calculateRecipe();
            }
        }

        function showResultsModal(recipe) {
            modalRecipeTitle.innerHTML = `<i class="fas fa-calculator"></i> ${recipe.name}`;
            modalIngredientsBody.innerHTML = '';
            
            recipe.ingredients.forEach(ing => {
                const row = document.createElement('tr');
                
                // Formata a quantidade
                let displayAmount = formatQuantity(ing.amount, ing.unit);
                
                row.innerHTML = `
                    <td>${ing.name}</td>
                    <td>${displayAmount.value}</td>
                    <td>${displayAmount.unit}</td>
                `;
                
                modalIngredientsBody.appendChild(row);
            });
            
            resultModal.classList.add('active');
            
            // Anima a entrada do modal
            setTimeout(() => {
                document.querySelector('#result-modal .modal').classList.add('animate__animated', 'animate__fadeInUp');
            }, 10);
        }

        function formatQuantity(amount, unit) {
            let formattedAmount = amount;
            let formattedUnit = unit;
            
            switch(unit) {
                case 'g':
                    if (amount >= 1000) {
                        formattedAmount = (amount / 1000).toFixed(3);
                        formattedUnit = 'kg';
                    } else {
                        formattedAmount = amount.toFixed(0);
                    }
                    break;
                case 'kg':
                    if (amount < 1) {
                        formattedAmount = (amount * 1000).toFixed(0);
                        formattedUnit = 'g';
                    } else {
                        formattedAmount = amount.toFixed(3);
                    }
                    break;
                case 'litros':
                    if (amount < 1) {
                        formattedAmount = (amount * 1000).toFixed(0);
                        formattedUnit = 'ml';
                    } else {
                        formattedAmount = amount.toFixed(3);
                    }
                    break;
                case 'un':
                    formattedAmount = Math.round(amount * 10) / 10;
                    break;
                default:
                    formattedAmount = amount.toFixed(3);
            }
            
            // Remove zeros desnecessários
            formattedAmount = parseFloat(formattedAmount).toString();
            
            return { value: formattedAmount, unit: formattedUnit };
        }

        function showViewModal(recipe, isCustom = false) {
            currentViewRecipe = recipe;
            
            viewModalTitle.innerHTML = `<i class="${recipe.icon || 'fas fa-book-open'}"></i> ${recipe.name}`;
            viewIngredientsList.innerHTML = '';
            
            recipe.ingredients.forEach(ing => {
                const item = document.createElement('div');
                item.className = 'ingredient-item';
                
                item.innerHTML = `
                    <div class="ingredient-info">
                        <div class="ingredient-name">${ing.name}</div>
                        <div class="ingredient-details">
                            <span><i class="fas fa-weight-hanging"></i> ${ing.originalAmount}</span>
                            <span><i class="fas fa-ruler"></i> ${ing.unit}</span>
                        </div>
                    </div>
                `;
                
                viewIngredientsList.appendChild(item);
            });
            
            // Atualiza botão de favorito
            const isSaved = savedRecipes[recipe.id];
            favoriteRecipeBtn.innerHTML = isSaved ? 
                '<i class="fas fa-star"></i> Remover dos Favoritos' : 
                '<i class="fas fa-star"></i> Favoritar';
            
            viewModal.dataset.recipeId = recipe.id;
            viewModal.dataset.isCustom = isCustom;
            viewModal.classList.add('active');
        }

        function toggleFavorite() {
            const recipeId = viewModal.dataset.recipeId;
            const isCustom = viewModal.dataset.isCustom === 'true';
            
            let recipe;
            if (isCustom) {
                recipe = customRecipes[recipeId];
            } else {
                recipe = breadRecipes[recipeId];
            }
            
            if (!recipe) return;
            
            if (savedRecipes[recipeId]) {
                delete savedRecipes[recipeId];
                showToast('Receita removida dos favoritos', 'warning');
            } else {
                savedRecipes[recipeId] = { ...recipe, isCustom };
                showToast('Receita adicionada aos favoritos!', 'success');
            }
            
            localStorage.setItem('savedRecipes', JSON.stringify(savedRecipes));
            loadSavedRecipes();
            
            // Atualiza botão
            const isSaved = savedRecipes[recipeId];
            favoriteRecipeBtn.innerHTML = isSaved ? 
                '<i class="fas fa-star"></i> Remover dos Favoritos' : 
                '<i class="fas fa-star"></i> Favoritar';
        }

        function saveCustomRecipe() {
            if (!currentCalculatedRecipe) return;
            
            const recipeId = 'custom_' + Date.now();
            const customRecipe = {
                id: recipeId,
                name: `${currentCalculatedRecipe.name} (Personalizada)`,
                icon: 'fas fa-star',
                color: '#f59e0b',
                ingredients: currentCalculatedRecipe.ingredients.map(ing => ({
                    name: ing.name,
                    originalAmount: ing.amount,
                    unit: ing.unit
                })),
                baseIngredient: currentRecipe.baseIngredient,
                favorite: false
            };
            
            // Salva a receita personalizada
            customRecipes[recipeId] = customRecipe;
            localStorage.setItem('customRecipes', JSON.stringify(customRecipes));
            
            showToast('Receita personalizada salva!', 'success');
            loadRecipes();
            populateRecipeSelect();
            updateCounts();
            
            // Fecha o modal
            resultModal.classList.remove('active');
        }

        function printRecipe() {
            const printContent = `
                <!DOCTYPE html>
                <html>
                <head>
                    <title>${currentCalculatedRecipe.name}</title>
                    <style>
                        body { font-family: Arial, sans-serif; padding: 20px; max-width: 800px; margin: 0 auto; }
                        .header { text-align: center; margin-bottom: 30px; }
                        h1 { color: #333; margin-bottom: 10px; }
                        table { width: 100%; border-collapse: collapse; margin: 20px 0; }
                        th, td { padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }
                        th { background-color: #f5f5f5; font-weight: bold; }
                        .footer { margin-top: 30px; text-align: center; color: #666; font-size: 0.9em; }
                        @media print {
                            body { padding: 0; }
                            .no-print { display: none; }
                        }
                    </style>
                </head>
                <body>
                    <div class="header">
                        <h1>${currentCalculatedRecipe.name}</h1>
                        <p>Receita calculada - PãoMaster</p>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>Ingrediente</th>
                                <th>Quantidade</th>
                                <th>Unidade</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${currentCalculatedRecipe.ingredients.map(ing => {
                                const formatted = formatQuantity(ing.amount, ing.unit);
                                return `
                                    <tr>
                                        <td>${ing.name}</td>
                                        <td>${formatted.value}</td>
                                        <td>${formatted.unit}</td>
                                    </tr>
                                `;
                            }).join('')}
                        </tbody>
                    </table>
                    <div class="footer">
                        <p>Gerado por PãoMaster em ${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR')}</p>
                    </div>
                </body>
                </html>
            `;
            
            const printWindow = window.open('', '_blank');
            printWindow.document.write(printContent);
            printWindow.document.close();
            printWindow.focus();
            setTimeout(() => {
                printWindow.print();
                printWindow.close();
            }, 250);
        }

        function shareRecipe() {
            if (!navigator.share) {
                // Fallback para copiar para área de transferência
                const recipeText = `${currentCalculatedRecipe.name}\n\n` +
                    currentCalculatedRecipe.ingredients.map(ing => {
                        const formatted = formatQuantity(ing.amount, ing.unit);
                        return `${ing.name}: ${formatted.value} ${formatted.unit}`;
                    }).join('\n') +
                    `\n\nCompartilhado via PãoMaster`;
                
                navigator.clipboard.writeText(recipeText)
                    .then(() => showToast('Receita copiada!', 'success'))
                    .catch(() => showToast('Erro ao copiar receita', 'error'));
                return;
            }
            
            const recipeText = `${currentCalculatedRecipe.name}\n\n` +
                currentCalculatedRecipe.ingredients.map(ing => {
                    const formatted = formatQuantity(ing.amount, ing.unit);
                    return `${ing.name}: ${formatted.value} ${formatted.unit}`;
                }).join('\n');
            
            navigator.share({
                title: currentCalculatedRecipe.name,
                text: recipeText,
                url: window.location.href
            })
            .then(() => showToast('Receita compartilhada!', 'success'))
            .catch(error => {
                if (error.name !== 'AbortError') {
                    showToast('Erro ao compartilhar', 'error');
                }
            });
        }

        function openEditModal(recipeId, isCustom) {
            let recipe;
            if (!isCustom) {
                recipe = breadRecipes[recipeId];
                editModalTitle.textContent = 'Editar Receita';
            } else {
                recipe = customRecipes[recipeId];
                editModalTitle.textContent = 'Editar Receita';
            }
            
            if (!recipe) return;
            
            // Preenche o formulário
            editRecipeName.value = recipe.name;
            editIngredientsList.innerHTML = '';
            
            // Preenche a lista de ingredientes
            recipe.ingredients.forEach(ing => {
                addIngredientToEditList(ing.name, ing.originalAmount, ing.unit);
            });
            
            // Atualiza o select de ingrediente base
            updateBaseIngredientSelect();
            
            // Seleciona o ingrediente base atual
            baseIngredientSelect.value = recipe.baseIngredient;
            
            // Armazena o ID da receita sendo editada
            editModal.dataset.recipeId = recipeId;
            editModal.dataset.isCustom = isCustom;
            
            // Abre o modal
            editModal.classList.add('active');
        }

        function addIngredientToEditList(name, amount, unit) {
            const item = document.createElement('div');
            item.className = 'ingredient-item';
            item.innerHTML = `
                <div class="ingredient-info">
                    <div class="ingredient-name">${name}</div>
                    <div class="ingredient-details">
                        <span>${amount} ${unit}</span>
                    </div>
                </div>
                <button class="btn btn-icon btn-sm btn-danger remove-ingredient">
                    <i class="fas fa-times"></i>
                </button>
            `;
            
            item.querySelector('.remove-ingredient').addEventListener('click', function() {
                item.remove();
                updateBaseIngredientSelect();
            });
            
            editIngredientsList.appendChild(item);
        }

        function updateBaseIngredientSelect() {
            baseIngredientSelect.innerHTML = '';
            
            const ingredients = Array.from(editIngredientsList.querySelectorAll('.ingredient-item .ingredient-name'))
                .map(span => span.textContent);
            
            ingredients.forEach(ing => {
                const option = document.createElement('option');
                option.value = ing;
                option.textContent = ing;
                baseIngredientSelect.appendChild(option);
            });
        }

        function saveEditedRecipe() {
            const recipeId = editModal.dataset.recipeId;
            const isCustom = editModal.dataset.isCustom === 'true';
            const recipeName = editRecipeName.value;
            const baseIngredient = baseIngredientSelect.value;
            
            if (!recipeName) {
                showToast('Digite um nome para a receita', 'error');
                editRecipeName.focus();
                return;
            }
            
            if (!baseIngredient) {
                showToast('Selecione um ingrediente base', 'error');
                baseIngredientSelect.focus();
                return;
            }
            
            // Coleta os ingredientes
            const ingredients = [];
            editIngredientsList.querySelectorAll('.ingredient-item').forEach(item => {
                const name = item.querySelector('.ingredient-name').textContent;
                const amountUnit = item.querySelector('.ingredient-details span').textContent;
                const [amount, unit] = amountUnit.split(' ');
                
                ingredients.push({
                    name: name,
                    originalAmount: parseFloat(amount),
                    unit: unit
                });
            });
            
            if (ingredients.length === 0) {
                showToast('Adicione pelo menos um ingrediente', 'error');
                return;
            }
            
            // Cria ou atualiza a receita
            const originalRecipe = isCustom ? customRecipes[recipeId] : breadRecipes[recipeId];
            const newRecipe = {
                ...originalRecipe,
                name: recipeName,
                ingredients: ingredients,
                baseIngredient: baseIngredient
            };
            
            // Salva a receita
            if (isCustom) {
                customRecipes[recipeId] = newRecipe;
                localStorage.setItem('customRecipes', JSON.stringify(customRecipes));
            } else {
                // Para receitas originais, cria uma cópia personalizada
                const newRecipeId = 'custom_' + Date.now();
                customRecipes[newRecipeId] = { ...newRecipe, id: newRecipeId };
                localStorage.setItem('customRecipes', JSON.stringify(customRecipes));
            }
            
            showToast('Receita salva com sucesso!', 'success');
            editModal.classList.remove('active');
            viewModal.classList.remove('active');
            loadRecipes();
            populateRecipeSelect();
            updateCounts();
        }

        function deleteRecipe(recipeId) {
            if (!confirm('Tem certeza que deseja excluir esta receita?')) return;
            
            delete customRecipes[recipeId];
            localStorage.setItem('customRecipes', JSON.stringify(customRecipes));
            
            showToast('Receita excluída', 'success');
            loadRecipes();
            populateRecipeSelect();
            updateCounts();
            
            if (viewModal.classList.contains('active')) {
                viewModal.classList.remove('active');
            }
        }

        function addNewIngredient() {
            const name = ingredientNameInput.value.trim();
            const amount = parseFloat(ingredientAmountInput.value);
            const unit = ingredientUnitSelect.value;
            
            if (!name || isNaN(amount) || amount <= 0) {
                showToast('Preencha todos os campos do ingrediente', 'error');
                return;
            }
            
            addIngredientToEditList(name, amount, unit);
            
            // Limpa os campos
            ingredientNameInput.value = '';
            ingredientAmountInput.value = '';
            ingredientUnitSelect.value = 'kg';
            
            // Atualiza o select de ingrediente base
            updateBaseIngredientSelect();
            
            // Foca no nome do próximo ingrediente
            ingredientNameInput.focus();
        }

        function showToast(message, type = 'info') {
            toast.textContent = message;
            toast.className = `toast ${type}`;
            
            setTimeout(() => {
                toast.classList.add('show');
            }, 10);
            
            setTimeout(() => {
                toast.classList.remove('show');
            }, 3000);
        }

        function setupEventListeners() {
            // Navegação por segmentos
            segments.forEach(segment => {
                segment.addEventListener('click', function() {
                    const tabName = this.dataset.tab;
                    
                    segments.forEach(s => s.classList.remove('active'));
                    this.classList.add('active');
                    
                    // Atualiza navegação inferior
                    bottomNavItems.forEach(item => {
                        item.classList.toggle('active', item.dataset.tab === tabName);
                    });
                    
                    // Mostra a seção correspondente
                    calculatorSection.classList.toggle('hidden', tabName !== 'calculator');
                    recipesSection.classList.toggle('hidden', tabName !== 'recipes');
                    savedSection.classList.toggle('hidden', tabName !== 'saved');
                    
                    // Animação
                    if (tabName === 'recipes') {
                        loadRecipes();
                    }
                });
            });
            
            // Navegação inferior
            bottomNavItems.forEach(item => {
                item.addEventListener('click', function() {
                    const tabName = this.dataset.tab || this.id.replace('-btn', '');
                    
                    bottomNavItems.forEach(i => i.classList.remove('active'));
                    this.classList.add('active');
                    
                    segments.forEach(s => s.classList.toggle('active', s.dataset.tab === tabName));
                    
                    calculatorSection.classList.toggle('hidden', tabName !== 'calculator');
                    recipesSection.classList.toggle('hidden', tabName !== 'recipes');
                    savedSection.classList.toggle('hidden', tabName !== 'saved');
                });
            });
            
            // Botão de calcular
            calculateBtn.addEventListener('click', calculateRecipe);
            
            // Enter no campo de farinha
            flourInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') calculateRecipe();
            });
            
            // Multiplicadores rápidos
            document.querySelectorAll('.quick-action-btn').forEach(button => {
                button.addEventListener('click', function() {
                    const multiplier = parseFloat(this.dataset.mult);
                    if (!isNaN(multiplier)) {
                        const currentValue = parseFloat(flourInput.value) || 1;
                        flourInput.value = (currentValue * multiplier).toFixed(1);
                        
                        // Animação de clique
                        this.classList.add('active');
                        setTimeout(() => this.classList.remove('active'), 200);
                    }
                });
            });
            
            // Botões de fechar modal
            closeModalBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    const modal = this.closest('.modal-overlay');
                    modal.classList.remove('active');
                });
            });
            
            // Fechar modal ao clicar fora
            document.querySelectorAll('.modal-overlay').forEach(modal => {
                modal.addEventListener('click', function(e) {
                    if (e.target === this) {
                        this.classList.remove('active');
                    }
                });
            });
            
            // Botões de ação da receita calculada
            printBtn.addEventListener('click', printRecipe);
            shareBtn.addEventListener('click', shareRecipe);
            saveCustomBtn.addEventListener('click', saveCustomRecipe);
            
            // Botão de favoritar
            favoriteRecipeBtn.addEventListener('click', toggleFavorite);
            
            // Eventos do modal de edição
            addIngredientBtn.addEventListener('click', addNewIngredient);
            saveRecipeBtn.addEventListener('click', saveEditedRecipe);
            cancelEditBtn.addEventListener('click', () => editModal.classList.remove('active'));
            
            // Tecla Enter no formulário de ingredientes
            ingredientNameInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    ingredientAmountInput.focus();
                }
            });
            
            ingredientAmountInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') addNewIngredient();
            });
            
            // Botão de editar no modal de visualização
            editRecipeBtn.addEventListener('click', function() {
                const recipeId = viewModal.dataset.recipeId;
                const isCustom = viewModal.dataset.isCustom === 'true';
                viewModal.classList.remove('active');
                openEditModal(recipeId, isCustom);
            });
            
            // Preenchimento automático da farinha quando seleciona receita
            recipeSelect.addEventListener('change', function() {
                const recipeId = this.value;
                if (recipeId && breadRecipes[recipeId]) {
                    const recipe = breadRecipes[recipeId];
                    const baseIng = recipe.ingredients.find(ing => ing.name === recipe.baseIngredient);
                    if (baseIng && baseIng.unit === 'kg') {
                        flourInput.value = baseIng.originalAmount;
                    }
                }
            });
            
            // Swipe para navegação
            let touchStartX = 0;
            let touchEndX = 0;
            
            document.addEventListener('touchstart', e => {
                touchStartX = e.changedTouches[0].screenX;
            });
            
            document.addEventListener('touchend', e => {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
            });
            
            function handleSwipe() {
                const threshold = 50;
                const delta = touchEndX - touchStartX;
                
                if (Math.abs(delta) > threshold) {
                    if (delta > 0) {
                        // Swipe right - previous tab
                        navigateTabs(-1);
                    } else {
                        // Swipe left - next tab
                        navigateTabs(1);
                    }
                }
            }
            
            function navigateTabs(direction) {
                const tabs = ['calculator', 'recipes', 'saved'];
                const currentTab = Array.from(segments).findIndex(s => s.classList.contains('active'));
                let newIndex = currentTab + direction;
                
                if (newIndex >= 0 && newIndex < tabs.length) {
                    segments[newIndex].click();
                }
            }
        }

        // Funções auxiliares expostas globalmente
        window.showCreateRecipeModal = function() {
            editRecipeName.value = '';
            editIngredientsList.innerHTML = '';
            baseIngredientSelect.innerHTML = '<option value="">Selecione um ingrediente</option>';
            editModal.dataset.recipeId = 'new';
            editModal.dataset.isCustom = true;
            editModalTitle.textContent = 'Criar Nova Receita';
            editModal.classList.add('active');
        };

        window.loadRecentCalculation = loadRecentCalculation;
