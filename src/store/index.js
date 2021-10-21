import Vue from 'vue';
import Vuex from 'vuex';
import { firebase, googleAuthProvider } from "@/firebase/firebase-config";
Vue.use(Vuex)

const store = new Vuex.Store({
    state() {
        return {
            isLogged: false,
            userName: null
        };
    },
    mutations: {
        startGoogleLogin(state) {
            firebase.auth().signInWithPopup( googleAuthProvider )
                .then( ({ user}) => {
                    let domain = user.email.split("@")[1];
                    if(domain === 'spread.cl'){
                        state.userName = user.displayName;
                        state.isLogged = true;
                    } else {
                        return false
                    }
    
                })
        },
        
    },
    action: {
        login() {
            this.$store.commit('startGoogleLogin');
        }
    },
    getters: {
        logged(state) {
            return state.isLogged
        },
        name(state) {
            return state.userName
        }
    }
});

export default store;
