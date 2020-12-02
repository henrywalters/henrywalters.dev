import {Component, Mixins, Vue} from "vue-property-decorator"
import NotificationMixin from './NotificationMixin';

@Component
export default class ClipboardMixin extends Mixins(NotificationMixin) {
    public copyToClipboard(text: string) {
        navigator.clipboard.writeText(text).then(() => {
            this.notifySuccess("Copied to clipboard");
        }).catch(() => {
            this.notifyError("Failed to copy");
        })
    }
}