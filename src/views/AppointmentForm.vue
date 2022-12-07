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
                @change="save"
              ></v-date-picker>
            </v-menu>
          </div>
        </v-col>
        <v-col cols="12" md="4">
          <v-select
            :items="items"
            :menu-props="{ top: true, offsetY: true }"
            v-model="appointment.vet"
            label="Veterinário"
          ></v-select>
        </v-col>
        <v-col cols="12" md="4">
          <v-select
            :items="items"
            :menu-props="{ top: true, offsetY: true }"
            v-model="appointment.pacient"
            label="Paciente"
          ></v-select>
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
export default {
  name: "AnimalForm",
  data() {
    return {
      valid: false,
      date: null,
      menu: false,
      appointment: {
        date: "",
        vet: "",
        pacient: "",
      },
    };
  },
  methods: {},
};
</script>

<style scoped></style>
