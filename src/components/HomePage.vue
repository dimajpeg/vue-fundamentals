<template>
  <div class="home-page-container">
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
      <EmailForm />
    </div>

    <hr class="divider" />

    <!-- Розділ: Праця з API та Axios -->
    <div class="section-block">
      <h3>Пости з JSONPlaceholder (перші 10)</h3>
      <ul v-if="posts.length > 0">
        <li v-for="post in posts" :key="post.id" class="post-item">
          <strong>{{ post.id }}. {{ post.title }}</strong>
          <p class="post-body">{{ post.body }}</p>
        </li>
      </ul>
      <p v-else-if="loadingPostsError">
        Помилка завантаження постів: {{ loadingPostsError }}
      </p>
      <p v-else>Завантаження постів...</p>
    </div>

  </div>
</template>

<script>
import EmailForm from './EmailForm.vue'; // Переконайся, що цей компонент існує
import axios from 'axios'; // Імпортуємо axios

export default {
  name: "HomePage",
  components: {
    EmailForm 
  },
  data() {
    return {
      message: "", 
      posts: [], // Для зберігання постів
      loadingPostsError: null, // Для зберігання помилки завантаження постів
    };
  },
  computed: {
    vuexCounter() {
      return this.$store.getters.counter;
    }
  },
  methods: {
    incrementVuexCounter() {
      this.$store.dispatch("increment");
    },
    fetchPosts() { // Винесемо логіку завантаження в окремий метод
      axios.get('https://jsonplaceholder.typicode.com/posts')
        .then(response => {
          console.log('Posts loaded:', response.data);
          this.posts = response.data.slice(0, 10); // Беремо тільки перші 10 постів
          this.loadingPostsError = null; // Скидаємо помилку, якщо була
        })
        .catch(error => {
          console.error('Error loading posts:', error);
          this.posts = []; // Очищуємо пости у випадку помилки
          this.loadingPostsError = error.message || 'Не вдалося завантажити пости';
        });
    }
  },
  mounted() { 
    this.fetchPosts(); // Викликаємо метод для завантаження постів при монтуванні компонента
  }
};
</script>

<style scoped>
.home-page-container {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
}
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
  margin-bottom:10px;
}
button {
  padding: 8px 15px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  margin-right: 5px; /* Додав невеликий відступ між кнопками */
}
button:hover {
  background-color: #36a374;
}
.section-block ul {
  list-style-type: none; /* Прибираємо стандартні маркери списку */
  padding-left: 0;
}
.section-block li.post-item {
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px dashed #eee; /* Розділювач між постами */
}
.section-block li.post-item:last-child {
  border-bottom: none; /* Прибираємо розділювач для останнього елемента */
}
.post-body {
  font-size: 0.9em;
  color: #555;
  margin-top: 5px;
}
</style>