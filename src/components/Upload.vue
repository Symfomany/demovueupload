
<!-- https://scotch.io/tutorials/how-to-handle-file-uploads-in-vue-2 -->
<template>
  <div class="col-sm-4 col-sm-offset-4">
    <h2>Upload a file</h2>


    <div class="form-group">
        <h2>Select an image</h2>
        <input name="photo" type="file" @change="setImage" capture accept="image/*"  >


        <div style="max-width: 900px; display: inline-block;">
              <vue-cropper
                  ref='cropper'
                  :guides='true'
                  :view-mode='2'
                  :drag-mode="'crop'"
                  :auto-crop-area='0.5'
                  :min-container-width="250"
                  :min-container-height="180"
                  :background="true"
                  :rotatable="true"
                  :src="imgSrc"
                  alt="Source Image"
                  :cropmove="cropImage">
              </vue-cropper>
          </div>
          <img
              :src="cropImg"
              style="width: 200px; height: 150px; border: 1px solid gray"
              alt="Cropped Image"
          />
          <br />

        <button on-click="rotate">Rotate</button>

     </div>


    <button class="btn btn-primary" @click="submit()">Upload un fichier</button>
  </div>
</template>

<script>
  import Store from '@/Store.js'
import VueCropper from 'vue-cropperjs';

  export default {
    components: {
    },
    data() {
      return {
        imgFile: "",
        image: '',
         imgSrc: '',
        cropImg: '',
        form: new FormData(),
        reader: new FileReader(),
      }
    },
 
    methods: {

        cropImage () {
            this.cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL();
            console.log(this.cropImg)
        },
        rotate () {
            // guess what this does :)
            this.$refs.cropper.rotate(90);
        },



      submit() {
        this.form.append('photo', this.imgFile); // on ajoute au formulaire l'image
        this.$http.post('http://localhost:3000/uploading', this.form).then((res) => {
          
          this.$toasted.show('Uploadé !').goAway(1500); // plugin Toast implemented

        }, (err) => {
          this.$toasted.show(err).goAway(1500); // plugin Toast implemented
        })

      },

      setImage (e) {
            const file = e.target.files[0];

            if (!file.type.includes('image/')) {
                alert('Please select an image file');
                return;
            }

            if (typeof FileReader === 'function') {
                const reader = new FileReader();

                reader.onload = (event) => {
                    this.imgSrc = event.target.result;
                    // rebuild cropperjs with the updated source
                    this.$refs.cropper.replace(event.target.result);
                };

                reader.readAsDataURL(file);
            } else {
                alert('Sorry, FileReader API not supported');
            }
        },

      onFileChange(e) {
        let files = e.target.files; // FileList
        if (!files.length)
          return;

        this.imgFile = files[0]; // crée une image à partir du 1er element File de la  FileList
        this.$refs.cropper.replace(this.imgFile);

        this.reader.readAsDataURL(this.imgFile); // associe la source de l'image à l'url encodé en  base 64
        console.log(this.reader)
        this.image = this.reader.result;
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