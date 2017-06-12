import router from './router/index'
import Vue from 'vue'


export default {

    user: {
        authenticated: false,
        datas: {}
    },


    checkAuth() {
        // savoir si il est Authentifié, Si oui, recharger le Store depuis la session
        var jwt = localStorage.getItem('id_token')
        if (jwt) {
            this.user.authenticated = true
            let user = JSON.parse(localStorage.getItem('user'));
            if (user) {
                this.user.datas = user
            }
        }
        else {
            this.user.authenticated = false
        }
    },


    getAuthHeader() {
        return {
            'Authorization': 'Bearer ' + localStorage.getItem('id_token')
        }
    }
}