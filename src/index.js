import { fetchCatByBreed, fetchBreeds } from './js/cat-api';

// посилання на HTML-елементи
const breedSelect = document.querySelector(".breed-select");
const loader = document.querySelector(".loader");
const error = document.querySelector(".error");
const catInfo = document.querySelector(".cat-info");

// Приховати блок з помилкою при завантаженні сторінки
error.style.display = "none";
document.addEventListener('DOMContentLoaded', () => {
  loader.style.display = "none";

// Функція для відображення інформації про кота
function displayCatInfo(cat) {
  const catInfoTemplate = `
    <img src="${cat.url}" alt="Cat">
    <p>${cat.breeds[0].name}</p>
    <p>${cat.breeds[0].description}</p>
  `;

  catInfo.innerHTML = catInfoTemplate;
  catInfo.style.display = "block";
  error.style.display = "none";
}

// Функція для заповнення селекту порід
function populateBreeds(breeds) {
  breedSelect.innerHTML = breeds.map((breed) => {
    return `<option value="${breed.id}">${breed.name}</option>`;
  }).join('');
}

// Функція для очищення блоків catInfo та error
function clearCatInfo() {
  catInfo.innerHTML = "";
  error.style.display = "none";
}

// Обробник подій для вибору породи
breedSelect.addEventListener("change", () => {
  const selectedBreedId = breedSelect.value;

  if (selectedBreedId) {
    loader.style.display = "block";
    clearCatInfo(); // Очистити розмітку перед новим запитом
    fetchCatByBreed(selectedBreedId)
      .then((cat) => {
        // Перевірити, чи є коректні дані про кота перед їх відображенням
        if (cat && cat.url && cat.breeds[0]) {
          displayCatInfo(cat);
        } else {
          handleNoData(); // Показати повідомлення про відсутність даних
        }
      })
      .catch((err) => {
        handleError(err); // Передати помилку в обробник помилок
      })
      .finally(() => {
        loader.style.display = "none";
      });
  }
});

function handleError() {
  error.textContent = "Oops! Something went wrong. Please try again.";
  error.style.display = "block";
  error.style.color = "red";
}

// Функція для обробки відсутності даних
function handleNoData() {
  error.textContent = "No data available for the selected breed.";
  error.style.display = "block";
  error.style.color = "red";
}

// Виклик функції для заповнення селекту порід
fetchBreeds()
  .then((breeds) => {
    populateBreeds(breeds);
  })
  .catch((err) => {
    handleError(err);
  });

  });