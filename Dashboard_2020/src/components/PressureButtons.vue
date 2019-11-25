<template>
    <div>
        <v-btn-toggle v-model="icon" borderless color="accent">
          <v-btn value="classroom">
              <span class="hidden-sm-and-down">classroom</span>
              <v-icon right>mdi-chair-school</v-icon>
          </v-btn>

          <v-btn value="general">
              <span class="hidden-sm-and-down">General</span>
              <v-icon right>mdi-contrast</v-icon>
          </v-btn>

          <v-btn value="football">
              <span class="hidden-sm-and-down">football</span>
              <v-icon right>mdi-football</v-icon>
          </v-btn>
        </v-btn-toggle>
    </div>
</template>

<script>

export default {
    name: 'PressureButtons',

    components: {},

    data: () => ({ icon: 'football'}),
};
</script>