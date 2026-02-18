const RecipeApp = (function () {

    console.log("RecipeApp initializing...");

    // ===============================
    // Recipe Data (with ingredients & steps)
    // ===============================

    const recipes = [
        {
            id: 1,
            title: "Classic Spaghetti Carbonara",
            time: 25,
            difficulty: "easy",
            description: "A creamy Italian pasta dish made with eggs, cheese, pancetta, and black pepper.",
            ingredients: ["Spaghetti", "Eggs", "Parmesan Cheese", "Pancetta", "Black Pepper"],
            steps: [
                "Boil water and cook spaghetti",
                {
                    text: "Prepare the sauce",
                    substeps: [
                        "Beat eggs",
                        "Add grated cheese",
                        "Mix well"
                    ]
                },
                "Cook pancetta",
                "Combine pasta with pancetta",
                "Add egg mixture and stir quickly",
                "Serve hot"
            ]
        },
        {
            id: 2,
            title: "Chicken Tikka Masala",
            time: 45,
            difficulty: "medium",
            description: "Tender chicken pieces in a creamy, spiced tomato sauce.",
            ingredients: ["Chicken", "Yogurt", "Tomato puree", "Cream", "Spices"],
            steps: [
                "Marinate chicken",
                "Grill chicken pieces",
                {
                    text: "Prepare sauce",
                    substeps: [
                        "Heat oil",
                        "Add spices",
                        "Add tomato puree",
                        "Simmer"
                    ]
                },
                "Add cream",
                "Combine chicken with sauce",
                "Serve with rice"
            ]
        },
        {
            id: 3,
            title: "Homemade Croissants",
            time: 180,
            difficulty: "hard",
            description: "Buttery, flaky French pastries.",
            ingredients: ["Flour", "Butter", "Milk", "Yeast", "Sugar", "Salt"],
            steps: [
                "Prepare dough",
                "Roll and fold with butter",
                "Chill dough",
                "Shape croissants",
                "Bake until golden"
            ]
        },
        {
            id: 4,
            title: "Greek Salad",
            time: 15,
            difficulty: "easy",
            description: "Fresh vegetables with feta cheese.",
            ingredients: ["Tomatoes", "Cucumber", "Olives", "Feta", "Olive Oil"],
            steps: [
                "Chop vegetables",
                "Add olives and feta",
                "Drizzle olive oil",
                "Toss and serve"
            ]
        }
    ];

    // ===============================
    // DOM Selection
    // ===============================

    const recipeContainer = document.querySelector("#recipe-container");

    let currentFilter = "all";
    let currentSort = "none";

    // ===============================
    // Recursive Steps Rendering
    // ===============================

    const renderSteps = (steps, level = 0) => {

        let html = "<ul>";

        steps.forEach(step => {

            if (typeof step === "string") {
                html += `<li style="margin-left:${level * 20}px">${step}</li>`;
            } else {
                html += `<li style="margin-left:${level * 20}px">${step.text}</li>`;
                if (step.substeps) {
                    html += renderSteps(step.substeps, level + 1);
                }
            }

        });

        html += "</ul>";
        return html;
    };

    const createStepsHTML = (recipe) => {
        return renderSteps(recipe.steps);
    };

    // ===============================
    // Create Recipe Card
    // ===============================

    const createRecipeCard = (recipe) => {

        return `
        <div class="recipe-card">
            <h3>${recipe.title}</h3>
            <div class="recipe-meta">
                <span>⏱️ ${recipe.time} min</span>
                <span class="difficulty ${recipe.difficulty}">${recipe.difficulty}</span>
            </div>
            <p>${recipe.description}</p>

            <button class="toggle-btn" data-id="${recipe.id}" data-type="ingredients">
                Show Ingredients
            </button>

            <div class="ingredients-container" data-id="${recipe.id}">
                <ul>
                    ${recipe.ingredients.map(item => `<li>${item}</li>`).join("")}
                </ul>
            </div>

            <button class="toggle-btn" data-id="${recipe.id}" data-type="steps">
                Show Steps
            </button>

            <div class="steps-container" data-id="${recipe.id}">
                ${createStepsHTML(recipe)}
            </div>
        </div>
        `;
    };

    // ===============================
    // Render Recipes
    // ===============================

    const renderRecipes = (recipesToRender) => {
        recipeContainer.innerHTML =
            recipesToRender.map(createRecipeCard).join("");
    };

    // ===============================
    // Filter & Sort (unchanged logic)
    // ===============================

    const applyFilter = (recipes, filterType) => {
        if (filterType === "all") return recipes;
        if (filterType === "quick")
            return recipes.filter(r => r.time < 30);
        return recipes.filter(r => r.difficulty === filterType);
    };

    const applySort = (recipes, sortType) => {
        if (sortType === "name")
            return [...recipes].sort((a, b) =>
                a.title.localeCompare(b.title)
            );
        if (sortType === "time")
            return [...recipes].sort((a, b) =>
                a.time - b.time
            );
        return recipes;
    };

    const updateDisplay = () => {
        let result = applyFilter(recipes, currentFilter);
        result = applySort(result, currentSort);
        renderRecipes(result);
    };

    // ===============================
    // Event Delegation for Toggles
    // ===============================

    recipeContainer.addEventListener("click", function (e) {

        if (!e.target.classList.contains("toggle-btn")) return;

        const id = e.target.dataset.id;
        const type = e.target.dataset.type;

        const container = document.querySelector(
            `.${type}-container[data-id="${id}"]`
        );

        container.classList.toggle("visible");

        e.target.textContent =
            container.classList.contains("visible")
                ? `Hide ${type.charAt(0).toUpperCase() + type.slice(1)}`
                : `Show ${type.charAt(0).toUpperCase() + type.slice(1)}`;
    });

    // ===============================
    // Filter & Sort Button Listeners
    // ===============================

    document.querySelectorAll("[data-filter]").forEach(btn => {
        btn.addEventListener("click", function () {
            currentFilter = this.dataset.filter;
            updateDisplay();
        });
    });

    document.querySelectorAll("[data-sort]").forEach(btn => {
        btn.addEventListener("click", function () {
            currentSort = this.dataset.sort;
            updateDisplay();
        });
    });

    // ===============================
    // Init
    // ===============================

    const init = () => {
        updateDisplay();
        console.log("RecipeApp ready!");
    };

    return {
        init
    };

})();

RecipeApp.init();
// ===============================
// IIFE WRAPPER
// ===============================
(() => {
  console.log("RecipeJS App Initialized");

  // ===============================
  // STATE
  // ===============================
  const recipes = window.recipes || []; // your existing data
  let currentFilter = "all";
  let currentSort = "default";
  let searchQuery = "";
  let favorites = JSON.parse(localStorage.getItem("recipeFavorites")) || [];
  let debounceTimer;

  // ===============================
  // DOM REFERENCES
  // ===============================
  const recipeContainer = document.querySelector("#recipe-container");
  const searchInput = document.querySelector("#search-input");
  const clearSearchBtn = document.querySelector("#clear-search");
  const recipeCounter = document.querySelector("#recipe-counter");

  // ===============================
  // DISPLAY FUNCTION
  // ===============================
  const displayRecipes = (data) => {
    recipeContainer.innerHTML = "";

    data.forEach((recipe) => {
      recipeContainer.appendChild(createRecipeCard(recipe));
    });
  };

  // ===============================
  // CREATE RECIPE CARD
  // ===============================
  const createRecipeCard = (recipe) => {
    const card = document.createElement("div");
    card.className = "recipe-card";

    const isFav = favorites.includes(recipe.id);

    card.innerHTML = `
      <h3>${recipe.title}</h3>
      <p>${recipe.description}</p>
      <button 
        class="favorite-btn ${isFav ? "active" : ""}"
        data-recipe-id="${recipe.id}">
        ❤️
      </button>
    `;

    return card;
  };

  // ===============================
  // SEARCH FUNCTION
  // ===============================
  const applySearch = (data, query) => {
    if (!query) return data;

    const lowerQuery = query.toLowerCase().trim();

    return data.filter((recipe) => {
      const titleMatch = recipe.title.toLowerCase().includes(lowerQuery);

      const ingredientMatch = recipe.ingredients.some((ing) =>
        ing.toLowerCase().includes(lowerQuery)
      );

      const descriptionMatch = recipe.description
        .toLowerCase()
        .includes(lowerQuery);

      return titleMatch || ingredientMatch || descriptionMatch;
    });
  };

  // ===============================
  // FILTER FUNCTION
  // ===============================
  const applyFilter = (data, filterType) => {
    if (filterType === "favorites") {
      return data.filter((recipe) => favorites.includes(recipe.id));
    }

    if (filterType === "all") return data;

    return data.filter((recipe) => recipe.category === filterType);
  };

  // ===============================
  // SORT FUNCTION
  // ===============================
  const applySort = (data, sortType) => {
    const sorted = [...data];

    switch (sortType) {
      case "name-asc":
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;

      case "name-desc":
        sorted.sort((a, b) => b.title.localeCompare(a.title));
        break;

      default:
        break;
    }

    return sorted;
  };

  // ===============================
  // RECIPE COUNTER
  // ===============================
  const updateCounter = (shown, total) => {
    recipeCounter.textContent = Showing ${shown} of ${total} recipes;
  };

  // ===============================
  // FAVORITES MANAGEMENT
  // ===============================
  const toggleFavorite = (id) => {
    const index = favorites.indexOf(id);

    if (index > -1) {
      favorites.splice(index, 1);
    } else {
      favorites.push(id);
    }

    localStorage.setItem("recipeFavorites", JSON.stringify(favorites));
    updateDisplay();
  };

  // ===============================
  // MAIN UPDATE FLOW
  // ===============================
  const updateDisplay = () => {
    let processed = [...recipes];

    // 1️⃣ search
    processed = applySearch(processed, searchQuery);

    // 2️⃣ filter
    processed = applyFilter(processed, currentFilter);

    // 3️⃣ sort
    processed = applySort(processed, currentSort);

    // 4️⃣ counter
    updateCounter(processed.length, recipes.length);

    // 5️⃣ render
    displayRecipes(processed);
  };

  // ===============================
  // SEARCH HANDLER (DEBOUNCED)
  // ===============================
  const handleSearchInput = (e) => {
    clearTimeout(debounceTimer);

    const value = e.target.value;

    debounceTimer = setTimeout(() => {
      searchQuery = value;
      clearSearchBtn.style.display = value ? "inline-block" : "none";
      updateDisplay();
    }, 300);
  };

  // ===============================
  // CLEAR SEARCH
  // ===============================
  const clearSearch = () => {
    searchInput.value = "";
    searchQuery = "";
    clearSearchBtn.style.display = "none";
    updateDisplay();
  };

  // ===============================
  // FAVORITE CLICK (EVENT DELEGATION)
  // ===============================
  const handleFavoriteClick = (e) => {
    if (!e.target.classList.contains("favorite-btn")) return;

    const id = e.target.dataset.recipeId;
    toggleFavorite(id);
  };

  // ===============================
  // EVENT LISTENERS
  // ===============================
  const setupEventListeners = () => {
    searchInput?.addEventListener("input", handleSearchInput);
    clearSearchBtn?.addEventListener("click", clearSearch);
    recipeContainer?.addEventListener("click", handleFavoriteClick);
  };

  // ===============================
  // INIT
  // ===============================
  const init = () => {
    setupEventListeners();
    updateDisplay();
    console.log("RecipeJS Ready 🚀");
  };

  init();
})();