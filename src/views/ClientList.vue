<template>
  <v-container>
    <v-flex class="d-flex justify-space-between">
      <h1>Clientes</h1>
      <v-btn color="pink" outlined @click="$router.push('clients/new')">
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
    ></v-data-table>
  </v-container>
</template>

<script>
export default {
  name: "ClientList",
  data() {
    return {
      headers: [
        {
          text: "#",
          align: "start",
          sortable: false,
          value: "id",
        },
        { text: "Nome", value: "name" },
        { text: "E-mail", value: "email" },
        { text: "Telefone", value: "phone" },
        { text: "Ações" },
      ],
      clients: [
        {
          id: 1,
          name: "Cácio",
          email: "cclucas060901@gmail.com",
          phone: "11999999999",
        },
        {
          id: 2,
          name: "Carol",
          email: "anacarolina@gmail.com",
          phone: "11999999999",
        },
      ],
    };
  },
};
</script>

<style scoped></style>
