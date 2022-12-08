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
  name: "DrugList",
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
        { text: "Ações", value: "actions" },
      ],
      drugs: [],
    };
  },
  mounted() {
    api.get("/clinic/drugs").then((response) => {
      this.drugs = response.data.map((drug, index) => {
        return {
          id: drug.id,
          index: index + 1,
          name: drug.name,
        };
      });
    });
  },
  methods: {
    editItem: function (item) {
      this.$router.push(`/drugs/${item.id}`);
    },
    deleteItem: function (item) {
      api.delete(`/clinic/drugs/${item.id}/`).then(() => {
        this.drugs = this.drugs.filter((drug) => drug.id !== item.id);
      });
    },
  },
};
</script>

<style scoped></style>
