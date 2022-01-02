<template>
    <div>
        <div class='row no-gutters header-mobile'>
            <div class='col-2 m-0 d-md-none text-center '>
                <button class='btn mt-3' @click='$emit("toggle-nav")'>
                    <font-awesome-icon icon='bars' class='fa-2x' />
                </button>
            </div>
            <div class='col-10 col-md-12 mb-3'>
                <div class="header text-center">
                    <span @click="goHome" class="clickable">
                        <h2 class="title brand-font mb-0 d-md-none mt-3">{{nameStart}} <span class="accent">{{nameEnd}}</span></h2>
                        <p class="sub-title primary-font text-center mt-0 mb-0"><em>{{ getConfig('SLOGAN') }}</em></p>
                    </span>
                </div>
            </div>
        </div>
        <div class='row no-gutters header-mobile' v-if="user">
            <div class='col-12'>
                <div class="text-center mt-0 mb-2 text-black" style="font-size: 14px">
                    <span v-if="user">
                    Signed in as {{user.firstName}} {{user.lastName}} - <router-link :to="{name: 'ChangePassword'}">Change Password</router-link> | <a href="/logout" @click.prevent="logout">Logout</a>
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang='ts'>
    
import {Vue, Component, Prop, Mixins} from 'vue-property-decorator';
import {AuthService, User} from "@/services/auth.service";
import {AuthEventBus, AuthEvents} from "@/events";
import ConfigMixin from "@/mixins/ConfigMixin";

@Component({})
export default class HeaderMobile extends Mixins(ConfigMixin) {

    @Prop()
    public user!: User;

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
        this.$emit('logout');
    }
}

</script>

<style lang="scss" scoped>
  @import "@/assets/theme.scss";

  .header-mobile {
        background-color: $brandColor;
        color: white;
  }

  .title  {
        color: white !important;
  }

  .sub-title {
      color: white !important;
  }

  .accent {
      color: #b9b9b9 !important;
  }

  .btn {
      color: white !important;
  }

  a {
      color: white !important;
  }
</style>