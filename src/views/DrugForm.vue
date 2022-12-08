<template>
  <v-form v-model="valid">
    <v-container class="p-5 mt-5">
      <h1 class="text-h5 font-weight-bold mb-3">Cadastro de Medicamentos</h1>
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="drug.name"
            label="Nome"
            :rules="generateNotEmptyRule('nome')"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row class="justify-end">
        <v-btn color="success" @click="saveDrug">
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
  name: "DrugForm",
  data() {
    return {
      valid: false,
      drug: {
        name: "",
      },
    };
  },
  mounted() {
    if (this.$route.params.id) {
      api.get(`/clinic/drugs/${this.$route.params.id}`).then((response) => {
        this.drug = response.data;
      });
    }
  },
  methods: {
    generateNotEmptyRule: function (field) {
      return [(v) => !!v || `Informe um(a) ${field}`];
    },
    saveDrug: function () {
      if (this.$route.params.id) {
        api
          .put(`/clinic/drugs/${this.$route.params.id}/`, this.drug)
          .then(() => {
            this.$router.push("/drugs");
          });
      } else {
        api.post("/clinic/drugs/", this.drug).then(() => {
          this.$router.push("/drugs");
        });
      }
    },
  },
};
</script>

<style scoped></style>
