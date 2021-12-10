var ingredientId = 0;
let ingredientArr = []
getCategories();

function getCategories(arr) {
    categories = ["Chicken", "Pizza", "Vegan", "Chinese", "American"]
    //renderCategories(arr);
    renderCategories(categories);
}

function renderCategories(categories) {
    html = document.querySelector("#new-recipe-category");

    for (let x = 0; x < categories.length; x++) {
        html.innerHTML +=
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
                <input type="text" class="new-recipe-ingredient-name" placeholder="name" value="name" id="name-ingredient${ingredientId}">
                <input type="text" class="new-recipe-ingredient-amount" placeholder="amount" value="amount" id="amount-ingredient${ingredientId}">
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
    if (index > -1) {
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
function renderRecipe(data) {
    console.log("Edit recipe")
    editRecipe(data);
}
function editRecipe(data) {
    let html = document.querySelector("#new-recipe-body")
    html.innerHTML = "";
    html.innerHTML +=
        `
            <div id="new-recipe-popup">
                <div id="new-recipe-leftside">
                        <img src="" alt="Image here" id="new-recipe-img">
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
                        <input type="text" placeholder="${data.Title}" id="new-recipe-title" value="title"><br>
                        <input type="text" placeholder="${data.Subtitle}" id="new-recipe-sub-title" value="subtitle"><br>
                        <label for="new-recipe-difficulty">Difficulty (1-10):</label>
                        <input type="number" id="new-recipe-difficulty" min="1" max="10" value="difficulty" placeholder="${data.Difficulty}"><br>
                        <label for="new-recipe-category">Category:</label>
                        <select id="new-recipe-category" name="recipe-category" placeholder="${data.Category}">
                            
                        </select><br>
                        <textarea type="text" placeholder="${data.Description}" id="new-recipe-description"></textarea><br>
                        <button type="button" onClick="submitRecipe()" id="submit-recipe-btn">Submit Recipe</button>
                    </form>
                </div>
            </div>
        `
    let ingredientHTML = document.querySelector("#new-recipe-form")
    ingredientHTML.innerHTML = "";
    ingredientHTML.innerHTML =
        ingredientId = 0
    ingredientArr = []
    for (let x = 0; x < data.Ingredients.length; x++) {
        addIngredient();
        nameHTML = document.querySelector(`#name-ingredient${ingredientId}`)
        amountHTML = document.querySelector(`#amount-ingredient${ingredientId}`)
        nameHTML.placeholder = `${data.Ingredients[x].Namn}`
        amountHTML.placeholder = `${data.Ingredients[x].Amount}`
    }

}
function submitRecipe() {
    console.log("submitted recipe")
    let title = document.querySelector("#new-recipe-title").value
    let subtitle = document.querySelector("#new-recipe-sub-title").value
    let description = document.querySelector("#new-recipe-description").value
    let difficulty = document.querySelector("#new-recipe-difficulty").value
    let category = document.querySelector("#new-recipe-category").value
    let img = document.querySelector("#new-recipe-img").src
    let ingredients = []
    for (let x of ingredientArr) {
        namn = document.querySelector(`#name-ingredient${x}`).value
        amount = document.querySelector(`#amount-ingredient${x}`).value
        ingredients.push(
            {
                Namn: namn,
                Amount: amount
            })
    }


    let doc = {
        Title: title,
        Subtitle: subtitle,
        Category: category,
        Description: description,
        Difficulty: difficulty,
        Image: img,
        Ingredients: ingredients
    }

    console.log(doc)
}