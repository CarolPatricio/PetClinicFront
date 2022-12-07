<template>
  <v-container class="p-5 mt-5">
    <v-flex class="d-flex justify-space-between">
      <h1>Consultas</h1>
      <v-btn color="blue" outlined @click="$router.push('appointments/new')">
        <v-icon left> mdi-plus </v-icon>
        Adicionar
      </v-btn>
    </v-flex>
    <v-data-table
      :headers="headers"
      :items="appointments"
      :items-per-page="5"
      hide-default-footer
      class="elevation-1 mt-4"
    ></v-data-table>
  </v-container>
</template>

<script>
export default {
  name: "AppointmentList",
  data() {
    return {
      headers: [
        {
          text: "#",
          align: "start",
          sortable: false,
          value: "id",
        },
        { text: "Data", value: "date" },
        { text: "Veterinário", value: "vet" },
        { text: "Paciente", value: "pacient" },
        { text: "Ações" },
      ],
      appointments: [
        {
          id: 1,
          date: "2022-12-07",
          vet: "rafa@gmail.com",
          pacient: "Princesa",
        },
      ],
    };
  },
};
</script>

<style scoped></style>
