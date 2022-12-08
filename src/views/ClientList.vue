/* eslint-disable */
<template>
  <v-container class="p-5 mt-5">
    <v-flex class="d-flex justify-space-between">
      <h1>Clientes</h1>
      <v-btn color="blue" outlined @click="$router.push('clients/new')">
        <v-icon left> mdi-plus </v-icon>
        Adicionar
      </v-btn>
    </v-flex>
    <v-data-table
      :headers="headers"
      :items="clients"
      :items-per-page="5"
      hide-default-footer
      class="elevation-1 mt-4"
    >
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
      </template></v-data-table
    >
  </v-container>
</template>

<script>
import api from "@/services/axios";

export default {
  name: "ClientList",
  data() {
    return {
      headers: [
        {
          text: "#",
          align: "start",
          sortable: false,
          value: "index",
        },
        { text: "Nome", value: "name" },
        { text: "E-mail", value: "email" },
        { text: "Telefone", value: "phone" },
        { text: "Ações", value: "actions" },
      ],
      clients: [],
    };
  },
  methods: {
    editItem: function (item) {
      this.$router.push(`/clients/${item.id}`);
    },
    deleteItem: function (item) {
      api.delete(`/clients/${item.id}/`).then(() => {
        this.clients = this.clients.filter((client) => client.id !== item.id);
      });
    },
  },
  mounted() {
    api.get("/clients").then((response) => {
      this.clients = response.data.map((client, index) => {
        return {
          id: client.id,
          index: index + 1,
          name: client.name,
          email: client.email,
          phone: client.phone,
        };
      });
    });
  },
};
</script>

<style scoped></style>
