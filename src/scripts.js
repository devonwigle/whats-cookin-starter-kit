import './styles.css';
import apiCalls from './apiCalls';
import RecipeRepository from './classes/RecipeRepository.js'
import recipesData from './data/recipes.js'
import Recipe from './classes/Recipe';
import ingredientsData from './data/ingredients.js'
import usersData from './data/users.js'

// querySelectors
const searchBar = document.querySelector('input');
const radioContainer = document.querySelector('#container');
let recipeCard = document.querySelector('.previews');
let selectedRecipeTitle = document.querySelector('.recipe-title');
let selectedRecipeIngredientAmount = document.querySelector('.ingredients-amounts');
let selectedRecipeDirections = document.querySelector('.recipe-directions');
let selectedRecipeImage = document.querySelector('.recipe-image');
let selectedCosts = document.querySelector('.selected-cost');
let selectedText = document.querySelector('.recipe-text');
let searchInput = document.querySelector('#searchInput')
let populatedResults = document.querySelector('.populated-results')

// global variables
let cookBook
let ingredientsInfo
let recipesInfo
let repository

// pages
const landingPage = document.querySelector('.landing-page');
const selectedRecipePage = document.querySelector('.selected-recipe-page');
const searchResultsPage = document.querySelector('.search-results-page');
const favoritesPage = document.querySelector('.favorites-page');

// buttons
const storedFavoritesButton = document.querySelector('.favorite-box');
const searchButton = document.querySelector('.search-button');
const nameSearch = document.querySelector('#nameSearch');
const ingredientSearch = document.querySelector('#ingredientSearch')
const breakfastButton = document.querySelector('.breakfast');
const snacksButton = document.querySelector('.snacks');
const dinnerButton = document.querySelector('.dinner');


//event listeners
storedFavoritesButton.addEventListener('click', showFavPage);
recipeCard.addEventListener('click', function(event) {
  showSelectedRecipePage(event)
})
searchButton.addEventListener('click', showSearchResultsPage)
window.addEventListener('load', whateveriwant)


// functions
function whateveriwant() {
  recipesInfo = recipesData;
  ingredientsInfo = ingredientsData;
  let newRecipe = []

  // needs a diffrent name
  cookBook = recipesData.map(recipe => {
    newRecipe = new Recipe(recipe, ingredientsInfo);
    return newRecipe
  })
  
  // console.log('COOK BOOK', cookBook)
  repository = new RecipeRepository(cookBook, ingredientsInfo);
  multipleButtons();
  makeRecipeCard();
}

function makeRecipeCard() {
  repository.recipeData.forEach(recipe => {
    recipeCard.innerHTML += 
      `<article id="${recipe.id}">
      <img class="food-preview" src=${recipe.image}>
      <h2>${recipe.name}</h2>
      </article>`
  })
}
function  showSearchResultsPage() {
  showHide([searchResultsPage], [selectedRecipePage, selectedText,favoritesPage, landingPage]);
  sortSearch()
}

function sortSearch() {
  if (nameSearch.checked) {
    searchByName()
  } else if (ingredientSearch.checked) {
    searchByIngredient()
  }
}

function searchByIngredient() {
  let searched = repository.filterByIngredient(searchInput.value)
  searched.forEach(recipe => {
    populatedResults.innerHTML += 
      ` <article id = "${recipe.id}">
        <img class="food-preview" src=${recipe.image}>
          <h2>${recipe.name}</h2>
        </article>`
  })
}

function searchByName() {
  let searched = repository.filterByRecipeName(searchInput.value)
  console.log(searchInput.value)
  searched.forEach(recipe => {
    populatedResults.innerHTML +=
      ` <article id = "${recipe.id}">
      <img class="food-preview" src=${recipe.image}>
        <h2>${recipe.name}</h2>
      </article>`
    })
}

function showSelectedRecipePage(event) {
  showHide([selectedRecipePage], [searchResultsPage, favoritesPage, landingPage])
  selectedRecipePopulation(event)
}

function selectedRecipePopulation(event) {
  let id = event.target.parentNode.id; 
  let foundRecipe = repository.recipeData.find(recipe =>{
    return recipe.id === parseInt(id)

  });
  console.log('HELLO WORLD', foundRecipe.ingredientInfo)
  console.log('Found Costs', foundRecipe)
  selectedRecipeImage.src = `${foundRecipe.image}`
  selectedRecipeTitle.innerText = `${foundRecipe.name}`;
  selectedCosts.innerText = `Estimated Cost: ${foundRecipe.getCostOfIngredients()}`

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


function showFavPage() {
  showHide([favoritesPage], [searchResultsPage, selectedText, selectedRecipePage, landingPage]);
}

function multipleButtons() {
  let tags = [];
  console.log('REPOSITORY REIPE DATA', repository.recipeData)
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