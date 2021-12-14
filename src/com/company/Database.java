package com.company;

import com.fasterxml.jackson.core.JsonProcessingException;
import express.utils.Utils;

import java.sql.*;
import java.util.List;

public class Database {

    private Connection conn;

    public Database() {
        try {
            conn = DriverManager.getConnection("jdbc:sqlite:recipe_book_new.db");
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
    }

    public List<User> getUsers(String[] col, String search) {
        List<User> users = null;

        String cool = "";
        int count = 0;
        for (String column : col
             ) {
            if(!column.isEmpty()) {
                if (count == 0) {
                    cool = column;
                    count = 1;
                }
                cool += " OR " + column;
            }

        }

        try {

            PreparedStatement stmt = conn.prepareStatement("SELECT * FROM users WHERE " + cool + " LIKE ?");
            stmt.setString(1, search);
            System.out.println(stmt.enquoteLiteral("'"));
            ResultSet rs = stmt.executeQuery();

            User[] usersFromRS = (User[]) Utils.readResultSetToObject(rs, User[].class);
            users = List.of(usersFromRS);

//            while (rs.next()) {
//                int id = rs.getInt("id");
//                String name = rs.getString("name");
//                int age = rs.getInt("age");
//
//                User user = new User(name, age);
//                users.add(user);
//            }

        } catch (SQLException throwables) {
            throwables.printStackTrace();
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        return users;
    }


    public List<Recipe> getRecipes(String search) {
        List<Recipe> recipes = null;


        try {

            PreparedStatement stmt = conn.prepareStatement("SELECT * FROM recipes WHERE name LIKE ? "); // AND category_id = ?
            stmt.setString(1, search);
            //stmt.setInt(2, id);
            //System.out.println(stmt.enquoteLiteral("'"));
            ResultSet rs = stmt.executeQuery();

            Recipe[] recipesFromRS = (Recipe[]) Utils.readResultSetToObject(rs, Recipe[].class);
            recipes = List.of(recipesFromRS);

//            while (rs.next()) {
//                int id = rs.getInt("id");
//                String name = rs.getString("name");
//                int age = rs.getInt("age");
//
//                User user = new User(name, age);
//                users.add(user);
//            }

        } catch (SQLException throwables) {
            throwables.printStackTrace();
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        return recipes;
    }





    public User getUserById(int id) {
        User user = null;

        try {
            PreparedStatement stmt = conn.prepareStatement("SELECT * FROM users WHERE id = ?");
            stmt.setInt(1, id);

            ResultSet rs = stmt.executeQuery();

            User[] userFromRS = (User[]) Utils.readResultSetToObject(rs, User[].class);

            user = userFromRS[0];

        } catch (SQLException throwables) {
            throwables.printStackTrace();
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        return user;
    }

    public void createUser(User user) {
        try {
            PreparedStatement stmt = conn.prepareStatement("INSERT INTO users (name, age) VALUES(?, ?)");
            stmt.setString(1, user.getName());
            stmt.setInt(2, user.getAge());

            stmt.executeUpdate();
        } catch (SQLException throwables) {
            System.out.println("error creating user");
            throwables.printStackTrace();
        }


    }

    public void updateUser(User user) {
        try {
            PreparedStatement stmt = conn.prepareStatement("UPDATE users SET name = ? WHERE id = ?");
            stmt.setString(1, user.getName());
            stmt.setInt(2, user.getId());
            //stmt.setInt(2, user.getAge());

            stmt.executeUpdate();
        } catch (SQLException throwables) {
            System.out.println("error updating user " + user.getName());
            throwables.printStackTrace();
        }
    }

    public void deleteUser(User user) {

        try{
            PreparedStatement stmt = conn.prepareStatement("DELETE FROM users WHERE id = ?");
            stmt.setInt(1, user.getId());

            stmt.executeUpdate();

        } catch (SQLException throwables) {
            System.out.println("error deleting user");
            throwables.printStackTrace();
        }
    }

}
