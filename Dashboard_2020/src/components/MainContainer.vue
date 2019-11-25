<template>
      <v-container class="fill-height" fluid>
        <PowerChart />
        <PressureButtons />
      </v-container>
</template>

<script>
import PowerChart from './PowerChart';
import PressureButtons from './PressureButtons';

export default {
  name: 'MainContainer',

  components: {
    PowerChart, PressureButtons
  },

  data: () => ({ data: null}),
};
</script>
