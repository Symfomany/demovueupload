
<template>
  <div class="col-sm-4 col-sm-offset-4">
    <h2>Uploading a file</h2>


    <div class="form-group">
        <h2>Select an image</h2>
        <input name="photo" type="file" @change="onFileChange" 
        capture accept="image/*"  >

       <!-- Previsualisation -->
        <img :src="image" />
     </div>

      <button class="btn btn-primary" @click="submit">Upload un fichier</button>



  </div>
</template>



<script>
    export default {
          data() {
            return {
              image: '',
              imgFile: null, // mon fichier physique
              form: new FormData(),
               // FormData , c'est un formulaire spécialement conçu pour l'upload de fichier
              reader: new FileReader(),
              // FileReader : traduire mon fichier phyisue en base 64
            }
          },
          methods: {
            onFileChange(event){
              console.log(event)
              this.imgFile = event.target.files[0]; // 1er image physique (Blob)
              console.log(this.imgFile)
              this.reader.readAsDataURL(this.imgFile); // encoder le fichier en URL base 64
              this.reader.onload = (e)  => this.image =  e.target.result;
              // quand mon reader a finit de charger mon image en base 64

             
            },

            submit(){

                this.form.append('photo', this.imgFile);
                 // on ajoute au formulaire l'image qui aura pour name photo
                 // et qui est déja encode en base 64
                
                this.$http.post('http://localhost:3000/uploading', this.form).then((res) => {
                  
                  this.$toasted.show('Uploadé !').goAway(1500); // plugin Toast implemented

                }, (err) => {
                  this.$toasted.show(err).goAway(1500); // plugin Toast implemented

                })
            }
          }
    }
</script>