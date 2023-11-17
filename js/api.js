// Definirea unei constante pentru URL-ul de bază al API-ului de știri:
const ENDPOINT = "https://newsapi.org/v2/everything";
// Definirea unei constante pentru cheia API pentru autentificare:
const API_KEY = "dd82ff3604224bf1b224da3ef75c9135";

// Definirea unei funcții numită 'getNews' care primește un argument 'query':
function getNews(query) {
  // const optionalParam = {
  //     from: '2023-11-14',
  //     language: 'en'
  // }

  // Returnarea rezultatului unei cereri fetch către API-ul de știri, utilizând șirurile de șablon pentru a insera cheia API și interogarea în URL:
  return fetch(`${ENDPOINT}?apiKey=${API_KEY}&q=${query}`).then((result) => {
    // Afisarea în consolă a obiectului 'result' pentru investigarea rezultatului cererii:
    console.dir(result);
    // Returnarea datelor JSON primite de la API ca rezultat al funcției 'getNews':
    return result.json();
  });
}

// function getNewsByPopularity(query) {

//      const optionalParam = {
//          from: '2023-11-14',
//          language: 'en'
//      }

//     return fetch(`${ENDPOINT}?apiKey=${API_KEY}&q=${query}&sortBy=popularity`)
//         .then(res => {
//         console.dir(res);
//         return res.json();
//     });
// }

// Exportarea funcției 'getNews' pentru a putea fi utilizată în alte fișiere JavaScript:
export default { getNews };
