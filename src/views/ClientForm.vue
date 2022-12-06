<template>
  <v-form v-model="valid">
    <v-container>
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
            v-model="client.address.neighborhood"
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
      <v-btn color="success" @click="saveClient">
        <v-icon left>mdi-content-save</v-icon>
        Salvar
      </v-btn>
    </v-container>
  </v-form>
</template>

<script>
export default {
  name: "ClientForm",
  data() {
    return {
      valid: false,
      client: {
        client: "",
        phone: "",
        email: "",
        address: {
          state: "",
          city: "",
          zip: "",
          neighborhood: "",
          street: "",
        },
      },
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
  },
};
</script>

<style scoped></style>
