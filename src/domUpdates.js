const recipeCard = document.querySelector('.previews');

function makeRecipeCard(recipesInfo) {
  const recipes = recipesInfo
  recipeCard.innerHTML = ''
  recipes.forEach(recipe => {
    recipeCard.innerHTML +=
      `<article class="all-recipes" id="${recipe.id}">
      <img class="food-preview" src=${recipe.image} alt=${recipe.name}>
      <h2>${recipe.name}</h2>
      </article>`
  })
}

const domUpdates = {

}

export {domUpdates, recipeCard, makeRecipeCard};