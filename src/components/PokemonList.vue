<!-- src/components/PokemonList.vue -->
<template>
  <div class="pokemon-list-container section-block">
    <h3>Список Покемонів (PokeAPI)</h3>
    <div v-if="isLoading" class="loading-indicator">
      Завантаження покемонів...
      <div class="spinner"></div>
    </div>
    <div v-else-if="error" class="error-message">
      Помилка завантаження: {{ error }}
    </div>
    <ul v-else-if="detailedPokemons.length > 0" class="pokemon-grid">
      <li v-for="pokemon in detailedPokemons" :key="pokemon.id" class="pokemon-item">
        <img 
          v-if="pokemon.sprites && pokemon.sprites.front_default" 
          :src="pokemon.sprites.front_default" 
          :alt="pokemon.name"
          class="pokemon-sprite"
        >
        <p class="pokemon-name">{{ pokemon.name }}</p>
      </li>
    </ul>
    <p v-else>Покемонів не знайдено або не вдалося завантажити деталі.</p>
  </div>
</template>

<script>
import axios from 'axios';

const POKEAPI_LIST_URL = 'https://pokeapi.co/api/v2/pokemon?limit=20&offset=0';

export default {
  name: 'PokemonList',
  data() {
    return {
      // detailedPokemons буде масивом з повною інформацією про кожного покемона
      detailedPokemons: [], 
      isLoading: true,
      error: null,
    };
  },
  mounted() {
    this.fetchAllPokemonDetails();
  },
  methods: {
    async fetchAllPokemonDetails() {
      this.isLoading = true;
      this.error = null;
      try {
        // 1. Отримуємо початковий список покемонів (імена та URL для деталей)
        const listResponse = await axios.get(POKEAPI_LIST_URL);
        if (!listResponse.data || !listResponse.data.results) {
          throw new Error('Неправильна структура відповіді від API списку покемонів');
        }
        const pokemonList = listResponse.data.results;

        // 2. Для кожного покемона зі списку робимо запит на його деталі
        // Promise.all дозволяє виконати всі запити паралельно
        const detailRequests = pokemonList.map(pokemon => axios.get(pokemon.url));
        const detailResponses = await Promise.all(detailRequests);

        // 3. Формуємо масив з детальною інформацією
        this.detailedPokemons = detailResponses.map(response => response.data);
        
        console.log('Detailed Pokemons loaded:', this.detailedPokemons);

      } catch (err) {
        console.error('Error loading detailed pokemons:', err);
        this.error = err.message || 'Не вдалося завантажити деталі покемонів.';
        this.detailedPokemons = [];
      } finally {
        this.isLoading = false;
      }
    }
  }
};
</script>

<style scoped>
.pokemon-list-container h3 {
  margin-top: 0;
  color: #333;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
  margin-bottom: 20px; /* Збільшив відступ */
  text-align: center; /* Відцентрував заголовок */
}
.loading-indicator, .error-message {
  padding: 20px; /* Збільшив відступ */
  text-align: center;
  font-style: italic;
  font-size: 1.1em; /* Збільшив шрифт */
}
.error-message {
  color: red;
}
.pokemon-grid {
  list-style-type: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); /* Зменшив minmax для менших карток */
  gap: 15px; /* Збільшив відстань */
}
.pokemon-item {
  padding: 10px;
  border: 1px solid #e0e0e0; /* Світліший бордер */
  border-radius: 8px; /* Більш заокруглені кути */
  text-align: center;
  background-color: #fff; 
  box-shadow: 0 2px 4px rgba(0,0,0,0.05); /* Легка тінь */
  transition: transform 0.2s ease-in-out;
}
.pokemon-item:hover {
  transform: translateY(-3px); /* Ефект підняття при наведенні */
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}
.pokemon-sprite {
  width: 96px; /* Стандартний розмір спрайтів PokeAPI */
  height: 96px;
  object-fit: contain; /* Щоб зображення не розтягувалося */
  margin-bottom: 8px;
  image-rendering: pixelated; /* Для кращого вигляду піксельних спрайтів */
}
.pokemon-name {
  font-weight: 500; /* Трохи жирніший шрифт */
  color: #333;
  text-transform: capitalize;
}

/* Простий спіннер */
.spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border-left-color: #09f;
  margin: 10px auto;
  animation: spin 1s ease infinite;
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>