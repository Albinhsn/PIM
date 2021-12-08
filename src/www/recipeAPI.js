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
    fetchAPI();
}

async function fetchAPI() {
    const baseURL = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_key}&from=0&to=12`;
    const response = await fetch(baseURL);
    const data = await response.json();
    generateHTML(data.hits);
    console.log(data);
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
          <a class="view-btn" target="_blank" href="${result.recipe.url
            }">View Recipe</a>
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