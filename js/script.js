// Importul modulului API dintr-un fișier numit 'api.js':
import API from "./api.js";

// Obținerea elementului formularului din DOM:
const form = document.getElementById("form");

// Obținerea elementului de încărcare (spinner) din DOM:
const loadingSpinner = document.getElementById("loading");

// Adăugarea unui ascultător de evenimente 'submit' la formular, apelând funcția 'onSubmit' la acțiunea de submit a formularului:
form.addEventListener("submit", onSubmit);

// Funcția apelată la evenimentul de submit al formularului:
function onSubmit(e) {
  e.preventDefault(); // Oprirea comportamentului implicit al formularului.

  // Obținerea valorii introduse în câmpul de input din formular:
  const inputValue = form.elements.news.value;

  // Apelarea funcției 'loadData' cu valoarea introdusă în câmpul de input:
  loadData(inputValue);
}

// Funcția pentru încărcarea datelor în funcție de termenul de căutare primit ca argument:
function loadData(searchTerm) {
  // Afișarea spinner-ului de încărcare:
  showLoading();

  // Apelarea metodei 'getNews' din modulul API, folosind termenul de căutare primit:
  API.getNews(searchTerm)
    .then((data) => {
      const { articles } = data;

      // Verificarea dacă nu există articole primite de la API:
      if (articles?.length === 0) {
        showError(); // Afișarea unei erori.
      }

      // Generarea unui markup HTML combinat pentru articole, adăugând fiecare markup la începutul rezultatului final folosind metoda reduce:
      return articles.reduce(
        (combinedMarkup, article) => createMarkup(article) + combinedMarkup,
        ""
      );
    })
    .then((markup) => updateNewsList(markup)) // Actualizarea listei de știri cu markup-ul generat.
    .catch(onError) // Capturarea erorilor și afișarea lor.
    .finally(() => {
      hideLoading(); // Ascunderea spinner-ului de încărcare.
      form.reset(); // Resetarea formularului după încărcare.
    });
}

// Funcție pentru afișarea spinner-ului de încărcare:
function showLoading() {
  loadingSpinner.classList.remove("hidden");
}

// Funcție pentru ascunderea spinner-ului de încărcare:
function hideLoading() {
  loadingSpinner.classList.add("hidden");
}

// Funcție pentru crearea markup-ului HTML pentru fiecare articol:
function createMarkup(article) {
  const { author, title, description, url, urlToImage } = article;

  return `
  <div class="article-card">
    <h2 class="article-title">${title}</h2>
    <h3 class="article-author">${author || "Anonim"}</h3>
    <img src=${urlToImage} class="article-img">
    <p class="article-description">${description}</p>
    <a href=${url} class="article-link" target="_blank">Citește mai mult</a>
  </div>`;
}

// Funcție pentru actualizarea listei de știri cu markup-ul generat:
function updateNewsList(markup) {
  document.getElementById("articlesWrapper").innerHTML = markup;
}

// Funcție pentru afișarea unei erori în consolă:
function showError() {
  console.error("Fără rezultate"); // Afișare mesaj de eroare în consolă.
}

// Funcție pentru gestionarea erorilor:
function onError(err) {
  console.error(err); // Afișare erori în consolă.
}
