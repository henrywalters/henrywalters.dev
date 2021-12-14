<template>
    <div class='modal' role='dialog' :id='id'>
        <div class='modal-dialog' :class="{'modal-lg': size === 'lg', 'modal-sm': size === 'sm'}">
            <div class='modal-content'>
                <div class='modal-header'>
                    <slot name='header'>
                        <h5 class="modal-title">{{title}}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </slot>
                </div>
                <div class='modal-body'>
                    <slot>
                        
                    </slot>
                </div>
                <div class='modal-footer'>
                    <slot name='footer'>
                        <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal">Close</button>
                    </slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, Watch} from "vue-property-decorator"
import {Random} from 'hcore/dist/random';
import $ from 'jquery';

@Component({

})
export default class Modal extends Vue {
    @Prop({type: Boolean})
    public isOpen!: boolean;

    @Prop()
    public title!: string;

    @Prop({type: String})
    public size!: string;

    private id: string = "";

    created() {
        this.id = Random.alphanumeric(10);
        this.$nextTick(() => {
            $(`#${this.id}`).on('hidden.bs.modal', (e) => {
                this.$emit('close');
            })
        })
    }

    public open() {
        // @ts-ignore
        $(`#${this.id}`).modal('show');
        this.$emit('open');
    }

    public close() {
        // @ts-ignore
        $(`#${this.id}`).modal('hide');
        this.$emit('close');
    }

    @Watch('isOpen')
    public isOpenChange() {
        if (this.isOpen) this.open();
        else this.close();
    }
}


</script>