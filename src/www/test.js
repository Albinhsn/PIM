class MeatType {
    Title;
    Url;
    Id;
    constructor(title, url, id) {
        this.Title = title;
        this.Url = url;
        this.Id = id;
    }
}

var searchItems = document.getElementById("meatCategory");
const meat = [
    new MeatType("Vegitarien", "vegitarien.jpg", "vegitarien"),
    new MeatType("Beef/Pork", "beef.jpg", "beef"),
    new MeatType("Chicken", "Chicken.jpg", "chicken"),
    new MeatType("Pizza", "Pizza.jpg", "pizza"),
    new MeatType("test", "test.jpg", "pizza")
];

meat.forEach(proteinSource => {
    searchItems.innerHTML += `
        <div class="item">
        <img src="./${proteinSource.Url}" alt="">
        <div class="flex-container">
        <h1 class="title">${proteinSource.Title}</h1>
        <button class="view-btn" href="#" onClick=search("${proteinSource.Id}")>Search</button>
        </div>
        </div>
    `
});