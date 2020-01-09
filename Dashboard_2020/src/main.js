import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'

import { NetworkTables } from './utils/networktables'
import * as logger from './utils/logger'

Vue.config.productionTip = false

new Vue({
    vuetify,
    render: h => h(App),
    mounted() {
        logger.logEvent('Mounted ran');
        NetworkTables.addRobotConnectionListener(onRobotConnection, false);
        NetworkTables.connect('connect', '10.29.90.2');
        NetworkTables.addKeyListener('/SmartDashboard/UltrasonicDown', consoleListener);
        NetworkTables.addKeyListener('/SmartDashboard/FGR1 raw encoder ', consoleListener);
        NetworkTables.addKeyListener('/SmartDashboard/FGR1 Limit', consoleListener);
        NetworkTables.addKeyListener('/SmartDashboard/BGR1 Limit', consoleListener);
        NetworkTables.addKeyListener('/SmartDashboard/BGR2 Limit', consoleListener);
        NetworkTables.addKeyListener('/SmartDashboard/Navx Value', consoleListener);
        NetworkTables.addKeyListener('/SmartDashboard/Pot Value', consoleListener);
        NetworkTables.addKeyListener('/FMSInfo/MatchTime', consoleListener);
        NetworkTables.addKeyListener('/SmartDashboard/autoSelect', consoleListener);
    }
}).$mount('#app')


function onRobotConnection() {
    logger.logEvent('onRobotConnection: Robot has connected');
}
function consoleListener(key, value) {
    logger.logEvent(key + ' :: ' + value);
}