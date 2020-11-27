import { AuthService } from '@/services/auth.service';
import {Vue, Component} from "vue-property-decorator";
import {User} from "@/services/auth.service";

@Component
export default class AuthMixin extends Vue {

    public authorized: boolean = false;

    public get PRIVILEGES(): Record<string, string> {
        return {
            FORUM_READ: "FORUM_READ",
            FORUM_WRITE: "FORUM_WRITE",
            ADMIN: "ADMIN",
        }
    }

    public unauthorized() {
        this.$router.replace({name: 'Unauthorized'});
    }

    public async authorizeFor(privilege: string) {
        const service = new AuthService();
        const res = await service.self();
        if (!res.success) {
            this.unauthorized();
        } else {
            const user = res.result;
            if (user.privileges.indexOf(privilege) === -1) {
                this.unauthorized();
            } else {
                this.authorized = true;
            }
        }
    }
}