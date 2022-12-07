<template>
  <v-form v-model="valid">
    <v-container class="p-5 mt-5">
      <h1 class="text-h5 font-weight-bold mb-3">Cadastro de Pets</h1>
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="animal.name"
            label="Nome"
            :rules="generateNotEmptyRule('nome')"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="animal.breed"
            :rules="generateNotEmptyRule('raça')"
            label="Raça"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="animal.owner"
            :rules="generateNotEmptyRule('dono')"
            label="Dono"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="12">
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
                  v-model="animal.birth"
                  label="Nascimento"
                  prepend-icon="mdi-calendar"
                  readonly
                  required
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="animal.birth"
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
      </v-row>
      <v-row class="justify-end">
        <v-btn color="success" @click="saveAnimal">
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
      animal: {
        name: "",
        breed: "",
        birth: "",
        owner: "",
      },
    };
  },
  methods: {
    generateNotEmptyRule: function (field) {
      return [(v) => !!v || `Informe um(a) ${field}`];
    },
    save(date) {
      this.$refs.menu.save(date);
    },
  },
};
</script>

<style scoped></style>
