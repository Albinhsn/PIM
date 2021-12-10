const searchForm = document.querySelector("form");
const searchResultDiv = document.querySelector(".search-result");
const container = document.querySelector(".container");
let searchQuery = "";
const APP_ID = "ab24be7e";
const APP_key = "b34b014d9e8173560752aa70fd8713ee";


function search(id) {
    if (id === input) {
        searchQuery = document.querySelector(`#${id}`).value;
    } else {
        searchQuery = id
    }
    let x = "many"
    fetchAPI(x);
}

async function fetchAPI(x) {
    const baseURL = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_key}&from=0&to=12`;
    const response = await fetch(baseURL);
    const data = await response.json();
    if (x === "many") {
        generateHTML(data.hits);
        console.log(data + x);
    }
    else if (x === "specific") {
        console.log(data)
        generateSpecificRecipe(data.hits[0]);
    }
}


function generateHTML(results) {
    container.classList.remove("initial");
    let generatedHTML = "";
    console.log(results)
    results.map((result) => {
        generatedHTML += `
      <div class="item">
        <img src="${result.recipe.image}" alt="img">
        <div class="flex-container">
          <h1 class="title">${result.recipe.label}</h1>
          <a class="view-btn" onClick="showSpecificRecipe('${result.recipe.label}')" href="#popup">View Recipe</a>
        </div>
        ${result.recipe.cuisineType.length > 0
                ? result.recipe.cuisineType.map(cuisine => {
                    return `
            <a class="item-data">Cuisine: ${cuisine}</a>
          `
                })
                : "No cuisine found"
            }
      <a class="item-data">Cooking time: 
        ${result.recipe.totalTime > 0
                ? result.recipe.totalTime + ` min`
                : "None found"
            }
      <br>
      Servings: ${result.recipe.yield}
      </a>
      </div>
    `;
    });
    searchResultDiv.innerHTML = generatedHTML;
}
function generateSpecificRecipe(data) {
    let generatedHTML = ""
    let x = 0;
    generatedHTML += `
            <div class="Title">
                <h1 id="specific-recipe-title">${data.recipe.label}</h1>
                <h3 id="specific-recipe-subtitle">${data.recipe.subtitle}</h3>
                <p id="specific-recipe-description">${data.recipe.description}</p>
                <p id="specific-recipe-difficulty">${data.recipe.difficulty}</p>
                <p id="specific-recipe-category">${data.recipe.cuisineType}</p>
            </div>
            <h2>Ingredients:</h2>
            <ul id="specific-recipe-ingredients">
                ${data.recipe.ingredients.map(ingredient => {
                x++;
                return (
            `<li>
                        <h4 id="specific-ingredient-name${x}">${ingredient.food}</h4>
                        <h4 id="specific-ingredient-amount${x}">${ingredient.quantity}
                        ${ingredient.measure !== null
                ? ingredient.measure
                : ""
            }</h4>
                    </li>`
        )
    })}
            </ul>
        `
    let div = document.querySelector(".popup__text")
    document.querySelector("#specific-recipe-img").src = data.recipe.image
    div.innerHTML = "";
    div.innerHTML += generatedHTML
}

async function showSpecificRecipe(id) {
    console.log(id)
    let x = "specific"
    searchQuery = id;
    fetchAPI(x)

}