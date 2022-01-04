export const fetchData = (name) =>{
  return fetch(`http://localhost:3001/api/v1/${name}`)
    .then(response => response.json())

}
