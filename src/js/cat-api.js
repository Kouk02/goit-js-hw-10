import axios from "axios";
axios.defaults.headers.common["x-api-key"] = "live_jCOpu4zU55giJc6i7DERf2RBmCfqkdcwpGNjBKcQvgtrEt9UVDlsxnOMGSYmJRKq";

// Функція для відправки запиту на отримання інформації про кота за ідентифікатором породи
function fetchCatByBreed(breedId) {
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

// Функція для відправки запиту на отримання інформації про кота
export function fetchCatByBreed(breedId) {
  loader.style.display = "block";
  return axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then((response) => {
      const cat = response.data[0];
      if (cat) {
        displayCatInfo(cat);
      } else {
        handleNoData(); 
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

// Викликати функцію fetchBreeds, щоб заповнити селект при завантаженні сторінки
fetchBreeds();



