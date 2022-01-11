/* eslint-disable max-len */
import ingredientsData from "../../test/test-data/ingredients-data";
import recipeData from "../../test/test-data/recipes-data";

class Pantry {
  constructor(userPantry) {
    this.userIngredients = userPantry;
    this.missingIngredients = [];
    this.hasAllIngredients = true;
    this.foundIngredients = []
    this.determineAmountMissing;
  }

  checkedIngredients(recipe) {

    this.hasAllIngredients = true;

    const checked =  recipe.ingredients.forEach(recipeIngredient => {

      let lookInPantry = this.userIngredients.find(useringredient => useringredient.ingredient === recipeIngredient.id)
      
      if (!lookInPantry || (lookInPantry.amount < recipeIngredient.quantity.amount)) {
        this.hasAllIngredients = false
        recipeIngredient = this.howMuch(recipeIngredient, lookInPantry)
        this.missingIngredients.push(recipeIngredient)
      }

      this.foundIngredients.push(lookInPantry)
      return lookInPantry
    })
    
    return checked
  } 

  howMuch(recipeIngredient, lookInPantry) {
    let determineAmountMissing;
  
    if (lookInPantry) {
      determineAmountMissing = recipeIngredient.quantity.amount - lookInPantry.amount
    } else {
      determineAmountMissing = recipeIngredient.quantity.amount
    }


    recipeIngredient.amountMissing = determineAmountMissing
    console.log(recipeIngredient)
    return recipeIngredient

  }
  
}

export default Pantry;