class Recipe {
  constructor(recipeData, ingredientsData) {
    this.id = recipeData.id;
    this.image = recipeData.image;
    this.ingredients = recipeData.ingredients;
    this.instructions = recipeData.instructions;
    this.name = recipeData.name;
    this.tag = recipeData.tag;
    this.ingredientsData = ingredientsData;
    this.ingredientInfo = this.getIngredientDetail();
  }
  getIngredientDetail() {
    let allIngredientInfo = []
    this.ingredients.forEach(ingredient => {
      this.ingredientsData.forEach(item => {
        if ( ingredient.id === item.id) {
          allIngredientInfo.push({
            id: ingredient.id,
            name: item.name,
            quantity: ingredient.quantity.amount,
            unit: ingredient.quantity.unit,
            cost: item.estimatedCostInCents
          })
        }
      });
    });
    return allIngredientInfo;
  }
  getIngredientName() {
    let ingredientNames = this.ingredientInfo.map(ingredient => {
      return ingredient.name
    })
    return ingredientNames
  }
  getCostOfIngredients() {
    let total = this.ingredientInfo.reduce((acc, currentItem) => {
      acc += (currentItem.quantity * currentItem.cost) / 100;
      return acc
    }, 0);
    return Number(total.toFixed(2));
  }
  getInstructions() {
    let instructionDeets = this.instructions.reduce((acc, currentInstruction) =>{
      acc.push(`<li>${currentInstruction.number}. ${currentInstruction.instruction}<br>`)
      return acc
    }, [])
    return instructionDeets;
  }

}
export default Recipe;
