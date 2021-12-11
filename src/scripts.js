import './styles.css';
import apiCalls from './apiCalls';
import RecipeRepository from './classes/RecipeRepository.js'
import recipeData from './data/recipes.js'
import ingredientsData from './data/ingredients.js'
import usersData from './data/users.js'

// variables
const searchBar = document.querySelector('input');
const radioContainer = document.querySelector('#container');
let recipeCard = document.querySelector('.previews');
let selectedRecipeTitle = document.querySelector('.recipe-title');
let selectedRecipeIngredientAmount = document.querySelector('.ingredients-amount');
let selectedRecipeDirections = document.querySelector('.recipe-directions')


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
recipeCard.addEventListener('click', function(event) {
  showSelectedRecipePage(event)
})
window.addEventListener('load', whateveriwant)


// functions
function whateveriwant() {
  const recipesInfo = recipeData;
  const ingredientsInfo = ingredientsData;
  cookBook = new RecipeRepository(recipesInfo,  ingredientsInfo)
  multipleButtons();
  makeRecipeCard();
}

function makeRecipeCard() {
  cookBook.recipeData.forEach(recipe => {
    recipeCard.innerHTML += 
      `<article id="${recipe.id}">
      <img class="food-preview" src=${recipe.image}>
      <h2>${recipe.name}</h2>
      </article>`
    //console.log(recipe.id)
  })
}

function showSelectedRecipePage(event) {
  console.log(event.target.parentNode)
  //recipeData.
  //selectedRecipeTitle.innerText = ()
  showHide([selectedRecipePage], [searchResultsPage, favoritesPage, landingPage])
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
    tags.sort()
  })
  tags.forEach(tag => {
    radioContainer.innerHTML += `<option value="${tag}">${tag}</option>`
    // radioContainer.innerHTML += `<input type="radio" id="${tag}" value="${tag}"> ${tag}`
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

/* event bubbling  */