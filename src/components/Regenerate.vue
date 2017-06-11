<template>
  <div class="col-sm-4 col-sm-offset-4">
    <h3>Regénérer le mot de passe</h3>
    <div class="alert alert-danger" v-if="error">
      <p>{{ error }}</p>
    </div>
    <div class="form-group">
      <input type="text" class="form-control" placeholder="Enter your email for regenerate password" v-model="credentials.email">
    </div>
    <button class="btn btn-primary" @click="submit()">Regenérer le mot de passe</button>
  </div>
</template>

<script>
  import Store from '@/Store.js'

  export default {

    data() {
      return {
        credentials: {
          email: '',
        },
        error: ''
      }
    },

    methods: {

      submit() {

        var credentials = {
          email: this.credentials.email,
        }

        this.$http.post('http://localhost:3000/regenerate', credentials).then((res) => {

          this.$toasted.show('Un email a été envoyé pour votre mot de passe regénéré').goAway(1500); // plugin Toast implemented


        }, (err) => {
          this.$toasted.show('Votre email/password est incorrect').goAway(1500); // plugin Toast implemented

        })

      }
    }

  }
</script>