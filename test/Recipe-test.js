import { expect } from 'chai';
import recipeData from './test-data/recipes-data';
import ingredientsData from './test-data/ingredients-data';
import Recipe from '../src/classes/Recipe';

describe('Recipe', () => {
  let recipe;
  beforeEach(function() {
    recipe = new Recipe(recipeData[0], ingredientsData);
  })
  it('Should be a function', () => {
    expect(Recipe).to.be.a('function');
  });

  it('should hold recipe information', () => {
    expect(recipe.id).to.equal(recipeData[0].id);
    expect(recipe.image).to.equal(recipeData[0].image);
    expect(recipe.ingredients).to.equal(recipeData[0].ingredients);
    expect(recipe.instructions).to.equal(recipeData[0].instructions);
    expect(recipe.name).to.equal(recipeData[0].name);
    expect(recipe.tag).to.equal(recipeData[0].tag);

  })
  it('should be able to return ingredient name', () => {
    expect(recipe.getIngredientName()).to.equal()
  })
})