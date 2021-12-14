package com.company;

import express.Express;
import express.middleware.Middleware;

import java.io.IOException;
import java.nio.file.Paths;
import java.sql.Array;
import java.util.List;
import java.util.HashMap;
import java.net.*;
import java.util.Map;
import java.io.InputStream;
import java.util.ArrayList;

public class Main {

    public static String test = "name";

    public static void main(String[] args) {

        Express app = new Express();
        Database db = new Database();
        HashMap<String, String> body = new HashMap<>();
        //testar.put("jaha", "test");
        ArrayList<String> searchA = new ArrayList<>();

        //List<User> users = new ArrayList<User>();




        app.get("/rest/userss", (req, res) -> {

            System.out.println("test");
            body.putAll(req.getBody());
            System.out.println(body);
            System.out.println(body.values());


        });

        app.get("/test1", (req, res) -> {
           //res.send(req.getQuerys().values().toString());

           //res.send(req.getQuerys().toString());
           //int id = Integer.parseInt(req.getParam("id"));
           int id = Integer.parseInt(req.getQuery("id"));






           //res.send(req.getQuerys().values().toString());

            //res.json(id);
            //res.send(req.getQuery("test"));

            //res.send(req.getBody().toString());
                });
        // req = Request, res = Response
        app.get("/testar", (req, res) -> {
            //int id = Integer.parseInt(req.getParam("id"));
            //System.out.println(id);

            body.putAll(req.getBody());
            System.out.println(body);

            String search = "'%" + req.getQuery("search") + "%'";
            System.out.println(search);

            List<Recipe> recipes = db.getRecipes(body, search);

            res.json(recipes);


        });

        app.get("/testar/:id", (req, res) -> {
            int id = Integer.parseInt(req.getParam("id"));
            System.out.println(id);

            body.putAll(req.getBody());
            System.out.println(body);

            String search = "'%" + req.getQuery("search") + "%'";
            System.out.println(search);

            List<Recipe> recipes = db.getRecipesId(body, search, id);

            res.json(recipes);


        });

        app.get("/test", (req, res) -> {
            //int id = Integer.parseInt(req.getParam("id"));
            //String[] body = new String[4];
            body.putAll(req.getBody());
            System.out.println(body);
           /* String search = "%" + req.getQuery("search") + "%";
            System.out.println(search);

            List<Recipe> recipes = db.getRecipes2(search);

            res.json(recipes); */


        });


        app.get("/hello-world", (req, res) -> {
            res.send("Hello World");
        });

        app.get("/about:id", (req, res) -> {
            res.send("This is the about page");
            System.out.println(req.getQuerys());
            int id = Integer.parseInt(req.getParam("id"));

        });

        app.get("/rest/users", (req, res) -> {
;
            String search = "";
            String[] col = {};
            if (req.getQuery("name") != null) {
                 search = "%" + req.getQuery("name") + "%";
                 col[0] = "name";
            }
            else {
                search = "%" + req.getQuery("id") + "%";
                col[1] = "id";
                System.out.println(search);
            }
            //res.send(search);
           /* String body2 = req.getBody().toString();
            String search = body2.replace("{", "");
            search = search.replace("}", "");
            //res.send(search);
            res.send(search);
            System.out.println(body);*/


            List<User> users = db.getUsers(col, search);

            res.json(users);
        });

        app.get("/rest/users/:id", (req, res) -> {
            int id = Integer.parseInt(req.getParam("id"));

            User user = db.getUserById(id);

            res.json(user);
        });

        app.put("/rest/users:id", (req, res) -> {
            //res.send("PUT Request Called");

            User user = (User) req.getBody(User.class);
            //int id = Integer.parseInt(req.getParam("id"));
            //User id = (User) req.getBody(User.class);

            //System.out.println(user.toString());

            db.updateUser(user);

            res.send("user successfully updated");

        });

        app.post("/rest/users", (req, res) -> {
            User user = (User) req.getBody(User.class);

            System.out.println(user.toString());

            db.createUser(user);

            res.send("user successfully created");
        });

        app.delete("/rest/users:id", (req, res) -> {

            User user = (User) req.getBody(User.class);

            System.out.println(user.toString());

            db.deleteUser(user);

            res.send("user successfully deleted");

        });

        try {
            app.use(Middleware.statics(Paths.get("src/www").toString()));
        } catch (IOException e) {
            e.printStackTrace();
        }

        app.listen(3000); // defaults to port 80
        System.out.println("Server started on port 3000");
    }
}
