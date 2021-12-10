import './styles.css';
import apiCalls from './apiCalls';
import RecipeRepository from './classes/RecipeRepository.js'
import recipesData from './data/recipes.js'
import ingredientsData from './data/ingredients.js'
import usersData from './data/users.js'

// variables
const searchBar = document.querySelector('input');
let radioContainer = document.querySelector('#container');

let cookBook
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
  const recipesInfo = recipesData;
  const ingredientsInfo = ingredientsData;
   cookBook = new RecipeRepository(recipesInfo,  ingredientsInfo)
  // console.log(cookBook.recipeData);
  multipleButtons();
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
        // console.log(tags)
      }
    })
  })
  tags.forEach(tag => {
    radioContainer.innerHTML += `<input type="radio" id="${tag}" value="${tag}"> ${tag}`
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