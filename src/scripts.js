/* eslint-disable max-len */
import './styles.css';
import apiCalls from './apiCalls';
import RecipeRepository from './classes/RecipeRepository.js'
import Recipe from './classes/Recipe';
import User from './classes/User';
import recipesData from './data/recipes.js'
import ingredientsData from './data/ingredients.js'
import usersData from './data/users.js'

// querySelectors
const searchBar = document.querySelector('input');
const radioContainer = document.querySelector('#container');
const recipeCard = document.querySelector('.previews');
const searchedRecipeCard = document.querySelector('.food-preview')
const selectedRecipeTitle = document.querySelector('.recipe-title');
const selectedRecipeIngredientAmount = document.querySelector('.ingredients-amounts');
const selectedRecipeDirections = document.querySelector('.recipe-directions');
const selectedRecipeImage = document.querySelector('.recipe-image');
const selectedCosts = document.querySelector('.selected-cost');
const selectedText = document.querySelector('.recipe-text');
const searchInput = document.querySelector('#searchInput');
const populatedResults = document.querySelector('.populated-results');
const errorMessage = document.querySelector('.error-message');
const userBox = document.querySelector('.user-box');
const tagBox = document.querySelector('.tag-box');
const searchInputField = document.querySelector('.search');
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

// pages
const landingPage = document.querySelector('.landing-page');
const selectedRecipePage = document.querySelector('.selected-recipe-page');
const searchResultsPage = document.querySelector('.search-results-page');
const favoritesPage = document.querySelector('.favorites-page');

// buttons
const tagSearchButton = document.querySelector('.tag-search-button');
const searchInputButton = document.querySelector('.show-search-input-button');
const addToFavoriteButton = document.querySelector('.add-to-favorite-btn');
const removeFromFavoritesButton = document.querySelector('.remove-from-favorite-btn')
const recipesToCookButton = document.querySelector('.recipes-to-cook-btn');
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

logoBox.addEventListener('click', goHome);

recipeCard.addEventListener('click', function(event) {
  showSelectedRecipePage(event)
});

populatedResults.addEventListener('click', function(event) {
  showSelectedRecipePage(event)
});

recipesToCookButton.addEventListener('click', addRecipesToCook)
addToFavoriteButton.addEventListener('click', addToFavs);
removeFromFavoritesButton.addEventListener('click', removeFromFavs)

storedFavoritesButton.addEventListener('click', showFavPage);

tagSearchButton.addEventListener('click', tagSearch)
searchInputButton.addEventListener('click', searchField)



// functions
function goHome() {
  showHide([landingPage], [selectedText, selectedRecipePage, favoritesPage, searchResultsPage], 'hidden');
}

function searchField() {
  showHide([tagSearchButton, searchInputField], [tagBox, searchInputButton], 'hidden')
}
function tagSearch() {
  showHide([tagBox, searchInputButton],[tagSearchButton, searchInputField], 'hidden')
}
function whateveriwant() {
  recipesInfo = recipesData;
  ingredientsInfo = ingredientsData;
  usersInfo = usersData;
  currentUser = new User( usersInfo[chooseRandomUser(usersInfo)],ingredientsInfo);
  console.log(currentUser);
  userBox.innerText =  `Welcome ${currentUser.name}`;
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

function chooseRandomUser(usersInfo) {
  return Math.floor(Math.random() * usersInfo.length);
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
      `<article class="all-recipes" id="${recipe.id}">
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
  recipeTagsArray = []
  let eventTargets = event.target.value
  repository.recipeData.filter(recipe => {
    if (recipe.tags.includes(eventTargets)) {
      recipeTagsArray.push(recipe)
      console.log(recipeTagsArray)
    }
  })
}

function  showSearchResultsPage() {
  showHide([searchResultsPage], [selectedText, selectedRecipePage, favoritesPage, landingPage], 'hidden');
  hide([errorMessage], 'invisible')

  sortSearch();
}

function sortSearch() {
  if (!searchInput.value && !nameSearch.checked && !ingredientSearch.checked && recipeTagsArray.length === 0) {
    showHide([landingPage], [selectedRecipePage, selectedText, favoritesPage, searchResultsPage], 'hidden')
    show([errorMessage], 'invisible')
  } else if (searchInput.value && !nameSearch.checked && !ingredientSearch.checked) {
    showHide([landingPage], [selectedRecipePage, selectedText, favoritesPage, searchResultsPage], 'hidden')
    show([errorMessage], 'invisible')
  } else if (searchInput.value && !nameSearch.checked && !ingredientSearch.checked) {
    showHide([landingPage], [selectedRecipePage, selectedText, favoritesPage, searchResultsPage], 'hidden')
    show([errorMessage], 'invisible')
  } else if (!searchInput.value && ingredientSearch.checked) {
    showHide([landingPage], [selectedRecipePage, selectedText, favoritesPage, searchResultsPage], 'hidden')
    show([errorMessage], 'invisible')
  } else if (!searchInput.value && nameSearch.checked) {
    showHide([landingPage], [selectedRecipePage, selectedText, favoritesPage, searchResultsPage], 'hidden')
    show([errorMessage], 'invisible')
  } else if (nameSearch.checked) {
    showHide([searchResultsPage], [landingPage, selectedRecipePage, selectedText, favoritesPage], 'hidden')
    searchByName()
  } else if (ingredientSearch.checked) {
    showHide([searchResultsPage], [landingPage, selectedRecipePage, selectedText, favoritesPage], 'hidden')
    searchByIngredient()
  } else {
    populateByTag()
    showHide([searchResultsPage], [landingPage, selectedRecipePage, selectedText, favoritesPage], 'hidden')
  }
}
function searchByName() {
  let searched = repository.filterByRecipeName(searchInput.value)
  populatedResults.innerHTML = ''
  searched.forEach(recipe => {
    populatedResults.innerHTML +=
    ` <article class="all-recipes" id="${recipe.id}">
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
    `<article class="all-recipes" id="${recipe.id}">
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
      `<article class="all-recipes" id="${recipe.id}">
        <img class="food-preview" src=${recipe.image}>
        <h2>${recipe.name}</h2>
        </article>`
  })
}

function showSelectedRecipePage(event) {
  showHide([selectedRecipePage, selectedText], [searchResultsPage, favoritesPage, landingPage], 'hidden');
  populateSelectedRecipe(event);
  populatedResults.innerHTML = ``;
}

function populateSelectedRecipe(event) {
  // console.log('closest?', event.target.closest('article').id )
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

// doesnt do anything yet
function showFavPage() {
  populatedResults.innerHTML = ''
  currentUser.favorite.forEach(recipe => {
    populatedResults.innerHTML +=
      `<article class="all-recipes" id="${recipe.id}">
        <img class="food-preview" src=${recipe.image}>
        <h2>${recipe.name}</h2>
        </article>`
  })
  showHide([favoritesPage], [searchResultsPage, selectedText, selectedRecipePage, landingPage], 'hidden');
}

function addToFavs() {
  currentUser.addToFavorite(foundRecipe);
}

function addRecipesToCook() {
  currentUser.addToRecipesToCook(foundRecipe);
  console.log('Add to cook', currentUser.recipesToCook)
}

function removeFromFavs() {
  currentUser.removeFromFavorite(foundRecipe)
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
