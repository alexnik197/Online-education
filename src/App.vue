<template>
  <div class="content">
    <header>
      <h1 @click="goToLogin" class="logo">Online Education</h1>
      <nav v-if="currentUser" class="account">
        <router-link to="/account" class="btn-header router-link-active" @click="goToAccount">Кабинет</router-link>
        <router-link to="/create-test" v-if="currentUser.role === 1" class="btn-header router-link-active">Создать
          тест</router-link>
        <router-link to="/tests" class="btn-header router-link-active router-link-active">Тесты</router-link>
        <router-link to="/" class="btn-header router-link-active router-link-active" @click="logOut">Выход</router-link>
      </nav>
    </header>

    <section>
      <router-view></router-view>
    </section>
  </div>
</template>

<script>

export default {
  data() {
    return {
    };
  },

  computed: {
    currentUser() {
      return this.$store.state.currentUser;
    },
    currentURL() {
      let curURL = this.$route.name;
      return curURL;
    }
  },

  methods: {
    logOut() {
      this.$router.push('/');
      this.$store.state.currentUser = null;
    },

    goToAccount() {
      this.$router.push('/account');
    },

    goToLogin() {
      this.$router.push('/');
    }
  },
};
</script>

<style>
body {
  width: 100vw;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  font-family: sans-serif;
  background-color: #282828;
  color: #f5f5f5;
  overflow-x: hidden;
}

#app {
  width: 80%;
}

header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  line-height: 1.5;
  width: 100%;
}

nav {
  width: 40%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

section {
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 1rem;
  width: 100%;
}

aside {
  display: flex;
  flex-direction: column;

  padding: 15px 30px 20px 30px;
  border-radius: 10px;
  width: 50%;

  background-color: #f5f5f5;
  color: #282828;
}

footer {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.content {
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 2rem;
}

.logo {
  cursor: pointer;
}

h1,
h2,
h3,
p {
  margin: 0;
}

h1,
h2 {
  text-align: center;
}

input {
  outline: none;
  width: 100%;

  border-top-left-radius: 5px;
  border: none;
  border: 2px solid #282828;
  background-color: rgb(232, 240, 254);
  font-size: 1rem;
  padding: 5px;
}

ul {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  padding: 0;
  list-style-type: none;
  cursor: pointer;
}

p {
  margin: 0;
}

button {
  background-color: #f5f5f5;
  color: #282828;
  font-weight: 700;

  border-radius: 7px;
  border: 2px solid #282828;

  height: max-content;
  font-size: 1.2rem;
  padding: 5px 10px;

  cursor: pointer;
}

.btn-header {
  color: inherit;
  text-decoration: none;
  cursor: pointer;
}

.btn-header:hover {
  box-shadow: 0 2px rgb(232, 240, 254);
  transition: 0.2s;
}

button:hover {
  background-color: rgb(232, 240, 254);
}
</style>