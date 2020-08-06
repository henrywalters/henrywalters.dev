<template>
  <div id="app" class="container">
    <div class="header text-center m-3">
      <h1 class="primary-font mb-0">HaDev<span class="accent">.io</span></h1>
      <p class="primary-font text-center mt-0 mb-0"><em>Math | Coding | Innovation</em></p>
      <div class="text-center mt-0 mb-2" style="font-size: 14px">
        Signed Out - <a href="/login" @click.prevent="$router.push({name: 'Login'})">Login</a> | <a href="/register" @click.prevent="$router.push({name: 'Register'})">Register</a>
      </div>
      <navigator />
    </div>
    <router-view/>
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

.accent {
  color: $primaryColor;
}
</style>

