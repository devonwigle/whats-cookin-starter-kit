import Recipe from './RecipeRepository'

class RecipeRepository {
  constructor(recipeData, ingredientsData) {
    this.recipeData = recipeData;
    this.ingredientsData = ingredientsData;
  }
  filterByTag(userInput) {
    let filterTag = this.recipeData.filter((recipe) => {
      return recipe.tags.includes(userInput)
    })
    return filterTag
  }
  filterByRecipeName(userInput) {
    let filterRecipe = this.recipeData.filter((recipe) => {
      return recipe.name.toLowerCase().includes(userInput.toLowerCase())
    })
    return filterRecipe
  }
  filterByIngredient(userInput) {
    let filtered = [];
    let filteredIngredient =  this.ingredientsData.filter((ingredient) => {
      return ingredient.name.toLowerCase().includes(userInput.toLowerCase())
    });

    let checkedRecipe = this.recipeData.forEach((recipe) => {
      recipe.ingredients.forEach((ing) => {
        if(ing.id === filteredIngredient[0].id){
          filtered.push(recipe)
        }
      })
    })
    console.log(filtered)
    return filtered
  }
}

export default RecipeRepository;
