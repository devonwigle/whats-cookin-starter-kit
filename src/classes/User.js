/* eslint-disable max-len */
import recipeData from "../../test/test-data/recipes-data";

class User {
  constructor(userData, ingredientsData) {
    this.name = userData.name;
    this.id = userData.id;
    this.pantry = userData.pantry;
    this.favorite = [];
    this.recipesToCook = [];
    this.ingredientsData = ingredientsData
  }

  addToFavorite(recipeData) {
    if (!this.favorite.includes(recipeData)) {
      this.favorite.push(recipeData)
    }
  }

  removeFromFavorite(recipeData) {
    this.favorite.forEach(recipe => {
      if (recipeData.id === recipe.id) {
        this.favorite.splice(this.favorite.indexOf(recipeData), 1)
      }
    });
  }

  addToRecipesToCook(recipeData) {
    if (!this.recipesToCook.includes(recipeData)) {
      this.recipesToCook.push(recipeData)
    }
  }

  removeFromRecipesToCook(recipeData) {
    this.recipesToCook.forEach(recipe => {
      if (recipeData.id === recipe.id) {
        this.recipesToCook.splice(this.recipesToCook.indexOf(recipeData), 1)
      }
    });
  }

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
      return ingredient.name.toLowerCase().includes(userInput.toLowerCase())
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

  checkPantry(recipeData) {
    console.log('user pantry', this.pantry)
    
    let findMatchingIngredient = recipeData.ingredients.map(recipeIngredient => {
      let itIsInThePantry = this.pantry.find(pantryIngredient => {
        return recipeIngredient.id === pantryIngredient.ingredient
      })
      
      let hasAllIngredients = true;
     
      this.determineAmountMissing = itIsInThePantry.amount - recipeIngredient.quantity.amount

      if (this.determineAmountMissing < 1)  {
        this.determineAmountMissing = Math.abs(itIsInThePantry.amount - recipeIngredient.quantity.amount)
        //inner text or html 
        console.log('dont got it')
      } else {
        console.log('recipe', recipeIngredient)
        console.log('user Pantry', itIsInThePantry)
        console.log('You have all the ingredients you need');
      }

      // eslint-disable-next-line max-len
      if (itIsInThePantry && (itIsInThePantry.amount  < recipeIngredient.quantity.amount) || !itIsInThePantry) {
        hasAllIngredients = false;
        // console.log('inside if stattement but false')
        return hasAllIngredients
      } else {
        // console.log('inside if statement but true')
        return hasAllIngredients
      }
    })

    let hasfalse = findMatchingIngredient.includes(false)

    if (hasfalse === true) {
      console.log('OH NO! YOU dont have enough ingredients to cook this recipe');
    } else {
      // inner text
      console.log('Happy cooking!');
    }
  
  }

}
export default User;
