<template>
  <v-container class="p-5 mt-5">
    <v-flex class="d-flex justify-space-between">
      <h1>Veterinários</h1>
      <v-btn color="blue" outlined @click="$router.push('vets/new')">
        <v-icon left> mdi-plus </v-icon>
        Adicionar
      </v-btn>
    </v-flex>
    <v-data-table
      :headers="headers"
      :items="vets"
      :items-per-page="5"
      hide-default-footer
      class="elevation-1 mt-4"
    ></v-data-table>
  </v-container>
</template>

<script>
export default {
  name: "VetList",
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
        { text: "Detalhes", value: "details" },
        { text: "Ações" },
      ],
      vets: [
        {
          id: 1,
          name: "Rafa",
          email: "rafa@gmail.com",
          phone: "11999999999",
          details: "",
        },
        {
          id: 2,
          name: "João",
          email: "joao@gmail.com",
          phone: "11199999999",
          details: "",
        },
      ],
    };
  },
};
</script>

<style scoped></style>
