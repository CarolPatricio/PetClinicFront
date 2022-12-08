<template>
  <v-form v-model="valid">
    <v-container class="p-5 mt-5">
      <h1 class="text-h5 font-weight-bold mb-3">Cadastro de Cliente</h1>
      <v-row>
        <v-col cols="12" md="">
          <v-text-field
            v-model="client.name"
            label="Nome"
            :rules="generateNotEmptyRule('nome')"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="client.phone"
            :rules="generateNotEmptyRule('telefone')"
            label="Telefone"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="client.email"
            :rules="emailRules"
            label="E-mail"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="client.address.state"
            :rules="generateNotEmptyRule('estado')"
            label="Estado"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="client.address.city"
            :rules="generateNotEmptyRule('cidade')"
            label="Cidade"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="client.address.zip"
            :rules="generateNotEmptyRule('cep')"
            label="CEP"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="client.address.district"
            :rules="generateNotEmptyRule('bairro')"
            label="Bairro"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="client.address.street"
            :rules="generateNotEmptyRule('rua')"
            label="Rua"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row class="justify-end">
        <v-btn color="success" @click="saveClient">
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
  name: "ClientForm",
  data() {
    return {
      valid: false,
      client: {},
      emailRules: [
        (v) => !!v || "Informe um e-mail",
        (v) => /.+@.+/.test(v) || "Insira um e-mail válido",
      ],
    };
  },
  methods: {
    generateNotEmptyRule: function (field) {
      return [(v) => !!v || `Informe um(a) ${field}`];
    },
    saveClient: function () {
      if (this.$route.params.id) {
        let address_data = {
          state: this.client.address.state,
          city: this.client.address.city,
          zip: this.client.address.zip,
          district: this.client.address.district,
          street: this.client.address.street,
        };
        let client_data = {
          name: this.client.name,
          phone: this.client.phone,
          email: this.client.email,
          address_id: this.client.address.id,
        };
        Promise.all([
          api.put(`/clients/address/${this.client.address.id}/`, address_data),
          api.put(`/clients/${this.$route.params.id}/`, client_data),
        ]).then(() => {
          this.$router.push({ name: "clients" });
        });
      } else {
        let address_data = {
          state: this.client.address.state,
          city: this.client.address.city,
          zip: this.client.address.zip,
          district: this.client.address.district,
          street: this.client.address.street,
        };
        let client_data = {
          name: this.client.name,
          phone: this.client.phone,
          email: this.client.email,
        };
        api.post("/clients/address/", address_data).then((response) => {
          client_data.address_id = response.data.id;
          api.post("/clients/", client_data).then(() => {
            this.$router.push({ name: "clients" });
          });
        });
      }
    },
  },
  mounted() {
    if (this.$route.params.id) {
      api.get(`/clients/${this.$route.params.id}`).then((response) => {
        this.client = response.data;
      });
    } else {
      this.client = {
        client: "",
        phone: "",
        email: "",
        address: {
          state: "",
          city: "",
          zip: "",
          district: "",
          street: "",
        },
      };
    }
  },
};
</script>

<style scoped></style>
