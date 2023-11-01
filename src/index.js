// Import необхідних функцій або бібліотек, якщо необхідно
import axios from "axios";
import SlimSelect from 'slim-select'
import Notiflix from 'notiflix';

new SlimSelect({
  select: '#selectElement'
});

// Отримайте посилання на HTML-елементи
const breedSelect = document.querySelector(".breed-select");
const loader = document.querySelector(".loader");
const error = document.querySelector(".error");
const catInfo = document.querySelector(".cat-info");

axios.defaults.headers.common["x-api-key"] = "live_jCOpu4zU55giJc6i7DERf2RBmCfqkdcwpGNjBKcQvgtrEt9UVDlsxnOMGSYmJRKq";

// Функція для заповнення селекту порід
function populateBreeds(breeds) {
  breedSelect.innerHTML = breeds.map((breed) => {
    return `<option value="${breed.id}">${breed.name}</option>`;
  }).join('');
}

// Функція для відображення інформації про кота
function displayCatInfo(cat) {
  const catImage = document.createElement("img");
  catImage.src = cat.url;
  catImage.alt = "Cat";

  const catName = document.createElement("p");
  catName.textContent = cat.breeds[0].name;

  const catDescription = document.createElement("p");
  catDescription.textContent = cat.breeds[0].description;

  catInfo.innerHTML = "";
  catInfo.appendChild(catImage);
  catInfo.appendChild(catName);
  catInfo.appendChild(catDescription);

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

// Функція для обробки помилок
function doSomethingAsync() {
  return new Promise((resolve, reject) => {
    // Ваша логіка тут, де ви перевіряєте наявність помилки
    if (hasError) {
      reject(new Error("Помилка!"));
    } else {
      resolve("Успішно");
    }
  });
}

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

// Додайте обробник подій для вибору породи
breedSelect.addEventListener("change", () => {
  const selectedBreedId = breedSelect.value;
  if (selectedBreedId) {
    fetchCatByBreed(selectedBreedId);
  }
});

// Викликати функцію fetchBreeds, щоб заповнити селект при завантаженні сторінки
fetchBreeds();