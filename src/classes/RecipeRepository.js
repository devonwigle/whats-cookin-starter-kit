import Recipe from './RecipeRepository'

class RecipeRepository {
  constructor(recipeData) {
    this.recipeData = recipeData;
  }
  filterByTags(userInput) {
    // const recipeBit = Recipe.filter(ingredient => )
  }
  filterByRecipeName(userInput) {
    let filterRecipe = this.recipeData.filter((recipe) => {
      return recipe.name.toLowerCase().includes(userInput.toLowerCase())
    })
    console.log(filterRecipe)
    return filterRecipe
  }
  filterByIngredient(userInput) {
    
  }
}

export default RecipeRepository;
