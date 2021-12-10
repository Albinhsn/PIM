// This is the Database class
// located at Backend ie. src/com.company/
// 2021-12-10 02:18

import express.utils.Utils;
import org.apache.commons.fileupload.FileItem;
import java.io.FileOutputStream;
import java.nio.file.Paths;
import java.sql.*;
import java.time.Instant;
import java.util.List;

public class Database {
    private Connection conn;
    // Establish connection
    public Database() {

        try {
            conn = DriverManager.getConnection("jdbc:sqlite:recipe_book.db");
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
    }




    // ---------------- Methods handeling Recipe's posts ---------------- //

    // Get list of all recipes' info from recipes table
    public List<Recipe> getPosts() {
        List<Recipe> posts = null;

        try {
            PreparedStatement stmt = conn.prepareStatement("SELECT * FROM recipes");
            ResultSet rs = stmt.executeQuery();

            Recipe[] allFromRS = (Recipe[]) Utils.readResultSetToObject(rs, Recipe[].class);
            posts = List.of(allFromRS);

        } catch (Exception e) {
            e.printStackTrace();

        }

        return posts;
    }


    // Select a specific recipe by its ID
    public Recipe getPostById(int id) {
        Recipe post = null;

        try {
            PreparedStatement stmt = conn.prepareStatement("SELECT * FROM recipes WHERE id = ?");
            stmt.setInt(1, id);
            ResultSet rs = stmt.executeQuery();

            Recipe[] idFromRS = (Recipe[]) Utils.readResultSetToObject(rs, Recipe[].class);
            post = idFromRS[0];

        } catch (Exception e) {
            e.printStackTrace();
        }

        return post;
    }



    // Create new post in "recipes" table
    public void createPost(Recipe post) {

        try {
            PreparedStatement stmt = conn.prepareStatement("INSERT INTO recipes (name,category_id,difficulty,ingrediens,description,length_minutes,image_url) VALUES(?, ?, ?, ?, ?, ?, ?)");
            stmt.setString(1, post.getName());
            stmt.setInt(2, post.getCategory_Id());
            stmt.setInt(3, post.getDifficulty());
            stmt.setString(4, post.getIngrediens());
            stmt.setString(5, post.getDescription());
            stmt.setInt(6, post.getLength_minutes());
            stmt.setString(7, post.getImage_url());

            stmt.executeUpdate();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }


    // Update a recipe
    public void updatePost(int id,String name,int category_id ,int difficulty,String ingrediens,String description, int length_minutes,String imageURL){

        try {

            PreparedStatement stmt1 = conn.prepareStatement("UPDATE recipes SET name = ?, category_id = ?, difficulty = ?, ingrediens = ?, description = ?, length_minutes = ?, imageURL = ? WHERE id = ?");
            stmt1.setString(1,name);
            stmt1.setInt(2,category_id);
            stmt1.setInt(3,difficulty);
            stmt1.setString(4,ingrediens);
            stmt1.setString(5,description);
            stmt1.setInt(6,length_minutes);
            stmt1.setString(7,image_url);
            stmt1.setInt(8,id);
            stmt1.executeUpdate();

        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
    }


    // Delete recipe from "recipes" table by ID
    public void deletePost(int id){

        try {
            PreparedStatement stmt = conn.prepareStatement("DELETE FROM recipes WHERE id = ?;");
            stmt.setInt(1,id);
            stmt.executeUpdate();

        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
    }



    // ---------------- Methods handeling Categories ---------------- //

    // Get all info from "categories" table
    public List<Category> getCategory(){
        List<Category> category = null;

        try {
            PreparedStatement stmt = conn.prepareStatement("SELECT * FROM categories");
            ResultSet rs = stmt.executeQuery();
            Category[] resultFromRs = (Category[]) Utils.readResultSetToObject(rs, Category[].class);
            category = List.of(resultFromRs);

        } catch (SQLException | JsonProcessingException throwables) {
            throwables.printStackTrace();
        }
        return category;
    }


    // Create new category in "categories" table
    public void createCategory(Category category){
        List<Category> categorys = null;   // Note this "s" at the end

        try {
            PreparedStatement stmt = conn.prepareStatement("INSERT INTO categories (name) values (?)");
            stmt.setString(1,category.getName());
            stmt.executeUpdate();
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
    }

    // Update a Category's name
    public void updateCategory(int id, String name){

        try {

            PreparedStatement stmt = conn.prepareStatement("UPDATE categories SET name = ? WHERE id = ?");
            stmt.setString(1,name);
            stmt.setInt(2,id);
            stmt.executeUpdate();

        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
    }


    // Delete category from "categories" table by ID
    public void deleteCategory(int id){

        try {
            PreparedStatement stmt = conn.prepareStatement("DELETE FROM categories WHERE id = ?;");
            stmt.setInt(1, id);
            stmt.executeUpdate();
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
    }




    // ---------------- Methods handeling files ---------------- //

    // Upload recipe's iamge file to "upload" folder
    public String uploadImage(FileItem image) {
        // the uploads folder in the "www" directory is accessible from the website
        // because the whole "www" folder gets served, with all its content

        // get filename with file.getName()
        String imageURL = "/uploads/" + image.getName();

        // open an ObjectOutputStream with the path to the uploads folder in the "www" directory
        try (var os = new FileOutputStream(Paths.get("src/www" + imageUrl).toString())) {
            // get the required byte[] array to save to a file
            // with file.get()
            os.write(image.get());
        } catch (Exception e) {
            e.printStackTrace();
            // if image is not saved, return null
            return null;
        }

        return imageUrl;
    }


}
