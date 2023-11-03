import axios from "axios";
axios.defaults.headers.common["x-api-key"] = "live_jCOpu4zU55giJc6i7DERf2RBmCfqkdcwpGNjBKcQvgtrEt9UVDlsxnOMGSYmJRKq";

// Функція для відправки запиту на отримання інформації про кота за ідентифікатором породи
export function fetchCatByBreed(breedId) {
  return axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then((response) => {
      const cat = response.data[0];
      return cat;
    });
}

// Функція для відправки запиту на отримання списку порід
export function fetchBreeds() {
  return axios.get("https://api.thecatapi.com/v1/breeds")
    .then((response) => {
      const breeds = response.data;
      return breeds;
    });
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