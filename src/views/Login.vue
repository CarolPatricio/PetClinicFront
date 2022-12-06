<template>
  <v-container>
    <v-layout wrap>
      <v-flex sm12 md6 offset-md3>
        <v-card elevation="4" light tag="section">
          <v-card-title>
            <v-layout align-center justify-space-between>
              <h3 class="headline">PetClinic</h3>
              <v-img
                :alt="platformName"
                max-width="100px"
                src="https://raw.githubusercontent.com/rafasfz/PetClinic/main/PetClinicSystem/public/assets/pet.svg"
              ></v-img>
            </v-layout>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <p>Entre no sistema</p>
            <v-form>
              <v-text-field
                outline
                label="Usuário"
                type="text"
                v-model="username"
              ></v-text-field>
              <v-text-field
                outline
                hide-details
                label="Senha"
                type="password"
                v-model="password"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions :class="{ 'pa-3': $vuetify.breakpoint.smAndUp }">
            <v-spacer></v-spacer>
            <v-btn color="info" :large="$vuetify.breakpoint.smAndUp">
              Entrar
              <v-icon>mdi-login</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "LoginView",
  data() {
    return {
      platformName: "PetClinic",
      password: null,
      username: null,
    };
  },
};
</script>
