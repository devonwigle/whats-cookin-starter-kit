class User {
  constructor(userData, ingredientsData) {
    this.name = userData.name;
    this.id = userData.id;
    this.pantry = userData.pantry;
    this.favorite = [];
    this.recipesToCook = [];
  };

  addToFavorite(recipeData) {
    if(!this.favorite.includes(recipeData)){
      this.favorite.push(recipeData)
    };
  };

  removeFromFavorite(recipeData) {
    this.favorite.forEach(recipe => {
      if(recipeData.id === recipe.id) {
        this.favorite.splice(this.favorite.indexOf(recipeData),1)
      };
    });
  };

  addToRecipesToCook(recipeData) {
    if(!this.recipesToCook.includes(recipeData)){
      this.recipesToCook.push(recipeData)
    };
  };

  removeFromRecipesToCook(recipeData) {
    this.recipesToCook.forEach(recipe => {
      if(recipeData.id === recipe.id) {
        this.recipesToCook.splice(this.recipesToCook.indexOf(recipeData),1)
      };
    });
  }

}
export default User;
