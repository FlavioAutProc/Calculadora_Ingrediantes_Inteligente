
        // Dados das receitas de panificação
        const breadRecipes = {
            pao_frances: {
                id: "pao_frances",
                name: "Massa Pão Francês",
                favorite: false,
                ingredients: [
                    { name: "Farinha de trigo", originalAmount: 25, unit: "kg" },
                    { name: "Melhorador", originalAmount: 250, unit: "g", tooltip: "Substância que melhora a textura da massa" },
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
                name: "Massa Regalia Integral",
                favorite: false,
                ingredients: [
                    { name: "Farinha de trigo", originalAmount: 5, unit: "kg" },
                    { name: "Farinha de trigo integral", originalAmount: 5, unit: "kg" },
                    { name: "Sal", originalAmount: 50, unit: "g" },
                    { name: "Melhorador", originalAmount: 10, unit: "g" },
                    { name: "Esponja de francês", originalAmount: 2, unit: "kg", tooltip: "Massa pré-fermentada" }
                ],
                baseIngredient: "Farinha de trigo"
            },
            bolacha_sete_capas: {
                id: "bolacha_sete_capas",
                name: "Massa Bolacha Sete Capas",
                favorite: false,
                ingredients: [
                    { name: "Açúcar", originalAmount: 4, unit: "kg" },
                    { name: "Sal", originalAmount: 500, unit: "g" },
                    { name: "Cocos", originalAmount: 8, unit: "un" },
                    { name: "Leite", originalAmount: 3, unit: "litros" },
                    { name: "Leite em pó", originalAmount: 800, unit: "g" },
                    { name: "Margarina", originalAmount: 4, unit: "kg" },
                    { name: "Farinha", originalAmount: 25, unit: "kg" }
                ],
                baseIngredient: "Farinha"
            },
            cacetinho_rosquinha: {
                id: "cacetinho_rosquinha",
                name: "Massa Cacetinho e Rosquinha",
                favorite: false,
                ingredients: [
                    { name: "Sal", originalAmount: 200, unit: "g" },
                    { name: "Açúcar", originalAmount: 50, unit: "g" },
                    { name: "Fermento", originalAmount: 50, unit: "g" },
                    { name: "Margarina", originalAmount: 500, unit: "g" },
                    { name: "Coco seco", originalAmount: 600, unit: "g" },
                    { name: "Leite de coco", originalAmount: 1, unit: "litro" },
                    { name: "Farinha", originalAmount: 10, unit: "kg" }
                ],
                baseIngredient: "Farinha"
            },
            ragalia: {
                id: "ragalia",
                name: "Massa Ragalia",
                favorite: false,
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

        // Variáveis de estado
        let currentBreadRecipe = null;
        let currentCakeRecipe = {
            name: "",
            ingredients: []
        };
        let favorites = JSON.parse(localStorage.getItem('recipeFavorites')) || {};
        let showOnlyFavorites = false;
        let defaultCakeSettings = {
            mixAmount: 5,
            milkAmount: 2.5,
            eggsAmount: 6,
            useFerment: false,
            useWater: false,
            useExtraMilk: false
        };

        // Elementos DOM
        const recipeSelect = document.getElementById('recipe-select');
        const breadRecipeContainer = document.getElementById('bread-recipe-container');
        const recipeTitle = document.getElementById('recipe-title');
        const ingredientsBody = document.getElementById('ingredients-body');
        const flourInput = document.getElementById('flour-input');
        const calculateBreadBtn = document.getElementById('calculate-bread');
        const resetBreadBtn = document.getElementById('reset-bread');
        const saveBreadBtn = document.getElementById('save-bread');
        const printBreadBtn = document.getElementById('print-bread');
        const shareBreadBtn = document.getElementById('share-bread');
        const toggleFavoritesBtn = document.getElementById('toggle-favorites-bread');
        const breadSearchInput = document.getElementById('bread-search');
        const breadLoadingBar = document.getElementById('bread-loading-bar');

        // Elementos do modo bolo
        const defaultMixInput = document.getElementById('default-mix');
        const defaultMilkInput = document.getElementById('default-milk');
        const defaultEggsInput = document.getElementById('default-eggs');
        const useFermentCheckbox = document.getElementById('use-ferment');
        const useWaterCheckbox = document.getElementById('use-water');
        const useExtraMilkCheckbox = document.getElementById('use-extra-milk');
        const saveDefaultsBtn = document.getElementById('save-defaults');
        const cakeRecipeNameInput = document.getElementById('recipe-name');
        const desiredMixInput = document.getElementById('desired-mix');
        const calculateCakeBtn = document.getElementById('calculate-cake');
        const cakeResults = document.getElementById('cake-results');
        const cakeResultsBody = document.getElementById('cake-results-body');
        const resetCakeBtn = document.getElementById('reset-cake');
        const printCakeBtn = document.getElementById('print-cake');
        const shareCakeBtn = document.getElementById('share-cake');
        const cakeLoadingBar = document.getElementById('cake-loading-bar');

        // Toast
        const toast = document.getElementById('toast');

        // Inicialização
        document.addEventListener('DOMContentLoaded', function() {
            initBreadMode();
            initCakeMode();
            loadFavorites();
            setupEventListeners();
        });

        // ========== FUNÇÕES GERAIS ==========

        function showToast(message, type = 'info') {
            const toast = document.getElementById('toast');
            toast.textContent = message;
            
            // Reset classes
            toast.className = 'toast';
            
            // Add type class
            if (type === 'success') {
                toast.style.backgroundColor = 'var(--success-color)';
            } else if (type === 'error') {
                toast.style.backgroundColor = 'var(--highlight-color)';
            } else {
                toast.style.backgroundColor = 'var(--primary-color)';
            }
            
            toast.style.opacity = '1';
            
            setTimeout(() => {
                toast.style.opacity = '0';
            }, 3000);
        }

        function showLoading(loadingBar) {
            loadingBar.style.width = '100%';
        }

        function hideLoading(loadingBar) {
            setTimeout(() => {
                loadingBar.style.width = '0';
            }, 300);
        }

        function copyToClipboard(text) {
            navigator.clipboard.writeText(text).then(() => {
                showToast('Copiado para a área de transferência!', 'success');
            }).catch(err => {
                showToast('Falha ao copiar: ' + err, 'error');
            });
        }

        function toggleUnit(element) {
            const text = element.textContent.split(' ');
            const value = parseFloat(text[0]);
            const unit = text[1];
            
            if (unit === 'kg') {
                element.textContent = `${(value * 1000).toFixed(0)} g`;
            } else if (unit === 'g' && value >= 1000) {
                element.textContent = `${(value / 1000).toFixed(3)} kg`;
            } else if (unit === 'litros' || unit === 'litro') {
                element.textContent = `${(value * 1000).toFixed(0)} ml`;
            } else if (unit === 'ml' && value >= 1000) {
                element.textContent = `${(value / 1000).toFixed(2)} litros`;
            }
            
            // Restaura o valor original após 5 segundos
            setTimeout(() => {
                if (element.dataset.originalText) {
                    element.textContent = element.dataset.originalText;
                }
            }, 5000);
        }

        // ========== MODO PANIFICAÇÃO ==========

        function initBreadMode() {
            // Preenche o dropdown de receitas
            populateRecipeSelect();
            
            // Carrega a última receita usada
            const lastRecipe = JSON.parse(localStorage.getItem('lastBreadRecipe'));
            if (lastRecipe && breadRecipes[lastRecipe.recipeId]) {
                recipeSelect.value = lastRecipe.recipeId;
                loadBreadRecipe();
                flourInput.value = lastRecipe.flourAmount;
                calculateBreadRecipe();
            }
        }

        function populateRecipeSelect() {
            recipeSelect.innerHTML = '<option value="">-- Selecione --</option>';
            
            Object.values(breadRecipes).forEach(recipe => {
                const option = document.createElement('option');
                option.value = recipe.id;
                option.textContent = recipe.name;
                
                // Marca receitas favoritas
                if (favorites[recipe.id]) {
                    option.textContent += ' ★';
                }
                
                recipeSelect.appendChild(option);
            });
        }

        function loadBreadRecipe() {
            const recipeId = recipeSelect.value;
            
            if (recipeId && breadRecipes[recipeId]) {
                currentBreadRecipe = breadRecipes[recipeId];
                recipeTitle.textContent = currentBreadRecipe.name;
                displayBreadIngredients(currentBreadRecipe);
                breadRecipeContainer.style.display = 'block';
                
                // Define o valor padrão do input
                const baseIng = currentBreadRecipe.ingredients.find(
                    ing => ing.name === currentBreadRecipe.baseIngredient
                );
                if (baseIng) flourInput.value = baseIng.originalAmount;
                
                calculateBreadRecipe();
                showToast(`Receita "${currentBreadRecipe.name}" carregada`, 'success');
            } else {
                breadRecipeContainer.style.display = 'none';
                currentBreadRecipe = null;
            }
        }

        function displayBreadIngredients(recipe) {
            ingredientsBody.innerHTML = '';
            
            recipe.ingredients.forEach(ingredient => {
                const row = document.createElement('tr');
                
                // Célula do nome com tooltip se existir
                const nameCell = document.createElement('td');
                if (ingredient.tooltip) {
                    const tooltipSpan = document.createElement('span');
                    tooltipSpan.className = 'tooltip';
                    tooltipSpan.innerHTML = `${ingredient.name} <span class="tooltip-text">${ingredient.tooltip}</span>`;
                    nameCell.appendChild(tooltipSpan);
                } else {
                    nameCell.textContent = ingredient.name;
                }
                
                // Célula do valor original
                const originalCell = document.createElement('td');
                originalCell.textContent = `${ingredient.originalAmount} ${ingredient.unit}`;
                
                // Célula do valor ajustado (clicável para converter)
                const adjustedCell = document.createElement('td');
                adjustedCell.className = 'adjusted-value';
                adjustedCell.textContent = `${ingredient.originalAmount} ${ingredient.unit}`;
                adjustedCell.addEventListener('click', () => toggleUnit(adjustedCell));
                
                row.append(nameCell, originalCell, adjustedCell);
                ingredientsBody.appendChild(row);
            });
        }

        function calculateBreadRecipe() {
            if (!currentBreadRecipe || !flourInput.value) return;
            
            showLoading(breadLoadingBar);
            
            setTimeout(() => {
                const desiredAmount = parseFloat(flourInput.value);
                if (isNaN(desiredAmount) || desiredAmount <= 0) {
                    showToast('Digite uma quantidade válida de farinha', 'error');
                    hideLoading(breadLoadingBar);
                    return;
                }
                
                const baseIng = currentBreadRecipe.ingredients.find(
                    ing => ing.name === currentBreadRecipe.baseIngredient
                );
                if (!baseIng) {
                    hideLoading(breadLoadingBar);
                    return;
                }
                
                const ratio = desiredAmount / baseIng.originalAmount;
                const rows = ingredientsBody.querySelectorAll('tr');
                
                currentBreadRecipe.ingredients.forEach((ingredient, index) => {
                    const adjustedAmount = ingredient.originalAmount * ratio;
                    const adjustedCell = rows[index].querySelector('.adjusted-value');
                    
                    // Formata a exibição baseado na unidade
                    let displayAmount, displayUnit = ingredient.unit;
                    
                    if (ingredient.unit === 'g' && adjustedAmount >= 1000) {
                        displayAmount = (adjustedAmount / 1000).toFixed(3);
                        displayUnit = 'kg';
                    } else if (ingredient.unit === 'kg' && adjustedAmount < 1) {
                        displayAmount = (adjustedAmount * 1000).toFixed(0);
                        displayUnit = 'g';
                    } else if (ingredient.unit === 'un') {
                        displayAmount = Math.round(adjustedAmount * 10) / 10;
                    } else if (ingredient.unit === 'litros' && adjustedAmount < 1) {
                        displayAmount = (adjustedAmount * 1000).toFixed(0);
                        displayUnit = 'ml';
                    } else {
                        displayAmount = adjustedAmount.toFixed(3).replace(/\.?0+$/, '');
                    }
                    
                    adjustedCell.textContent = `${displayAmount} ${displayUnit}`;
                    adjustedCell.dataset.originalText = adjustedCell.textContent;
                    adjustedCell.classList.add('highlight');
                    
                    setTimeout(() => {
                        adjustedCell.classList.remove('highlight');
                    }, 1000);
                });
                
                hideLoading(breadLoadingBar);
                showToast('Receita calculada com sucesso!', 'success');
            }, 300);
        }

        function saveBreadRecipe() {
            if (!currentBreadRecipe) {
                showToast('Nenhuma receita selecionada', 'error');
                return;
            }
            
            const recipeData = {
                recipeId: currentBreadRecipe.id,
                flourAmount: flourInput.value
            };
            
            localStorage.setItem('lastBreadRecipe', JSON.stringify(recipeData));
            showToast('Receita salva com sucesso!', 'success');
        }

        function shareBreadRecipe() {
            if (!currentBreadRecipe) {
                showToast('Nenhuma receita selecionada', 'error');
                return;
            }
            
            const shareData = {
                recipe: currentBreadRecipe.id,
                flour: flourInput.value
            };
            
            const shareUrl = `${window.location.origin}${window.location.pathname}?${new URLSearchParams(shareData)}`;
            
            if (navigator.share) {
                navigator.share({
                    title: `Receita: ${currentBreadRecipe.name}`,
                    text: `Confira esta receita de ${currentBreadRecipe.name} para ${flourInput.value}kg de farinha`,
                    url: shareUrl
                }).catch(() => copyToClipboard(shareUrl));
            } else {
                copyToClipboard(shareUrl);
            }
        }

        function toggleBreadFavorites() {
            showOnlyFavorites = !showOnlyFavorites;
            
            if (showOnlyFavorites) {
                toggleFavoritesBtn.innerHTML = '<i class="fas fa-star"></i> Mostrar Todos';
                showToast('Mostrando apenas receitas favoritas', 'success');
            } else {
                toggleFavoritesBtn.innerHTML = '<i class="fas fa-star"></i> Favoritos';
                showToast('Mostrando todas as receitas', 'success');
            }
            
            populateRecipeSelect();
        }

        function loadFavorites() {
            Object.keys(favorites).forEach(recipeId => {
                if (breadRecipes[recipeId]) {
                    breadRecipes[recipeId].favorite = favorites[recipeId];
                }
            });
        }

        // ========== MODO BOLOS ==========

        function initCakeMode() {
            // Carrega as configurações padrão
            const savedSettings = JSON.parse(localStorage.getItem('cakeDefaultSettings'));
            if (savedSettings) {
                defaultCakeSettings = savedSettings;
                defaultMixInput.value = savedSettings.mixAmount;
                defaultMilkInput.value = savedSettings.milkAmount;
                defaultEggsInput.value = savedSettings.eggsAmount;
                useFermentCheckbox.checked = savedSettings.useFerment;
                useWaterCheckbox.checked = savedSettings.useWater;
                useExtraMilkCheckbox.checked = savedSettings.useExtraMilk;
            }
            
            // Define o valor padrão para a mistura desejada
            desiredMixInput.value = defaultCakeSettings.mixAmount;
        }

        function saveDefaultSettings() {
            defaultCakeSettings = {
                mixAmount: parseFloat(defaultMixInput.value),
                milkAmount: parseFloat(defaultMilkInput.value),
                eggsAmount: parseInt(defaultEggsInput.value),
                useFerment: useFermentCheckbox.checked,
                useWater: useWaterCheckbox.checked,
                useExtraMilk: useExtraMilkCheckbox.checked
            };
            
            localStorage.setItem('cakeDefaultSettings', JSON.stringify(defaultCakeSettings));
            showToast('Configurações padrão salvas!', 'success');
        }

        function calculateCakeRecipe() {
            const recipeName = cakeRecipeNameInput.value || 'Meu Bolo';
            const desiredMix = parseFloat(desiredMixInput.value);
            
            if (isNaN(desiredMix) || desiredMix <= 0) {
                showToast('Digite uma quantidade válida de mistura pronta', 'error');
                return;
            }
            
            showLoading(cakeLoadingBar);
            
            setTimeout(() => {
                const ratio = desiredMix / defaultCakeSettings.mixAmount;
                
                // Cria a lista de ingredientes base
                const ingredients = [
                    { name: "Mistura pronta", originalAmount: defaultCakeSettings.mixAmount, unit: "kg", adjustedAmount: desiredMix },
                    { name: "Leite", originalAmount: defaultCakeSettings.milkAmount, unit: "litros", adjustedAmount: defaultCakeSettings.milkAmount * ratio },
                    { name: "Ovos", originalAmount: defaultCakeSettings.eggsAmount, unit: "un", adjustedAmount: Math.round(defaultCakeSettings.eggsAmount * ratio) }
                ];
                
                // Adiciona ingredientes opcionais se selecionados
                if (defaultCakeSettings.useFerment) {
                    // Fermento em pó - aproximadamente 10g por kg de mistura
                    const fermentAmount = defaultCakeSettings.mixAmount * 10;
                    ingredients.push({ 
                        name: "Fermento em pó", 
                        originalAmount: fermentAmount, 
                        unit: "g", 
                        adjustedAmount: fermentAmount * ratio 
                    });
                }
                
                if (defaultCakeSettings.useWater) {
                    // Água - aproximadamente 20% do leite
                    const waterAmount = defaultCakeSettings.milkAmount * 0.2;
                    ingredients.push({ 
                        name: "Água", 
                        originalAmount: waterAmount, 
                        unit: "litros", 
                        adjustedAmount: waterAmount * ratio 
                    });
                }
                
                if (defaultCakeSettings.useExtraMilk) {
                    // Leite extra - aproximadamente 10% do leite principal
                    const extraMilkAmount = defaultCakeSettings.milkAmount * 0.1;
                    ingredients.push({ 
                        name: "Leite extra", 
                        originalAmount: extraMilkAmount, 
                        unit: "litros", 
                        adjustedAmount: extraMilkAmount * ratio 
                    });
                }
                
                // Atualiza a receita atual
                currentCakeRecipe = {
                    name: recipeName,
                    ingredients: ingredients
                };
                
                // Exibe os resultados
                displayCakeResults(currentCakeRecipe);
                
                hideLoading(cakeLoadingBar);
                showToast('Receita calculada com sucesso!', 'success');
            }, 300);
        }

        function displayCakeResults(recipe) {
            cakeResultsBody.innerHTML = '';
            
            recipe.ingredients.forEach(ing => {
                const row = document.createElement('tr');
                
                // Formata a quantidade ajustada
                let adjustedDisplay = ing.adjustedAmount;
                let originalDisplay = ing.originalAmount;
                
                // Ajusta a formatação para números inteiros
                if (ing.unit === 'un') {
                    adjustedDisplay = Math.round(adjustedDisplay);
                    originalDisplay = Math.round(originalDisplay);
                } else {
                    adjustedDisplay = adjustedDisplay.toFixed(2).replace(/\.?0+$/, '');
                    originalDisplay = originalDisplay.toFixed(2).replace(/\.?0+$/, '');
                }
                
                row.innerHTML = `
                    <td>${ing.name}</td>
                    <td>${originalDisplay} ${ing.unit}</td>
                    <td class="adjusted-value">${adjustedDisplay} ${ing.unit}</td>
                `;
                
                // Adiciona evento de conversão de unidades
                const adjustedCell = row.querySelector('.adjusted-value');
                adjustedCell.addEventListener('click', () => toggleUnit(adjustedCell));
                adjustedCell.dataset.originalText = adjustedCell.textContent;
                
                cakeResultsBody.appendChild(row);
            });
            
            // Atualiza o título da receita
            document.getElementById('cake-recipe-title').textContent = recipe.name;
            
            // Mostra os resultados
            cakeResults.style.display = 'block';
            
            // Efeito de highlight
            setTimeout(() => {
                document.querySelectorAll('#cake-results .adjusted-value').forEach(cell => {
                    cell.classList.add('highlight');
                    setTimeout(() => cell.classList.remove('highlight'), 1000);
                });
            }, 100);
        }

        function shareCakeRecipe() {
            if (!currentCakeRecipe || currentCakeRecipe.ingredients.length === 0) {
                showToast('Nenhuma receita para compartilhar', 'error');
                return;
            }
            
            const recipeData = {
                name: currentCakeRecipe.name,
                ingredients: currentCakeRecipe.ingredients
            };
            
            const shareUrl = `${window.location.origin}${window.location.pathname}?mode=cake&data=${encodeURIComponent(JSON.stringify(recipeData))}`;
            
            if (navigator.share) {
                navigator.share({
                    title: `Receita: ${currentCakeRecipe.name}`,
                    text: `Confira esta receita de ${currentCakeRecipe.name}`,
                    url: shareUrl
                }).catch(() => copyToClipboard(shareUrl));
            } else {
                copyToClipboard(shareUrl);
            }
        }

        function resetCakeRecipe() {
            cakeRecipeNameInput.value = '';
            desiredMixInput.value = defaultCakeSettings.mixAmount;
            cakeResults.style.display = 'none';
            showToast('Receita resetada', 'success');
        }

        // ========== CONFIGURAÇÃO DE EVENTOS ==========

        function setupEventListeners() {
            // Sistema de modos
            document.querySelectorAll('.mode-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
                    this.classList.add('active');
                    
                    const mode = this.dataset.mode;
                    document.querySelectorAll('.mode-panel').forEach(panel => {
                        panel.classList.remove('active');
                    });
                    document.getElementById(`${mode}-panel`).classList.add('active');
                });
            });

            // Modo panificação
            recipeSelect.addEventListener('change', loadBreadRecipe);
            calculateBreadBtn.addEventListener('click', calculateBreadRecipe);
            flourInput.addEventListener('input', calculateBreadRecipe);
            resetBreadBtn.addEventListener('click', () => {
                if (currentBreadRecipe) {
                    const baseIng = currentBreadRecipe.ingredients.find(
                        ing => ing.name === currentBreadRecipe.baseIngredient
                    );
                    if (baseIng) flourInput.value = baseIng.originalAmount;
                    calculateBreadRecipe();
                    showToast('Valores resetados', 'success');
                }
            });
            saveBreadBtn.addEventListener('click', saveBreadRecipe);
            printBreadBtn.addEventListener('click', () => window.print());
            shareBreadBtn.addEventListener('click', shareBreadRecipe);
            toggleFavoritesBtn.addEventListener('click', toggleBreadFavorites);
            breadSearchInput.addEventListener('input', filterBreadRecipes);

            // Multiplicadores rápidos (pães)
            document.querySelectorAll('#bread-panel .quick-multipliers button').forEach(btn => {
                btn.addEventListener('click', () => {
                    const multiplier = parseFloat(btn.dataset.mult);
                    flourInput.value = (parseFloat(flourInput.value) * multiplier).toFixed(1);
                    calculateBreadRecipe();
                });
            });

            // Multiplicadores rápidos (bolos)
            document.querySelectorAll('#cake-panel .quick-multipliers button').forEach(btn => {
                btn.addEventListener('click', () => {
                    const multiplier = parseFloat(btn.dataset.mult);
                    desiredMixInput.value = (defaultCakeSettings.mixAmount * multiplier).toFixed(1);
                });
            });

            // Modo bolo
            saveDefaultsBtn.addEventListener('click', saveDefaultSettings);
            calculateCakeBtn.addEventListener('click', calculateCakeRecipe);
            resetCakeBtn.addEventListener('click', resetCakeRecipe);
            printCakeBtn.addEventListener('click', () => window.print());
            shareCakeBtn.addEventListener('click', shareCakeRecipe);
            
            // Atualiza a mistura desejada quando mudar a padrão
            defaultMixInput.addEventListener('change', function() {
                desiredMixInput.value = this.value;
            });
        }

        function filterBreadRecipes() {
            const searchTerm = breadSearchInput.value.toLowerCase();
            const options = recipeSelect.querySelectorAll('option');
            
            options.forEach(option => {
                if (option.value === "") return;
                
                const recipeName = option.textContent.replace(' ★', '').toLowerCase();
                if (recipeName.includes(searchTerm)) {
                    option.style.display = '';
                } else {
                    option.style.display = 'none';
                }
            });
        }
