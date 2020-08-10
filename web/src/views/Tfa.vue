<template>
    <div class="container">
        <h3 class="primary-font text-center">Two-Factor Authentication</h3>
        <p v-if="status" class="secondary-font text-center">{{status}}</p>
        <div v-if="error">
            <p class="secondary-font text-center" style="color: red">{{error}}</p>
            <p class="text-center"><a class="secondary-font" href="/" @click.prevent="$router.push({name: 'Home'})">Return to home</a></p>
        </div>

        <div v-if="success">
            <p class="secondary-font text-center success">{{success}}</p>
            <p class="text-center"><a class="secondary-font text-center" href="/login" @click.prevent="$router.push({name: 'Login'})">Continue to login</a></p>
        </div>

    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import {AuthService} from "@/services/auth.service";

    @Component({
        name: "Tfa"
    })
    export default class Tfa extends Vue {

        private auth!: AuthService;

        private status: string | null = null;
        private error: string | null = null;
        private success: string | null = null;

        private async mounted() {
            this.auth = new AuthService();
            if (!this.$route.params.challenge) {
                this.error = "Invalid two-factor auth code. Navigating to home page...";
                this.goHome();
            } else {
                this.status = "Verifying two-factor auth code: " + this.$route.params.challenge + "...";
                await this.submit();
            }
        }

        private async submit() {
            const response = await this.auth.verify(this.$route.params.challenge);
            this.status = null;
            if (response.success) {
                this.success = "Two-factor auth code successfully verified.";
            } else {
                this.error = response.error;
            }
        }

        private goHome() {
            setTimeout(() => {
                this.$router.replace({name: "Home"});
            }, 2000);
        }
    }
</script>

<style scoped lang="scss">
    @import "@/assets/theme.scss";

    .success {
        color: $primaryColor;
    }
</style>