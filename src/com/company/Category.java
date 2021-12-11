package com.company;

// This is the Category class
// (located at Backend ie. src/com.company/)
// 2021-12-11 02:06

public class Category {

    // ----------------------------- Variable declaration ----------------//
    private int id;
    private String name;

    // ------------------------ Constructors -----------------------//
    public Category(){
    }

    public Category(int id) {
        this.id = id;
    }

    public Category(int id, String name) {
        this.id = id;
        this.name = name;
    }

    public Category(String name) {
        this.name = name;
    }

    // -------------------------- Getters & Setters -----------------------//
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    // Override modification as/if needed
    @Override
    public String toString() {
        return "Category{" +
                "id=" + id +
                ", name=" + name +
                '}' + '\n';
    }
}
