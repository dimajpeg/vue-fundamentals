<!-- src/components/CompositionCounter.vue -->
<script setup>
import { ref } from 'vue';

const count = ref(0);
const increment = () => count.value++;
</script>

<template>
  <div>
    <h4>Лічильник (Composition API)</h4>
    <button @click="increment">Натиснуто {{ count }} разів</button>
  </div>
</template>

<style scoped>
/* Додамо трохи стилів */
div {
  padding: 15px;
  border: 1px solid #42b983;
  border-radius: 5px;
  margin-top: 10px;
  background-color: #f0fdf4; /* Світло-зелений фон */
}
h4 {
  margin-top: 0;
  color: #15803d; /* Темно-зелений */
}
button {
  background-color: #22c55e; /* Зелений */
}
button:hover {
  background-color: #16a34a; /* Темніший зелений */
}
</style>