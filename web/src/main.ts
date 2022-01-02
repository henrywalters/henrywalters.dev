import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import dotenv from 'dotenv';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Notifcations from "vue-notification";
import Loader from "@/components/ui/Loader.vue";
import Modal from '@/components/ui/Modal.vue';
import FormGroup from "@/components/ui/forms/FormGroup.vue";
import MarkdownEditor from "@/components/ui/MarkdownEditor.vue";
import MarkdownViewer from "@/components/ui/MarkdownViewer.vue";
import Collapsible from '@/components/ui/Collapsible.vue';
import Icons from "./services/icons.service";
import CodeHighlight from "./directives/codeHighlight.directive";
import VueTelInput from 'vue-tel-input'
import 'vue-tel-input/dist/vue-tel-input.css';
// @ts-ignore
import VueLuxon from "vue-luxon";

Icons.Initialize();

Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.component('loader', Loader);
Vue.component('modal', Modal);
Vue.component('form-group', FormGroup);
Vue.component('markdown-editor', MarkdownEditor);
Vue.component('markdown-viewer', MarkdownViewer);
Vue.component('collapsible', Collapsible);

dotenv.config();

Vue.config.productionTip = false

Vue.use(Notifcations);
Vue.use(CodeHighlight);
Vue.use(VueLuxon);
Vue.use(VueTelInput);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
