/**
 * Generates the HTML for the Function displayPokemon(pokemons).
 *
 * @async
 * @function generateHTMLforDisplayPokemon
 * @param {Object} pokemon - The pokemon object.
 * @returns {string} The HTML for the display pokemon card.
 */
async function generateHTMLforDisplayPokemon(pokemon) {
  const pokemonDetails = await getPokemonDetails(pokemon.url);
  let typeContainer = "";
  for (const typeInfo of pokemonDetails.types) {
    typeContainer += `<span class="type">${escapeHTML(typeInfo.type.name)}</span>`;
  }
  let image = pokemonDetails.sprites.other.dream_world.front_default || pokemonDetails.sprites.front_default;
  let html = `
           <div onclick="openPokemonDetails('${escapeHTML(pokemon.name)}')" class="pokemon-card bgC_${escapeHTML(pokemonDetails.types[0].type.name)}" data-name="${escapeHTML(pokemon.name)}">
             <h2>${escapeHTML(pokemon.name).toUpperCase()}</h2>
             <img src="${image}" class="pokemon-main-image" alt="${escapeHTML(pokemon.name)}">
             <div class="type-list">
               ${typeContainer}
             </div>
           </div>
         `;
  return html;
}

/**
 * Generates the HTML for the Function displaySearch(pokemons).
 *
 * @async
 * @function generateHTMLforDisplaySearch
 * @param {Object} pokemon - The pokemon object.
 * @returns {string} The HTML for the display search pokemon card.
 */
async function generateHTMLforDisplaySearch(pokemon) {
  let typeContainer = "";
  for (const typeInfo of pokemon.types) {
    typeContainer += `<span class="type">${escapeHTML(typeInfo.type.name)}</span>`;
  }
  let image = pokemon.sprites.other.dream_world.front_default || pokemon.sprites.front_default;
  let html = `
           <div onclick="openPokemonDetails('${escapeHTML(pokemon.name)}')" class="pokemon-card bgC_${escapeHTML(pokemon.types[0].type.name)}" data-name="${escapeHTML(pokemon.name)}">
             <h2>${escapeHTML(pokemon.name).toUpperCase()}</h2>
             <img src="${image}" class="pokemon-main-image" alt="${escapeHTML(pokemon.name)}">
             <div class="type-list">
               ${typeContainer}
             </div>
           </div>
         `;
  return html;
}

/**
 * Generates the HTML for the bottom section of the Pokémon details modal.
 *
 * @function generateHTMLforBottomSection
 * @param {Object} data - The data of the Pokémon.
 * @returns {string} The HTML for the bottom section of the Pokémon details modal.
 */

let nextPokemon = "";
let previousPokemon = "";
function generateHTMLforBottomSection(data ) {
  // console.log(data);
  let height = data.height * 10;
  let weight = data.weight / 10;
  let abilities = data.abilities.map(ability => ability.ability.name).join(", ");

  let lastPokemon = names[names.length - 1];
  const pokemonNameIndex = names.indexOf(data.name);
  nextPokemon = names[pokemonNameIndex + 1];
  previousPokemon = names[pokemonNameIndex - 1];

  let hp = data.stats[0].base_stat;
  let attack = data.stats[1].base_stat;
  let defense = data.stats[2].base_stat;

  const maxHp = 255;
  const maxAttack = 190;
  const maxDefense = 230;

  if (pokemonNameIndex == 0) {
    previousPokemon = lastPokemon;
  }
  if (pokemonNameIndex == names.length - 1) {
    nextPokemon = names[0];
  }
  // console.log(nextPokemon);
  // console.log(previousPokemon);
  let html = ` <div class="menu">
                      <button id="btn1" class="selected" data-target="tab1" onclick="displayTab('tab1')">About</button>
                      <button id="btn2" data-target="tab2" onclick="displayTab('tab2')">Stats</button>
                    <!--   <button id="btn3" data-target="tab3" onclick="displayTab('tab3')">3</button>
                      <button id="btn4" data-target="tab4" onclick="displayTab('tab4')">4</button>-->
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
  
                      <div id="tab2" class="tab">
                        <div id="stats" class="stats">
                          <div class="about-section-content">
                                   <label for="hp">Hit Points</label>
                                   <div id="hp" class="stat-value">${hp} / ${maxHp}   </div>
                                   <div class="stat-bar">
                                        <div class="stat-fill" style="width:${(hp/maxHp)*100}%"></div>
                                   </div>
                                  
                          </div>
                          <div class="about-section-content">
                                  <label for="attack">Attack</label>
                                  <div id="attack" class="stat-value">${attack} / ${maxAttack}   </div>
                                  <div class="stat-bar">
                                        <div class="stat-fill" style="width:${(attack/maxAttack)*100}%"></div>
                                   </div>
                                  
                          </div>
                          <div class="about-section-content">
                                  <label for="defense">Defense</label>
                                  <div id="defense" class="stat-value">${defense} / ${maxDefense}   </div>
                                  <div class="stat-bar">
                                        <div class="stat-fill" style="width:${(defense/maxDefense)*100}%"></div>
                                   </div>
                                  
                          </div>
                        </div>
                      </div>
                    <!--  <div id="tab3" class="tab">Inhalt 3</div>
                      <div id="tab4" class="tab">Inhalt 4</div>-->
                  </div>
                  
                    <div class="bottom-section-controll-buttons">
                       <img src="assets/images/left-arrow.png" alt="left-arrow" class="bottom-section-controll-buttons-arrow" onclick="openPokemonDetails('${previousPokemon}')">
                       <img src="assets/images/right-arrow.png" alt="right-arrow" class="bottom-section-controll-buttons-arrow" onclick="openPokemonDetails('${nextPokemon}')">
                    </div>
            `;
  // if (currentTab != "") {
  //   displayTab(currentTab);
  // }
    return html;
}



/**
 * Generates the HTML for the top section of the Pokémon details modal.
 *
 * @function generateHTMLforTopSection
 * @param {Object} data - The data of the Pokémon.
 * @returns {string} The HTML for the top section of the Pokémon details modal.
 */
function generateHTMLforTopSection(data) {

  let pokemonImage = data.sprites.other.dream_world.front_default || data.sprites.front_default;;
  let pokemonName = data.name;
  let typeContainer = "";
  for (const typeInfo of data.types) {
    typeContainer += `<span class="type">${typeInfo.type.name}</span>`;
  }
  let html = `
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
  return html;
}