import './styles.css';
import apiCalls from './apiCalls';

// variables
let searchBar = document.querySelector('input');
// pages
let landingPage = document.querySelector('.landing-page');
let selectedRecipePage = document.querySelector('.selected-recipe-page');
let searchResultsPage = document.querySelector('.search-results-page')
// buttons
let storedFavoritesButton = document.querySelector('.favorite-box');
let searchButton = document.querySelector('button');
let breakfastButton = document.querySelector('.breakfast');
let snacksButton = document.querySelector('.snacks');
let dinnerButton = document.querySelector('.dinner');

//event listeners

