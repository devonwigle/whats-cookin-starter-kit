export const fetchData = (name) =>{
  return fetch(`https://what-s-cookin-starter-kit.herokuapp.com/api/v1/${name}`)
    .then(response => response.json())
}
