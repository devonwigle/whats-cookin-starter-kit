class Recipe {
  constructor(recipeData, ingredientsData) {
    this.id = recipeData.id;
    this.image = recipeData.image;
    this.ingredients = recipeData.ingredients;
    this.instructions = recipeData.instructions;
    this.name = recipeData.name;
    this.tag = recipeData.tag;
    this.ingredientsName = this.getIngredientName()
    this.ingredientsData = ingredientsData
  }
  getIngredientName() {
    console.log('this', this.ingredientsData)
    console.log('that', this.ingredients)
    let ingredientName = [];
    this.ingredients.forEach(ingredient => {
      this.ingredientsData.forEach(item => {
        if (item.id === ingredient.id) {
          ingredientName.push(item.name)
        }
      })
    })
    return ingredientName
  }
  ingredientCost(ingredientsData) {

  }
  directions() {
    return this.instructions
  }
}
export default Recipe;