import Recipe from './RecipeRepository'

class RecipeRepository {
  constructor(recipeData, ingredientsData) {
    this.recipeData = recipeData;
    this.ingredientsData = ingredientsData;
  }
  filterByTags(userInput) {
    // const recipeBit = Recipe.filter(ingredient => )
  }
  filterByRecipeName(userInput) {
    let filterRecipe = this.recipeData.filter((recipe) => {
      return recipe.name.toLowerCase().includes(userInput.toLowerCase())
    })
    // console.log(filterRecipe)
    return filterRecipe
  }
  filterByIngredient(userInput) {
    let filteredIngredient =  this.ingredientsData.filter((ingredient) => { 
      return ingredient.name.toLowerCase().includes(userInput.toLowerCase())
    });
   
    let checkedRecipe = this.recipeData.filter((recipe) => {
      recipe.ingredients.filter((ingredient) => {
        return ingredient.id.includes(filteredIngredient[0].id);
        // if (ingredient.id === filteredIngredient[0].id) {
        //   console.log('XYZFHG')
        // }
       
      } )
    })
   
    return checkedRecipe
  }
}

export default RecipeRepository;
