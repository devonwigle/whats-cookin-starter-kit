class Recipe {
  constructor(recipeData, ingredientsData) {
    this.id = recipeData.id;
    this.image = recipeData.image;
    this.ingredients = recipeData.ingredients;
    this.instructions = recipeData.instructions;
    this.name = recipeData.name;
    this.tag = recipeData.tag;
    this.ingredientsData = ingredientsData;
    this.ingredientsName = [];
  }
   getIngredientName() {
     this.ingredients.forEach(ingredient =>{
       this.ingredientsData.forEach(item => {
         if( ingredient.id === item.id){
           this.ingredientsName.push(item.name)
         };
       });
     });
     return this.ingredientsName;
   };
   getCostOfIngredients() {

   };
   getInstructions(){
     return this.instructions;
   }

}
export default Recipe;
