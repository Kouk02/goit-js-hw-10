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