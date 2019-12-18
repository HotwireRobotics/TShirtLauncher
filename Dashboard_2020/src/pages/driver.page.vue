<template>
      <v-container class="fill-height" fluid>
        <PressureButtons />
      </v-container>
</template>

<script>
import PressureButtons from '../components/PressureButtons';

export default {
  name: 'DriverPage',

  components: {
    PressureButtons
  },

  data: () => ({ data: null}),
};
</script>
