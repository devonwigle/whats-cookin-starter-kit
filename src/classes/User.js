class User {
  constructor(userData, ingredientsData) {
    this.name = userData.name;
    this.id = userData.id;
    this.pantry = userData.pantry;
    this.favorite = [];
    this.recipesToCook = [];
    this.ingredientsData = ingredientsData
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
  };

  filterFavoriteByTag(userInput) {
    let filterTag = this.favorite.filter((recipe) => {
      return recipe.tags.includes(userInput)
    })
    return filterTag
  }
  filterFavoriteByRecipeName(userInput) {
    let filterRecipe = this.favorite.filter((recipe) => {
      return recipe.name.toLowerCase().includes(userInput.toLowerCase())
    })
    return filterRecipe
  }
  filterFavoriteByIngredient(userInput) {
    let filtered = [];
    let filteredIngredient =  this.ingredientsData.filter((ingredient) => {
      if (ingredient.name === userInput.toLowerCase()) {
        return ingredient
      }
    });

    let checkedRecipe = this.favorite.forEach((recipe) => {
      recipe.ingredients.forEach((ing) => {
        if (ing.id === filteredIngredient[0].id) {
          filtered.push(recipe)
        }
      })
    })
    return filtered
  }
}
export default User;
