import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import dotenv from 'dotenv';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Notifcations from "vue-notification";
import Loader from "@/components/ui/Loader.vue";
import Icons from "./services/icons.service";
Icons.Initialize();

Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.component('loader', Loader);

dotenv.config();

Vue.config.productionTip = false

Vue.use(Notifcations);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
