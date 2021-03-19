import {HAuthClient} from "hauth-lib/dist/client";

export interface User {
    id: string;
    email: string;
    name: string;
    thumbnail: string;
}

export class HAuth {
    private static _client: HAuthClient;

    public static get client(): HAuthClient {
        if (!HAuth._client) {
            HAuth._client = new HAuthClient({
                loginUrl: process.env.VUE_APP_HAUTH_LOGIN_URL as string,
                apiUrl: process.env.VUE_APP_HAUTH_API_URL as string,
                applicationId: process.env.VUE_APP_HAUTH_APP_ID as string,
                organizationId: process.env.VUE_APP_HAUTH_ORG_ID as string,
            });
        }

        return HAuth._client;
    }
}