// Recipe Data
const recipes = [
    {
        id: 1,
        title: "Classic Spaghetti Carbonara",
        time: 25,
        difficulty: "easy",
        description: "A creamy Italian pasta dish made with eggs, cheese, pancetta, and black pepper.",
        category: "pasta"
    },
    {
        id: 2,
        title: "Chicken Tikka Masala",
        time: 45,
        difficulty: "medium",
        description: "Tender chicken pieces in a creamy, spiced tomato sauce.",
        category: "curry"
    },
    {
        id: 3,
        title: "Homemade Croissants",
        time: 180,
        difficulty: "hard",
        description: "Buttery, flaky French pastries that require patience but deliver amazing results.",
        category: "baking"
    },
    {
        id: 4,
        title: "Greek Salad",
        time: 15,
        difficulty: "easy",
        description: "Fresh vegetables, feta cheese, and olives tossed in olive oil and herbs.",
        category: "salad"
    },
    {
        id: 5,
        title: "Beef Wellington",
        time: 120,
        difficulty: "hard",
        description: "Tender beef fillet coated with mushroom duxelles and wrapped in puff pastry.",
        category: "meat"
    },
    {
        id: 6,
        title: "Vegetable Stir Fry",
        time: 20,
        difficulty: "easy",
        description: "Colorful mixed vegetables cooked quickly in a savory sauce.",
        category: "vegetarian"
    },
    {
        id: 7,
        title: "Pad Thai",
        time: 30,
        difficulty: "medium",
        description: "Thai stir-fried rice noodles with shrimp, peanuts, and tangy tamarind sauce.",
        category: "noodles"
    },
    {
        id: 8,
        title: "Margherita Pizza",
        time: 60,
        difficulty: "medium",
        description: "Classic Italian pizza with fresh mozzarella, tomatoes, and basil.",
        category: "pizza"
    }
];

// DOM Selection
const recipeContainer = document.querySelector('#recipe-container');

// Create Recipe Card
const createRecipeCard = (recipe) => {
    return `
        <div class="recipe-card" data-id="${recipe.id}">
            <h3>${recipe.title}</h3>
            <div class="recipe-meta">
                <span>⏱️ ${recipe.time} min</span>
                <span class="difficulty ${recipe.difficulty}">${recipe.difficulty}</span>
            </div>
            <p>${recipe.description}</p>
        </div>
    `;
};

// Render Recipes
const renderRecipes = (recipesToRender) => {
    const recipeCardsHTML = recipesToRender
        .map(createRecipeCard)
        .join('');
    
    recipeContainer.innerHTML = recipeCardsHTML;
};
let currentFilter = "all";
let currentSort = "none";
const filterButtons = document.querySelectorAll("[data-filter]");
const sortButtons = document.querySelectorAll("[data-sort]");
const filterByDifficulty = (recipes, difficulty) => {
    return recipes.filter(recipe => recipe.difficulty === difficulty);
};

const filterByTime = (recipes, maxTime) => {
    return recipes.filter(recipe => recipe.time < maxTime);
};

const applyFilter = (recipes, filterType) => {
    switch (filterType) {
        case "easy":
        case "medium":
        case "hard":
            return filterByDifficulty(recipes, filterType);
        case "quick":
            return filterByTime(recipes, 30);
        default:
            return recipes;
    }
};
const sortByName = (recipes) => {
    return [...recipes].sort((a, b) =>
        a.title.localeCompare(b.title)
    );
};

const sortByTime = (recipes) => {
    return [...recipes].sort((a, b) =>
        a.time - b.time
    );
};

const applySort = (recipes, sortType) => {
    switch (sortType) {
        case "name":
            return sortByName(recipes);
        case "time":
            return sortByTime(recipes);
        default:
            return recipes;
    }
};
const updateActiveButtons = () => {

    filterButtons.forEach(btn => {
        btn.classList.remove("active");
        if (btn.dataset.filter === currentFilter) {
            btn.classList.add("active");
        }
    });

    sortButtons.forEach(btn => {
        btn.classList.remove("active");
        if (btn.dataset.sort === currentSort) {
            btn.classList.add("active");
        }
    });
};
const updateDisplay = () => {

    let recipesToDisplay = recipes;

    recipesToDisplay = applyFilter(recipesToDisplay, currentFilter);
    recipesToDisplay = applySort(recipesToDisplay, currentSort);

    renderRecipes(recipesToDisplay);
    updateActiveButtons();

    console.log(
        `Displaying ${recipesToDisplay.length} recipes (Filter: ${currentFilter}, Sort: ${currentSort})`
    );
};
filterButtons.forEach(button => {
    button.addEventListener("click", (event) => {
        currentFilter = event.target.dataset.filter;
        updateDisplay();
    });
});

sortButtons.forEach(button => {
    button.addEventListener("click", (event) => {
        currentSort = event.target.dataset.sort;
        updateDisplay();
    });
});

// Initialize App
updateDisplay();

