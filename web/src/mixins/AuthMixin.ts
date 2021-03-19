import {Vue, Component} from "vue-property-decorator";
import {HAuth} from "./../services/hauth.service";

@Component
export default class AuthMixin extends Vue {

    private static PrivilegeCache: {[privilege: string]: boolean} = {};

    public authorized: boolean = false;

    public get PRIVILEGES(): Record<string, string> {
        return {
            BLOG_WRITE: "BLOG_WRITE",
            FORUM_READ: "FORUM_READ",
            FORUM_WRITE: "FORUM_WRITE",
            ADMIN: "ADMIN",
        }
    }

    public unauthorized() {
        this.$router.replace({name: 'Unauthorized'});
    }

    public async getSelf() {
        try {
            return HAuth.client.getSelf();
        } catch (e) {
            return void 0;
        }
    }

    public async hasPrivilege(privilege: string) {
        if (AuthMixin.PrivilegeCache.hasOwnProperty(privilege)) {
            return AuthMixin.PrivilegeCache[privilege];
        }

        const authorized = await HAuth.client.authorizeForApp([privilege]);

        AuthMixin.PrivilegeCache[privilege] = authorized.failed.length === 0;

        return AuthMixin.PrivilegeCache[privilege];
    }

    public async authorizeFor(privilege: string) {
        if (await this.hasPrivilege(privilege)) {
            this.authorized = true;
        } else {
            this.unauthorized();
        }
    }
}