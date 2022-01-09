import { expect } from 'chai';
import userData from './test-data/users-data.js';
import ingredientsData from './test-data/ingredients-data';
import recipeData from './test-data/recipes-data';
import User from '../src/classes/User';

describe('User', () => {
  let currentUser;
  beforeEach(() => {
    currentUser = new User(userData[0], ingredientsData);
  });
  it('Should be a function', () => {
    expect(User).to.be.a('function');
  });

  it('Should hold a user info', () => {
    expect(currentUser.name).to.equal(userData[0].name);
    expect(currentUser.id).to.equal(userData[0].id);
    expect(currentUser.pantry).to.equal(userData[0].pantry);
    expect(currentUser.favorite).to.deep.equal([]);
    expect(currentUser.recipesToCook).to.deep.equal([]);
  });

  it('Should be able to add to favorite recipes', () => {
    currentUser.addToFavorite(recipeData[0]);
    expect(currentUser.favorite).to.deep.equal([recipeData[0]]);
    currentUser.addToFavorite(recipeData[1]);
    expect(currentUser.favorite).to.deep.equal([recipeData[0],recipeData[1]]);
  });

  it('Should be able to remove from favorite', () => {
    currentUser.addToFavorite(recipeData[0]);
    currentUser.addToFavorite(recipeData[1]);
    currentUser.removeFromFavorite(recipeData[0]);
    expect(currentUser.favorite).to.deep.equal([recipeData[1]]);
  });

  it('Should be able to add to recipes to cook', () => {
    currentUser.addToRecipesToCook(recipeData[0]);
    expect(currentUser.recipesToCook).to.deep.equal([recipeData[0]]);
    currentUser.addToRecipesToCook(recipeData[1]);
    expect(currentUser.recipesToCook).to.deep.equal([recipeData[0],recipeData[1]]);
  });

  it('Should be able to remove from recipes to cook', () => {
    currentUser.addToRecipesToCook(recipeData[0]);
    currentUser.addToRecipesToCook(recipeData[1]);
    currentUser.removeFromRecipesToCook(recipeData[0]);
    expect(currentUser.recipesToCook).to.deep.equal([recipeData[1]]);
  });

  it('Should have a method to filter favorite by recipe name', () => {
    currentUser.addToFavorite(recipeData[0]);
    currentUser.addToFavorite(recipeData[1]);
    let userInput = 'cookie'
    expect(currentUser.filterFavoriteByRecipeName(userInput)).to.deep.equal([recipeData[0]]);
  });

  it('should have a method to filter by ingredients', () => {
    currentUser.addToFavorite(recipeData[0]);
    currentUser.addToFavorite(recipeData[1]);
    let userInput = 'wheat flour';
    expect(currentUser.filterFavoriteByIngredient(userInput)).to.deep.equal([recipeData[0]]);
  })

  it('should have a method to filter by tag', () => {
    currentUser.addToFavorite(recipeData[0]);
    currentUser.addToFavorite(recipeData[1]);
    let userInput = 'snack';
    expect(currentUser.filterFavoriteByTag(userInput)).to.deep.equal([recipeData[0]]);
  });

  it('should be able to calcuulate how much is missing', () => {
    currentUser.addToRecipesToCook(recipeData[0]);
    currentUser.checkPantry(recipeData[0])
    expect(currentUser.determineAmountMissing).to.equal(9.5)
    })

})
