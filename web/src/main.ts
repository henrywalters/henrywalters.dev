import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import dotenv from 'dotenv';
import { IconDefinition, library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {faGithub, faLinkedin} from "@fortawesome/free-brands-svg-icons";
import {faStar as faStarSolid, faUpload, } from "@fortawesome/free-solid-svg-icons";
import {faStar} from "@fortawesome/free-regular-svg-icons/faStar";


library.add(faLinkedin);
library.add(faGithub);
library.add(faUpload);
library.add(faStarSolid);
library.add(faStar as IconDefinition);

Vue.component('font-awesome-icon', FontAwesomeIcon)

dotenv.config();

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
