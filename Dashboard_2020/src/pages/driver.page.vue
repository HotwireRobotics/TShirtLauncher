<template>
      <v-container class="fill-height" fluid>
        <PressureButtons />
        <LauncherPsi />
      </v-container>
</template>

<script>
import PressureButtons from '../components/PressureButtons';
import LauncherPsi from '../components/LauncherPsi';
export default {
  name: 'DriverPage',

  components: {
    LauncherPsi, 
    PressureButtons
  },
  

  data: () => ({ data: null}),
};
</script>
