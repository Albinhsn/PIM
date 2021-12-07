var ingredientId = 0;
renderImage();
getCategories();

function renderNewRecipe(){
    html = document.querySelector(".new-recipe")
    html.innerHTML=
    `
    `
}

function getCategories(arr){
    categories = ["Chicken", "Pizza", "Vegan", "Chinese", "American"]
    renderCategories(categories);
}

function renderCategories(categories){
    html = document.querySelector("#new-recipe-category");

    for(let x = 0; x<categories.length;x++){
        html.innerHTML +=
        `
            <option value="${categories[x]}">${categories[x]}</option>
        `
    }
}
function addIngredient(){
    
    html = document.querySelector("#new-recipe-form")
    html.innerHTML += 
        `
            <div id="ingredient${ingredientId}">
                <input type="text" class="new-recipe-ingredient-name" placeholder="name">
                <input type="text" class="new-recipe-ingredient-amount" placeholder="amount">
                <button type="button" onClick="removeIngredient(this)" id="add-ingredient-btn">X</button>
                <br>
            </div>
        `
    ingredientId += 1;
}
function removeIngredient(parent){
    id = parent.parentNode.id;
    html = document.querySelector(`#${id}`)
    html.remove()
    
}

function addImage(){
    var image = document.getElementById("upload").files[0];
    
    var reader = new FileReader();
    reader.onload = function(e){
        document.getElementById("new-recipe-img").src = e.target.result
    }
    reader.readAsDataURL(image);
}

function submitRecipe(){
    console.log("submitted recipe")
    //TODO: Create recipe doc to submit
}