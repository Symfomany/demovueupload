<template>
  <div class="col-sm-4 col-sm-offset-4">
    <h2>Log In</h2>
    <p>Log in to your account to get some great quotes.</p>
    <div class="alert alert-danger" v-if="error">
      <p>{{ error }}</p>
    </div>
    <div class="form-group">
      <input type="text" class="form-control" placeholder="Enter your email" v-model="credentials.email">
    </div>
    <div class="form-group">
      <input type="password" class="form-control" placeholder="Enter your password" v-model="credentials.password">
    </div>
    <button class="btn btn-primary" @click="submit()">Se connecter</button>
    <router-link :to="{ name: 'regenerate'}">Mot de passe perdu?</router-link>
  </div>
</template>

<script>
  import Store from '@/Store.js'

  export default {

    data() {
      return {
        credentials: {
          email: '',
          password: ''
        },
        error: ''
      }
    },

    methods: {

      submit() {

        this.$http.post('http://localhost:3000/signin', this.credentials).then((res) => {
          localStorage.setItem('id_token', res.body.id_token)
          localStorage.setItem('user', JSON.stringify(res.body.user))
          Store.user.datas = res.body.user;
          Store.user.authenticated = true

          this.$router.push('/private'); //redirection

        }, (err) => {
          this.$toasted.show('Votre email/password est incorrect').goAway(1500); // plugin Toast implemented

        })

      }
    }

  }
</script>