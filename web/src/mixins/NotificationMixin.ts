import {Component, Vue} from "vue-property-decorator";

@Component
export default class NotificationMixin extends Vue {

    public notifySuccess(msg: string) {
        this.$notify({
            type: 'success',
            title: 'Success',
            text: msg,
        });
    }

    public notifyError(msg: string) {
        this.$notify({
            type: 'error',
            title: 'Error',
            text: msg,
        })
    }
}