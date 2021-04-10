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
                    state.userName = user.displayName;
                    state.isLogged = true;
                })
        }
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
