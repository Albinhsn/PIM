package com.company;

// This is the Database class
// located at Backend ie. src/com.company/
// 2021-12-11 02:18

import com.fasterxml.jackson.core.JsonProcessingException;
import express.utils.Utils;
import org.apache.commons.fileupload.FileItem;
import java.io.FileOutputStream;
import java.nio.file.Paths;
import java.sql.*;
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




    // ---------------- Methods handling Recipes ---------------- //

    // 1 - Get list of all recipes' info from recipes table
    public List<Recipe> getRecipes() {
        List<Recipe> recipes = null;

        try {
            PreparedStatement stmt = conn.prepareStatement("SELECT * FROM recipes");
            ResultSet rs = stmt.executeQuery();

            Recipe[] recipesFromRS = (Recipe[]) Utils.readResultSetToObject(rs, Recipe[].class);
            recipes = List.of(recipesFromRS);

        } catch (SQLException | JsonProcessingException throwables) {
            throwables.printStackTrace();
        }
        return recipes;
    }


    // 2 - Getting the recipe's info using it's ID (or other parameters like "name", "difficulty", "length_minutes")
    public Recipe getRecipeById(int id) {
        Recipe recipe = null;

        try {
            PreparedStatement stmt = conn.prepareStatement("SELECT * FROM recipes WHERE id = ?");
            stmt.setInt(1, id);

            ResultSet rs = stmt.executeQuery();

            Recipe[] recipeFromRS = (Recipe[]) Utils.readResultSetToObject(rs, Recipe[].class);
            recipe = recipeFromRS[0];

        } catch (Exception e) {
            e.printStackTrace();
        }

        return recipe;
    }


    // 3 - Create new recipe in "recipes" table
    public void createRecipe(Recipe recipe) {

        try {
            PreparedStatement stmt = conn.prepareStatement("INSERT INTO recipes (name, category_id, difficulty, ingredients, description, length_minutes, image_url) VALUES(?, ?, ?, ?, ?, ?, ?)");  // using "?" to dismiss possibility of sql injection
            stmt.setString(1, recipe.getName());
            stmt.setInt(2, recipe.getCategoryId());
            stmt.setInt(3, recipe.getDifficulty());
            stmt.setString(4, recipe.getIngredients());
            stmt.setString(5, recipe.getDescription());
            stmt.setInt(6, recipe.getLength_minutes());
            stmt.setString(7, recipe.getImage_url());

            stmt.executeUpdate();
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
    }


    // 4 - Update a recipe
    public void updateRecipe(Recipe recipe){

        try {

            PreparedStatement stmt = conn.prepareStatement("UPDATE recipes SET (name, category_id, difficulty, ingredients, description, length_minutes, image_url) VALUES(?, ?, ?, ?, ?, ?, ?) WHERE id = ?");
            //             PreparedStatement stmt = conn.prepareStatement("UPDATE recipes SET name = ?, category_id = ?, difficulty = ?, ingredients = ?, description = ?, length_minutes = ?, image_url = ? WHERE id = ?");
            stmt.setString(1, recipe.getName());
            stmt.setInt(2, recipe.getCategoryId());
            stmt.setInt(3, recipe.getDifficulty());
            stmt.setString(4, recipe.getIngredients());
            stmt.setString(5, recipe.getDescription());
            stmt.setInt(6, recipe.getLength_minutes());
            stmt.setString(7, recipe.getImage_url());
            stmt.setInt(8, recipe.getId());
            stmt.executeUpdate();

        } catch (Exception e) {
            e.printStackTrace();
        }
    }


    // 5 - Delete recipe from "recipes" table by ID
    public void deleteRecipe(int id){

        try {
            PreparedStatement stmt = conn.prepareStatement("DELETE FROM recipes WHERE id = ?;");
            stmt.setInt(1,id);
            stmt.executeUpdate();

        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
    }



    // ---------------- Methods handling Categories ---------------- //

    // 1 - Get all info from "categories" table
    public List<Category> getCategories(){
        List<Category> categories = null;

        try {
            PreparedStatement stmt = conn.prepareStatement("SELECT * FROM categories");
            ResultSet rs = stmt.executeQuery();
            Category[] categoriesFromRS = (Category[]) Utils.readResultSetToObject(rs, Category[].class);
            categories = List.of(categoriesFromRS);

        } catch (SQLException | JsonProcessingException throwables) {
            throwables.printStackTrace();
        }
        return categories;
    }


    // 2 - Getting the category using it's ID (or "name")
    public Category getCategoryById(int id) {
        Category category = null;

        try {
            PreparedStatement stmt = conn.prepareStatement("SELECT * FROM categories WHERE id = ?");
            stmt.setInt(1, id);

            ResultSet rs = stmt.executeQuery();

            Category[] categoryFromRS = (Category[]) Utils.readResultSetToObject(rs, Category[].class);
            category = categoryFromRS[0];

        } catch (Exception e) {
            e.printStackTrace();
        }

        return category;
    }


    // 3 - Create new category in "categories" table
    public void createCategory(Category category){

        try {
            PreparedStatement stmt = conn.prepareStatement("INSERT INTO categories (name) VALUES (?)");
            stmt.setString(1,category.getName());

            stmt.executeUpdate();
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
    }

    // 4 - Update a Category's name
    public void updateCategory(Category category){

        try {

            PreparedStatement stmt = conn.prepareStatement("UPDATE categories SET name = ? WHERE id = ?");
            stmt.setString(1, category.getName());
            stmt.setInt(2, category.getId());
            stmt.executeUpdate();

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    // 5 - Delete category from "categories" table by ID
    public void deleteCategory(int id){

        try {
            PreparedStatement stmt = conn.prepareStatement("DELETE FROM categories WHERE id = ?;");
            stmt.setInt(1, id);
            stmt.executeUpdate();
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
    }



    // ---------------- Methods handling files ---------------- //

    // Upload recipe's image file to "upload" folder
    public String uploadImage(FileItem image) {
        // the upload folder in the "www" directory is accessible from the website
        // because the whole "www" folder gets served, with all its content

        // get filename with file.getName()
        String image_url = "/uploads/" + image.getName();

        // open an ObjectOutputStream with the path to the upload folder in the "www" directory
        try (var os = new FileOutputStream(Paths.get("src/www" + image_url).toString())) {
            // get the required byte[] array to save to a file
            // with file.get()
            os.write(image.get());
        } catch (Exception e) {
            e.printStackTrace();
            // if image is not saved, return null
            return null;
        }

        return image_url;
    }


}
