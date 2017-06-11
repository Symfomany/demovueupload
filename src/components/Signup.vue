<template>
  <div class="col-sm-4 col-sm-offset-4">
    <h2>Créer son compte</h2>
    <p>Sign up for a free account to get some private room.</p>
    <div class="alert alert-danger" v-if="error">
      <p>{{ error }}</p>
    </div>
    <!--http://vee-validate.logaretm.com/rules.html#rule-min_value-->
    <div class="form-group">
      <input type="text" name="name" v-validate="{ rules: {required: true,regex: /^([a-z- ]{3,})$/i} }" class="form-control" placeholder="Enter your name"
        v-model="credentials.name">
      <span v-show="errors.has('name')" class="text-danger">{{ errors.first('name') }}</span>
    </div>
    <div class="form-group">
      <input type="email" name="email" v-validate="'required|email|unique'" class="form-control" placeholder="Enter your email"
        v-model="credentials.email">
      <span v-show="errors.has('email')" class="text-danger">{{ errors.first('email') }}</span>
    </div>
    <div class="form-group">
      <input type="password" name="password" v-validate="'required|min:6|confirmed:conf'" class="form-control" placeholder="Enter your password"
        v-model="credentials.password">
      <span v-show="errors.has('password')" class="text-danger">{{ errors.first('password') }}</span>
    </div>
    <div class="form-group">
      <input type="password" name="conf" class="form-control" placeholder="Confirm your password" />
    </div>
    <button :disabled="errors.errors.length > 0" class="btn btn-primary" @click="submit()">Créer son compte</button>
  </div>
</template>

<script>
  import Store from '@/Store.js'
  import { Validator } from 'vee-validate';


  /**
  * Etendre Vee Vlidate avec son propre validateur
  */
  const unique = {
    getMessage(field, params, data) {
      return 'Email already exist...';
    },
    validate(value) {
      return value !== 'julien.boyer@wildcodeschool.fr'
    }
  };

  Validator.extend('unique', unique);


  export default {

    data() {
      return {
        credentials: {
          name: '',
          email: '',
          password: ''
        },
        error: ''
      }
    },

    methods: {

      submit() {

        let credentials = {
          name: this.credentials.name,
          email: this.credentials.email,
          password: this.credentials.password
        }
        this.$http.post('http://localhost:3000/signup', credentials).then(data => {
          localStorage.setItem('id_token', data.id_token)

          this.$router.push('/login')
          this.$toasted.show('Votre compte a bien été crée').goAway(1500); // plugin Toast implemented

        }, (err) => {
          console.log(err)
        })
      }
    }
  }
</script>