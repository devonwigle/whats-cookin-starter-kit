const recipeCard = document.querySelector('.previews');
const whatsToCook = document.querySelector('.recipes-to-cook')

function makeRecipeCard(recipesInfo, renderPage) {
  const recipes = recipesInfo;
  const location = renderPage;
  location.innerHTML = ''
  recipes.forEach(recipe => {
    location.innerHTML +=
      `<button class="all-recipes" id="${recipe.id}">
      <img class="food-preview" src=${recipe.image} alt=${recipe.name}>
      <h2>${recipe.name}</h2>
      </button>`
  })
}

const domUpdates = {

}

export {domUpdates, recipeCard, whatsToCook, makeRecipeCard};
