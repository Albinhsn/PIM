//Variabler: 
const APP_ID = "ab24be7e";
const APP_key = "b34b014d9e8173560752aa70fd8713ee";
let recipes = []
let recipeState = {
    id: 0,
    name: "",
    categoryId: "",
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
        deleteRecipe //Delete request for recipe by id
        updateRecipe //Update request for recipe by id
        postRecipe //Post request for recipe
        getRecipes //Get request for all recipes
        renderRecipes //Renders multiple recipes 
        editRecipe //Renders form for editing a saved recipe
*/
function setState(data) {
    recipeState.id = data.id
    recipeState.name = data.name
    recipeState.length_minutes = data.length_minutes
    recipeState.difficulty = data.difficulty
    recipeState.categoryId = data.category
    recipeState.description = data.description
    recipeState.ingredients = data.ingredients
    recipeState.image_url = data.image_url
    recipeState.categoryId = data.categoryId
}
function clearRecipeState(){
    recipeState = {
        id: 0,
        name: "",
        categoryId: 0,
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
async function fetchLocal(x) {
    recipes = []
    let input = "a"
    if(x === "search"){
    input = document.querySelector("#input").value
    }
    const response = await fetch(`/rest/recipes/name/${input}`)
    const data = await response.json();
    recipes = data
    renderRecipes();
}
//Formats api response data to recipeState
function setAPIrecipes(data) {
    recipes = []
    console.log(data)
    data.map(data =>{
        clearRecipeState();
        recipeState.name = data.recipe.label
        recipeState.categoryId = data.recipe.cuisineType[0]
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
    renderAPIRecipes();
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
        id: recipeState.id,
        name: document.querySelector("#form-name").value,
        categoryId: document.querySelector("#form-category").value,
        difficulty: document.querySelector("#form-difficulty").value,
        ingredients: document.querySelector("#form-ingredients").value,
        description: document.querySelector("#form-description").value,
        length_minutes: document.querySelector("#form-time").value,
        image_url: document.querySelector("#form-file").src
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
    let data = {
        id: recipeState.id,
        name: document.querySelector("#form-name").value,
        categoryId: document.querySelector("#form-category").value,
        difficulty: document.querySelector("#form-difficulty").value,
        ingredients: document.querySelector("#form-ingredients").value,
        description: document.querySelector("#form-description").value,
        length_minutes: document.querySelector("#form-time").value,
        image_url: document.querySelector("#form-file").src
    }
    setState(data)
    console.log(data)
    console.log(recipeState)
    let response = await fetch(`/rest/recipes`,{
        method: 'POST',
        body: JSON.stringify(recipeState)
    })
    console.log(response)
}
async function getRecipesByCategory(){
    response = await fetch(`/rest/recipes/categories/${recipeState.categoryId}`)
    recipes = await response.json();
    renderRecipes();
}
//Gets all recipes
async function getRecipes(){
    response = await fetch('/rest/recipes')
    recipes = await response.json()
    console.log("Get Recipes Clicked")
    console.log(recipes + " h")
    renderRecipes()
}
//Render recipes array
function renderRecipes(){
    let html = document.querySelector(`.search-result`)
    console.log("Render Recipes Clicked")
    html.innerHTML = ""
    recipes.map(recipe =>{
        html.innerHTML += 
        `
        <div class="recipe-card">
            <a href="recipe address by ID" onClick="renderSpecificRecipe('${recipe.name}', 'local')"><h1>${recipe.name}</h1></a>
           <figure>
		        <img src="${recipe.image_url}" alt="Cover image" />
	        </figure>
	
	        <div class="card-meta">
		        <p class="dish-type">${recipe.categoryId}</p>
		
		        <ul class="dish-stats">
			        <li>
				        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
					        <path d="M8 2C4.6875 2 2 4.6875 2 8C2 11.3125 4.6875 14 8 14C11.3125 14 14 11.3125 14 8C14 4.6875 11.3125 2 8 2Z" stroke-miterlimit="10"/>
					        <path d="M8 4V8.5H11" stroke-linecap="round" stroke-linejoin="round"/>
				        </svg>
			        </li>
		        </ul>
	        </div>
        </div >
        `
    })
}
function renderAPIRecipes() {
    let html = document.querySelector(`.search-result`)
    console.log("Render Recipes Clicked")
    html.innerHTML = "";
    recipes.map(recipe => {
        html.innerHTML +=
            `
        <div class="recipe-card">
            <a href="recipe address by ID" onClick="renderSpecificRecipe('${recipe.name}', 'API')"><h1>${recipe.name}</h1></a>
           <figure>
		        <img src="${recipe.image_url}" alt="Cover image" />
	        </figure>
	
	        <div class="card-meta">
		        <p class="dish-type">${recipe.categoryId}</p>
		
		        <ul class="dish-stats">
			        <li>
				        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
					        <path d="M8 2C4.6875 2 2 4.6875 2 8C2 11.3125 4.6875 14 8 14C11.3125 14 14 11.3125 14 8C14 4.6875 11.3125 2 8 2Z" stroke-miterlimit="10"/>
					        <path d="M8 4V8.5H11" stroke-linecap="round" stroke-linejoin="round"/>
				        </svg>
			        </li>
		        </ul>
	        </div>
        </div >
        `
    })
}

function editRecipe(id){
        for(let x = 0; x<recipes.length; x++){
            if(id === recipes[x].id){
                setState(recipes[x])
            }
        }

    console.log("Editing")
    console.log(recipeState)
    let html = document.querySelector(".search-result");
    html.innerHTML = "";
    //Render form to edit recipe
    html.innerHTML +=
    `
    <div class="edit-form">
        <div class="formbuilder-file form-group field-file-1639391348525">
        <label for="file-1639391348525" class="formbuilder-file-label">Välj Bild</label>
        <input type="file" class="form-control" src="" "name="file-1639391348525" access="false" multiple="false" id="form-file">
    </div>
    <div class="formbuilder-text form-group field-text-1639391406032">
        <label for="text-1639391406032" class="formbuilder-text-label">Name</label>
        <input type="text" value="${recipeState.name}" class="form-control" name="text-1639391406032" access="false" id="form-name">
    </div>
    <div class="formbuilder-select form-group field-select-1639391470543">
        <label for="select-1639391470543" class="formbuilder-select-label">Categories</label>
         <input type="text" value="${recipeState.categoryId}"class="form-control" name="text-1639391406032" access="false" id="form-category">
    </div>
    <div class="formbuilder-textarea form-group field-textarea-1639391425813">
        <label for="textarea-1639391425813" class="formbuilder-textarea-label">Ingredienser</label>
        <textarea type="textarea"  class="form-control" name="textarea-1639391425813" access="false" id="form-ingredients">${recipeState.ingredients}</textarea>
    </div>
    <div class="formbuilder-textarea form-group field-textarea-1639391371823">
        <label for="textarea-1639391371823" class="formbuilder-textarea-label">Description</label>
        <textarea type="textarea" placeholder="" class="form-control" name="textarea-1639391371823" access="false" id="form-description">${recipeState.description}</textarea>
    </div>
    <div class="formbuilder-number form-group field-number-1639391506859">
        <label for="number-1639391506859" class="formbuilder-number-label">Time</label>
        <input type="number" value="${recipeState.length_minutes}" placeholder="" class="form-control" name="number-1639391506859" access="false" id="form-time">
    </div>
    <div class="formbuilder-number form-group field-number-1639391494762">
        <label for="number-1639391494762" class="formbuilder-number-label">Difficulty</label>
        <input type="number" value="${recipeState.difficulty}" class="form-control" name="number-1639391494762" access="false" id="form-difficulty">
        <button class="view-btn"><a href="./index.html"onClick="updateRecipe(${id})">Submit!</a></button
    </div>
    `
    //Mappar ut categories arrayn ifall vi ska ha dem i en <select/>
    /*let x = document.querySelector("#form-category")
    x.innerHTML = "";
    categories.map(category =>{
        console.log(category+ " A")
        x += 
        `
            <option value="${category}">${category}<option/>
        `
    })*/
    setImage();
}
function createRecipe() {
    console.log("Creating")
    console.log(recipeState)
    let html = document.querySelector(".search-result");
    html.innerHTML = "";
    //Render form to edit recipe
    html.innerHTML +=
        `
    <div class="edit-form">
        <div class="formbuilder-file form-group field-file-1639391348525">
        <label for="file-1639391348525" class="formbuilder-file-label">Välj Bild</label>
        <input type="file" class="form-control" src="" "name="file-1639391348525" access="false" multiple="false" id="form-file">
    </div>
    <div class="formbuilder-text form-group field-text-1639391406032">
        <label for="text-1639391406032" class="formbuilder-text-label">Name</label>
        <input type="text" value="${recipeState.name}" class="form-control" name="text-1639391406032" access="false" id="form-name">
    </div>
    <div class="formbuilder-select form-group field-select-1639391470543">
        <label for="select-1639391470543" class="formbuilder-select-label">Categories</label>
         <input type="text" value="${recipeState.categoryId}"class="form-control" name="text-1639391406032" access="false" id="form-category">
    </div>
    <div class="formbuilder-textarea form-group field-textarea-1639391425813">
        <label for="textarea-1639391425813" class="formbuilder-textarea-label">Ingredienser</label>
        <textarea type="textarea"  class="form-control" name="textarea-1639391425813" access="false" id="form-ingredients">${recipeState.ingredients}</textarea>
    </div>
    <div class="formbuilder-textarea form-group field-textarea-1639391371823">
        <label for="textarea-1639391371823" class="formbuilder-textarea-label">Description</label>
        <textarea type="textarea" placeholder="" class="form-control" name="textarea-1639391371823" access="false" id="form-description">${recipeState.description}</textarea>
    </div>
    <div class="formbuilder-number form-group field-number-1639391506859">
        <label for="number-1639391506859" class="formbuilder-number-label">Time</label>
        <input type="number" value="${recipeState.length_minutes}" placeholder="" class="form-control" name="number-1639391506859" access="false" id="form-time">
    </div>
    <div class="formbuilder-number form-group field-number-1639391494762">
        <label for="number-1639391494762" class="formbuilder-number-label">Difficulty</label>
        <input type="number" value="${recipeState.difficulty}" class="form-control" name="number-1639391494762" access="false" id="form-difficulty">
        <button class="view-btn"><a onClick="postRecipe()">Submit!</a></button
    </div>
    `
    //Mappar ut categories arrayn ifall vi ska ha dem i en <select/>
    /*let x = document.querySelector("#form-category")
    x.innerHTML = "";
    categories.map(category =>{
        console.log(category+ " A")
        x += 
        `
            <option value="${category}">${category}<option/>
        `
    })*/
    setImage();
}
function editRecipe(id){
        for(let x = 0; x<recipes.length; x++){
            if(id === recipes[x].id){
                setState(recipes[x])
            }
        }

    console.log("Editing")
    console.log(recipeState)
    let html = document.querySelector(".search-result");
    html.innerHTML = "";
    //Render form to edit recipe
    html.innerHTML +=
    `
    <div class="edit-form">
        <div class="formbuilder-file form-group field-file-1639391348525">
        <label for="file-1639391348525" class="formbuilder-file-label">Välj Bild</label>
        <input type="file" class="form-control" src="" "name="file-1639391348525" access="false" multiple="false" id="form-file">
    </div>
    <div class="formbuilder-text form-group field-text-1639391406032">
        <label for="text-1639391406032" class="formbuilder-text-label">Name</label>
        <input type="text" value="${recipeState.name}" class="form-control" name="text-1639391406032" access="false" id="form-name">
    </div>
    <div class="formbuilder-select form-group field-select-1639391470543">
        <label for="select-1639391470543" class="formbuilder-select-label">Categories</label>
         <input type="text" value="${recipeState.categoryId}"class="form-control" name="text-1639391406032" access="false" id="form-category">
    </div>
    <div class="formbuilder-textarea form-group field-textarea-1639391425813">
        <label for="textarea-1639391425813" class="formbuilder-textarea-label">Ingredienser</label>
        <textarea type="textarea"  class="form-control" name="textarea-1639391425813" access="false" id="form-ingredients">${recipeState.ingredients}</textarea>
    </div>
    <div class="formbuilder-textarea form-group field-textarea-1639391371823">
        <label for="textarea-1639391371823" class="formbuilder-textarea-label">Description</label>
        <textarea type="textarea" placeholder="" class="form-control" name="textarea-1639391371823" access="false" id="form-description">${recipeState.description}</textarea>
    </div>
    <div class="formbuilder-number form-group field-number-1639391506859">
        <label for="number-1639391506859" class="formbuilder-number-label">Time</label>
        <input type="number" value="${recipeState.length_minutes}" placeholder="" class="form-control" name="number-1639391506859" access="false" id="form-time">
    </div>
    <div class="formbuilder-number form-group field-number-1639391494762">
        <label for="number-1639391494762" class="formbuilder-number-label">Difficulty</label>
        <input type="number" value="${recipeState.difficulty}" class="form-control" name="number-1639391494762" access="false" id="form-difficulty">
        <button class="view-btn"><a href="./index.html"onClick="updateRecipe(${id})">Submit!</a></button
    </div>
    `
    //Mappar ut categories arrayn ifall vi ska ha dem i en <select/>
    /*let x = document.querySelector("#form-category")
    x.innerHTML = "";
    categories.map(category =>{
        console.log(category+ " A")
        x += 
        `
            <option value="${category}">${category}<option/>
        `
    })*/
    setImage();
}
function setImage(){
    let html = document.querySelector("#form-file")
    html.src = recipeState.image_url
    console.log(html)
}

//Render recipeState
function renderSpecificRecipe(name, type){
    console.log("Rendering specific " + type)
    let html = document.querySelector(`.search-result`)
    console.log(recipeState)
    for(let x = 0; x<recipes.length; x++){
        if(recipes[x].name === name){
            setState(recipes[x])
            console.log(recipeState)
        }
    }
    console.log(type);
    html.innerHTML = "";
    //Map out recipeState object to html 
    html.innerHTML += 
    `
    <div class="item">
        <img src="${recipeState.image_url}">
        <div class="flex-container">
            <h1 class="title">${recipeState.name}</h1>
        </div>
        <p class="item-data">Cuisine: ${recipeState.categoryId}</p>
        <p class="item-data">${recipeState.ingredients}</p>
        <div class="specific"></div>
        <div class="deleteMe!"></div>
    </div>

    `
    if(type === "API"){
        let x = document.querySelector(".specific")
        x.innerHTML = ""
        x.innerHTML += `<a class="view-btn" href="" onClick="postRecipe()">Save Recipe</a>`
    }else if(type === "local"){
        let x = document.querySelector(".specific")
        x.innerHTML = ""
        x.innerHTML += `<a class="view-btn" onClick="editRecipe(${recipeState.id})">Edit Recipe</a>`

    }
}

