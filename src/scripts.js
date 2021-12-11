import './styles.css';
import apiCalls from './apiCalls';
import RecipeRepository from './classes/RecipeRepository.js'
import recipesData from './data/recipes.js'
import Recipe from './classes/Recipe';
import ingredientsData from './data/ingredients.js'
import usersData from './data/users.js'

// variables
const searchBar = document.querySelector('input');
const radioContainer = document.querySelector('#container');
let recipeCard = document.querySelector('.previews');

// global variables
let cookBook
let ingredientsInfo
let recipesInfo 

// pages
const landingPage = document.querySelector('.landing-page');
const selectedRecipePage = document.querySelector('.selected-recipe-page');
const searchResultsPage = document.querySelector('.search-results-page');
const favoritesPage = document.querySelector('.favorites-page');

// buttons
const storedFavoritesButton = document.querySelector('.favorite-box');
const searchButton = document.querySelector('button');
const breakfastButton = document.querySelector('.breakfast');
const snacksButton = document.querySelector('.snacks');
const dinnerButton = document.querySelector('.dinner');

//event listeners
storedFavoritesButton.addEventListener('click', showFavPage);
window.addEventListener('load', whateveriwant)


// functions
function whateveriwant() {
  recipesInfo = recipesData;
  ingredientsInfo = ingredientsData;
  let newRecipe = []
  cookBook = recipesData.map(recipe => {
    newRecipe = new Recipe(recipe, ingredientsInfo);
    return newRecipe
  })
  console.log(cookBook)
  cookBook = new RecipeRepository(recipesInfo,  ingredientsInfo);
  multipleButtons();
  makeRecipeCard();
}

function makeRecipeCard() {
  cookBook.recipeData.forEach(recipe => {
    recipeCard.innerHTML += 
    `<img class="food-preview" src=${recipe.image}>
      <h2>${recipe.name}</h2>`
    // console.log(recipe.image)
  })
}

function showFavPage() {
  showHide([favoritesPage], [searchResultsPage, selectedRecipePage, landingPage]);
}

function multipleButtons() {
  let tags = [];
  cookBook.recipeData.forEach(recipe => {
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
// helper functions 
function showHide(toShow, toHide) {
  show(toShow);
  hide(toHide);
}

function show(shows) { 
  shows.forEach(function(show) {
    show.classList.remove('hidden')
  })
}

function hide(hides) {
  hides.forEach(function(hide) {
    hide.classList.add('hidden');
  })
}