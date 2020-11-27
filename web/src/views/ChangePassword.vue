<template>
    <div class="container">
        <div class="header">
            <h3 class="primary-font text-center">Change Password</h3>
        </div>
        <div class="row">
            <div class="col-md-3"></div>
            <div class="col-md-6">
                <form @submit.prevent="submit" v-if="initialized">
                    <form-group label="Password" field="password" :errors="errors">
                        <input type="password" class="form-control" v-model="request.password" />
                    </form-group>
                    <div class="form-group">
                        <button class="btn btn-primary form-control">Submit</button>
                    </div>
                    <loader :size="2" class="m-3" v-if="loading" />
                </form>
            </div>
        </div>

    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import {AuthService, IChangePasswordRequest} from "../services/auth.service";
    import {HashMap} from "../services/base.service";
    import FormGroup from "@/components/ui/forms/FormGroup.vue"

    @Component({
        name: "Login",
        components: {
            FormGroup,
        }
    })
    export default class Login extends Vue {
        private auth!: AuthService;
        private request!: IChangePasswordRequest
        private loading = false;
        private initialized = false;

        private success = false;
        private errors: HashMap<string> = {};

        private clear() {
            this.request = {
                password: "",
            }
        }

        private async created() {
            this.clear();
            this.auth = new AuthService();
            const res = await this.auth.self();
            if (!res.success) {
                this.$router.back();
            }
            this.initialized = true;
            console.log(document.referrer);
        }

        private async submit() {
            this.loading = true;
            this.errors = {};

            const response = await this.auth.changePassword(this.request);

            if (response.success) {
                this.success = true;
                this.$router.back();
            } else {
                this.errors = response.error;
            }

            this.loading = false;
        }
    }
</script>