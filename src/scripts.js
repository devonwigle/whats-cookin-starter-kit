// import './styles.css';
// import apiCalls from './apiCalls';
import RecipeRepository from "./classes/RecipeRepository";
import Recipe from "./classes/Recipe";

// variables
const searchBar = document.querySelector('input');

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

// functions
function showFavPage() {
  showHide([favoritesPage], [searchResultsPage, selectedRecipePage, landingPage]);
}

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