import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
      dark: true,
      options: {
        customProperties: true,
      },
    themes: {
      dark: {
          primary: '#9c27b0',
          secondary: '#3f51b5',
          accent: '#8bc34a',
          error: '#f44336',
          warning: '#ffc107',
          info: '#607d8b',
          success: '#009688'
      },
    },
  },
});
