import {Vue, Component} from "vue-property-decorator";

@Component
export default class ConfigMixin extends Vue {
    public getConfig(key: string): string {
        const configKey = `VUE_APP_${key}`;
        if (!process.env.hasOwnProperty(configKey)) {
            throw new Error(configKey + " not found in config file");
        }
        return process.env[configKey] as string;
    }
}