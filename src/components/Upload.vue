
<!-- https://scotch.io/tutorials/how-to-handle-file-uploads-in-vue-2 -->
<template>
  <div class="col-sm-4 col-sm-offset-4">
    <h2>Upload a file</h2>


    <div class="form-group">
        <h2>Select an image</h2>
        <input name="photo" type="file" @change="onFileChange" capture accept="image/*"  >
     </div>


    <button class="btn btn-primary" @click="submit()">Upload un fichier</button>
  </div>
</template>

<script>
  import Store from '@/Store.js'

  export default {

    data() {
      return {
        imgFile: null,
        form: new FormData(),
        reader: new FileReader(),
      }
    },

    methods: {

      submit() {
        this.form.append('photo', this.imgFile); // on ajoute au formulaire l'image
        this.$http.post('http://localhost:3000/uploading', this.form).then((res) => {
          
          this.$toasted.show('Uploadé !').goAway(1500); // plugin Toast implemented

        }, (err) => {
          this.$toasted.show(err).goAway(1500); // plugin Toast implemented

        })

      },

      onFileChange(e) {
        let files = e.target.files; // FileList
        if (!files.length)
          return;

        this.imgFile = files[0]; // crée une image à partir du 1er element File de la  FileList
        this.reader.readAsDataURL(this.imgFile); // associe la source de l'image à l'url encodé en  base 64
      },


    } 

  }
</script>

<style>
img {
  width: 30%;
  margin: auto;
  display: block;
  margin-bottom: 10px;
}

</style>