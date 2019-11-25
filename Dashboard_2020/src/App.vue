<template>
  <v-app>
<v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-list dense>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Data log</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-contact-mail</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Debugger</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>


    <v-app-bar app color="primary">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>Driver Dashboard</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <MainContainer/>
    </v-content>
  </v-app>
</template>

<script>
import MainContainer from './components/MainContainer';

export default {
  name: 'App',

  components: {
    MainContainer,
  },

  data: () => ({
    drawer: null,
  }),
};
</script>
