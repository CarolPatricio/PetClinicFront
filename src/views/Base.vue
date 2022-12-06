<template>
  <v-app>
    <v-app-bar app color="pink" dark>
      <div
        class="d-flex align-center mr-4"
        @click="$router.push('/')"
        style="cursor: pointer"
      >
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://github.com/rafasfz/PetClinic/blob/main/PetClinicSystem/public/assets/paw-print.png?raw=true"
          transition="scale-transition"
          width="40"
        />
        <h2>PetClinic</h2>
      </div>
      <v-btn
        :color="currentRoute.includes('clients') ? 'white' : 'pink'"
        class="mx-2"
        elevation="0"
        :outlined="currentRoute.includes('clients')"
        @click="$router.push('/clients')"
      >
        Clientes
      </v-btn>
      <v-btn
        :color="currentRoute.includes('pets') ? 'white' : 'pink'"
        class="mx-2"
        elevation="0"
        :outlined="currentRoute.includes('pets')"
        @click="$router.push('/pets')"
      >
        Animais
      </v-btn>
      <v-btn
        :color="currentRoute.includes('vets') ? 'white' : 'pink'"
        class="mx-2"
        elevation="0"
        :outlined="currentRoute.includes('vets')"
        @click="$router.push('/vets')"
      >
        Veterinários
      </v-btn>
      <v-btn
        :color="currentRoute.includes('appointments') ? 'white' : 'pink'"
        class="mx-2"
        elevation="0"
        :outlined="currentRoute.includes('appointments')"
        @click="$router.push('/appointments')"
      >
        Consultas
      </v-btn>
      <v-btn
        :color="currentRoute.includes('drugs') ? 'white' : 'pink'"
        class="mx-2"
        elevation="0"
        :outlined="currentRoute.includes('drugs')"
        @click="$router.push('/drugs')"
      >
        Medicamentos
      </v-btn>
      <v-spacer></v-spacer>
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
  },
};
</script>
