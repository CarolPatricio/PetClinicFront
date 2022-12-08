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
    >
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import api from "@/services/axios";
export default {
  name: "AnimalList",
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
        { text: "Raca", value: "breed" },
        { text: "Nascimento", value: "birth" },
        { text: "Dono", value: "owner" },
        { text: "Ações", value: "actions" },
      ],
      animals: [],
    };
  },
  methods: {
    editItem: function (item) {
      this.$router.push(`/pets/${item.id}`);
    },
    deleteItem: function (item) {
      api.delete(`/clients/pets/${item.id}/`).then(() => {
        this.animals = this.animals.filter((animal) => animal.id !== item.id);
      });
    },
  },
  mounted() {
    api.get("/clients/pets").then((response) => {
      this.animals = response.data.map((animal, index) => {
        return {
          id: animal.id,
          index: index + 1,
          name: animal.name,
          breed: animal.breed,
          birth: animal.birth_date,
          owner: animal.owner_name,
        };
      });
    });
  },
};
</script>

<style scoped></style>
