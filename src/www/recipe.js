var ingredientId = 0;
let ingredientArr = []
const APP_ID = "ab24be7e";
const APP_key = "b34b014d9e8173560752aa70fd8713ee";
const categories = ["Chicken", "Pizza", "Vegan", "Chinese", "American"]
//Array for collection of recipes (local or api)
let recipes = []
//Init recipeState
let recipeState = {
    id: 0,
    name: "",
    category_id: 0,
    difficulty: 0,
    ingredients: "",
    description: "",
    length_minutes: 0,
    image_url: ""
}
function setState(data) {
    recipeState.name = data.name
    recipeState.length_minutes = data.length_minutes
    recipeState.difficulty = data.difficulty
    recipeState.category_id = data.category
    recipeState.description = data.description
    recipeState.ingredients = data.ingredients
    recipeState.image_url = data.image_url
}
function clearRecipeState(){
    recipeState = {
        name: '',
        length_minutes: 1,
        difficulty: 1,
        category: '',
        description: '',
        ingredients: [],
        image_url: '',
        id: ''
    }
    setState(recipeState)
}

//Renders categories to a select tag with id passed as parameter
function renderCategories(id) {
    html = document.querySelector(`#${id}`);
    for (let x = 0; x < categories.length; x++) {
        html.innerHTML +=
            `
            <option value="${categories[x]}">${categories[x]}</option>
        `
    }
}
//Adds another input element for ingredient
function addIngredient() {
    html = document.querySelector("#new-recipe-form")
    html.innerHTML +=
        `
            <div id="ingredient${ingredientId}">
                <input type="text" class="new-recipe-ingredient-name" placeholder="name" id="name-ingredient${ingredientId}">
                <input type="text" class="new-recipe-ingredient-amount" placeholder="amount" id="amount-ingredient${ingredientId}">
                <button type="button" onClick="removeIngredient(this)" id="add-ingredient-btn">X</button>
                <br>
            </div>
        `
    ingredientArr.push(ingredientId)
    ingredientId += 1;
}
//Removes an input element for ingredient
function removeIngredient(parent) {
    id = parent.parentNode.id;
    html = document.querySelector(`#${id}`)
    html.remove()
    id = id.replace("ingredient", "")
    index = ingredientArr.indexOf(parseInt(id))
    if(index > -1){
        ingredientArr.splice(index, 1)
    }
}
//Add image to input form
function addImage() {
    var image = document.getElementById("upload").files[0];

    var reader = new FileReader();
    reader.onload = function (e) {
        document.getElementById("new-recipe-img").src = e.target.result
    }
    reader.readAsDataURL(image);
}
//Sends delete request for current recipestate
async function deleteRecipe(){
    let response = await fetch(`/rest/recipes/${recipeState.id}`, {
        method: 'DELETE',
        body: recipeState
    })
    console.log(response)
}
//Renders the current array of recipes
function renderRecipes(){
    console.log(recipes)
    let generatedHTML = "";
    recipes.map((recipe =>{
        generatedHTML +=
        `
            <div class="item">
        <img src="${recipe.image_url}" alt="img">
        <div class="flex-container">
          <h1 class="title">${recipe.name}</h1>
          <a class="view-btn" onClick="renderSpecificRecipe('${recipe.name}')" href="#popup">View Recipe</a>
        </div>
        ${recipe.category != undefined
            ? `${recipe.category}`
            : "No cuisine found"
        }
      </div>  
        `
    }))
    document.querySelector(".search-result").innerHTML = ""
    document.querySelector(".search-result").innerHTML = generatedHTML
}
//Render specific recipe based on recipeState
function renderSpecificRecipe(title){
    for(let x = 0; x<recipes.length; x++){
        if(recipes[x].name === title){
            setState(recipes[x])
        }
    }
    let generatedHTML = ""
    let x = 0;
    generatedHTML += 
        `
        <div class="popup-inner">  
            <img src="${recipeState.image_url}" alt="Image here" id="new-recipe-img">
            <div class="Title">
                <h1 class="popup__text" id="specific-recipe-title">${recipeState.name}</h1>
                <h3 class="popup__text" id="specific-recipe-length">${recipeState.length_minutes}</h3>
                <p class="popup_text" id="specific-recipe-description">${recipeState.description}</p>
                <p class="popup__text" id="specific-recipe-difficulty">${recipeState.difficulty}</p>
                <p class="popup__text" id="specific-recipe-category">${recipeState.category}</p>
            </div>
            <h2>Ingredients:</h2>
            <ul id="specific-recipe-ingredients">
                ${recipeState.ingredients.map(ingredient => {
                    x++;
                    return (
                        `<li>
                        <h4 id="specific-ingredient-name${x}">${ingredient.Name}</h4>
                        <h4 id="specific-ingredient-amount${x}">${ingredient.Amount}</h4>
                    </li>`
                    )
                })}
            </ul>
            <a href="#popup2" class="button2" onClick="editRecipe()">X</a>
            </div>
        `
    let div = document.querySelector("#popup")
    console.log(div)
    div.innerHTML = "";
    div.innerHTML += generatedHTML

}

//Renders a recipe body based on recipeState
function editRecipe(type) {
    console.log(recipeState)
    let html = document.querySelector("#new-recipe-body")
    html.innerHTML = "";
    html.innerHTML +=
        `
            <div id="new-recipe-popup">
                <div id="new-recipe-leftside">
                        <img src="${recipeState.image_url}" alt="Image here" id="new-recipe-img">
                        <input type="file" id="upload" onChange="addImage()"/>
                    <div id="new-recipe-leftside-header">
                        <h2>Ingredienser:</h2>
                        <button type="button" onClick="addIngredient()" id="add-ingredient-btn">Add ingredient</button>
                    </div>    
                        <form id="new-recipe-form">
                        </form>
                </div>
                <div id="new-recipe-rightside">
                    <form>
                        <input type="text" placeholder="${recipeState.name}" id="new-recipe-title"><br>
                        <input type="text" placeholder="${recipeState.length_minutes}" id="new-recipe-length"><br>
                        <label for="new-recipe-difficulty">Difficulty (1-10):</label>
                        <input type="number" id="new-recipe-difficulty" min="1" max="10" placeholder="${recipeState.Difficulty}"><br>
                        <label for="new-recipe-category">Category:</label>
                        <select id="new-recipe-category" name="recipe-category">
                            
                        </select><br>
                        <textarea type="text" placeholder="${recipeState.Description}" id="new-recipe-description"></textarea><br>
                        <a class="view-btn" onClick="updateRecipe("${type}")"  href="#popup" id="submit-recipe-btn">Submit Recipe!!</a>
                    </form>
                </div>
            </div>
        `
    let ingredientHTML = document.querySelector("#new-recipe-form")
    renderCategories("new-recipe-category")
    ingredientHTML.innerHTML = "";
    ingredientId = 0
    ingredientArr = []
    console.log(recipeState.ingredients[1])
    for (let x = 0; x < recipeState.ingredients.length; x++) {
        addIngredient();
        nameHTML = document.querySelector(`#name-ingredient${x}`)
        amountHTML = document.querySelector(`#amount-ingredient${x}`)
        nameHTML.placeholder = ""
        amountHTML.placeholder = ""
        nameHTML.placeholder = recipeState.ingredients[x].Name
        amountHTML.placeholder = recipeState.ingredients[x].Amount
    }
}


//Creates new form
function createNewRecipe() {
    recipeState.name = "Title"
    recipeState.length_minutes = 1
    recipeState.description = "Description"
    editRecipe("post")
}
async function fetchAPI(x) {
    const baseURL = `https://api.edamam.com/search?q=${x}&app_id=${APP_ID}&app_key=${APP_key}&from=0&to=12`;
    const response = await fetch(baseURL);
    const data = await response.json();
    setAPIrecipes(data)
}
function setAPIrecipes(data){
    recipes = []
    for(let x = 0; x<data.hits.length; x++){
        clearRecipeState();
        recipeState.name = data.hits[x].recipe.label
        recipeState.category = data.hits[x].recipe.cuisineType[0]
        recipeState.image_url = data.hits[x].recipe.image
        recipeState.description = ""
        recipeState.difficulty = 0
        recipeState.length_minutes = ""
        recipeState.ingredients = []
        for(let y = 0; y<data.hits[x].recipe.ingredients.length; y++){
            let doc = {
                Name: data.hits[x].recipe.ingredients[y].food,
                Amount: data.hits[x].recipe.ingredients[y].quantity + " " + data.hits[x].recipe.ingredients[y].measure
            }
            recipeState.ingredients.push(doc)
        }
        recipes.push(recipeState)
    }
    renderRecipes();
}

//Requests for all recipes
async function getLocalRecipes() {
    let recipes = []
    recipes = await fetch('/rest/recipes')
    renderRecipes()
}
//Requets recipe by id
async function getRecipeByName() {
    let data = await fetch(`/rest/${recipeState.id}`)
    console.log(data)
    setState(data)
}
//Delete request for recipe by id
async function deleteRecipe() {
    let deleteResponse = await fetch(`/rest/recipes/${recipeState.id}`)
    console.log(deleteResponse)
}
//Posts and update recipe
async function updateRecipe() {
    console.log("submitted recipe")
    recipeState.name = document.querySelector("#new-recipe-title").value
    recipeState.length_minutes = document.querySelector("#new-recipe-length").value
    recipeState.description = document.querySelector("#new-recipe-description").value
    recipeState.difficulty = document.querySelector("#new-recipe-difficulty").value
    recipeState.category = document.querySelector("#new-recipe-category").value
    recipeState.image_url = document.querySelector("#new-recipe-img").src
    recipeState.ingredients = []
    for (let x of ingredientArr) {
        namn = document.querySelector(`#name-ingredient${x}`).value
        amount = document.querySelector(`#amount-ingredient${x}`).value
        recipeState.ingredients.push(
            {
                Namn: namn,
                Amount: amount
            })
        
        }
    console.log(JSON.stringify(recipeState))
    try {
        let response = await fetch(`/rest/recipes`, {
            method: 'POST',
            body: JSON.stringify(recipeState)
        })
    } catch (error) {
        console.log(error)
    }

    console.log(response)


}
