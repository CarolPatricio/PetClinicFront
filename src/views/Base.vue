<template>
  <v-app>
    <v-app-bar app color="white" dark>
      <div
        class="d-flex align-center mr-4"
        @click="$router.push('/')"
        style="cursor: pointer"
      >
        <v-img
          alt="Logo PetClinic"
          class="mr-2"
          contain
          src="@/assets/logo_petclinic.png"
          transition="scale-transition"
          width="100"
        />
      </div>
      <div>
        <v-btn
          color="white"
          class="mx-2 blue--text"
          elevation="0"
          :outlined="currentRoute.includes('clients')"
          @click="$router.push('/clients')"
        >
          Clientes
        </v-btn>
        <v-btn
          color="white"
          class="mx-2 blue--text"
          elevation="0"
          :outlined="currentRoute.includes('pets')"
          @click="$router.push('/pets')"
        >
          Animais
        </v-btn>
        <v-btn
          color="white"
          class="mx-2 blue--text"
          elevation="0"
          :outlined="currentRoute.includes('vets')"
          @click="$router.push('/vets')"
          v-if="loggedRole === 'admin'"
        >
          Veterinários
        </v-btn>
        <v-btn
          color="white"
          class="mx-2 blue--text"
          elevation="0"
          :outlined="currentRoute.includes('appointments')"
          @click="$router.push('/appointments')"
        >
          Consultas
        </v-btn>
        <v-btn
          color="white"
          class="mx-2 blue--text"
          elevation="0"
          :outlined="currentRoute.includes('drugs')"
          @click="$router.push('/drugs')"
        >
          Medicamentos
        </v-btn>
      </div>
      <v-spacer></v-spacer>
      <div>
        <v-btn
          color="white"
          class="mx-2 blue--text"
          elevation="0"
          outlined
          @click="logout"
        >
          <v-icon>mdi-logout</v-icon>
          Sair
        </v-btn>
      </div>
    </v-app-bar>
    <router-view></router-view>
  </v-app>
</template>
<script>
export default {
  name: "BaseView",
  data() {
    return {};
  },
  computed: {
    currentRoute() {
      return this.$route.path;
    },
    loggedRole() {
      return localStorage.getItem("@petclinic/user-role");
    },
  },
  methods: {
    logout() {
      localStorage.removeItem("@petclinic/access-token");
      localStorage.removeItem("@petclinic/refresh-token");
      this.$router.push("/login");
    },
  },
};
</script>
