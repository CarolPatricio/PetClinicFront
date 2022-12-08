<template>
  <v-form v-model="valid">
    <v-container class="p-5 mt-5">
      <h1 class="text-h5 font-weight-bold mb-3">Cadastro de Veterinário</h1>
      <v-row>
        <v-col cols="12" md="3">
          <v-text-field
            v-model="vet.first_name"
            label="Nome"
            :rules="generateNotEmptyRule('nome')"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="3">
          <v-text-field
            v-model="vet.last_name"
            label="Sobrenome"
            :rules="generateNotEmptyRule('nome')"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="3">
          <v-text-field
            v-model="vet.email"
            :rules="emailRules"
            label="E-mail"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="3">
          <v-text-field
            v-model="vet.password"
            label="Senha"
            required
            :type="passwordShow ? 'text' : 'password'"
            :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="passwordShow = !passwordShow"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row class="justify-end">
        <v-btn color="success" @click="saveVet">
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
  name: "VetForm",
  data() {
    return {
      valid: false,
      vet: {},
      passwordShow: false,
      emailRules: [
        (v) => !!v || "Informe um e-mail",
        (v) => /.+@.+/.test(v) || "Insira um e-mail válido",
      ],
    };
  },
  mounted() {
    if (this.$route.params.id) {
      api
        .get(`/authentication/users/${this.$route.params.id}`)
        .then((response) => {
          this.vet = {
            first_name: response.data.first_name,
            last_name: response.data.last_name,
            email: response.data.email,
            password: "",
          };
        });
    }
  },
  methods: {
    generateNotEmptyRule: function (field) {
      return [(v) => !!v || `Informe um(a) ${field}`];
    },
    saveVet: function () {
      if (this.$route.params.id) {
        let vet_data = {
          first_name: this.vet.first_name,
          last_name: this.vet.last_name,
          email: this.vet.email,
          password: this.vet.password,
        };
        api
          .patch(`/authentication/users/${this.$route.params.id}/`, vet_data)
          .then(() => {
            this.$router.push({ name: "vets" });
          });
      } else {
        let vet_data = {
          first_name: this.vet.first_name,
          last_name: this.vet.last_name,
          email: this.vet.email,
          password: this.vet.password,
          role: "veterinary",
        };
        api.post("/authentication/users/", vet_data).then(() => {
          this.$router.push({ name: "vets" });
        });
      }
    },
  },
};
</script>

<style scoped></style>
