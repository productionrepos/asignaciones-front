<template>
  <v-app style="background-image: url('https://i.imgur.com/1i8ARwX.png')">
    <v-dialog v-model="dialog" persistent max-width="600px" min-width="360px">
      <div>
        <v-tabs v-model="tab" show-arrows background-color="blue lighten-1" icons-and-text dark grow>
          <v-tabs-slider color="purple darken-4"></v-tabs-slider>
          <v-tab v-for="i in tabs" :key="i.id">
            <v-icon large>{{ i.icon }}</v-icon>
            <div class="caption py-1">{{ i.name }}</div>
          </v-tab>
          <v-tab-item>
            <v-card class="px-4">
              <v-card-text>
                <v-form ref="loginForm" v-model="valid" lazy-validation @submit.prevent="submit">
                  <v-row>
                    <v-col cols="12">
                      <v-text-field v-model="formLogin.loginEmail" :rules="loginEmailRules" label="E-mail" required></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field v-model="formLogin.loginPassword" :append-icon="show1?'eye':'eye-off'" :rules="[rules.required, rules.min]" :type="show1 ? 'text' : 'password'" name="input-10-1" label="Contraseña" hint="At least 8 characters" counter @click:append="show1 = !show1"></v-text-field>
                    </v-col>
                    <v-col class="d-flex" cols="12" sm="6" xsm="12">
                    </v-col>
                    <v-spacer></v-spacer>
                    <v-col class="d-flex" cols="12" sm="3" xsm="12" align-end>
                      <v-btn x-large block :disabled="!valid" color="blue lighten-1" type="submit"> Ingresar </v-btn>
                    </v-col>
                  </v-row>
                </v-form>
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs>
      </div>
      <v-btn  color="blue accent-1" @click="invitado">Ingresar con cuenta Google</v-btn>
    </v-dialog>
  </v-app>
</template>

<script>
export default {
  computed: {
    passwordMatch() {
      return this.$store.getters['userId'];
    }
  },
  methods: {
    invitado() {
      this.$store.commit('startGoogleLogin');
    },
    submit() {
      console.log(this.form);
    },
    validate() {
      if (this.$refs.loginForm.validate()) {
        // submit form to server/API here...
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    }
  },
  data: () => ({
    dialog: true,
    tab: 0,
    tabs: [
      {id: 1, name:"Iniciar Sesión", icon:"mdi-account"}
    ],
    valid: true,

    formLogin : {
      loginEmail: '',
      loginPassword: ''
    },

    firstName: "",
    lastName: "",
    email: "",
    password: "",
    verify: "",
    loginPassword: "",
    loginEmail: "",
    loginEmailRules: [
      v => !!v || "Required",
      v => /.+@.+\..+/.test(v) || "E-mail must be valid"
    ],
    emailRules: [
      v => !!v || "Required",
      v => /.+@.+\..+/.test(v) || "E-mail must be valid"
    ],

    show1: false,
    rules: {
      required: value => !!value || "Campo Requerido",
      min: v => (v && v.length >= 8) || "Min 8 characters"
    }
  })
}
</script>
