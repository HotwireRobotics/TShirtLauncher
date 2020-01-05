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
          primary: '#ff3d00',
          secondary: '#689f38',
          accent: '#ffff00',
          error: '#f44336',
          warning: '#ffc107',
          info: '#607d8b',
          success: '#009688'
      },
    },
  },
});
