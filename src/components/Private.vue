<template>
  <div class="row">
    <div class="col-sm-4 col-sm-offset-4">
      <h2>Mon compte</h2>

      <div class="jumbotron">
        <h3>Ma photo de profil</h3>
        <label for="avatar" class="label-file">Choisir une image</label>
        <input type="file" class="input-file" name="avatar" capture accept=image/* id="avatar" @change="upload($event)">
        <img :src="img" class="img-responsive img-thumbnail">
      </div>


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


      <button :disabled="errors.errors.length > 0" class="btn btn-primary" @click="submit()">Modifier son compte</button>
    </div>
  </div>
</template>

<style>
.label-file {
    cursor: pointer;
    color: #00b1ca;
    font-weight: bold;
}
.label-file:hover {
    color: #25a5c4;
}
.input-file {
    display: none;
}
</style>
<script>
  import Store from '@/Store.js'

  export default {

    data() {
      return {
        credentials: {
          name: '',
          email: ''
        },
        error: '',
        img: 'http://findicons.com/files/icons/1072/face_avatars/300/a04.png'
      }
    },

    created() {

      if (!Store.user.authenticated) {
        this.$router.push('/login')
      }

      this.credentials = Store.user.datas;
    },
    methods: {


      upload(e) {

        // preview image in browser (voir JS Doc)
        var reader = new FileReader();
        reader.onload = (e) => this.img = e.target.result;
        reader.readAsDataURL(event.target.files[0]);

        // Send File as Form Data in server via AJAX
        let file = event.target.files[0]
        let data = new FormData();
        data.append('avatar', file); // append to form

        this.$http.post('http://localhost:3000/upload', data).then((res) => {
          if (!res.body) {
            this.$toasted.show(res.body).goAway(1500); // plugin Toast implemented
          } else {
            this.$toasted.show('Votre image a bien été uploadée').goAway(1500); // plugin Toast implemented
          }
        }, (err) => {
          this.$toasted.show(err.body).goAway(1500); // plugin Toast implemented

        });
      },




      submit() {


        this.$http.post('http://localhost:3000/update', this.credentials).then(data => {
          localStorage.setItem('user', JSON.stringify(this.credentials)) // mise à jour dans la session
          this.$router.push('/') //redirection
          this.$toasted.show('Votre compte a bien été modifié').goAway(1500); // plugin Toast implemented

        }, (err) => {
          console.log(err)
        })
      }
    },


  }
</script>