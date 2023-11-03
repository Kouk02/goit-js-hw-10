import { fetchCatByBreed } from './js/cat-api';
import SlimSelect from 'slim-select';
const breedSelect = document.querySelector(".breed-select");

new SlimSelect({
  select: breedSelect
});

// Перенесення оголошення масиву перед викликом populateBreeds
const yourArrayOfBreeds = ["Breed 1", "Breed 2", "Breed 3"];

function populateBreeds(breeds) {
  // Змінено breedSelect.innerHTML на breedSelect.options
  breedSelect.options = breeds.map((breed) => {
    return new Option(breed, breed);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const loader = document.querySelector(".loader");
  const error = document.querySelector(".error");
  const catInfo = document.querySelector(".cat-info");

  error.style.display = "none";

  function displayCatInfo(cat) {
    const catInfoTemplate = `
      <img src="${cat.url}" alt="Cat">
      <p>${cat.breeds[0].name}</p>
      <p>${cat.breeds[0].description}</p>
    `;

    catInfo.innerHTML = catInfoTemplate;
    catInfo.style.display = "block";
    error.style.display = "none"; // Змінено error.style.display
  }

  function handleError() {
    error.textContent = "Oops! Something went wrong. Please try again.";
    error.style.display = "block";
    error.style.color = "red";
  }

  function handleNoData() {
    error.textContent = "No data available for the selected breed.";
    error.style.display = "block";
    error.style.color = "red";
  }

  function clearCatInfo() {
    catInfo.innerHTML = "";
    error.style.display = "none";
  }

  function updateCatInfo(breedId) {
    loader.style.display = "block";
    clearCatInfo();

    fetchCatByBreed(breedId)
      .then((cat) => {
        if (cat && cat.url && cat.breeds[0]) {
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

  breedSelect.addEventListener("change", () => {
    const selectedBreedId = breedSelect.value;
    if (selectedBreedId) {
      updateCatInfo(selectedBreedId);
    }
  });

  // Виклик функції для заповнення селекту
  populateBreeds(yourArrayOfBreeds);
});