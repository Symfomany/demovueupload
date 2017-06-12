<template>
  <div id="app">
    <ul class="nav navbar-nav">
      <li>
        <router-link :to="{ name: 'home'}">Home</router-link>
      </li>
      <li v-if="!user.authenticated">
        <router-link :to="{ name: 'login'}">Login</router-link>
      </li>
      <li v-if="!user.authenticated">
        <router-link :to="{ name: 'signup'}">Signup</router-link>
        <li v-if="user.authenticated">
          <router-link :to="{ name: 'private'}">Private</router-link>
        </li>
        <li v-if="user.authenticated">
          <a @click="logout()">Logout</a>
        </li>
    </ul>
    <div class="container">
      <h1 v-if="user.authenticated">Bienvenue {{ user.datas.name }} <i>({{ user.datas.email }})</i> ! </h1>

      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import Store from '@/Store.js'

  export default {
    name: 'app',
    data() {
      return {
        user: Store.user
      }
    },

    methods: {
      logout() {
        // remove session datas
        localStorage.removeItem('id_token')
        localStorage.removeItem('user')

        Store.user.datas = {};
        Store.user.authenticated = false

        this.$router.push('/login') //redirection
      }
    }

  }
</script>