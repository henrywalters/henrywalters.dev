<template>
  <div id="app">
    <div class="app-container">
      <notifications position="bottom right" />

      <header-desktop class='d-none d-md-block' :user='user' />
      <header-mobile class='d-md-none' :user='user' @toggle-nav='toggleNavMobile' />

      <div class='container-fluid'>
      
        <div class='row d-md-none nav-mobile mb-3' >
          <div class='col-12'>
            <collapsible ref='navMobile' >
              <navigator-mobile @nav-close='closeNavMobile' @logout='logout' />
            </collapsible>
          </div>
        </div>
      </div>

      <navigator :user="user" class='d-none d-md-flex' @logout='logout' />

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
          <a :href="'mailto:' + getConfig('EMAIL')">{{getConfig('EMAIL')}}</a> |
          <a :href="getConfig('GITHUB')"><font-awesome-icon :icon="['fab', 'github']"></font-awesome-icon> Github</a> |
          <a :href="getConfig('LINKED_IN')"><font-awesome-icon :icon="['fab', 'linkedin']"></font-awesome-icon> Linkedin</a>
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">

  import {Component, Vue, Mixins} from "vue-property-decorator";
  import Navigator from "@/components/Navigator.vue";
  import NavigatorMobile from "@/components/NavigatorMobile.vue";
  import HeaderDesktop from "@/components/Header.vue";
  import HeaderMobile from "@/components/HeaderMobile.vue"
  import {AuthService, User} from "@/services/auth.service";
  import {AuthEventBus, AuthEvents} from "@/events";
  import ConfigMixin from "@/mixins/ConfigMixin";

@Component({
  name: 'App',
  components: {
    Navigator,
    NavigatorMobile,
    HeaderDesktop,
    HeaderMobile,
  }
})
export default class App extends Mixins(ConfigMixin) {
  private auth!: AuthService;

  private initialized = false;
  private user: User | null = null;

  private navMobileOpen = false;

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

  private closeNavMobile() {
    // @ts-ignore
    this.$refs.navMobile.close();
  }

  private toggleNavMobile() {
    // @ts-ignore
    this.$refs.navMobile.toggle();
  }
}

</script>

<style lang="scss">

  @import "assets/theme.scss";

  $footer-size: 60px;

  .accent {
    color: $brandColor;
  }
  html, body {
    height: 100%;
    margin: 0!important;
  }

  #app {
    height: 100%;
  }

  .app-container {
    min-height: calc(100% - 60px) !important;
  }

  .footer {

    margin: 0 !important;

    color: white;

    a {
      color: white;
    }

    height: $footer-size;
    background-color: $brandColor;
  }

  .push {
    height: $footer-size;
  }

  .clickable {
    cursor: pointer;
  }

  .nav-mobile {
    background-color: $brandColor;
  }
</style>

