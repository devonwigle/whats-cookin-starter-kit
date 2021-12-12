/* eslint-disable max-len */
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
let searchedRecipeCard = document.querySelector('.food-preview');
let selectedRecipeTitle = document.querySelector('.recipe-title');
let selectedRecipeIngredientAmount = document.querySelector('.ingredients-amounts');
let selectedRecipeDirections = document.querySelector('.recipe-directions');
let selectedRecipeImage = document.querySelector('.recipe-image');
let selectedCosts = document.querySelector('.selected-cost');
let selectedText = document.querySelector('.recipe-text');
let searchInput = document.querySelector('#searchInput');
let populatedResults = document.querySelector('.populated-results');
let errorMessage = document.querySelector('.error-message');

let tagSearchButton = document.querySelector('.tag-search-button');
let tagBox = document.querySelector('.tag-box');
let searchInputField = document.querySelector('.search');
let searchInputButton = document.querySelector('.show-search-input-button');

// global variables
let cookBook
let ingredientsInfo
let recipesInfo
let repository
let foundRecipe
let recipeTagsArray = [];

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

//event listeners
window.addEventListener('load', whateveriwant);

radioContainer.addEventListener('change', function(event) {
  searchByTag(event)
});

searchButton.addEventListener('click', function() {
  showSearchResultsPage();
  clearSearchBar();
});

recipeCard.addEventListener('click', function(event) {
  showSelectedRecipePage(event)
});

populatedResults.addEventListener('click', function(event) {
  showSelectedRecipePage(event)
});

storedFavoritesButton.addEventListener('click', showFavPage);

tagSearchButton.addEventListener('click', tagSearch)
searchInputButton.addEventListener('click', searchField)



// functions
function searchField() {
  showHide([tagSearchButton, searchInputField], [tagBox, searchInputButton])
}
function tagSearch() {
  showHide([tagBox, searchInputButton],[tagSearchButton, searchInputField])
}
function whateveriwant() {
  recipesInfo = recipesData;
  ingredientsInfo = ingredientsData;
  let newRecipe = []
  cookBook = recipesData.map(recipe => {
    newRecipe = new Recipe(recipe, ingredientsInfo);
    return newRecipe
  })
  repository = new RecipeRepository(cookBook, ingredientsInfo);
  multipleButtons();
  makeRecipeCard();
  clearSearchBar();
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

function makeRecipeCard() {
  repository.recipeData.forEach(recipe => {
    recipeCard.innerHTML += 
      `<article id="${recipe.id}">
      <img class="food-preview" src=${recipe.image}>
      <h2>${recipe.name}</h2>
      </article>`
  })
}

function clearSearchBar() {
  searchInput.value = '';
  nameSearch.checked = false;
  ingredientSearch.checked = false;
  
}

function searchByTag(event) {
  let eventTargets = event.target.value
  repository.recipeData.filter(recipe => {
    if (recipe.tags.includes(eventTargets)) {
      recipeTagsArray.push(recipe)
      console.log(recipeTagsArray)
    }
  })
}

function  showSearchResultsPage() {
  showHide([searchResultsPage], [selectedRecipePage, favoritesPage, landingPage]);
  hide([errorMessage])
  
  sortSearch();
}

function sortSearch() {
  if (!searchInput.value && !nameSearch.checked && !ingredientSearch.checked && recipeTagsArray.length === 0) {
    console.log('I saw this')
    console.log(recipeTagsArray.length)
    showHide([landingPage, errorMessage], [selectedRecipePage, selectedText, favoritesPage, searchResultsPage])
  } else if (searchInput.value && !nameSearch.checked && !ingredientSearch.checked) {
    showHide([landingPage, errorMessage], [selectedRecipePage, selectedText, favoritesPage, searchResultsPage])
  } else if (searchInput.value && !nameSearch.checked && !ingredientSearch.checked) {
    showHide([landingPage, errorMessage], [selectedRecipePage, selectedText, favoritesPage, searchResultsPage])
  } else if (!searchInput.value && ingredientSearch.checked) {
    showHide([landingPage, errorMessage], [selectedRecipePage, selectedText, favoritesPage, searchResultsPage])
  } else if (!searchInput.value && nameSearch.checked) {
    showHide([landingPage, errorMessage], [selectedRecipePage, selectedText, favoritesPage, searchResultsPage])
  } else if (nameSearch.checked) {
    showHide([searchResultsPage], [landingPage, selectedRecipePage, selectedText, favoritesPage])
    searchByName()
  } else if (ingredientSearch.checked) {
    showHide([searchResultsPage], [landingPage, selectedRecipePage, selectedText, favoritesPage])
    searchByIngredient()
  } else {
    populateByTag()
    showHide([searchResultsPage], [landingPage, selectedRecipePage, selectedText, favoritesPage])
    console.log('location(sortSearch): hereIAm')
  }
}
function searchByName() {
  let searched = repository.filterByRecipeName(searchInput.value)
  
  populatedResults.innerHTML = ''
  searched.forEach(recipe => {
    populatedResults.innerHTML +=
    ` <article id = "${recipe.id}">
    <img class="food-preview" src=${recipe.image}>
    <h2>${recipe.name}</h2>
    </article>`
  })
  searched.length === 0 ? populatedResults.innerHTML = '<h3>Aint nothing you want here! Go AWAY</h3>' : null 
}

function searchByIngredient() {
  
  let rawDataSearched = repository.filterByIngredient(searchInput.value)
  let searched = [...new Set(rawDataSearched)]
  populatedResults.innerHTML = ''

  searched.forEach(recipe => {
    populatedResults.innerHTML += 
    ` <article id = "${recipe.id}">
    <img class="food-preview" src=${recipe.image}>
    <h2>${recipe.name}</h2>
    </article>`
  })
  searched.length === 0 ? populatedResults.innerHTML = '<h3>Aint nothing you want here! Go AWAY</h3>' : null
}

function populateByTag() {
  populatedResults.innerHTML = ''
  recipeTagsArray.forEach(recipe => {
    populatedResults.innerHTML +=
      `<article id="${recipe.id}">
        <img class="food-preview" src=${recipe.image}>
        <h2>${recipe.name}</h2>
        </article>`
  })
}

function showSelectedRecipePage(event) {
  showHide([selectedRecipePage, selectedText], [searchResultsPage, favoritesPage, landingPage]);
  populateSelectedRecipe(event);
  populatedResults.innerHTML = ``;
}

function populateSelectedRecipe(event) {
  let id = event.target.parentNode.id; 

  foundRecipe = repository.recipeData.find(recipe =>{
    return recipe.id === parseInt(id)
  });

  let costOfIngredients = foundRecipe.getCostOfIngredients();

  selectedRecipeImage.src = `${foundRecipe.image}`;
  selectedRecipeTitle.innerText = `${foundRecipe.name}`;
  selectedCosts.innerText = `Estimated Cost: ${costOfIngredients}`

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

// doesnt do anything yet
function showFavPage() {
  showHide([favoritesPage], [searchResultsPage, selectedText, selectedRecipePage, landingPage]);
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

