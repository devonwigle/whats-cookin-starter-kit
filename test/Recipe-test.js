import { expect } from 'chai';
import recipeData from './test-data/recipes-data';
import ingredientsData from './test-data/ingredients-data';
import Recipe from '../src/classes/Recipe';

describe('Recipe', () => {
  let recipe;
  beforeEach(() => {
    recipe = new Recipe(recipeData[0],ingredientsData);
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
  });

  it('should return ingredients details', () => {
    recipe.getIngredientDetail();
    expect(recipe.getIngredientDetail()).to.deep.equal([
      {
      "cost": 142,
      "id": 20081,
      "name": "wheat flour",
      "quantity": 1.5,
      "unit": "c"
      },
      {
      "cost": 582,
      "id": 18372,
      "name": "bicarbonate of soda",
      "quantity": 0.5,
      "unit": "tsp"
      }
    ])}
  );

  it('should return ingredients name', () => {
    expect(recipe.getIngredientName()).to.deep.equal(['wheat flour', 'bicarbonate of soda'])
  });

  it ('should return recipe total cost', () => {
    expect(recipe.getCostOfIngredients()).to.equal(5.04)
  });

  it ('should return the recipe instruction', () => {
    expect(recipe.getInstructions()).to.deep.equal([ '<li>1. Add egg and vanilla and mix until combined.<br>' ])
  })


})
