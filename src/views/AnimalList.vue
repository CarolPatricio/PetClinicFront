<template>
  <v-container class="p-5 mt-5">
    <v-flex class="d-flex justify-space-between">
      <h1>Pets</h1>
      <v-btn color="blue" outlined @click="$router.push('pets/new')">
        <v-icon left> mdi-plus </v-icon>
        Adicionar
      </v-btn>
    </v-flex>
    <v-data-table
      :headers="headers"
      :items="animals"
      :items-per-page="5"
      hide-default-footer
      class="elevation-1 mt-4"
    ></v-data-table>
  </v-container>
</template>

<script>
export default {
  name: "AnimalList",
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
        { text: "Raca", value: "breed" },
        { text: "Nascimento", value: "birth" },
        { text: "Dono", value: "owner" },
        { text: "Ações" },
      ],
      animals: [
        {
          id: 1,
          name: "Pipo",
          breed: "Shitzu",
          birth: "2020-08-24",
          owner: "Carol",
        },
        {
          id: 2,
          name: "Princesa",
          breed: "Shitzu",
          birth: "2019-08-24",
          owner: "Gigi",
        },
      ],
    };
  },
};
</script>

<style scoped></style>
