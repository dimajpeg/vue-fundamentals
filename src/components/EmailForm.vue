<template>
  <form @submit.prevent="submitForm">
    <h3>Форма валідації Email</h3>
    <input v-model="email" type="email" placeholder="Введіть ваш email">
    <button type="submit">Надіслати</button>
  </form>
</template>

<script>
export default {
  name: 'EmailForm', // Додамо ім'я компоненту
  data() {
    return {
      email: ''
    };
  },
  methods: {
    submitForm() {
      if (!this.email.includes('@')) {
        alert('Email недійсний');
      } else {
        // Тут зазвичай була б логіка відправки даних на сервер
        alert('Email валідний! (Дані форми: ' + this.email + ')'); 
      }
    }
  }
};
</script>

<style scoped> 
/* Додамо трохи стилів, щоб форма виглядала краще */
form {
  margin-top: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
input[type="email"] {
  padding: 8px;
  margin-right: 10px;
  border: 1px solid #ddd;
  border-radius: 3px;
}
button[type="submit"] {
  padding: 8px 15px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}
button[type="submit"]:hover {
  background-color: #36a374;
}
h3 {
  margin-bottom: 15px;
}
</style>