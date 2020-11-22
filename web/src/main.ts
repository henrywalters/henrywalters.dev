import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import dotenv from 'dotenv';
import { IconDefinition, library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {faGithub, faLinkedin} from "@fortawesome/free-brands-svg-icons";
import {faCopy, faSpinner, faStar as faStarSolid, faTrash, faUpload, } from "@fortawesome/free-solid-svg-icons";
import {faStar} from "@fortawesome/free-regular-svg-icons/faStar";
import Notifcations from "vue-notification";
import Loader from "@/components/ui/Loader.vue";

library.add(faSpinner);
library.add(faCopy);
library.add(faLinkedin);
library.add(faGithub);
library.add(faUpload);
library.add(faStarSolid);
library.add(faTrash);
library.add(faStar as IconDefinition);

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('loader', Loader);

dotenv.config();

Vue.config.productionTip = false

Vue.use(Notifcations);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
