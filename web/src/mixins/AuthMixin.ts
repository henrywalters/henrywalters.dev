import {Vue} from "vue-property-decorator";
import {User} from "@/services/auth.service";

export default class AuthMixin extends Vue {
    public get PRIVILEGES(): Record<string, string> {
        return {
            FORUM_READ: "FORUM_READ",
            FORUM_WRITE: "FORUM_WRITE",
            ADMIN: "ADMIN",
        }
    }




}