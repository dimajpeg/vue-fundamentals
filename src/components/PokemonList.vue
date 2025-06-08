<!-- src/components/PokemonList.vue -->
<template>
  <div class="pokemon-list-container section-block">
    <h3>Список Покемонів (PokeAPI)</h3>
    <div v-if="isLoading" class="loading-indicator">
      Завантаження покемонів...
    </div>
    <div v-else-if="error" class="error-message">
      Помилка завантаження: {{ error }}
    </div>
    <ul v-else-if="pokemons.length > 0" class="pokemon-grid">
      <li v-for="pokemon in pokemons" :key="pokemon.name" class="pokemon-item">
        {{ pokemon.name }}
      </li>
    </ul>
    <p v-else>Покемонів не знайдено.</p>
  </div>
</template>

<script>
import axios from 'axios';

const POKEAPI_URL = 'https://pokeapi.co/api/v2/pokemon?limit=20&offset=0';

export default {
  name: 'PokemonList',
  data() {
    return {
      pokemons: [],
      isLoading: true,
      error: null,
    };
  },
  mounted() {
    this.fetchPokemons();
  },
  methods: {
    fetchPokemons() {
      this.isLoading = true;
      this.error = null;
      axios.get(POKEAPI_URL)
        .then(response => {
          // PokeAPI повертає об'єкт з властивістю 'results', де знаходиться масив покемонів
          if (response.data && response.data.results) {
            this.pokemons = response.data.results;
          } else {
            this.pokemons = []; // На випадок несподіваної структури відповіді
          }
          console.log('Pokemons loaded:', this.pokemons);
        })
        .catch(error => {
          console.error('Error loading pokemons:', error);
          this.error = error.message || 'Не вдалося завантажити список покемонів.';
          this.pokemons = [];
        })
        .finally(() => {
          this.isLoading = false;
        });
    }
  }
};
</script>

<style scoped>
.pokemon-list-container h3 { /* Стилі для заголовка, якщо вже є в HomePage, можна не дублювати */
  margin-top: 0;
  color: #333;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
  margin-bottom: 15px;
}
.loading-indicator, .error-message {
  padding: 15px;
  text-align: center;
  font-style: italic;
}
.error-message {
  color: red;
}
.pokemon-grid {
  list-style-type: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); /* Адаптивна сітка */
  gap: 10px;
}
.pokemon-item {
  padding: 10px;
  border: 1px solid #42b983; /* Зелений бордер Vue */
  border-radius: 5px;
  text-align: center;
  background-color: #e9f5ee; /* Дуже світло-зелений фон */
  text-transform: capitalize; /* Імена покемонів з великої літери */
}
</style>