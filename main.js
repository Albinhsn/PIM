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

async function fetchAPI(x) {
    const baseURL = `https://api.edamam.com/search?q=${x}&app_id=${APP_ID}&app_key=${APP_key}&from=0&to=12`;
    const response = await fetch(baseURL);
    const data = await response.json();
    setAPIrecipes(data)
}
function setAPIrecipes(data) {
    recipes = []
    for (let x = 0; x < data.hits.length; x++) {
        clearRecipeState();
        recipeState.name = data.hits[x].recipe.label
        recipeState.category = data.hits[x].recipe.cuisineType[0]
        recipeState.image_url = data.hits[x].recipe.image
        recipeState.description = ""
        recipeState.difficulty = 0
        recipeState.length_minutes = ""
        recipeState.ingredients = []
        for (let y = 0; y < data.hits[x].recipe.ingredients.length; y++) {
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
//Hämtar kategorier från databasen
async function getCategories(){
    let data = await fetch("/rest/categories");
    console.log(data);
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
        body: recipeState
    })
    console.log(response)
}
//Updates recipeState
async function updateRecipe(){
    let response = await fetch(`/rest/recipes/${recipeState.id}`,{
        method: 'PUT',
        body: recipeState
    })
    console.log(response)
}
//Posts recipeState
async function postRecipe(){
    let response = await fetch(`/rest/recipes/${recipeState.id}`,{
        method: 'POST',
        body: recipeState
    })
}
//Gets all recipes
async function getRecipes(){
    recipes = await fetch('/rest/recipes')
    console.log(recipes)
}
//Render recipes array
function renderRecipes(id){
    let html = document.querySelector(`#${id}`)
    html.innerHTML = "";
    for(let x = 0; x<recipes.length; x++){
        //Adds html for a recipe card to corresponding div
        html.innerHTML += 
        `
        
        `    
    }
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
    </div>
    `
}
//Render recipeState
function renderSpecificRecipe(id){
    let html = document.querySelector(`${id}`)
    html.innerHTML = "";
    //Map out recipeState object to html 
    html.innerHTML += 
    `
    `
}