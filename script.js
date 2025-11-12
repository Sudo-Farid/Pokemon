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
// Hintergrundfarbe passend zum Typ - wie mache ich das? 
// ID (optional) - lass ich weg. 
// Die Karte hat einen Hovereffekt. - Erledigt. 
 

// Es sollen 20 geladen werden, und darunter soll ein load more button sein. 
const apiUrl = "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0";

async function getPokemon(apiUrl) {
  let response = await fetch(apiUrl);
  let data = await response.json();
  console.log(data);
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

    pokemonContainer.innerHTML += `
           <div class="pokemon-card bgC_${pokemonDetails.types[0].type.name}">
             <h2>${pokemon.name.toUpperCase()}</h2>
             <img src="${pokemonDetails.sprites.front_default}" class="pokemon-main-image" alt="${pokemon.name}">
             <div class="type-list">
               ${typeContainer}
             </div>
           </div>
         `;
  }

  

}

getPokemon(apiUrl);

async function getPokemonDetails(url) {
  let response = await fetch(url);
  let data = await response.json();
  console.log(data);
  return data;
}
