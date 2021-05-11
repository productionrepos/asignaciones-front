<template>
  <v-container>

    <v-file-input
        @change="handleArchivo"
        v-model="archivo"
        :rules="rules"
        placeholder="Seleccione un Archivo"
        prepend-icon="mdi-paperclip"
        label="Seleccione un Archivo"
    ></v-file-input>

    <v-btn
        v-if="archivo !== null"
        @click="handleSubmitFile"
        depressed
        color="primary"
    >
      Subir Archivo
    </v-btn>

    <v-container
        v-for="(dato,i) in showable_array"
        :key="i"
    >
      <v-simple-table>
        <template v-slot:default >
          <thead>
          <tr>
            <th class="text-left">
                {{ dato.dia }}
            </th>
            <th class="text-left">
              NORTEA
            </th>
            <th class="text-left">
              NORTEB
            </th>
            <th class="text-left">
              PONIENTEA
            </th> <th class="text-left">
            PONIENTEB
          </th>
            <th class="text-left">
              SUR
            </th> <th class="text-left">
            PUENTE
          </th>
            <th class="text-left">
              PINTANA
            </th>
            <th class="text-left">
              SANTIAGO
            </th>
            <th class="text-left">
              ORIENTE
            </th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>
              BULTOS
            </td>
            <td>
              <v-text-field
                  type="number"
                  v-model="bultos[0].norteA"
                  single-line
                  outlined
              ></v-text-field>
            </td>
            <td>
              <v-text-field
                  type="number"
                  v-model="bultos[0].norteB"
                  single-line
                  outlined
              ></v-text-field>
            </td>
            <td>
              <v-text-field
                  type="number"
                  v-model="bultos[0].ponienteA"
                  single-line
                  outlined
              ></v-text-field>
            </td>
            <td>
              <v-text-field
                  type="number"
                  v-model="bultos[0].ponienteB"
                  single-line
                  outlined
              ></v-text-field>
            </td>
            <td>
              <v-text-field
                  type="number"
                  v-model="bultos[0].sur"
                  single-line
                  outlined
              ></v-text-field>
            </td>
            <td>
              <v-text-field
                  type="number"
                  v-model="bultos[0].puente"
                  single-line
                  outlined
              ></v-text-field>
            </td>
            <td>
              <v-text-field
                  type="number"
                  v-model="bultos[0].pintana"
                  single-line
                  outlined
              ></v-text-field>
            </td>
            <td>
              <v-text-field
                  type="number"
                  v-model="bultos[0].santiago"
                  single-line
                  outlined
              ></v-text-field>
            </td>
            <td>
              <v-text-field
                  type="number"
                  v-model="bultos[0].oriente"
                  single-line
                  outlined
              ></v-text-field>
            </td>
          </tr>
          </tbody>
          <v-btn
              :disabled="botoncito"
              @click="handleSubmitData(dato.id, dato.dia)"
              color="primary"
          >
            Generar Excel
          </v-btn>
        </template>
      </v-simple-table>

      <v-checkbox
          v-model="checkbox1"
          :label="`Asignar Todos los bultos posibles por conductor: ${checkbox1.toString()}`"
      ></v-checkbox>

      <v-alert v-if="error" type="error" style="margin-top: 5%">
        Ingrese nuevamente el archivo.
      </v-alert>
      <v-alert
          v-if="bultosSobrantes.length > 0"
          outlined
          type="warning"
          prominent
          border="left"
      >
        <p class="text-justify">
          Se generó el excel, pero tomar en cuenta los siguientes bultos no asignados:
        </p>
        <p v-for="(item, i) in bultosSobrantes" :key="i" class="text-justify">
          {{ item.lugar }} {{ item.bultos }} BULTOS, CONDUCTORES DISPONIBLES: {{ item.conductores }}
        </p>
      </v-alert>

      <v-container style="margin-left: 35%">
        <v-btn
            v-for="(index, i) in cantidad_paginas"
            :key="i"
            @click="current_page = index - 1"
            elevation="3"
            fab
            style="margin-right: 10px; margin-top: 30px;"
        >
          {{ index }}
        </v-btn>

      </v-container>





    </v-container>


  </v-container>
</template>

<script>
const axios = require('axios');
  export default {
    data () {
      return {
        rules: [
          value => !value || value.size < 2000000 || 'Avatar size should be less than 2 MB!',
          v => !!v || 'Archivo requerido',
        ],
        checkbox1: true,
        botoncito: true,
        archivo: null,
        bultos: [{
          norteA: 0,
          norteB: 0,
          ponienteA: 0,
          ponienteB: 0,
          sur: 0,
          puente: 0,
          pintana: 0,
          santiago: 0,
          oriente: 0
        }],
        arregloDias: [
          {
            id: 0,
            dia: 'LUNES'
          },
          {
            id: 1,
            dia: 'MARTES'
          },
          {
            id: 2,
            dia: 'MIÉRCOLES'
          },
          {
            id: 3,
            dia: 'JUEVES'
          },
          {
            id: 4,
            dia: 'VIERNES'
          },
          {
            id: 5,
            dia: 'SÁBADO'
          }
        ],
        items_per_page: 1,
        current_page: 0,
        num_pages : 0,
        refencia: null,
        bultosSobrantes: [],

        //OJO CON EL URL
        url: 'https://back-asignaciones.azurewebsites.net',


        error: false
      }
    },
    computed: {

      cantidad_paginas() {
        return  Math.ceil((this.arregloDias.length / this.items_per_page));
      },

      showable_array() {
        return this.arregloDias.slice(this.current_page*this.items_per_page, this.items_per_page + this.current_page*this.items_per_page);
      }
    },
    methods: {

      async handleArchivo() {

        this.archivo = await this.$refs.file.files[0];

      },

      handleSubmitFile() {

        const formData = new FormData();

        formData.append('archivo', this.archivo);

        if ( this.archivo === null ) {
          return;
        }

        axios.post(`${ this.url }/subirArchivo`, formData)
            .then( () => {
              this.botoncito = false;
            })
            .catch( () => {
            });
      },

      handleSubmitData(id, dia) {

        this.handleSubmitFile();

        axios.post(`${ this.url }/subirData/${ id }`, {
          bultos: this.bultos,
          checkbox: this.checkbox1
        },{
          responseType: 'blob'
        })
            .then( (response) => {
              const url = URL.createObjectURL(new Blob([response.data], {
                type: 'application/vnd.ms-excel'
              }))
              const link = document.createElement('a')
              link.href = url
              link.setAttribute('download', `${ dia }`)
              document.body.appendChild(link)
              link.click()

              axios.get(`${ this.url }/bultos`)
                .then(response => {
                  const { data } = response.data;
                  data.filter( bultos => bultos.bultos > 0 );
                  this.bultosSobrantes = [ ...data ];
                  console.log(this.bultosSobrantes);
                })
                .catch(error => console.log(error));

            })
            .catch( (error) => {
              console.log(error);
              this.error = true;
              setTimeout(() => {
                this.error = false;
              }, 3500)
            });
      }
    }
  }
</script>
