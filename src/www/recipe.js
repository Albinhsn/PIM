
var ingredientId = 0;
let ingredientArr = []
const APP_ID = "ab24be7e";
const APP_key = "b34b014d9e8173560752aa70fd8713ee";
getLocalRecipes();

let recipes = []
let recipeState = {
    Title: '',
    Subtitle: '',
    Difficulty: 1,
    Category: '',
    Description: '',
    Ingredients: [],
    Image: '',
    Id: ''
}

function setState(data){
    recipeState.Title = data.Title
    recipeState.Subtitle = data.Subtitle
    recipeState.Difficulty = data.Difficulty
    recipeState.Category = data.Category
    recipeState.Description = data.Description
    recipeState.Ingredients = data.Ingredients
    recipeState.Image = data.Image
}
function getAPIrecipes(id){

}

function getCategories(arr) {
    categories = ["Chicken", "Pizza", "Vegan", "Chinese", "American"]
    //renderCategories(arr);
    renderCategories(categories);
}

function renderCategories(categories) {
    html = document.querySelector("#new-recipe-category");
    html2 = document.querySelector("#new-recipe-category")
    for (let x = 0; x < categories.length; x++) {
        html.innerHTML +=
            `
            <option value="${categories[x]}">${categories[x]}</option>
        `
        html2.innerHTML +=
            `
            <option value="${categories[x]}">${categories[x]}</option>
        `
    }
}
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

function addImage() {
    var image = document.getElementById("upload").files[0];

    var reader = new FileReader();
    reader.onload = function (e) {
        document.getElementById("new-recipe-img").src = e.target.result
    }
    reader.readAsDataURL(image);
}
async function createRecipe(){
    let response = await fetch('/rest/recipes',{
        method: 'POST',
        body: recipeState
    })
    console.log(response)
}
function renderRecipes(){
    console.log(recipes)
}
async function getLocalRecipes(){
    recipes = await fetch('/rest/recipes')
    renderRecipes()
}
async function getRecipeByName(name){
    let data = await fetch(`/rest/${name}`)
    console.log(data)
    setState(data)
}
function deleteRecipe(id){
    let deleteResponse = await fetch(`/rest/recipes/${id}`)
    console.log(deleteResponse)
}
function renderSpecificRecipe(data){
    let html = document.querySelector("#popup")
    html.innerHTML = "";
    html.innerHTML += 
        `
          
        `
}
function getCurrentRecipe() {
    recipeState.Title = document.querySelector("#specific-recipe-title").innerHTML

    if (document.querySelector("#specific-recipe-difficulty").innerHTML == 'undefined') {
        recipeState.Difficulty = 1
    } else {
        recipeState.Difficulty = document.querySelector("#specific-recipe-difficulty").innerHTML
    }
    if (document.querySelector("#specific-recipe-category").innerHTML == 'undefined') {
        recipeState.Category = ""
    } else {
        recipeState.Category = document.querySelector("#specific-recipe-category").innerHTML
    }

    if (document.querySelector("#specific-recipe-description").innerHTML == 'undefined') {
        recipeState.Description = ""
    } else {
        recipeState.Description = document.querySelector("#specific-recipe-description").innerHTML
    }
    if (document.querySelector("#specific-recipe-subtitle").innerHTML == 'undefined') {
        recipeState.Subtitle = ""
    } else {
        recipeState.Subtitle = document.querySelector("#specific-recipe-subtitle").innerHTML
    }
    recipeState.Image = document.querySelector("#specific-recipe-img").src
    coll = document.getElementById("specific-recipe-ingredients").getElementsByTagName("li")
    console.log(coll.length)
    recipeState.Ingredients = []
    for (let x = 1; x < coll.length + 1; x++) {
        let doc = {
            Name: document.querySelector(`#specific-ingredient-name${x}`).innerHTML,
            Amount: document.querySelector(`#specific-ingredient-amount${x}`).innerHTML
        }
        recipeState.Ingredients.push(doc)
    }
    console.log(recipeState)
}
function editRecipe() {
    let html = document.querySelector("#new-recipe-body")
    html.innerHTML = "";
    html.innerHTML +=
        `
            <div id="new-recipe-popup">
                <div id="new-recipe-leftside">
                        <img src="${recipeState.Image}" alt="Image here" id="new-recipe-img">
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
                        <input type="text" placeholder="${recipeState.Title}" id="new-recipe-title"><br>
                        <input type="text" placeholder="${recipeState.Subtitle}" id="new-recipe-sub-title"><br>
                        <label for="new-recipe-difficulty">Difficulty (1-10):</label>
                        <input type="number" id="new-recipe-difficulty" min="1" max="10" placeholder="${recipeState.Difficulty}"><br>
                        <label for="new-recipe-category">Category:</label>
                        <select id="new-recipe-category" name="recipe-category" placeholder="${recipeState.Category}">
                            
                        </select><br>
                        <textarea type="text" placeholder="${data.Description}" id="new-recipe-description"></textarea><br>
                        <button type="button" onClick="submitRecipe()"  href="#popup" id="submit-recipe-btn">Submit Recipe</button>
                    </form>
                </div>
            </div>
        `
    let ingredientHTML = document.querySelector("#new-recipe-form")
    getCategories();
    ingredientHTML.innerHTML = "";
        ingredientId = 0
    ingredientArr = []
    console.log(data.Ingredients.length)
    for (let x = 0; x < data.Ingredients.length; x++) {
        addIngredient();
        console.log(ingredientId)
        console.log(data.Ingredients[x].Name)
        nameHTML = document.querySelector(`#name-ingredient${x}`)
        amountHTML = document.querySelector(`#amount-ingredient${x}`)
        nameHTML.placeholder = ""
        amountHTML.placeholder = ""
        nameHTML.placeholder = data.Ingredients[x].Name
        amountHTML.placeholder = data.Ingredients[x].Amount
        console.log(amountHTML.placeholder)
    }

}



function updateRecipe() {
    console.log("submitted recipe")
    recipeState.Title = document.querySelector("#new-recipe-title").value
    recipeState.Subtitle = document.querySelector("#new-recipe-sub-title").value
    recipeState.Description = document.querySelector("#new-recipe-description").value
    recipeState.Difficulty = document.querySelector("#new-recipe-difficulty").value
    recipeState.Category = document.querySelector("#new-recipe-category").value
    recipeState.Image = document.querySelector("#new-recipe-img").src
    recipeState.Ingredients = []
    for (let x of ingredientArr) {
        namn = document.querySelector(`#name-ingredient${x}`).value
        amount = document.querySelector(`#amount-ingredient${x}`).value
        recipeState.Ingredients.push(
            {
                Namn: namn,
                Amount: amount
            })
    }


    

    console.log(recipeState)
}

async function fetchAPI(x) {
    const baseURL = `https://api.edamam.com/search?q=${x}&app_id=${APP_ID}&app_key=${APP_key}&from=0&to=12`;
    const response = await fetch(baseURL);
    const data = await response.json();
    setAPIrecipes(data)
}
function setAPIrecipes(data){
    console.log(data)
}



