<template>
  <v-app>
    <v-app-bar
        app
        color="primary"
        dark
    >
      Bienvenido: {{ nombre }}
    </v-app-bar>

    <v-main>
      <FormComponent/>
    </v-main>
  </v-app>
</template>

<script>
import FormComponent from "@/components/FormComponent";

export default {

  components: {
    FormComponent,
  },
  computed: {
    nombre() {
      return this.$store.getters['name'];
    }
  }

};
</script>
