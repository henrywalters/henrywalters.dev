<template>
    <div class="container">
        <div class="header">
            <h3 class="primary-font text-center">Login</h3>
        </div>
        <div class="row">
            <div class="col-md-3"></div>
            <div class="col-md-6">
                <form @submit.prevent="submit" v-if="initialized">
                    <div class="form-group">
                        <label>Email</label>
                        <input type="text" class="form-control" v-model="request.email" />
                    </div>
                    <div class="form-group">
                        <label>Password</label>
                        <input type="password" class="form-control" v-model="request.password" />
                    </div>
                    <p v-if="loading">Communicating with server...</p>
                    <p v-if="error" style="color: red">{{error}}</p>
                    <div class="form-group">
                        <button class="btn btn-primary form-control">Submit</button>
                    </div>
                </form>
            </div>
        </div>

    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import {AuthService, ILoginRequest} from "../services/auth.service";
    import {HashMap} from "../services/base.service";

    @Component({
        name: "Login"
    })
    export default class Login extends Vue {
        private auth!: AuthService;
        private request!: ILoginRequest;
        private loading = false;
        private initialized = false;

        private success = false;
        private error: string | null = null;

        private clear() {
            this.request = {
                email: "",
                password: "",
            }
        }

        private mounted() {
            this.clear();
            this.auth = new AuthService();
            this.initialized = true;
            console.log(document.referrer);
        }

        private async submit() {
            this.loading = true;
            this.error = null;

            const response = await this.auth.login(this.request);

            if (response.success) {
                this.success = true;
                this.$router.go(-1);
            } else {
                this.error = response.error;
            }

            this.loading = false;
        }
    }
</script>