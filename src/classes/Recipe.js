class Recipe {
  constructor(recipeData, ingredientsData) {
    this.id = recipeData.id;
    this.image = recipeData.image;
    this.ingredients = recipeData.ingredients;
    this.instructions = recipeData.instructions;
    this.name = recipeData.name;
    this.tag = recipeData.tag;
    this.ingredientsData = ingredientsData;
    this.ingredientInfo = [];
  }
  getIngredientDetail() {
    this.ingredients.forEach(ingredient =>{
      this.ingredientsData.forEach(item => {
        if( ingredient.id === item.id){
          this.ingredientInfo.push({
            id: ingredient.id,
            name: item.name,
            quantity: ingredient.quantity.amount,
            unit: ingredient.quantity.unit,
            cost: item.estimatedCostInCents
          })
        };
      });
    });
    return this.ingredientInfo;
  };
  getIngredientName() {
    // this.getIngredientDetail()
    let ingredientNames = this.ingredientInfo.map(ingredient => {
      return ingredient.name
    })
    return ingredientNames
  }
  getCostOfIngredients() {
    this.getIngredientDetail()
    
    

  };
  getInstructions(){
    return this.instructions;
  }

}
export default Recipe;
