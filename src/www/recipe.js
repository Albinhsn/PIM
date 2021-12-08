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