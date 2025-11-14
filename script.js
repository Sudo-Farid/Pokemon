/**
 * Base URL for the PokeAPI.
 * @constant {string} baseUrl
 */
const baseUrl = "https://pokeapi.co/api/v2/pokemon";
/**
 * Offset for the PokeAPI.
 * @constant {number} offset
 */
let offset = 0;
/**
 * Limit for the PokeAPI.
 * @constant {number} limit
 */
const limit = 20;
/**
 * Fetches a list of Pokémon from the PokeAPI based on the current offset and limit,
 * then processes the result and displays them using displayPokemon.
 *
 * @async
 * @function getPokemon
 * @throws {Error} If there is a problem loading the data.
 */
async function getPokemon() {
  let response = await fetch(`${baseUrl}?limit=${limit}&offset=${offset}`);
  // Check if the HTTP status is OK (200–299)
  if (!response.ok) {
    throw new Error(`Fehler beim Laden: ${response.status}`);
  }
  let data = await response.json();
  displayPokemon(data.results);
}

/**
 * Displays a list of Pokémon on the page.
 *
 * @async
 * @function displayPokemon
 * @param {Array} pokemons - The list of pokemon objects.
 */
async function displayPokemon(pokemons) {
  const pokemonContainer = document.querySelector(".pokemon-container");
  for (const pokemon of pokemons) {
    pokemonContainer.innerHTML += await generateHTMLforDisplayPokemon(pokemon);
  }
}

/**
 * Loads more 20 Pokémon from the API and displays them on the page.
 *
 * @async
 * @function loadMore
 */
async function loadMore() {
  const loadMoreButton = document.getElementsByClassName("load-more-button")[0];
  loadMoreButton.disabled = true;
  const loadAnimation = document.getElementById("load-animation");
  loadAnimation.style.display = "flex";
  offset += 20;
  await getPokemon();
  loadAnimation.style.display = "none";
  loadMoreButton.disabled = false;
}

getPokemon(); // Load the first 20 Pokemons

/**
 * Fetches the details of a Pokémon from the API.
 *
 * @async
 * @function getPokemonDetails
 * @param {string} url - The URL of the Pokémon.
 * @returns {Object} The details of the Pokémon.
 */
async function getPokemonDetails(url) {
  let response = await fetch(url);
  let data = await response.json();
  // console.log(data);
  return data;
}

// Search Algorithm:
// 1. Get the names from the API
// 2. Compare searchValue with the names
// 3. If there is a match, fetch and display the Pokemons with the matching name from the API
// 4. If there is no match, display "No Pokemons found"

/**
 * Searches for Pokémon based on the search value.
 *
 * @function searchPokemon
 * @param {string} searchValue - The value to search for.
 */
let searchActive = false; // Flag to check if the search is active
function searchPokemon() {
  const searchInput = document.querySelector(".search-input");
  const searchValue = searchInput.value.toLowerCase().trim();
  const pokemonContainer = document.querySelector(".pokemon-container");
  if (handleShortOrEmptySearch(searchValue, pokemonContainer)) {
    return;
  }
  searchActive = true;
  document.getElementsByClassName("load-more-button")[0].style.display = "none";
  if (!namesLoaded) {
    return;
  }
  // Search for the Pokémon by name.
  handlePokemonSearchResults(searchValue, pokemonContainer);
}
/**
 * Handles short or empty search values.
 *
 * @function handleShortOrEmptySearch
 * @param {string} searchValue - The value to search for.
 * @param {Object} pokemonContainer - The container for the Pokémon.
 * @returns {boolean} True if the search is short or empty, false otherwise.
 */
function handleShortOrEmptySearch(searchValue, pokemonContainer) {
  if (searchValue.length < 3) {
    if (searchActive || searchValue.length === 0) {
      searchActive = false;
      pokemonContainer.innerHTML = "";
      offset = 0;
      document.getElementsByClassName("load-more-button")[0].style.display = "block";
      getPokemon();
    }
    return true;
  }
  return false;
}

/**
 * This function performs the actual search for the Pokémon by name. The names are stored in the global 'names' variable.
 *
 * @function handlePokemonSearchResults
 * @param {string} searchValue - The value to search for.
 * @param {Object} pokemonContainer - The container for the Pokémon.
 */
function handlePokemonSearchResults(searchValue, pokemonContainer) {
  let matchedNames = names.filter(name =>
    name.toLowerCase().includes(searchValue)
  );
  if (matchedNames.length > 0) {
    getPokemonByNames(matchedNames);
  } else {
    pokemonContainer.innerHTML = "<h2>No Pokemons found</h2>";
  }
}

/**
 * Gets the names of all Pokémon from the API and stores them in the global 'names' variable.
 *
 * @async
 * @function getNamesForSearchFunction
 */
const names = [];
let namesLoaded = false;
async function getNamesForSearchFunction() {
  let response = await fetch(`${baseUrl}?limit=10000`);
  let data = await response.json();
  let pokemons = data.results;
  for (const pokemon of pokemons) {
    names.push(pokemon.name);
  }
  // console.log(names);
  namesLoaded = true;
}

getNamesForSearchFunction(); // Get the names of all Pokémon from the API.

/**
 * Gets the Pokémons by names from the API and displays them on the page.
 *
 * @async
 * @function getPokemonByNames
 * @param {Array} names - The list of names to search for.
 */
async function getPokemonByNames(names) {
  let pokemons = [];
  for (const name of names) {
    let response = await fetch(`${baseUrl}/${name}`);
    let data = await response.json();
    await pokemons.push(data);
  }
  displaySearch(pokemons);
  // console.log(pokemons);
}

/**
 * Displays the Pokémons on the page.
 *
 * @async
 * @function displaySearch
 * @param {Array} pokemons - The list of Pokémons to display.
 */
async function displaySearch(pokemons) {
  const pokemonContainer = document.querySelector(".pokemon-container");
  pokemonContainer.innerHTML = "";
  for (const pokemon of pokemons) {
    pokemonContainer.innerHTML += await generateHTMLforDisplaySearch(pokemon);
  }
}

/**
 * Opens the Pokémon details modal and displays the details of the selected Pokémon.
 *
 * @async
 * @function openPokemonDetails
 * @param {string} pokemon - The name of the Pokémon to open the details for.
 */
async function openPokemonDetails(pokemon) {
  event.stopPropagation();
  document.getElementById("load-animation").style.display = "flex";
  // offset = 0;
  document.getElementById("pokemon-details").style.display = "flex";
  document.body.style.overflow = "hidden";
  document.getElementById("pokemon-details-content").style.display = "flex";
  let pokemonDetailsContainer = document.getElementById("top-section");
  let bottomSectionContainer = document.getElementById("bottom-section");
  let pokemonDetails = await fetch(`${baseUrl}/${pokemon}`);
  let data = await pokemonDetails.json();
  pokemonDetailsContainer.innerHTML = generateHTMLforTopSection(data);
  bottomSectionContainer.innerHTML = generateHTMLforBottomSection(data);
  if (currentTab != "") {
    displayTab(currentTab);
  }
  document.getElementById("load-animation").style.display = "none";
}

/**
 * Closes the Pokémon details modal and restores the scroll position.
 *
 * @function closePokemonDetails
 */
function closePokemonDetails() {
  document.getElementById("pokemon-details").style.display = "none";
  document.body.style.overflow = "auto";
  currentTab = "";
  // document.querySelector(".pokemon-container").innerHTML = "";
  // offset = offset + 20;
  // getPokemon();
}
let tabs = ["tab1", "tab2", "tab3", "tab4"];
let currentTab = "";
/**
 * Displays the selected tab in the Pokémon details modal.
 *
 * @function displayTab
 * @param {string} tab - The tab to display.
 */
function displayTab(tab) {
  document.querySelectorAll(".tab").forEach(t =>
    t.classList.remove("active")
  );
  document.getElementById(tab).classList.add("active");
  document.querySelectorAll(".menu button").forEach(btn =>
    btn.classList.remove("selected")
  );
  let string = "btn" + tab.replace(/\D/g, "");
  document.getElementById(string).classList.add("selected");
  currentTab = tab;
}

/**
 * Closes the Pokémon details Container and restores the scroll position when the overlay  is clicked.
 *
 * @function closePokemonDetails
 */
document.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("click", (event) => {
    const overlay = document.getElementById("pokemon-details");
    const content = document.getElementById("pokemon-details-content");
    if (!overlay || overlay.style.display === "none") return;
    if (!content || content.style.display === "none") return;
    if (overlay === event.target || !content.contains(event.target)) {
      closePokemonDetails();

    }
  });
}); 