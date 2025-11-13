function includeHTML() {
  var z, i, elmnt, file, xhttp;
  /* Loop through a collection of all HTML elements: */
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    /*search for elements with a certain atrribute:*/
    file = elmnt.getAttribute("w3-include-html");
    if (file) {
      /* Make an HTTP request using the attribute value as the file name: */
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
          if (this.status == 200) {
            elmnt.innerHTML = this.responseText;
          }
          if (this.status == 404) {
            elmnt.innerHTML = "Page not found.";
          }
          /* Remove the attribute, and call this function once more: */
          elmnt.removeAttribute("w3-include-html");
          includeHTML();
        }
      };
      xhttp.open("GET", file, true);
      xhttp.send();
      /* Exit the function: */
      return;
    }
  }
}



// Kleine Pokemonkarte (Listenansicht):
// Werte der kleinen Pokemonkarte: 
// Name (Groß geschrieben!) - Erledigt 
// Typ/en  - Erledigt 
// Bild des Pokemons - Erledigt 
// Hintergrundfarbe passend zum Typ - wie im Video aus den Tutorials. 
// ID (optional) - lass ich weg. 
// Die Karte hat einen Hovereffekt. - Erledigt. 


// Es sollen 20 geladen werden, und darunter soll ein load more button sein. 
const baseUrl = "https://pokeapi.co/api/v2/pokemon";

let offset = 0;
const limit = 20;

async function getPokemon() {


  let response = await fetch(`${baseUrl}?limit=${limit}&offset=${offset}`);

  // Prüfen, ob HTTP-Status OK (200–299)
  if (!response.ok) {
    throw new Error(`Fehler beim Laden: ${response.status}`);
  }
  let data = await response.json();
  // console.log(data);
  displayPokemon(data.results);
  return data;
}

async function displayPokemon(pokemons) {
  const pokemonContainer = document.querySelector(".pokemon-container");
  for (const pokemon of pokemons) {
    const pokemonDetails = await getPokemonDetails(pokemon.url);
    let typeContainer = "";
    for (const typeInfo of pokemonDetails.types) {
      typeContainer += `<span class="type">${typeInfo.type.name}</span>`;
    }

    let image = pokemonDetails.sprites.other.dream_world.front_default || pokemonDetails.sprites.front_default;
    pokemonContainer.innerHTML += `
           <div onclick="openPokemonDetails('${pokemon.name}')" class="pokemon-card bgC_${pokemonDetails.types[0].type.name}">
             <h2>${pokemon.name.toUpperCase()}</h2>
             <img src="${image}" class="pokemon-main-image" alt="${pokemon.name}">
             <div class="type-list">
               ${typeContainer}
             </div>
           </div>
         `;
  }
}

async function loadMore() {
  document.getElementsByClassName("load-more-button")[0].disabled = true;
  document.getElementById("load-animation").style.display = "flex";
  offset += 20;

  await getPokemon();
  document.getElementById("load-animation").style.display = "none";
  document.getElementsByClassName("load-more-button")[0].disabled = false;

}

getPokemon(); // Initiales Laden der ersten 20 Pokemons

async function getPokemonDetails(url) {
  let response = await fetch(url);
  let data = await response.json();
  // console.log(data);
  return data;
}

// Such Algorithmus:
// 1. Die Namen aus der API holen
// 2. searchValue mit dem Namen vergleichen
// 3. Wenn es einen Treffer gibt, dann die Pokemons mit dem Namen aus der API holen und anzeigen
// 4. Wenn es keinen Treffer gibt, dann "Keine Pokemons gefunden" ausgeben

let searchActive = false;
function searchPokemon() {
  const searchInput = document.querySelector(".search-input");
  const searchValue = searchInput.value.toLowerCase().trim();
  const pokemonContainer = document.querySelector(".pokemon-container");


  if (searchValue.length === 0) {
    searchActive = false;
    pokemonContainer.innerHTML = "";
    offset = 0;
    document.getElementsByClassName("load-more-button")[0].style.display = "block";
    getPokemon();
    return;
  }


  if (searchValue.length < 3) {
    if (searchActive) {
      searchActive = false;
      pokemonContainer.innerHTML = "";
      offset = 0;
      getPokemon();
      document.getElementsByClassName("load-more-button")[0].style.display = "block";
    }
    return;
  }
  searchActive = true;
  document.getElementsByClassName("load-more-button")[0].style.display = "none";

  if (!namesLoaded) {
    return;
  }

  // Ab hier: Suche
  let matchedNames = names.filter(name =>
    name.toLowerCase().includes(searchValue)
  );

  if (matchedNames.length > 0) {
    getPokemonByNames(matchedNames);
  } else {
    pokemonContainer.innerHTML = "<h2>Keine Pokemons gefunden</h2>";
  }
}



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

getNamesForSearchFunction();

async function getPokemonByNames(names) {
  let pokemons = [];
  for (const name of names) {
    let response = await fetch(`${baseUrl}/${name}`);
    let data = await response.json();

    await pokemons.push(data);

  }
  displaySearch(pokemons);
  console.log(pokemons);
}


async function displaySearch(pokemons) {
  const pokemonContainer = document.querySelector(".pokemon-container");
  pokemonContainer.innerHTML = "";
  for (const pokemon of pokemons) {
    // const pokemonDetails = await getPokemonDetails(pokemon.url);
    let typeContainer = "";
    for (const typeInfo of pokemon.types) {
      typeContainer += `<span class="type">${typeInfo.type.name}</span>`;
    }

    let image = pokemon.sprites.other.dream_world.front_default || pokemon.sprites.front_default;
    pokemonContainer.innerHTML += `
           <div onclick="openPokemonDetails('${pokemon.name}')" class="pokemon-card bgC_${pokemon.types[0].type.name}">
             <h2>${pokemon.name.toUpperCase()}</h2>
             <img src="${image}" class="pokemon-main-image" alt="${pokemon.name}">
             <div class="type-list">
               ${typeContainer}
             </div>
           </div>
         `;
  }
}

async function openPokemonDetails(pokemon) {
  // event.preventDefault();
  event.stopPropagation();
  document.getElementById("load-animation").style.display = "flex";
  offset = 0;
  console.log(pokemon);
  document.getElementById("pokemon-details").style.display = "flex";
  document.body.style.overflow = "hidden";

   document.getElementById("pokemon-details-content").style.display = "flex";

  let pokemonDetailsContainer = document.getElementById("top-section");
  let bottomSectionContainer = document.getElementById("bottom-section");
  pokemonDetailsContainer.innerHTML = "";
  bottomSectionContainer.innerHTML = "";


  let pokemonDetails = await fetch(`${baseUrl}/${pokemon}`);
  let data = await pokemonDetails.json();
  //  console.log(data);

  bottomSectionContainer.innerHTML = generateHTMLforBottomSection(data);

  let pokemonImage = data.sprites.other.dream_world.front_default || data.sprites.front_default;;
  let pokemonName = data.name;

  let typeContainer = "";

  for (const typeInfo of data.types) {
    typeContainer += `<span class="type">${typeInfo.type.name}</span>`;
  }

  pokemonDetailsContainer.innerHTML = `

                <div class="pokemon-details-top-left">

                <div class="pokemon-id">
                    <div class="pokemon-id-number">#${data.id}</div>
                </div>
                    <div class="pokemon-details-name">
                        <h2>${pokemonName.toUpperCase()}</h2>
                    </div>
                    <div class="type-list">
                          ${typeContainer}
                    </div>
                </div>
                <div class="pokemon-details-image-container">
                    <img src="${pokemonImage}" class="pokemon-details-image-image" alt="${pokemonName}">
                </div>
        `;

  document.getElementById("load-animation").style.display = "none";

}

function closePokemonDetails() {
  document.getElementById("pokemon-details").style.display = "none";
  document.body.style.overflow = "auto";
}

function generateHTMLforBottomSection(data) {
  console.log(data);
  let height = data.height * 10;
  let weight = data.weight / 10;
  let abilities = data.abilities.map(ability => ability.ability.name).join(", ");

  let lastPokemon = names[names.length - 1];
  const pokemonNameIndex = names.indexOf(data.name);
  let nextPokemon = names[pokemonNameIndex + 1];
  let previousPokemon = names[pokemonNameIndex - 1];


  if (pokemonNameIndex == 0) {
    previousPokemon = lastPokemon;
  }
  if (pokemonNameIndex == names.length - 1) {
    nextPokemon = names[0];
  }



  console.log(nextPokemon);
  console.log(previousPokemon);
  let html = ` <div class="menu">
                    <button id="btn1" class="selected" data-target="tab1" onclick="displayTab('tab1')">About</button>
                    <button id="btn2" data-target="tab2" onclick="displayTab('tab2')">2</button>
                    <button id="btn3" data-target="tab3" onclick="displayTab('tab3')">3</button>
                    <button id="btn4" data-target="tab4" onclick="displayTab('tab4')">4</button>
                </div>

                <div class="tabs">

                    <div id="tab1" class="tab active">
                        <div id="about-section" class="about-section">
                            <div class="about-section-content">
                            <label for="species">Species</label>
                            <div id="species">${data.species.name.toUpperCase()}</div>
                            </div>
                            <div class="about-section-content">
                              <label for="height">Height</label>
                              <div id="height">${height} cm</div>
                              </div>
                              <div class="about-section-content">
                                <label for="weight">Weight</label>
                                <div id="weight">${weight} kg</div>
                              </div>
                              <div class="about-section-content">
                                <label for="abilities">Abilities</label>
                                <div id="abilities">${abilities}</div>
                              </div>
                            
                        </div>
                    </div>

                    <div id="tab2" class="tab">Inhalt 2</div>
                    <div id="tab3" class="tab">Inhalt 3</div>
                    <div id="tab4" class="tab">Inhalt 4</div>
                </div>
                
                  <div class="bottom-section-controll-buttons">
                     <img src="assets/images/left-arrow.png" alt="left-arrow" class="bottom-section-controll-buttons-arrow" onclick="openPokemonDetails('${previousPokemon}')">
                     <img src="assets/images/right-arrow.png" alt="right-arrow" class="bottom-section-controll-buttons-arrow" onclick="openPokemonDetails('${nextPokemon}')">
                  </div>
          `;

  return html;
}


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

}

// function previousPokemon() {
//   console.log("previousPokemon");
// }
// function nextPokemon() {
//   console.log("nextPokemon");
// }


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