// This is the own recipe class (recipe component)
// (located at Backend ie. src/com.company/)
// 2021-12-10 01:57


public class Recipe {
    // Variable declaration
    private int id;
    private String name;
    private int category_id;
    private int difficulty;
    private String ingrediens;
    private String description;
    private int length_minutes;
    private String image_url;


    // Constructors
    public Recipe() {
    }

    public Recipe (int id) {
        this.id = id;
    }

    public Recipe (String name) {
        this.name = name;
    }

    public Recipe (int category_id) {
        this.category_id = category_id;
    }

    public Recipe (int difficulty) {
        this.difficulty = difficulty;
    }

    public Recipe (String ingrediens) {
        this.ingrediens = ingrediens;
    }

    public Recipe (String description) {
        this.description = description;
    }

    public Recipe (int length_minutes) {
        this.length_minutes = length_minutes;
    }

    public Recipe (String image_url) {
        this.image_url = image_url;
    }

    public Recipe(int id, String name) {
        this.id = id;
        this.name = name;
    }

    public Recipe(int id, String name, int category_id) {
        this.id = id;
        this.name = name;
        this.category_id = category_id;
    }

    public Recipe(int id, String name, int category_id, int difficulty) {
        this.id = id;
        this.name = name;
        this.category_id = category_id;
        this.difficulty = difficulty;
    }

    public Recipe(int id, String name, int category_id, int difficulty, String ingrediens) {
        this.id = id;
        this.name = name;
        this.category_id = category_id;
        this.difficulty = difficulty;
        this.ingrediens = ingrediens;
    }

    public Recipe(int id, String name, int category_id, int difficulty, String ingrediens, String description) {
        this.id = id;
        this.name = name;
        this.category_id = category_id;
        this.difficulty = difficulty;
        this.ingrediens = ingrediens;
        this.description = description;
    }

    public Recipe(int id, String name, int category_id, int difficulty, String ingrediens, String description, int length_minutes) {
        this.id = id;
        this.name = name;
        this.category_id = category_id;
        this.difficulty = difficulty;
        this.ingrediens = ingrediens;
        this.description = description;
        this.length_minutes = length_minutes;
    }

    public Recipe(int id, String name, int category_id, int difficulty, String ingrediens, String description, int length_minutes, String image_url) {
        this.id = id;
        this.name = name;
        this.category_id = category_id;
        this.difficulty = difficulty;
        this.ingrediens = ingrediens;
        this.description = description;
        this.length_minutes = length_minutes;
        this.image_url = image_url
    }


    // Getters & Setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getCategory_Id() {
        return category_id;
    }

    public void setCategory_Id(int category_id) {
        this.category_id = category_id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getIngrediens() {
        return ingrediens;
    }

    public void setIngrediens(String ingrediens) {
        this.ingrediens = ingrediens;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getLength_minutes() {
        return length_minutes;
    }

    public void setLength_minutes(int length_minutes) {
        this.length_minutes = length_minutes;
    }

    public String getImage_url() {
        return image_url;
    }

    public void setImage_url(String image_url) {
        this.image_url = image_url;
    }
}
