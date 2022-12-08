<template>
  <v-form v-model="valid">
    <v-container class="p-5 mt-5">
      <h1 class="text-h5 font-weight-bold mb-3">Cadastro de Consultas</h1>
      <v-row>
        <v-col cols="12" md="4">
          <div>
            <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="appointment.date"
                  label="Data"
                  prepend-icon="mdi-calendar"
                  readonly
                  required
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="appointment.date"
                :max="
                  new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
                    .toISOString()
                    .substr(0, 10)
                "
                min="1950-01-01"
                required
              ></v-date-picker>
            </v-menu>
          </div>
        </v-col>
        <v-col cols="12" md="4">
          <v-select
            :items="pets"
            :menu-props="{ top: true, offsetY: true }"
            v-model="appointment.pet_id"
            label="Paciente"
            item-text="name"
            item-value="id"
            hide-details
            required
          ></v-select>
        </v-col>
        <v-col cols="12" md="4">
          <v-select
            :items="drugs"
            :menu-props="{ top: true, offsetY: true }"
            v-model="appointment.drugs_ids"
            label="Remédios"
            multiple
            item-text="name"
            item-value="id"
            required
            hint="Selecione os remédios"
          ></v-select>
        </v-col>
        <v-col cols="12" md="6">
          <v-textarea
            clearable
            clear-icon="mdi-close-circle"
            label="Descrição"
            v-model="appointment.description"
            required
          ></v-textarea>
        </v-col>
        <v-col cols="12" md="6">
          <v-textarea
            clearable
            clear-icon="mdi-close-circle"
            label="Diagnóstico"
            v-model="appointment.diagnosis"
            required
          ></v-textarea>
        </v-col>
      </v-row>
      <v-row class="justify-end">
        <v-btn color="success" @click="saveAppointment">
          <v-icon left>mdi-content-save</v-icon>
          Salvar
        </v-btn>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import api from "@/services/axios";
export default {
  name: "AnimalForm",
  data() {
    return {
      valid: false,
      date: null,
      menu: false,
      drugs: [],
      pets: [],
      appointment: {},
    };
  },
  mounted() {
    if (this.$route.params.id) {
      api
        .get(`/clinic/appointments/${this.$route.params.id}/`)
        .then((response) => {
          this.appointment = {
            date: response.data.date,
            pet_id: response.data.pet.id,
            drugs_ids: response.data.drugs.map((drug) => drug.id),
            description: response.data.description,
            diagnosis: response.data.diagnosis,
          };
        });
    }
    Promise.all([api.get("/clinic/drugs"), api.get("/clients/pets")]).then(
      (response) => {
        this.drugs = response[0].data;
        this.pets = response[1].data;
      }
    );
  },
  methods: {
    saveAppointment() {
      api
        .post("/clinic/appointments/", this.appointment)
        .then(() => {
          this.$router.push("/appointments");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped></style>
