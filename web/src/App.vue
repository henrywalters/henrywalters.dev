<template>
  <div id="app">
    <div class="container">
      <div class="header text-center p-3">
        <h1 class="primary-font mb-0">HaDev<span class="accent">.io</span></h1>
        <p class="primary-font text-center mt-0 mb-0"><em>Math | Coding | Innovation</em></p>
        <div class="text-center mt-0 mb-2" style="font-size: 14px" v-if="initialized">
          <span v-if="user === null">
            Signed Out - <a href="/login" @click.prevent="$router.push({name: 'Login'})">Login</a> | <a href="/register" @click.prevent="$router.push({name: 'Register'})">Register</a>
          </span>
          <span v-else>
            Signed in as {{user.firstName}} {{user.lastName}} - <a href="/logout" @click.prevent="logout">Logout</a>
          </span>
        </div>

        <navigator :user="user"/>
      </div>
      <div class="content">
        <router-view/>
      </div>
      <div class="push"></div>
    </div>
    <div class="footer row pl-3 pr-3 pt-md-3 pt-2">
      <div class="col-md-6 float-left">
        <a href="/terms.html">Terms of Service</a> | <a href="/privacy.html">Privary Policy</a>
      </div>
      <div class="col-md-6 ">
        <span class="float-md-right">
          <a href="mailto:henry@hadev.io">Henry@hadev.io</a> |
          <a href="https://github.com/henrywalters"><font-awesome-icon :icon="['fab', 'github']"></font-awesome-icon> Github</a> |
          <a href="https://www.linkedin.com/in/johnhenrywalters"><font-awesome-icon :icon="['fab', 'linkedin']"></font-awesome-icon> Linkedin</a>
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">

  import {Component, Vue} from "vue-property-decorator";
  import Navigator from "@/components/Navigator.vue";
  import {AuthService, User} from "@/services/auth.service";
  import {AuthEventBus, AuthEvents} from "@/events";

  @Component({
  name: 'App',
  components: {
    Navigator
  }
})
export default class App extends Vue {

  private auth!: AuthService;

  private initialized = false;
  private user: User | null = null;

  private async getSelf() {
    const res = await this.auth.self();
    if (res.success) this.user = res.result;
  }

  private async mounted() {
    this.auth = new AuthService();
    await this.getSelf();
    this.initialized = true;

    AuthEventBus.on(AuthEvents.Login, async () => {
      await this.getSelf();
    })

    AuthEventBus.on(AuthEvents.Logout, async () => {
      this.user = null;
    })
  }

  private async logout() {
    await this.auth.logout();
  }
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
    min-height: calc(100% - 60px) !important;
  }

  .footer {

    margin: 0 !important;

    color: white;

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

