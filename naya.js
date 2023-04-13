/*const mealsEl = document.getElementById("meals");
const favoriteContainer = document.getElementById("fav-meals");
const mealPopup = document.getElementById("meal-popup");
const mealInfoEl = document.getElementById("meal-info");
const popupCloseBtn = document.getElementById("close-popup");

const searchTerm = document.getElementById("search-term");
const searchBtn = document.getElementById("search");

getRandomMeal();
fetchFavMeals();

async function getRandomMeal() {
    const resp = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
    const respData = await resp.json();
    const randomMeal = respData.meals[0];
    addMeal(randomMeal, true);
}

async function getMealById(id) {
    const resp = await fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id);
    const respData = await resp.json();
    const meal = respData.meals[0];

    return meal;
}

async function getMealsBySearch(term) {
    const resp = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=" + term);
    const respData = await resp.json();
    const meals = respData.meals;
    return meals;
}

function addMeal(mealData, random = false) {
    console.log(mealData);



    const meal = document.createElement("div");
    meal.classList.add("meal");

    meal.innerHTML = `
        <div class="meal-header">
            ${random
            ? `
            <span class="random"> Random Recipe </span>`
            : ""
        }
            <img
                src="${mealData.strMealThumb}"
                alt="${mealData.strMeal}"
            />
        </div>
        <div class="meal-body">
            <h4>${mealData.strMeal}</h4>
            <button class="fav-btn">
                <i class="fas fa-heart"></i>
            </button>
        </div>
    `;

    const btn = meal.querySelector(".meal-body .fav-btn");

    btn.addEventListener("click", () => {
        if (btn.classList.contains("active")) {
            removeMealLS(mealData.idMeal);
            btn.classList.remove("active");
        }
        else {
            addMealLS(mealData.idMeal);
            btn.classList.add("active");
        }

        fetchFavMeals();
    });

    meal.addEventListener("click", () => {
        showMealInfo(mealData);
    });

    mealsEl.appendChild(meal);
}

function addMealLS(mealId) {
    const mealIds = getMealsLS();

    localStorage.setItem("mealIds", JSON.stringify([...mealIds, mealId]));
}

function removeMealLS(mealId) {
    const mealIds = getMealsLS();

    localStorage.setItem("mealIds", JSON.stringify(mealIds.filter((id) => id !== mealId)));
}*/
// Assigning HTML elements to variables
const mealsEl = document.getElementById("meals");
const favoriteContainer = document.getElementById("fav-meals");
const mealPopup = document.getElementById("meal-popup");
const mealInfoEl = document.getElementById("meal-info");
const popupCloseBtn = document.getElementById("close-popup");

const searchTerm = document.getElementById("search-term");
const searchBtn = document.getElementById("search");

// Display a random meal on page load
getRandomMeal();

// Fetch favorite meals and display them in the "favoriteContainer"
fetchFavMeals();

// Function to get a random meal from the API
async function getRandomMeal() {
const resp = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
const respData = await resp.json();
const randomMeal = respData.meals[0];
// Adding the random meal to the page
addMeal(randomMeal, true);
}

// Function to get a meal by ID from the API
async function getMealById(id) {
const resp = await fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id);
const respData = await resp.json();
const meal = respData.meals[0];
return meal;
}

// Function to get meals by search term from the API
async function getMealsBySearch(term) {
const resp = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=" + term);
const respData = await resp.json();
const meals = respData.meals;
return meals;
}

// Function to add a meal to the mealsEl container
function addMeal(mealData, random = false) {
// Creating a new div for the meal
const meal = document.createElement("div");
meal.classList.add("meal");
// Adding HTML to the meal div
meal.innerHTML = `
    <div class="meal-header">
        ${random
        ? `
        <span class="random"> Random Recipe </span>`
        : ""
    }
        <img
            src="${mealData.strMealThumb}"
            alt="${mealData.strMeal}"
        />
    </div>
    <div class="meal-body">
        <h4>${mealData.strMeal}</h4>
        <button class="fav-btn">
            <i class="fas fa-heart"></i>
        </button>
    </div>
`;

// Adding an event listener to the favorite button
const btn = meal.querySelector(".meal-body .fav-btn");
btn.addEventListener("click", () => {
    if (btn.classList.contains("active")) {
        removeMealLS(mealData.idMeal);
        btn.classList.remove("active");
    }
    else {
        addMealLS(mealData.idMeal);
        btn.classList.add("active");
    }
    fetchFavMeals();
});

// Adding an event listener to the meal div
meal.addEventListener("click", () => {
    showMealInfo(mealData);
});

// Adding the meal to the mealsEl container
mealsEl.appendChild(meal);
}

// Function to add a meal to local storage
function addMealLS(mealId) {
const mealIds = getMealsLS();
localStorage.setItem("mealIds", JSON.stringify([...mealIds, mealId]));
}

// Function to remove a meal from local storage
function removeMealLS(mealId) {
const mealIds = getMealsLS();
localStorage.setItem("mealIds", JSON.stringify(mealIds.filter((id) => id !== mealId)));
}

// Function to get an array of meal IDs from local storage*/

function getMealsLS() {
    const mealIds = JSON.parse(localStorage.getItem("mealIds"));

    return mealIds === null ? [] : mealIds;
}

// function to fetch meal from local storage
async function fetchFavMeals() {
    //clean the container
    favoriteContainer.innerHTML = "";

    const mealIds = getMealsLS();

    for (let i = 0; i < mealIds.length; i++) {
        const mealId = mealIds[i];
        meal = await getMealById(mealId);

        addMealFav(meal);
    }
}
// function to display favorite meal
function addMealFav(mealData) {
    const favMeal = document.createElement("li");

    favMeal.innerHTML = `
    <img
       src="${mealData.strMealThumb}"
       alt="${mealData.strMeal}"
    />
    <span>${mealData.strMeal}</span>
    <button class="clear"><i class="fas fa-window-close"></i></button>
    `;

    const btn = favMeal.querySelector(".clear");

    btn.addEventListener("click", () => {
        removeMealLS(mealData.idMeal);

        fetchFavMeals();
    });

    favMeal.addEventListener("click", () => {
        showMealInfo(mealData);
    });

    favoriteContainer.appendChild(favMeal);

}
function showMealInfo(mealData) {

    //clean it up
    mealInfoEl.innerHTML = "";

    //update the Meal Info

    const mealEl = document.createElement('div');

    const ingredients = [];

    for (let i = 1; i <= 20; i++) {
        if (mealData["strIngredient" + i]) {
            ingredients.push(
                `${mealData["strIngredient" + i]} - ${mealData["strMeasure" + i]}`
            );


        }
        else {
            break;
        }
    }

    mealEl.innerHTML = `
    <h1>${mealData.strMeal}</h1>
    <img
        src="${mealData.strMealThumb}"
        alt="${mealData.strMeal}"
    />

    <p>
      ${mealData.strInstructions}
    </p>

    <h3>Ingredients:</h3>
    <ul>
      ${ingredients.map((ing) => `
          <li>${ing}</li>
          `
    ).join("")}
    </ul>
    `;

    mealInfoEl.appendChild(mealEl);
    mealPopup.classList.remove("hidden");

}

searchBtn.addEventListener("click", async () => {
    //clean container
    mealsEl.innerHTML = "";

    const search = searchTerm.value;
    const meals = await getMealsBySearch(search);


    if (meals) {
        meals.forEach((meal) => {
            addMeal(meal);
        })
    }
});

popupCloseBtn.addEventListener("click", () => {
    mealPopup.classList.add("hidden");
});
