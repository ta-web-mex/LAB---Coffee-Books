![logo_ironhack_blue 7](https://user-images.githubusercontent.com/23629340/40541063-a07a0a8a-601a-11e8-91b5-2f13e4e6b441.png)

# Express | Coffee & Books

## Introduction

Books and coffee are two very compatible things. If you think about it, a nice cup of a hot beverage and a book are two amazing things to have together.

In this exercise, let's create an social app to save both bookstores and coffee places and display them. You could even use Mapbox to display a path from one place to the other.

:bulb: **Hint:** To accomplish this new challenge, feel free to follow the Mapbox & Express, the previous lesson.

## Requirements

- Fork this repo
- Clone this repo

## Submission

- Upon completion, run the following commands:

  ```bash
  git add .
  git commit -m "done"
  git push origin master
  ```

- Create Pull Request so your TAs can check up your work.

## Instructions

This exercise will help you to:

- Practice Mapbox API integration with an app
- Add location properties in your models as GeoJSON
- Display content from the database in a map
- Practice Social Login

![cofee-book pic](https://s3-eu-west-1.amazonaws.com/ih-materials/uploads/upload_141038aa0f5ce10c722722400bfdc6d5.jpg)

### Iteration 0 - Irongenerate

```bash
irongenerate coffee-books
```

### Iteration 1 - Create the User Model

In `models` folder, create a new model `User.js`. For now, this model will have:

The model should have the next fields:

- name - String
- email - String
- places - [ObjectId]

### Iteration 2 - Auth process

The user should be able to log in with Facebook and Google strategies.

You have to configure _passport, passport local mongoose_ and the social strategies. **Don't forget to install the Facebook Strategy and the Google Strategy**

### Iteration 3 - Create the Place Model

In `models` folder, create a new model `Place.js`. For now, this model will have:

- name - String
- location - Object
- placeType - String
  - enum: ['coffee shop', 'bookstore']

### Iteration 4 - Create CRUD on this model

In this iteration, you should create full CRUD on `Place.js` model - to be able to create, update, delete and display all the places you save in the database. You will have to create routes and corresponding views.
**Logged users should be the only persons with these permissions.**

### Iteration 5 - Add `location` property

- To be able to locate places on the map, you will have to add `location` property to its model (refer to the previous lesson if necessary);
- Add Location fields to form(s) - create and update
- Get Mapbox API Key
- Add Mapbox to the view(s) that will display the map
- Show places on the map & add markers to show places’ locations

### Iteration 6 - Add the `feeds` view

Create the route `/feeds` and display all the places sorted by `created_at` timestamp. You don't have to log in for this feature.

## Extra Resources

- [GeoJSON](http://geojson.org/geojson-spec.html#introduction)
- [Mapbox API](https://docs.mapbox.com/)

Happy coding! :heart:
