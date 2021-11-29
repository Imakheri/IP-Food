
<hr />
<br />

<p align='left'>
    <img src='https://static.wixstatic.com/media/85087f_0d84cbeaeb824fca8f7ff18d7c9eaafd~mv2.png/v1/fill/w_160,h_30,al_c,q_85,usm_0.66_1.00_0.01/Logo_completo_Color_1PNG.webp' </img>
</p>

# Individual Project - Henry Food

<p align="right">
  <img height="200" src="./cooking.png" />
</p>

## Project objectives
- Build an App using React, Redux, Node and Sequelize.
- Affirm and connect the concepts learned in the Bootcamp.
- Learn best practices.
- Learn and practice the Git workflow.
- Use and practice "testing". 

## Schedules and dates

The project will have a maximum duration of three weeks. In the event that they complete all the tasks before said period, they may notify their instructor to coordinate a date for the presentation of the work. 

## Starting

1. Forking the repository to have a copy of it in your accounts
2. Clone the repository on their computers to start working 

You will have a `boilerplate` with the general structure of both the server and the client. 

The minimally necessary versions are:

 * __Node__: 12.18.3 or higher
 * __NPM__: 6.14.16 or higher

## BoilerPlate

The boilerplate has two folders: `api` and` client`. In these folders will be the code of the back-end and the front-end respectively.

In `api` folder create a file called: `.env` that has the following form:

```
DB_USER=postgresuser
DB_PASSWORD=postgresPassword
DB_HOST=localhost
```

Replace `postgresuser` and `postgresPassword` with your own credentials to connect to postgres. This file will be ignored in the github upload, as it contains sensitive information (the credentials).

Additionally, it will be necessary to create a database called `food` from psql.

The content of `client` was created using: Create React App. 

## Statement

The general idea is to create an application in which you can see different food recipes along with relevant information about them using the external api [spoonacular] (https://spoonacular.com/food-api) and from there, you can, among other things:

   - Search recipes
   - Filter / Sort them
   - Create new own recipes 

__IMPORTANT__: In order to use this external API, it is necessary to create an account to obtain an API Key that must then be included in all requests that we make to spoonacular simply by adding `? ApiKey = {YOUR_API_KEY}` at the end of each endpoint. Add the key in the `.env` file so that it is not uploaded to the repository for security reasons and use it from there. On the other hand they have a limit of requests per day so use them carefully!

__IMPORTANT__: For the filtering and sorting functionalities you cannot use the external API endpoints that already return the filtered or sorted results but you must do it yourself. In particular, some of the orders or filters must be done from the frontend. 

### Only Endpoints/Flags you can use:

  * GET https://api.spoonacular.com/recipes/complexSearch
    - To obtain more information about the recipes, such the type of diet, add the flag `&addRecipeInformation=true` to this endpoint
    - For the types of diet you must take into account the properties vegetarian, vegan, glutenFree on the one hand and also analyze those that are included within the property `diets` 
  * GET https://api.spoonacular.com/recipes/{id}/information

### Minimum requirements:

The minimum requirements for the approval of the individual project are detailed below. Those who wish to add more functionality will be able to do so. Regarding the visual design, there will be no pre-set wireframes or prototypes, but they will be free to do it to their liking but they have to apply the knowledge of styles seen in the course so that it is pleasing to the eye. 

__IMPORTANT__: It will not be allowed to use external libraries to apply styles to the application. You will have to use CSS with some of the options that we saw in that class (pure CSS, CSS Modules or Styled Components) 

#### Necessary technologies :
- [ ] React
- [ ] Redux
- [ ] Express
- [ ] Sequelize - Postgres

#### Frontend

A React / Redux application must be developed that contains the following screens / paths. 

__Main Page__: you should put together a landing page with:
- [ ] Some background image representative of the project
- [ ] Button to enter home (`Main route`)

__Main Route__: must contain
- [ ] Search input to find recipes by name
- [ ] area where you will see the list of recipes. You must show your:
  - Image
  - Name
  - Diet type (vegetarian, vegan, suitable for celiac disease, etc)
- [ ] Buttons / Options to filter by diet type
- [ ] Buttons / Options to sort recipes both in ascending and descending order by alphabetical order and by score
- [ ] Paged to go searching and showing the following recipes, 9 recipes per page, showing the first 9 in the first page.

__IMPORTANT__: Within the Main Route, both the recipes brought from the API as well as those from the Database must be shown. Because there are around 5 thousand recipes in the API, for performance reasons they can simplify obtaining and paging the first 100.

__Recipe Detail Path__: must contain
- [ ] The fields shown in the main path for each recipe (image, name, type of dish and type of diet)
- [ ] Summary of the dish
- [ ] Punctuation
- [ ] Level of "healthy food"
- [ ] Step by step

__Recipe Creation Path__: must contain
- [ ] A __controlled__ form with the following fields
  - Name
  - Summary of the dish
  - Punctuation
  - Level of "healthy food"
  - Step by step
- [ ] Possibility of selecting / adding one or more types of diets
- [ ] Button / Option to create a new recipe

#### Database

The database model must have the following entities (Those properties marked with an asterisk must be mandatory): 

- [ ] Recipe with the following properties:
  - ID: *
  - Name *
  - Summary of the dish *
  - Punctuation
  - Level of "healthy food"
  - Step by step
- [ ] Type of diet with the following properties:
  - ID
  - Name

The relationship between both entities must be many to many since a recipe can be part of several types of diet simultaneously and, in turn, one type of diet can contain multiple different recipes. An example taken from the API would be the `Strawberry Mango Green Tea Limeade` which is vegetarian, vegan and suitable for celiacs all at the same time. But at the same time there are other recipes for vegetarians. 

__IMPORTANT__: Think about how to model the recipe IDs in the database. There are different correct ways to do it, but keep in mind that when we click on a recipe, it can come from the API or the Database, so when it shows its detail there should be no ambiguity in which it should be shown. For example, if in the API the recipe `Strawberry Mango Green Tea Limeade` has id = 1 and in our database we create a new recipe` Medialunas de Manteca` with id = 1, see how to differentiate them when we want to access the detail of the same. 


#### Backend

A server must be developed in Node / Express with the following paths: 

__IMPORTANT__: It is not allowed to use the filters, ordering and paging provided by the external API, all these functionalities have to be implemented by you. 

- [ ] __GET /recipes?name="..."__:
  - Get a list of the recipes that contain the word entered as query parameter
  - If there is no recipe show a suitable message 
- [ ] __GET /recipes/{idReceta}__:
  - Get the detail of a particular recipe
  - You must bring only the data requested in the recipe detail path
  - Include associated diet types 
- [ ] __GET /types__:
  - Get all possible types of diet
  - In the first instance, when none exists, they must preload the database with the data types indicated by spoonacular  [here](https://spoonacular.com/food-api/docs#Diets)
- [ ] __POST /recipe__:
  - Receive the data collected from the controlled form of the recipe creation route by body
  - Create a recipe in the database 


#### Testing
- [ ] At least have a frontend component with its respective tests
- [ ] At least have a backend path with its respective tests
- [ ] At least have a database model with its respective tests 
