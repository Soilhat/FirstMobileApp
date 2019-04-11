const API_TOKEN = "fda78fe66956fc02d6476a50ec8156cd";

export function getFilms (text, page) {
  const url = 'https://api.themoviedb.org/3/search/movie?api_key=' + API_TOKEN + '&language=fr&query=' + text + "&page=" + page
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.error(error))
}

export function getImage (name) {
  return 'https://image.tmdb.org/t/p/w300' + name
}
