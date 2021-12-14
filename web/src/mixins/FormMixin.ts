import BaseService, { ApiResponse, HashMap } from "@/services/base.service";
import {Component, Prop, Vue, Watch} from "vue-property-decorator";

@Component
export class FormMixin<Dto, Obj> extends Vue {
    @Prop()
    public api!: BaseService<Dto, Obj, HashMap<string>>;

    @Prop()
    public object!: Obj;

    public empty!: Dto;
    public objToDto!: (obj: Obj) => Dto;
    public idFn!: (obj: Obj) => string;

    public loading: boolean = false;
    public editing: boolean = false;
    public errors: HashMap<string> = {};
    public request!: Dto;

    @Watch('object', {deep: true})
    public objectChange() {
        console.log(this.object);
        if (this.object) {
            this.request = this.objToDto(this.object);
            this.editing = true;
        } else {
            this.reset();
        }
    }

    @Watch('request', {deep: true})
    public requestChange(orig: Dto, after: Dto) {
        console.log(orig, after);
    }

    created() {
        if (this.object) {
            this.request = this.objToDto(this.object);
            this.editing = true;
        } else {
            this.reset();
        }
    }

    reset() {
        this.request = this.empty;
        this.editing = false;
        this.errors = {};
    }

    async submit() {
        this.loading = true;
        this.errors = {};
        let res: ApiResponse<Obj, HashMap<string>>;
        if (this.editing) {
            res = await this.api.put(this.idFn(this.object), this.request);
        } else {
            res = await this.api.post(this.request);
        }
        if (res.success === true) {
            this.$emit('success', res.result);
            this.request = this.empty;
        } else {
            this.errors = res.error;
        }
        this.loading = false;
    }
}