import { expect } from 'chai';
import userData from './test-data/users-data.js';
import ingredientsData from './test-data/ingredients-data';
import recipeData from './test-data/recipes-data';
import User from '../src/classes/User';
import Pantry from '../src/classes/Pantry'

describe('Pantry', () => {

  let userPantry;
  beforeEach(() => {
    userPantry = new Pantry(userData[0].pantry);
  });

  it('Should be a function', () => {
    expect(Pantry).to.be.a('function');
  });

  it('should contain a users Pantry', () => {
    expect(Pantry.userIngredients).to.equal(userData.pantry);
  })


  it.only('should check the users pantry has correct ingredients', () => {
    expect(userPantry.checkedIngredients(recipeData[0])).to.equal(true)
  })

  it.only('should check the users pantry has enough ingredients', () => {
    expect(userPantry.checkedIngredients(recipeData[1])).to.equal(false)
  })

});