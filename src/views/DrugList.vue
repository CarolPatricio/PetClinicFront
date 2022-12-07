<template>
  <v-container class="p-5 mt-5">
    <v-flex class="d-flex justify-space-between">
      <h1>Medicamentos</h1>
      <v-btn color="blue" outlined @click="$router.push('drugs/new')">
        <v-icon left> mdi-plus </v-icon>
        Adicionar
      </v-btn>
    </v-flex>
    <v-data-table
      :headers="headers"
      :items="drugs"
      :items-per-page="5"
      hide-default-footer
      class="elevation-1 mt-4"
    ></v-data-table>
  </v-container>
</template>

<script>
export default {
  name: "DrugList",
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
        { text: "Ações" },
      ],
      drugs: [
        {
          id: 1,
          name: "Bravecto",
        },
        {
          id: 2,
          name: "Drontal",
        },
      ],
    };
  },
};
</script>

<style scoped></style>
