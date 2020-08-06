<template>
  <div id="app">
    <div class="container">
      <div class="header text-center p-3">
        <h1 class="primary-font mb-0">HaDev<span class="accent">.io</span></h1>
        <p class="primary-font text-center mt-0 mb-0"><em>Math | Coding | Innovation</em></p>
        <div class="text-center mt-0 mb-2" style="font-size: 14px">
          Signed Out - <a href="/login" @click.prevent="$router.push({name: 'Login'})">Login</a> | <a href="/register" @click.prevent="$router.push({name: 'Register'})">Register</a>
        </div>
        <navigator />
      </div>
      <div class="content">
        <router-view/>
      </div>
      <div class="push"></div>
    </div>
    <div class="footer">
      <a href="/terms.html">Terms of Service</a> | <a href="/privacy.html">Privary</a>
    </div>
  </div>
</template>

<script lang="ts">

import {Component, Vue} from "vue-property-decorator";
import Navigator from "@/components/Navigator.vue";

@Component({
  name: 'App',
  components: {
    Navigator
  }
})
export default class App extends Vue {

}

</script>

<style lang="scss">

  @import "assets/theme.scss";

  $footer-size: 60px;

  .accent {
    color: $primaryColor;
  }
  html, body {
    height: 100%;
    margin: 0!important;
  }

  #app {
    height: 100%;
  }

  .container {
    margin: 0;
    min-height: calc(100% - 60px) !important;
  }

  .footer {
    color: white;

    padding: 15px 5px 15px 5px;

    a {
      color: white;
    }

    height: $footer-size;
    background-color: $primaryColor;
  }

  .push {
    height: $footer-size;
  }
</style>

