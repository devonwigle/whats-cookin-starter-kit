import ingredientsData from "../../test/test-data/ingredients-data";

class Pantry {
  constructor(userPantry) {
    this.userIngredients = userPantry;
    this.missingIngredients = [];
    this.hasAllIngredients = true;
  }

  checkedIngredients(recipe) {
    // console.log('recipe', recipe.ingredients)
    // console.log('user pantry', this.userIngredients)
    // let matchingIngredients = []
    let results = true;
    recipe.ingredients.forEach(ingredient => {
      let lookInPantry = this.userIngredients.find(useringredient => {
        return useringredient.ingredient === ingredient.id
      })

      console.log(lookInPantry)
      if (!lookInPantry || lookInPantry.amount < ingredient.quantity.amount) {
        results = false
        
      }
   
    })
    return results
  } 
}

export default Pantry;