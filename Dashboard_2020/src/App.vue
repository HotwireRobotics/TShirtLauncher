<template>
<v-app>
    <v-navigation-drawer v-model="drawer" app>
        <v-list dense>
            <v-list-item link @click="menuClick('Driver')">
                <v-list-item-action>
                    <v-icon>mdi-home</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title>Driver</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-item link @click="menuClick('Detailed')">
                <v-list-item-action>
                    <v-icon>mdi-contact-mail</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title>Detailed</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="primary">
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
        <v-toolbar-title>{{currentPage}} Dashboard</v-toolbar-title>
    </v-app-bar>

    <v-content>
        <DriverPage v-if="currentPage==='Driver'" />
        <DetailedPage v-if="currentPage==='Detailed'" />
    </v-content>
</v-app>
</template>

<script>
import DriverPage from './pages/driver.page';
import DetailedPage from './pages/detailed.page';
// import { NetworkTables } from './utils/networktables'
// import * as logger from './utils/logger'

export default {
    name: 'App',

    components: {
        DetailedPage,
        DriverPage
    },

    data: () => ({
        drawer: null,
        currentPage: "Driver"
    }),
    methods: {
        menuClick: function(page){
            this.currentPage = page;
            this.drawer = !this.drawer;
        }
    },
};
</script>
