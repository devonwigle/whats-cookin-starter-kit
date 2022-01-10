export const fetchData = (name) =>{
  return fetch(`http://localhost:3001/api/v1/${name}`)
    .then(response => response.json())
}
export const addIngredient = (addIngredientData) => {
  return fetch('http://localhost:3001/api/v1/users',{
    method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify(addIngredientData)
   })
   .then(response => response.json())
}
