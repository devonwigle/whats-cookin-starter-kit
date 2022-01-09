/* eslint-disable max-len */
import './styles.css';
import { fetchData } from './apiCalls';
import RecipeRepository from './classes/RecipeRepository.js'
import Recipe from './classes/Recipe';
import User from './classes/User';


// querySelectors

const radioContainer = document.querySelector('#container');
const recipeCard = document.querySelector('.previews');
const searchedRecipeCard = document.querySelector('.food-preview')
const selectedRecipeTitle = document.querySelector('.recipe-title');
const selectedRecipeIngredientAmount = document.querySelector('.ingredients-amounts');
const selectedRecipeDirections = document.querySelector('.recipe-directions');
const selectedRecipeImage = document.querySelector('.recipe-image');
const selectedCosts = document.querySelector('.selected-cost');
const selectedText = document.querySelector('.recipe-text');

const populatedResults = document.querySelector('.populated-results');

const userBox = document.querySelector('.user-box');

const selectedRecipe = document.querySelector('.selected-recipe');
const logoBox = document.querySelector('.logo-box');

// global variables
let cookBook
let ingredientsInfo
let recipesInfo
let repository
let foundRecipe
let usersInfo
let currentUser
let recipeTagsArray = [];
let favorite = false;

// pages
const landingPage = document.querySelector('.landing-page');
const selectedRecipePage = document.querySelector('.selected-recipe-page');
const favoritesPage = document.querySelector('.favorites-page');


const searchForm = document.querySelector('#searchBar');
const searchTag = document.querySelector('#searchByTag')

// buttons
const addToFavoriteButton = document.querySelector('.add-to-favorite-btn');
const removeFromFavoritesButton = document.querySelector('.remove-from-favorite-btn')
const recipesToCookButton = document.querySelector('.recipes-to-cook-btn');
const storedFavoritesButton = document.querySelector('.favorite-box');


//event listeners
window.addEventListener('load', onStart);

searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const input = formData.get('q').trim();
  if(favorite === true){
    if(formData.get('type') == 'name'){
      const searchFavName = currentUser.filterFavoriteByRecipeName(input);
      makeRecipeCard(searchFavName);
    }
    if(formData.get('type') == 'ingredients'){
      const searchFavIngredient = currentUser.filterFavoriteByIngredient(input);
      makeRecipeCard(searchFavIngredient);
    }
  }
  if(favorite === false){
  if(formData.get('type') == 'name'){
    const searchByName = repository.filterByRecipeName(input);
    makeRecipeCard(searchByName);
  }
  if(formData.get('type') == 'ingredients'){
    const searchByIngredient = repository.filterByIngredient(input);
    makeRecipeCard(searchByIngredient);
  }
}
  e.target.reset()
});

searchTag.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const input = formData.get('tag');
  if(favorite === true){
    const searchFavTag = currentUser.filterFavoriteByTag(input);
    makeRecipeCard(searchFavTag);
  }
  else {
  const searchByTag = repository.filterByTag(input)
  makeRecipeCard(searchByTag);
}
})

recipeCard.addEventListener('click', function(event) {
  showSelectedRecipePage(event)
});

logoBox.addEventListener('click', goHome);

recipesToCookButton.addEventListener('click', addRecipesToCook);

addToFavoriteButton.addEventListener('click', addToFavs);

removeFromFavoritesButton.addEventListener('click', removeFromFavs);

storedFavoritesButton.addEventListener('click',showFavorite);


// functions
function onStart() {
  return Promise.all([fetchData('users'),fetchData('ingredients'),fetchData('recipes')])
  .then(data => loadPage(data))
}

function loadPage(data) {
  usersInfo = data[0];
  ingredientsInfo = data[1];
  recipesInfo = data[2];
   currentUser = new User( usersInfo[chooseRandomUser(usersInfo)],ingredientsInfo);
  userBox.innerText =  `Welcome ${currentUser.name}`;
  let newRecipe = []
  cookBook = recipesInfo.map(recipe => {
    newRecipe = new Recipe(recipe, ingredientsInfo);
    return newRecipe
  })
  repository = new RecipeRepository(cookBook, ingredientsInfo);
  multipleButtons();
  makeRecipeCard(repository.recipeData);

}

function multipleButtons() {
  let tags = [];
  repository.recipeData.forEach(recipe => {
    recipe.tags.forEach(tag => {
      if (!tags.includes(tag)) {
        tags.push(tag);
      }
    })
    tags.sort()
  })
  tags.forEach(tag => {
    radioContainer.innerHTML += `<option value="${tag}">${tag}</option>`
  })
}

function chooseRandomUser(usersInfo) {
  return Math.floor(Math.random() * usersInfo.length);
}

function goHome() {
  favorite = false;
  showHide([landingPage], [selectedText, selectedRecipePage], 'hidden');
  makeRecipeCard(repository.recipeData);
}

function makeRecipeCard(recipesInfo) {
  const recipes = recipesInfo
  recipeCard.innerHTML = ''
  recipes.forEach(recipe => {
    recipeCard.innerHTML +=
      `<article class="all-recipes" id="${recipe.id}">
      <img class="food-preview" src=${recipe.image} alt=${recipe.name}>
      <h2>${recipe.name}</h2>
      </article>`
  })
}

function showSelectedRecipePage(event) {
  showHide([selectedRecipePage, selectedText], [landingPage], 'hidden');
  populateSelectedRecipe(event);
  populatedResults.innerHTML = ``;
}

function populateSelectedRecipe(event) {
  let id = event.target.closest('article').id;
  foundRecipe = repository.recipeData.find(recipe =>{
    return recipe.id === parseInt(id)
  });
  let costOfIngredients = foundRecipe.getCostOfIngredients();
  selectedRecipe.innerHTML = ``
  selectedRecipe.innerHTML +=
  `<h1 class="recipe-title">${foundRecipe.name}</h1>
  <img class="recipe-image" src=${foundRecipe.image}>
  <div class="selected-cost">Estimated Cost:$${costOfIngredients}</div>
  </div>
  <div class="recipe-text hidden">
    <article class="selected-text ingredients-amounts"><h3>Ingredients List</h3>
    </article>
    <article class="selected-text recipe-directions"><h3>Directions</h3>
    </article>
  </div>`
  selectedRecipeDirections.innerHTML = `<h3>Directions</h3>`;
  selectedRecipeIngredientAmount.innerHTML = `<h3>Ingredients</h3>`;
  foundRecipe.ingredientInfo.forEach(datum => {
    selectedRecipeIngredientAmount.innerHTML += `<div>
        <li>${datum.quantity} ${datum.unit} ${datum.name} </li>
      </div>`
  })
  foundRecipe.instructions.forEach(instruction => {
    selectedRecipeDirections.innerHTML += `<div>
        <ul>${instruction.number}.     ${instruction.instruction}</ul>
      </div>`
  })
}

function showFavorite(){
  favorite = true;
  makeRecipeCard(currentUser.favorite);
  showHide([landingPage], [selectedText, selectedRecipePage], 'hidden');

}


function addToFavs() {
  currentUser.addToFavorite(foundRecipe);
  console.log(currentUser)
}

function addRecipesToCook() {
  currentUser.addToRecipesToCook(foundRecipe);
  console.log(currentUser)

}

function removeFromFavs() {
  currentUser.removeFromFavorite(foundRecipe);
  console.log(currentUser)
}

// helper functions
function showHide(toShow, toHide, css) {
  show(toShow, css);
  hide(toHide, css);
}

function show(shows, css) {
  shows.forEach(function(show) {
    show.classList.remove(css)
  })
}

function hide(hides, css) {
  hides.forEach(function(hide) {
    hide.classList.add(css);
  })
}
