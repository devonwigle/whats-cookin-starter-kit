import { expect } from 'chai';
import recipeData from './test-data/recipes-data';
import ingredientsData from './test-data/ingredients-data';
import Recipe from '../src/classes/Recipe';

describe('Recipe', () => {
  let recipe;
  beforeEach(function() {
    recipe = new Recipe(recipeData[0]);
  })
  it('Should be a function', () => {
    expect(Recipe).to.be.a('function');
  });

  it('should hold recipe information', () => {
    expect(recipe.id).to.equal(recipeData[0].id);
    expect(recipe.image).to.equal("https://spoonacular.com/recipeImages/595736-556x370.jpg");
    expect(recipe.ingredients).to.equal(recipeData[0].ingredients);
    expect(recipe.instructions).to.equal(recipeData[0].instructions);
    expect(recipe.name).to.equal(recipeData[0].name);
    expect(recipe.tag).to.equal(recipeData[0].tag);

  })
})