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
          <v-select
            :items="owners"
            v-model="animal.owner_id"
            label="Dono"
            required
            item-text="name"
            item-value="id"
          ></v-select>
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
                  v-model="animal.birth_date"
                  label="Nascimento"
                  prepend-icon="mdi-calendar"
                  readonly
                  required
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="animal.birth_date"
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
import api from "@/services/axios";
export default {
  name: "AnimalForm",
  data() {
    return {
      valid: false,
      date: null,
      menu: false,
      owners: [],
      animal: {},
    };
  },
  mounted() {
    this.getOwners();
    if (this.$route.params.id) {
      api.get(`/clients/pets/${this.$route.params.id}`).then((response) => {
        this.animal = response.data;
      });
    } else {
      this.animal = {
        name: "",
        breed: "",
        birth_date: "",
        owner_id: "",
      };
    }
  },
  methods: {
    getOwners() {
      api.get("/clients").then((response) => {
        this.owners = response.data;
      });
    },
    generateNotEmptyRule: function (field) {
      return [(v) => !!v || `Informe um(a) ${field}`];
    },
    save(date) {
      this.$refs.menu.save(date);
    },
    saveAnimal: function () {
      if (this.$route.params.id) {
        let animal_data = {
          name: this.animal.name,
          breed: this.animal.breed,
          birth_date: this.animal.birth_date,
          owner_id: this.animal.owner_id,
        };
        api
          .put(`/clients/pets/${this.$route.params.id}/`, animal_data)
          .then(() => {
            this.$router.push({ name: "pets" });
          });
      } else {
        let animal_data = {
          name: this.animal.name,
          breed: this.animal.breed,
          birth_date: this.animal.birth_date,
          owner_id: this.animal.owner_id,
        };
        api.post("/clients/pets/", animal_data).then(() => {
          this.$router.push({ name: "pets" });
        });
      }
    },
  },
};
</script>

<style scoped></style>
