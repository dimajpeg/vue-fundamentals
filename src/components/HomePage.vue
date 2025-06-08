<template>
  <div>
    <h1>Головна</h1>
    <!-- Попередній код з v-model -->
    <input v-model="message" placeholder="Введіть повідомлення" />
    <p>Повідомлення: {{ message }}</p>
    <hr style="margin: 20px 0" />
    <!-- Розділювач -->

    <!-- Новий код для Vuex -->
    <h2>Лічильник Vuex: {{ vuexCounter }}</h2>
    <button @click="incrementVuexCounter">Збільшити лічильник</button>
  </div>
</template>

<script>
export default {
  name: "HomePage",
  data() {
    return {
      message: "",
    };
  },
  computed: {
    // Гетер для отримання значення лічильника зі сховища
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
