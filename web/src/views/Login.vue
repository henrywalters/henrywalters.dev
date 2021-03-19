<template>
    <div class="container">
        <div class="header">
            <h3 class="primary-font text-center">Login</h3>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import {HAuth} from "../services/hauth.service";

    @Component({
        name: "Login"
    })
    export default class Login extends Vue {
        private loading = false;
        private initialized = false;

        private success = false;
        private error: string | null = null;

        private async created() {
           try {
            const res = await HAuth.client.login();
           } catch (e) {
               console.log(e);
           }
        }
    }
</script>