// Import необхідних функцій або бібліотек, якщо необхідно
import axios from "axios";
import SlimSelect from 'slim-select'
import Notiflix from 'notiflix';
import { fetchCatByBreed } from './js/cat-api.js';


// Отримайте посилання на HTML-елементи
const breedSelect = document.querySelector(".breed-select");
const loader = document.querySelector(".loader");
const error = document.querySelector(".error");
const catInfo = document.querySelector(".cat-info");

// Приховати блок з помилкою при завантаженні сторінки
error.style.display = "none";

//обробник подій для вибору породи
breedSelect.addEventListener("change", () => {
  const selectedBreedId = breedSelect.value;
  
  if (selectedBreedId) {
    loader.style.display = "block";
    fetchCatByBreed(selectedBreedId)
      .then((cat) => {
        displayCatInfo(cat);
      })
      .catch((err) => {
        handleError();
      })
      .finally(() => {
        loader.style.display = "none";
      });
  }
});

new SlimSelect({
  select: '#selectElement'
});



axios.defaults.headers.common["x-api-key"] = "live_jCOpu4zU55giJc6i7DERf2RBmCfqkdcwpGNjBKcQvgtrEt9UVDlsxnOMGSYmJRKq";

// Функція для заповнення селекту порід
function populateBreeds(breeds) {
  breedSelect.innerHTML = breeds.map((breed) => {
    return `<option value="${breed.id}">${breed.name}</option>`;
  }).join('');
}

// Функція для відображення інформації про кота
function displayCatInfo(cat) {
  const catInfoTemplate = `
    <img src="${cat.url}" alt="Cat">
    <p>${cat.breeds[0].name}</p>
    <p>${cat.breeds[0].description}</p>
  `;

  catInfo.innerHTML = catInfoTemplate;
  catInfo.style.display = "block";
  error.style.display = "none"; // Сховати текст про помилку, якщо інформація отримана успішно
}


// Функція для відправки запиту на отримання списку порід
function fetchBreeds() {
  loader.style.display = "block";
  return axios.get("https://api.thecatapi.com/v1/breeds")
    .then((response) => {
      const breeds = response.data;
      populateBreeds(breeds);
    })
    .catch((err) => {
      handleError();
    })
    .finally(() => {
      loader.style.display = "none";
    });
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
// Функція для відправки запиту на отримання інформації про кота
function fetchCatByBreed(breedId) {
  loader.style.display = "block";
  return axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then((response) => {
      const cat = response.data[0];
      if (cat) {
        displayCatInfo(cat);
      } else {
        handleNoData(); // Викликати функцію для обробки відсутності даних
      }
    })
    .catch((err) => {
      handleError();
    })
    .finally(() => {
      loader.style.display = "none";
    });
}

// Глобальний обробник помилок Axios
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    handleError();
    return Promise.reject(error);
  }
);



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

breedSelect.addEventListener("change", () => {
  const selectedBreedId = breedSelect.value;
  if (selectedBreedId) {
    fetchCatByBreed(selectedBreedId);
  }
});

// Викликати функцію fetchBreeds, щоб заповнити селект при завантаженні сторінки
fetchBreeds();