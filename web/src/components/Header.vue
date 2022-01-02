<template>
    <div>
        <div class='row'>
            <div class='col-12 col-md-12'>
                <div class="header text-center p-3">
                    <span @click="goHome" class="clickable">
                        <h1 class="title brand-font mb-0 d-none d-md-block">{{nameStart}} <span class="accent">{{nameEnd}}</span></h1>
                        <p class="sub-title primary-font text-center mt-0 mb-0"><em>{{ getConfig('SLOGAN') }}</em></p>
                    </span>
                </div>
            </div>
        </div>
        <div class='row' v-if="user">
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
export default class Header extends Mixins(ConfigMixin) {

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

</style>