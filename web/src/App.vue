<template>
  <div id="app">
    <div class="app-container">
      <notifications position="bottom right" />
      <div class="header text-center p-3">
        <span @click="goHome" class="clickable">
          <h1 class="title brand-font mb-0">{{nameStart}} <span class="accent">{{nameEnd}}</span></h1>
          <p class="sub-title primary-font text-center mt-0 mb-0"><em>{{ getConfig('SLOGAN') }}</em></p>
        </span>
        <div class="text-center mt-0 mb-2 text-black" style="font-size: 14px" v-if="initialized && user !== null">
          <span v-if="user">
            Signed in as {{user.firstName}} {{user.lastName}} - <router-link :to="{name: 'ChangePassword'}">Change Password</router-link> | <a href="/logout" @click.prevent="logout">Logout</a>
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
  import {AuthService, User} from "@/services/auth.service";
  import {AuthEventBus, AuthEvents} from "@/events";
  import ConfigMixin from "@/mixins/ConfigMixin";

@Component({
  name: 'App',
  components: {
    Navigator,
  }
})
export default class App extends Mixins(ConfigMixin) {

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

  private goHome() {
    if (this.$route.name !== 'Home') {
      this.$router.push({name: 'Home'});
    }
  }

  private getName(): string {
    return this.getConfig('NAME');
  }

  private get nameStart(): string {
    const raw = this.getName();
    const parts = raw.split(' ');
    return parts.slice(0, parts.length - 1).join(' ');
  }

  private get nameEnd(): string {
    const raw = this.getName();
    const parts = raw.split(' ');
    return parts[parts.length - 1];
  }

  private async logout() {
    await this.auth.logout();
    window.location.reload();
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
    background-color: $primaryColor;
  }

  .push {
    height: $footer-size;
  }

  .clickable {
    cursor: pointer;
  }
</style>

