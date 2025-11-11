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
    
    pokemonContainer.innerHTML += `
           <div class="pokemon-card">
               <h2>${pokemon.name}</h2>
             <img src="${pokemonDetails.sprites.front_default}" class="pokemon-main-image" alt="${pokemon.name}">
            
             
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
