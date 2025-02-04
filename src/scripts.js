/* eslint-disable max-len */
import './css/styles.scss';
import { fetchData, addIngredient } from './apiCalls';
import RecipeRepository from './classes/RecipeRepository.js'
import Recipe from './classes/Recipe';
import User from './classes/User';
import {recipeCard, makeRecipeCard, whatsToCook} from './domUpdates.js';

// global variables
let cookBook
let ingredientsInfo
let recipesInfo
let repository
let foundRecipe
let usersInfo
let currentUser
let favorite = false;

// querySelectors
const radioContainer = document.querySelector('#container');
const selectIngredient = document.querySelector('#ingredientID')
const selectedRecipeIngredientAmount = document.querySelector('.ingredients-amounts');
const selectedRecipeDirections = document.querySelector('.recipe-directions');
const selectedText = document.querySelector('.recipe-text');
const userPantry = document.querySelector('.user-pantry');
const populatedResults = document.querySelector('.populated-results');
const userBox = document.querySelector('.user-box');
const selectedRecipe = document.querySelector('.selected-recipe');
const logoBox = document.querySelector('.logo-box');
const searchForm = document.querySelector('#searchBar');
const searchTag = document.querySelector('#searchByTag');
const post = document.querySelector('#post');

// pages
const landingPage = document.querySelector('.landing-page');
const selectedRecipePage = document.querySelector('.selected-recipe-page');
const pantryPage = document.querySelector('.pantry-page')

// buttons
const addToFavoriteButton = document.querySelector('.add-to-favorite-btn');
const removeFromFavoritesButton = document.querySelector('.remove-from-favorite-btn')
const recipesToCookButton = document.querySelector('.recipes-to-cook-btn');
const storedFavoritesButton = document.querySelector('.favorite-box');
const pantryButton = document.querySelector('.pantry-button');

//event listeners
window.addEventListener('load', onStart);

searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const input = formData.get('q').trim();
  if (favorite === true) {
    if (formData.get('type') === 'name') {
      const searchFavName = currentUser.filterFavoriteByRecipeName(input);
      makeRecipeCard(searchFavName, recipeCard);
    }
    if (formData.get('type') === 'ingredients') {
      const searchFavIngredient = currentUser.filterFavoriteByIngredient(input);
      makeRecipeCard(searchFavIngredient);
    }
  }
  if (favorite === false) {
    if (formData.get('type') === 'name') {
      const searchByName = repository.filterByRecipeName(input);
      makeRecipeCard(searchByName, recipeCard);
    }
    if (formData.get('type') === 'ingredients') {
      const searchByIngredient = repository.filterByIngredient(input);
      makeRecipeCard(searchByIngredient, recipeCard);
    }
  }
  e.target.reset()
});

searchTag.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const input = formData.get('tag');
  if (favorite === true) {
    const searchFavTag = currentUser.filterFavoriteByTag(input);
    makeRecipeCard(searchFavTag, recipeCard);
  } else {
    const searchByTag = repository.filterByTag(input)
    makeRecipeCard(searchByTag, recipeCard);
  }
})

post.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const addIngredientData = {
    userID: currentUser.id,
    ingredientID: Number(formData.get('ingredient')),
    ingredientModification: Number(formData.get('ingredientAmount'))
  }
  addIngredient(addIngredientData).then( () => onStart())
})

recipeCard.addEventListener('click', function(event) {
  showSelectedRecipePage(event)
});

recipeCard.addEventListener('keydown', function (event) {
  if ((event.key === 'Enter' || event.key === 13) || (event.key === ' ' || event.key === 32) ) {
    event.preventDefault();
    showSelectedRecipePage(event)
  }
});

logoBox.addEventListener('click', goHome);
pantryButton.addEventListener('click', viewPantry)
recipesToCookButton.addEventListener('click', addRecipesToCook);
addToFavoriteButton.addEventListener('click', addToFavs);
removeFromFavoritesButton.addEventListener('click', removeFromFavs);
storedFavoritesButton.addEventListener('click', showFavorite);

// functions
function onStart() {
  return Promise.all([fetchData('users'), fetchData('ingredients'), fetchData('recipes')])
    .then(data => loadPage(data))
}

function loadPage(data) {
  usersInfo = data[0];
  ingredientsInfo = data[1];
  recipesInfo = data[2];
  currentUser = new User( usersInfo[0], ingredientsInfo);
  userBox.innerText = `Welcome ${currentUser.name}`;
  let newRecipe = []
  cookBook = recipesInfo.map(recipe => {
    newRecipe = new Recipe(recipe, ingredientsInfo);
    return newRecipe
  })
  repository = new RecipeRepository(cookBook, ingredientsInfo);
  multipleButtons();
  makeRecipeCard(repository.recipeData, recipeCard);
  postOptions();
  renderPantry();
}

function viewPantry() {
  showHide([pantryPage], [landingPage, selectedText, selectedRecipePage], 'hidden');
  makeRecipeCard(currentUser.recipesToCook, whatsToCook);
}

function renderPantry() {
  userPantry.innerHTML = ''
  currentUser.pantryInfo.forEach(ingredient => {
    userPantry.innerHTML += 
      `<li>${ingredient.quantity} ${ingredient.name} </li>
      `
  })
}

function postOptions() {
  let sortIngredient = ingredientsInfo.sort((a, b) => (a.name > b.name) ? 1 : -1);
  sortIngredient.forEach(ingredient => {
    selectIngredient.innerHTML += `<option value="${ingredient.id}">${ingredient.name}</option>`
  })
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

function goHome() {
  favorite = false;
  showHide([landingPage], [selectedText, selectedRecipePage, pantryPage], 'hidden');
  makeRecipeCard(repository.recipeData, recipeCard);
}

function showSelectedRecipePage(event) {
  showHide([selectedRecipePage, selectedText], [landingPage, pantryPage], 'hidden');
  populateSelectedRecipe(event);
  populatedResults.innerHTML = ``;
}

function populateSelectedRecipe(event) {
  let id = event.target.closest('button').id;
  foundRecipe = repository.recipeData.find(recipe => {
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

function showFavorite() {
  favorite = true;
  makeRecipeCard(currentUser.favorite, recipeCard);
  showHide([landingPage], [selectedText, selectedRecipePage, pantryPage], 'hidden');
}

function addToFavs() {
  currentUser.addToFavorite(foundRecipe);
}

function addRecipesToCook() {
  currentUser.addToRecipesToCook(foundRecipe);
}

function removeFromFavs() {
  currentUser.removeFromFavorite(foundRecipe);
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