<template>
  <div>
    <h1>Головна</h1>

    <!-- Розділ: Реактивні дані та v-model -->
    <div class="section-block">
      <h3>Реактивні дані з v-model</h3>
      <input v-model="message" placeholder="Введіть повідомлення" />
      <p>Ваше повідомлення: {{ message }}</p>
    </div>

    <hr class="divider" />

    <!-- Розділ: Стан застосунку з Vuex -->
    <div class="section-block">
      <h3>Лічильник з Vuex</h3>
      <h2>Лічильник Vuex: {{ vuexCounter }}</h2>
      <button @click="incrementVuexCounter">Збільшити лічильник</button>
    </div>

    <hr class="divider" />

    <!-- Розділ: Створення форм та валідація -->
    <div class="section-block">
      <EmailForm /> <!-- Додаємо наш новий компонент EmailForm -->
    </div>

  </div>
</template>

<script>
// Імпортуємо компонент EmailForm
import EmailForm from './EmailForm.vue'; // Переконайся, що EmailForm.vue знаходиться в тій же теці 'components'

export default {
  name: "HomePage",
  components: { // Реєструємо EmailForm для використання в цьому компоненті
    EmailForm 
  },
  data() {
    return {
      message: "", // Для v-model
    };
  },
  computed: {
    // Гетер для отримання значення лічильника зі сховища Vuex
    vuexCounter() {
      return this.$store.getters.counter;
    },
  },
  methods: {
    // Метод для виклику екшену Vuex
    incrementVuexCounter() {
      this.$store.dispatch("increment");
    },
  },
};
</script>

<style scoped>
/* Додамо трохи стилів для кращого візуального розділення секцій */
.section-block {
  margin-bottom: 30px;
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 8px;
  background-color: #f9f9f9;
}
.section-block h3 {
  margin-top: 0;
  color: #333;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
  margin-bottom: 15px;
}
.divider {
  margin: 30px 0;
  border: 0;
  border-top: 1px solid #ccc;
}
input {
  padding: 8px;
  margin-right: 10px;
  border: 1px solid #ddd;
  border-radius: 3px;
  margin-bottom:10px; /* Додав для відступу */
}
button {
  padding: 8px 15px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}
button:hover {
  background-color: #36a374;
}
</style>