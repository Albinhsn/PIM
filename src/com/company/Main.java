package com.company;

// This is the Main class
// located at Backend ie. src/com.company/
// 2021-12-11 02:18
// (NOTE: For test purpose only)

import express.Express;
import express.middleware.Middleware;
import org.apache.commons.fileupload.FileItem;
import java.io.IOException;
import java.nio.file.Paths;
import java.util.List;

public class Main {

    public static void main(String[] args) {
        Express app = new Express();
        Database db = new Database();



        // ROUTES (Listeners) needed.
        // req = request which means incoming calls
        // res = response which means the response from the server


        // Hello World
        app.get ("/", (req, res) -> {
            res.send("Hello World");
        });
        // ---------------- Methods handling Recipes ---------------- //

        // Getting the list of all recipes using Recipe.java class, responding in json
        app.get("/rest/recipes", (req, res) -> {
            List<Recipe> recipes = db.getRecipes();
            res.json(recipes);
        });


        // Getting a specific recipe using it's ID (or other parameters like "name", "difficulty", "length_minutes"),
        // and responding in json
        app.get("/rest/recipes/:id", (req, res) -> {
            int id = Integer.parseInt(req.getParam("id"));  // Parsing the String "getParam("id")" into an integer
            Recipe recipe = db.getRecipeById(id);
            res.json(recipe);
        });


        // Creating a new recipe
        app.post("/rest/recipes", (req, res) -> {
            Recipe recipe = (Recipe) req.getBody(Recipe.class); //type casting
            // System.out.println(recipe.toString()); // checking/testing output at console. Uncomment if needed to use
            db.createRecipe(recipe);
            res.send("Create new recipe OK");
        });


        // ****************** two following "recipe" methods are not verified ****************************//
        // Updating an existing recipe
        app.put("/rest/recipes/:id", (req, res) -> {
            Recipe recipe = (Recipe) req.getBody(Recipe.class);
            //db.updateRecipe(recipe.getId(), recipe.getName(), recipe.getCategoryId(), recipe.getDifficulty(), recipe.getIngredients(), recipe.getDescription(), recipe.getLength_minutes(), recipe.getImage_url());
            db.updateRecipe(recipe);
            res.send("Update recipe OK");
        });

        // Deleting an existing recipe
        app.delete("/rest/recipes/:id", (req, res) -> {
            Recipe recipe = (Recipe) req.getBody(Recipe.class);
            db.deleteRecipe(recipe.getId());
            res.send("Delete recipe OK");
        });




        // ---------------- Methods handling Categories ---------------- //

        // Getting the list of all categories using Category.java class, responding in json
        app.get("/rest/categories", (req, res) -> {
            List<Category> categories = db.getCategories();
            res.json(categories);
        });

        // Getting the category using it's ID (or the "name" parameter)
        // and responding in json
        app.get("/rest/categories/:id", (req, res) -> {
            int id = Integer.parseInt(req.getParam("id"));  // Parsing the String "getParam("id")" into an integer
            Category category = db.getCategoryById(id);
            res.json(category);
        });

        // Creating a new category
        app.post("/rest/categories", (req, res) -> {
            Category category = (Category) req.getBody(Category.class);  //type casting
            // System.out.println(category.toString()); // checking/testing output at console. Uncomment if needed to use
            db.createCategory(category);
            res.send("Create new category OK");
        });


        // ************************** two following "category" methods are not verified ********************** //
        // Updating an existing category
        app.put("/rest/categories/:id", (req, res) -> {
            Category category = (Category) req.getBody(Category.class);
            db.updateCategory(category);
            res.send("Category name update OK");
        });

        // Deleting an existing category
        app.delete("/rest/categories/:id", (req, res) -> {
            Category list = (Category) req.getBody(Category.class);
            db.deleteCategory(list.getId());
            res.send("Delete category OK");
        });




        // ---------------- Methods handling files ---------------- //

        // Methods to get the image url from the uploaded image file's location
        app.post("/api/file-upload", (req, res) -> {
            String image_url = null;

            // extract the file from the FormData
            try {
                List<FileItem> files = req.getFormData("files");
                image_url = db.uploadImage(files.get(0));
            } catch (Exception e) {
                e.printStackTrace();
            }

            // return "/uploads/image-name.jpg"
            res.send(image_url);
        });

        // *************************** following "file" methods are not verified  *********************//

        // Getting list of "uploaded files" from database
//        app.get("/rest/files", (req, res) -> {
//            List<File> files = db.getFiles();
//            res.json(files);
//        });

       // Adding file to database
//        app.post("/rest/files", (req, res) -> {
//            File file = (File) req.getBody(File.class);
//            db.createFile(file);
//            res.send("Adding image OK");
//        });

       // Deleting file from database
//        app.delete("/rest/files/:id", (request, response) -> {
//            File file = (File) request.getBody(File.class);
//            db.deleteFile(file.getId());
//            response.send("Delete image OK");
//        });



// ---------------- Public Directory Path definition using Middleware---------------- //

        // Middleware to be able to serve both the html/css/js files and the uploads folder.
        // Here the PATH to the location of the index.html on the server
        try {
            app.use(Middleware.statics(Paths.get("src/www").toString()));
        } catch (IOException e) {
            e.printStackTrace();
        }



// -------------------------- Starting the server and assigning port -------------------//
        app.listen(2021);
        System.out.println("Server started on port 2021");
    }
}
