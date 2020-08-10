<template>
    <div class="container">
        <div class="header">
            <h3 class="primary-font text-center">Register</h3>
        </div>
        <div class="row">
            <div class="col-md-3"></div>
            <div class="col-md-6">
                <form @submit.prevent="submit" v-if="initialized" autocomplete="off">
                    <div class="row" v-if="!registered">
                        <input id="username" style="display:none" type="text" autocomplete="new-password">
                        <input id="password" style="display:none" type="password" autocomplete="new-password">
                        <div class="form-group col-md-6">
                            <label class="primary-font">First Name</label>
                            <input type="text" class="form-control" v-model="request.firstName" :class="{'is-invalid': errors.hasOwnProperty('firstName')}"/>
                            <div class="invalid-feedback" v-if="errors.hasOwnProperty('firstName')">{{errors['firstName']}}</div>
                        </div>
                        <div class="form-group col-md-6">
                            <label class="primary-font">Last Name</label>
                            <input type="text" class="form-control" v-model="request.lastName" :class="{'is-invalid': errors.hasOwnProperty('lastName')}" />
                            <div class="invalid-feedback" v-if="errors.hasOwnProperty('lastName')">{{errors['lastName']}}</div>
                        </div>
                        <div class="form-group col-12">
                            <label class="primary-font">Email</label>
                            <input type="text" class="form-control" v-model="request.email" :class="{'is-invalid': errors.hasOwnProperty('email')}" autocomplete="new-password" />
                            <div class="invalid-feedback" v-if="errors.hasOwnProperty('email')">{{errors['email']}}</div>
                        </div>
                        <div class="form-group col-12">
                            <label class="primary-font">Password</label>
                            <input type="password" class="form-control" v-model="request.password" :class="{'is-invalid': errors.hasOwnProperty('password')}" autocomplete="new-password" />
                            <div class="invalid-feedback" v-if="errors.hasOwnProperty('password')">{{errors['password']}}</div>
                        </div>
                        <div class="form-group col-12">
                            <button class="btn btn-primary form-control">Submit</button>
                        </div>
                    </div>
                    <div class="row" v-else>
                        <p>Thank you for registering for <a href="/">Hadev.io</a>. We've sent you an email to complete the sign-up process.</p>
                    </div>
                </form>
            </div>
        </div>

    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import {AuthService, IRegisterRequest} from "../services/auth.service";
    import {HashMap} from "../services/base.service";

    @Component({
        name: "Register"
    })
    export default class Register extends Vue {

        private initialized = false;
        private auth!: AuthService;
        private request!: IRegisterRequest;
        private errors: HashMap<string> = {};
        private registered = false;

        private clear() {
            this.request = {
                firstName: "",
                lastName: "",
                email: "",
                password: "",
            }
        }

        private mounted() {
            this.clear();
            this.auth = new AuthService();
            this.initialized = true;
        }

        private async submit() {
            const response = await this.auth.register(this.request);
            if (response.success) this.registered = true;
            else this.errors = response.error;
        }
    }
</script>