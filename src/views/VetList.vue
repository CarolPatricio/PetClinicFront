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
  name: "VetList",
  data() {
    return {
      headers: [
        {
          text: "#",
          align: "start",
          sortable: false,
          value: "index",
        },
        { text: "Nome", value: "first_name" },
        { text: "Sobrenome", value: "last_name" },
        { text: "E-mail", value: "email" },
        { text: "Ações", value: "actions" },
      ],
      vets: [],
    };
  },
  mounted() {
    api.get("/authentication/users?role=veterinary").then((response) => {
      this.vets = response.data.map((vet, index) => {
        return {
          id: vet.id,
          index: index + 1,
          first_name: vet.first_name,
          last_name: vet.last_name,
          email: vet.email,
        };
      });
    });
  },
  methods: {
    editItem: function (item) {
      this.$router.push(`/vets/${item.id}`);
    },
    deleteItem: function (item) {
      api.delete(`/authentication/users/${item.id}/`).then(() => {
        this.vets = this.vets.filter((vet) => vet.id !== item.id);
      });
    },
  },
};
</script>
