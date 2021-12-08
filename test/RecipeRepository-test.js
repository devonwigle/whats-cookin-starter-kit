import { expect } from 'chai';
import RecipeRepository from '../src/classes/RecipeRepository';
import recipeData from './test-data/recipes-data';

describe('RecipeRepository', () => {

  let recipeRepository;
  beforeEach(() => {
    recipeRepository = new RecipeRepository(recipeData);
  })
  it('Should be a function', () => {
    expect(RecipeRepository).to.be.a('function');
  });
  it('should hold recipe data', () => {
    
    expect(recipeRepository.recipeData).to.equal(recipeData);
  })
  it('should have a method to filter by recipe name', () => {
    let userInput = 'cookie'
    expect(recipeRepository.filterByRecipeName(userInput)).to.deep.equal([recipeData[0]]);
  })
})