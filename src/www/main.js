//Variabler: 
const APP_ID = "ab24be7e";
const APP_key = "b34b014d9e8173560752aa70fd8713ee";
let categories = []
let recipes = []
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

/*
    Funktioner:
        setState
        fetchAPI //Gets api recipes 
        setAPIrecipes //refactors API format to recipeState and saves in recipes
        getCategories //Fetch categories from database
        renderCategories //Renders them in select 
        addImage //Adds html to add image/file
        deleteRecipe //Delete request for recipe by id
        updateRecipe //Update request for recipe by id
        postRecipe //Post request for recipe
        getRecipes //Get request for all recipes
        renderRecipes //Renders multiple recipes 
        editRecipe //Renders form for editing a saved recipe
*/
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
        id: 0,
        name: "",
        category_id: 0,
        difficulty: 0,
        ingredients: "",
        description: "",
        length_minutes: 0,
        image_url: ""
    }
    console.log(recipeState)
}
async function fetchAPI() {
    let x = document.querySelector("#apiSearch").value
    console.log(x)
    const baseURL = `https://api.edamam.com/search?q=${x}&app_id=${APP_ID}&app_key=${APP_key}&from=0&to=12`;
    const response = await fetch(baseURL);
    const data = await response.json();
    console.log(data)
    setAPIrecipes(data.hits)
}
//Formats api response data to recipeState
function setAPIrecipes(data) {
    recipes = []
    console.log(data)
    data.map(data =>{
        clearRecipeState();
        recipeState.name = data.recipe.label
        recipeState.category_id = data.recipe.cuisineType[0]
        recipeState.difficulty = 0,
        data.recipe.ingredients.map(ingredient =>{
            recipeState.ingredients += ingredient.text + "\n"
        })
        recipeState.description = "",
        recipeState.length_minutes = data.recipe.totalTime > 0 
            ? data.recipe.totalTime 
            : 0,
        recipeState.image_url = data.recipe.image
        recipes.push(recipeState)
    })
    console.log(recipes)
    renderRecipes();
}
//Hämtar kategorier från databasen
async function getCategories(){
    let data = await fetch("/rest/categories");
    console.log(data.json())
    //Set categories as data

}
//Renderar kategorier till ett visst id
function renderCategories() {
    html = document.querySelector(`#select-1639391470543`);
    for (let x = 0; x < categories.length; x++) {
        html.innerHTML +=
            `
            <option value="${categories[x]}">${categories[x]}</option>
        `
    }
}
//Ability to add an image to new/edit recipe
function addImage() {
    var image = document.getElementById("upload").files[0];

    var reader = new FileReader();
    reader.onload = function (e) {
        document.getElementById("new-recipe-img").src = e.target.result
    }
    reader.readAsDataURL(image);
}

//CRUD för recept
//Deletes a recipe
async function deleteRecipe() {
    let response = await fetch(`/rest/recipes/${recipeState.id}`, {
        method: 'DELETE',
        body: JSON.stringify(recipeState)
    })
    console.log(response)
}
//Updates recipeState
async function updateRecipe(){
    //Get data from form and set recipeState
    let data = {
        name: document.querySelector(""),
        category_id: document.querySelector(""),
        difficulty: document.querySelector(""),
        ingredients: document.querySelector(""),
        description: document.querySelector(""),
        length_minutes: document.querySelector(""),
        image_url: document.querySelector("")
    }
    setState(data)

    let response = await fetch(`/rest/recipes/${recipeState.id}`,{
        method: 'PUT',
        body: JSON.stringify(recipeState)
    })
    console.log(response)
}
//Posts recipeState
async function postRecipe(){
    console.log("Posting recipe")
    let response = await fetch(`/rest/recipes`,{
        method: 'POST',
        body: JSON.stringify(recipeState)
    })
    console.log(response)
}
async function getRecipesByCategory(){
    response = await fetch(`/rest/recipes/categories/${recipeState.category_id}`)
    recipes = await response.json();
    renderRecipes();
}
//Gets all recipes
async function getRecipes(){
    response = await fetch('/rest/recipes')
    recipes = await response.json()
    renderRecipes()
}
//Render recipes array
function renderRecipes(){
    let html = document.querySelector(`.test`)
    console.log(recipes)
    html.innerHTML = "";
    recipes.map(recipe =>{
        html.innerHTML += 
        `
            <div>${recipe.name}
                <a onClick="renderSpecificRecipe(${recipe.name})">X</a>
            </div>
        `
    })
}

//Passes id as parameter to edit certain recipe
function editRecipe(id){
    for(let x = 0; x<recipes.length; x++){
        if(id === recipes[x].id){
            setState(recipes[x])
        }
    }
    let html = document.querySelector("");
    html.innerHTML = "";
    //Render form to edit recipe
    html.innerHTML +=
    `
        <div class="formbuilder-file form-group field-file-1639391348525">
        <label for="file-1639391348525" class="formbuilder-file-label">File Upload</label>
        <input type="file" class="form-control" name="file-1639391348525" access="false" multiple="false" id="file-1639391348525">
    </div>
    <div class="formbuilder-text form-group field-text-1639391406032">
        <label for="text-1639391406032" class="formbuilder-text-label">Name</label>
        <input type="text" class="form-control" name="text-1639391406032" access="false" id="text-1639391406032">
    </div>
    <div class="formbuilder-select form-group field-select-1639391470543">
        <label for="select-1639391470543" class="formbuilder-select-label">Categories</label>
        <select class="form-control" name="select-1639391470543" id="select-1639391470543">
           
        </select>
    </div>
    <div class="formbuilder-textarea form-group field-textarea-1639391425813">
        <label for="textarea-1639391425813" class="formbuilder-textarea-label">Ingredienser</label>
        <textarea type="textarea" class="form-control" name="textarea-1639391425813" access="false" id="textarea-1639391425813"></textarea>
    </div>
    <div class="formbuilder-textarea form-group field-textarea-1639391371823">
        <label for="textarea-1639391371823" class="formbuilder-textarea-label">Description</label>
        <textarea type="textarea" class="form-control" name="textarea-1639391371823" access="false" id="textarea-1639391371823"></textarea>
    </div>
    <div class="formbuilder-number form-group field-number-1639391506859">
        <label for="number-1639391506859" class="formbuilder-number-label">Time</label>
        <input type="number" class="form-control" name="number-1639391506859" access="false" id="number-1639391506859">
    </div>
    <div class="formbuilder-number form-group field-number-1639391494762">
        <label for="number-1639391494762" class="formbuilder-number-label">Difficulty</label>
        <input type="number" class="form-control" name="number-1639391494762" access="false" id="number-1639391494762">
        <a onClick="updateRecipe()">X</a>
    </div>
    `
}
//Render recipeState
function renderSpecificRecipe(y){
    console.log("Rendering specific")
    let html = document.querySelector(`.test`)
    for(let x = 0; x<recipes.length; x++){
        if(recipes[x].name === y){
            setState(recipes[x])
        }
    }
    html.innerHTML = "";
    //Map out recipeState object to html 
    html.innerHTML += 
    `
    <h2>${recipeState.name}</h2>
    <a onClick="postRecipe()">Submit</a>
    `
}