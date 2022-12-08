<template>
  <v-container class="p-5 mt-5">
    <v-flex class="d-flex justify-space-between">
      <h1>Consultas</h1>
      <v-btn
        color="blue"
        outlined
        @click="$router.push('appointments/new')"
        v-if="loggedRole === 'veterinary'"
      >
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
  name: "AppointmentList",
  data() {
    return {
      headers: [
        {
          text: "#",
          align: "start",
          sortable: false,
          value: "index",
        },
        { text: "Data", value: "date" },
        { text: "Veterinário", value: "vet" },
        { text: "Paciente", value: "pacient" },
      ],
      appointments: [],
    };
  },
  computed: {
    loggedRole() {
      return localStorage.getItem("@petclinic/user-role");
    },
  },
  mounted() {
    if (this.loggedRole === "veterinary") {
      this.headers.push({ text: "Ações", value: "actions", sortable: false });
    }
    api.get("/clinic/appointments").then((response) => {
      this.appointments = response.data.map((appointment, index) => {
        return {
          id: appointment.id,
          index: index + 1,
          date: appointment.date,
          vet: appointment.veterinary.first_name,
          pacient: appointment.pet.name,
        };
      });
    });
  },
  methods: {
    editItem: function (item) {
      this.$router.push(`/appointments/${item.id}`);
    },
    deleteItem: function (item) {
      api.delete(`/clinic/appointments/${item.id}/`).then(() => {
        this.appointments = this.appointments.filter((appointment) => {
          return appointment.id !== item.id;
        });
      });
    },
  },
};
</script>

<style scoped></style>
