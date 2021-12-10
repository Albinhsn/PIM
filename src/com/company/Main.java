package com.company;

import express.Express;
import express.middleware.Middleware;

import java.io.IOException;
import java.lang.reflect.Array;
import java.nio.file.Paths;
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
        HashMap<String, String> testar = new HashMap<>();
        testar.put("jaha", "test");

        //List<User> users = new ArrayList<User>();




        app.get("/test", (req, res) -> {
           //res.send(req.getQuerys().values().toString());

           //res.send(req.getQuerys().toString());
           //int id = Integer.parseInt(req.getParam("id"));
           int id = Integer.parseInt(req.getQuery("id"));


            User user = db.getUserById(id);

            res.json(user);


           //res.send(req.getQuerys().values().toString());

            //res.json(id);
            //res.send(req.getQuery("test"));

            //res.send(req.getBody().toString());
                });
        // req = Request, res = Response
        app.get("/hello-world", (req, res) -> {
            res.send("Hello World");
        });

        app.get("/about", (req, res) -> {
            res.send("This is the about page");
        });

        app.get("/rest/users", (req, res) -> {
            String search = "%" + req.getQuery("search") + "%";

            List<User> users = db.getUsers(search);

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
