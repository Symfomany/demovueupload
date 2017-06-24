<template>
<div>


  <div class="col-sm-6 col-sm-offset-3">


    <h1>Welcome to Auth & Jwt</h1>

    <md-button class="md-raised md-primary">Primary</md-button>
    <md-button class="md-raised  md-primary">Accent</md-button>
    <md-button class="md-raised md-warn">Warn</md-button>


  <md-button @click="open" type="submit" class="md-primary md-raised">Open Snackbar</md-button>

  <md-snackbar :md-position="vertical + ' ' + horizontal" ref="snackbar" :md-duration="duration">
    <span>Connection timeout. Showing limited messages.</span>
    <md-button class="md-accent" md-theme="light-blue" @click="$refs.snackbar.close()">Retry</md-button>
  </md-snackbar>


    <md-switch v-model="checked0" id="my-test0" name="my-test0"></md-switch>


      <md-tabs md-right>
        <md-tab md-icon="phone">
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt dolorum quas amet cum vitae, omnis! Illum quas voluptatem, expedita iste, dicta ipsum ea veniam dolore in, quod saepe reiciendis nihil.</p>
        </md-tab>

        <md-tab md-icon="favorite">
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt dolorum quas amet cum vitae, omnis! Illum quas voluptatem, expedita iste, dicta ipsum ea veniam dolore in, quod saepe reiciendis nihil.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt dolorum quas amet cum vitae, omnis! Illum quas voluptatem, expedita iste, dicta ipsum ea veniam dolore in, quod saepe reiciendis nihil.</p>
        </md-tab>

        <md-tab md-icon="near_me">
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt dolorum quas.</p>
        </md-tab>
      </md-tabs>


    <md-tabs md-fixed>
        <md-tab id="movies" md-label="Movies">
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt dolorum quas amet cum vitae, omnis! Illum quas voluptatem, expedita iste, dicta ipsum ea veniam dolore in, quod saepe reiciendis nihil.</p>
        </md-tab>

        <md-tab id="music" md-label="Music">
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt dolorum quas amet cum vitae, omnis! Illum quas voluptatem, expedita iste, dicta ipsum ea veniam dolore in, quod saepe reiciendis nihil.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt dolorum quas amet cum vitae, omnis! Illum quas voluptatem, expedita iste, dicta ipsum ea veniam dolore in, quod saepe reiciendis nihil.</p>
        </md-tab>

        <md-tab id="books" md-label="Books">
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt dolorum quas.</p>
        </md-tab>

        <md-tab id="pictures" md-label="Pictures">
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt dolorum quas.</p>
        </md-tab>
      </md-tabs>





    <md-dialog md-open-from="#custom" md-close-to="#custom" ref="dialog1">
      <md-dialog-title>Lorem ipsum dolor sit amet</md-dialog-title>

      <md-dialog-content>Nemo, nobis necessitatibus ut illo, ducimus ex.</md-dialog-content>

      <md-dialog-actions>
        <md-button class="md-primary" @click="closeDialog('dialog1')">Cancel</md-button>
        <md-button class="md-primary" @click="closeDialog('dialog1')">Ok</md-button>
      </md-dialog-actions>
    </md-dialog>

    <md-button class="md-primary md-raised" id="custom" @click="openDialog('dialog1')">Custom</md-button>


    <div>
      <md-radio v-model="radio1" id="my-test1" name="my-test-group1" md-value="1">My beautiful radio</md-radio>
      <md-radio v-model="radio1" id="my-test2" name="my-test-group1" md-value="2">Another radio</md-radio>
      <md-radio v-model="radio1" id="my-test3" name="my-test-group1" md-value="3">Another another radio</md-radio>
    </div>

    <button class="btn btn-primary" @click="getQuote()">Get a Quote</button>
    <div class="quote-area" v-if="quote">
      <h2>
        <blockquote>{{ quote }}</blockquote>
      </h2>
    </div>
  </div>

  <md-dialog-confirm
    :md-title="confirm.title"
    :md-content-html="confirm.contentHtml"
    :md-ok-text="confirm.ok"
    :md-cancel-text="confirm.cancel"
    @open="onOpen"
    @close="onClose"
    ref="dialog5">
  </md-dialog-confirm>

  <md-button class="md-primary md-raised" @click="openDialog('dialog5')">Confirm</md-button>

  <md-chips v-model="contacts" md-input-placeholder="Add a contact"></md-chips>


<md-input-container>
  <label>Multiple</label>
  <md-file v-model="multiple" multiple></md-file>
</md-input-container>

    <md-input-container>
      <md-file v-model="placeholder" placeholder="A nice input placeholder"></md-file>
    </md-input-container>


<md-layout md-gutter>

<md-layout md-flex="33">
    <md-card class="md-accent">
        <md-card-header>
          <md-card-header-text>
            <div class="md-title">Title goes here</div>
            <div class="md-subhead">Subtitle here</div>
          </md-card-header-text>

          <md-menu md-size="4" md-direction="bottom left">
            <md-button class="md-icon-button" md-menu-trigger>
              <md-icon>more_vert</md-icon>
            </md-button>

            <md-menu-content>
              <md-menu-item>
                <span>Call</span>
                <md-icon>phone</md-icon>
              </md-menu-item>

              <md-menu-item>
                <span>Send a message</span>
                <md-icon>message</md-icon>
              </md-menu-item>
            </md-menu-content>
          </md-menu>
        </md-card-header>

        <md-card-media>
          <img src="https://randomuser.me/api/portraits/women/83.jpg" alt="People">
        </md-card-media>

        <md-card-content>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio itaque ea, nostrum odio. Dolores, sed accusantium quasi non, voluptas eius illo quas, saepe voluptate pariatur in deleniti minus sint. Excepturi.
        </md-card-content>
    </md-card>
</md-layout>

<md-layout md-flex="33">
    <md-card class="md-accent">
        <md-card-header>
          <md-card-header-text>
            <div class="md-title">Title goes here</div>
            <div class="md-subhead">Subtitle here</div>
          </md-card-header-text>

          <md-menu md-size="4" md-direction="bottom left">
            <md-button class="md-icon-button" md-menu-trigger>
              <md-icon>more_vert</md-icon>
            </md-button>

            <md-menu-content>
              <md-menu-item>
                <span>Call</span>
                <md-icon>phone</md-icon>
              </md-menu-item>

              <md-menu-item>
                <span>Send a message</span>
                <md-icon>message</md-icon>
              </md-menu-item>
            </md-menu-content>
          </md-menu>
        </md-card-header>

        <md-card-media>
          <img src="https://randomuser.me/api/portraits/women/83.jpg" alt="People">
        </md-card-media>

        <md-card-content>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio itaque ea, nostrum odio. Dolores, sed accusantium quasi non, voluptas eius illo quas, saepe voluptate pariatur in deleniti minus sint. Excepturi.
        </md-card-content>
    </md-card>
</md-layout>

<md-layout md-flex="33">
    <md-card class="md-accent">
        <md-card-header>
          <md-card-header-text>
            <div class="md-title">Title goes here</div>
            <div class="md-subhead">Subtitle here</div>
          </md-card-header-text>

          <md-menu md-size="4" md-direction="bottom left">
            <md-button class="md-icon-button" md-menu-trigger>
              <md-icon>more_vert</md-icon>
            </md-button>

            <md-menu-content>
              <md-menu-item>
                <span>Call</span>
                <md-icon>phone</md-icon>
              </md-menu-item>

              <md-menu-item>
                <span>Send a message</span>
                <md-icon>message</md-icon>
              </md-menu-item>
            </md-menu-content>
          </md-menu>
        </md-card-header>

        <md-card-media>
          <img src="https://randomuser.me/api/portraits/women/83.jpg" alt="People">
        </md-card-media>

        <md-card-content>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio itaque ea, nostrum odio. Dolores, sed accusantium quasi non, voluptas eius illo quas, saepe voluptate pariatur in deleniti minus sint. Excepturi.
        </md-card-content>
    </md-card>

  </md-layout>
</md-layout>
</md-layout>

  </div>

</template>

<script>

  import 'vue-material/dist/vue-material.css'


  import 'vue-material/dist/components/mdCore/index.css'
  import 'vue-material/dist/components/mdButton/index.css'
  import 'vue-material/dist/components/mdDialog/index.css'
  import 'vue-material/dist/components/mdRadio/index.css'
  import 'vue-material/dist/components/mdSnackbar/index.css'
  import 'vue-material/dist/components/mdSwitch/index.css'
  import 'vue-material/dist/components/mdTabs/index.css'
  import 'vue-material/dist/components/mdInputContainer/index.css'
  import 'vue-material/dist/components/mdSelect/index.css'
  import 'vue-material/dist/components/mdMenu/index.css'
  import 'vue-material/dist/components/mdChips/index.css'
  import 'vue-material/dist/components/mdFile/index.css'
  import 'vue-material/dist/components/mdCard/index.css'

  import '../assets/css/index.css'

  export default {

    data() {
      return {
        confirm: {
          title: 'Use Google\'s location service?',
          contentHtml: 'Let Google help apps determine location. <br> This means sending <strong>anonymous</strong> location data to Google, even when no apps are running.',
          ok: 'Agree',
          cancel: 'Disagree'
        },
        contacts: ['Marcos Moura'],
        multiple: null,
        onlyImages: null,
         vertical: 'top',
          horizontal: 'center',
          duration: 4000,
        food: '',
        users: [],
        checked0: true,
        options: [
          { id: 1, name: 'asqdsqd' },
          { id: 2, name: 'bsdfdsf' },
          { id: 3, name: 'cdsfdf' },
          { id: 4, name: 'd' },
          { id: 5, name: 'e' }
        ],
        items: [],
        quote: '',
        radio1: false
      }
    },

    methods: {
      open() {
        this.$refs.snackbar.open();
      },
      openDialog(ref) {
        this.$refs[ref].open();
      },
      closeDialog(ref) {
        this.$refs[ref].close();
      },
      onOpen() {
        console.log('Opened');
      },
      onClose(type) {
        console.log('Closed', type);
      },
      getQuote() {
        this.$http.get('http://localhost:3000/quote', (data) => {
          this.quote = data;
        })
          .error((err) => console.log(err))
      }
    }

  }
</script>