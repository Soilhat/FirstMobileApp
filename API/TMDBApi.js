const API_TOKEN = "fda78fe66956fc02d6476a50ec8156cd";

export function getFilms(text) {
  const url = 'https://api.themovied.org/3/search/movie?api_key=' + API_TOKEN + '&language=fr&query=' + text
  fetch(url)
    .then((response) => {console.log(response); return response.json()})
    .catch((error) => console.error(error))
}
