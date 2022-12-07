<template>
  <v-container bg fill-height grid-list-md text-xs-center>
    <v-layout row wrap align-center>
      <v-flex sm12 md6 offset-md3>
        <v-card elevation="4" light tag="section" width="800">
          <v-card-title>
            <v-row no-gutters>
              <v-col cols="12" sm="3">
                <v-img
                  alt="Logo PetClinic"
                  class="shrink mr-2"
                  contain
                  src="../assets/logo_petclinic.png"
                  transition="scale-transition"
                  width="100"
                />
              </v-col>
              <v-col cols="12" sm="9" class="d-flex justify-center align-center"
                ><p style="font-size: 1.5rem" class="mt-3">Login</p>
              </v-col>
            </v-row>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <p>Digite suas credenciais para entrar no sistema</p>
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
              <v-icon class="mr-1">mdi-login</v-icon>
              Entrar
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
