
<template>
  <div class="col-sm-4 col-sm-offset-4">
    <h2>Uploading a file</h2>


    <div class="form-group">
        <h2>Select an image</h2>
        <input name="photo" type="file" @change="onFileChange" 
        capture accept="image/*"  >
     </div>


  </div>
</template>



<script>
    export default {
          data() {
            return {

            }
          },
          methods: {

          }
    }
</script>