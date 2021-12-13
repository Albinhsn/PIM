package com.company;

import com.fasterxml.jackson.core.JsonProcessingException;
import express.utils.Utils;

import java.sql.*;
import java.util.List;

public class Database {

    private Connection conn;

    public Database() {
        try {
            conn = DriverManager.getConnection("jdbc:sqlite:recipe_book.db");
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
    }

    public List<User> getUsers(String search) {
        List<User> users = null;
        String test = "name";

        try {

            PreparedStatement stmt = conn.prepareStatement("SELECT * FROM users WHERE ? LIKE ?");
            stmt.setString(1, test);
            stmt.setString(2, search);
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
