ch<template>
      <v-container class="fill-height" fluid>
        <PowerChart />
        <PressureButtons />
      </v-container>
</template>

<script>
import PowerChart from '../components/PowerChart';
import PressureButtons from '../components/PressureButtons';

export default {
  name: 'DetailedPage',

  components: {
    PowerChart, PressureButtons
  },

  data: () => ({ data: null}),
};
</script>
