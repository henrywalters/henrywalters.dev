<template>
    <div class='container'>
        <h1>XL2SQL Demo</h1>
        <p>Xl2Sql (ex-el to es-cue-el) is a JavaScript library for parsing tabular data (Excel, CSV, JSON, etc...) and converting it to SQL</p>
        <p>Additionally, this library may be used for agnostic parsing</p>

        <h2>Lets get started</h2>
        <br/>
        <h3>Step 1) Upload a file with some Excel, CSV or JSON data</h3>

        <div id='uploader' />

        <p v-if='error' class='text-danger'>{{error}}</p>
        <div class='row mt-3' v-if='datatable'>
            <div class='col-md-8'>
                <h5>Data View</h5>
                <div id='datatable'></div>
            </div>
            <div class='col-md-4'>
                <h5>Column Metadata</h5>
                <ul>
                    <li v-for='col in Object.keys(header)' :key='col'>
                        <b>{{col}}</b>
                        <ul>
                            <li class='text-sm'><b>{{`${header[col].datatypes.length === 1 ? 'Type' : 'Types'}`}}</b>: {{header[col].datatypes.join(', ')}}</li>
                            <li>Max Length: {{header[col].maxLength}}</li>
                            <li v-if='header[col].isPrimary'>Primary Key</li>
                            <li v-if='header[col].isUnique'>Is Unique</li>
                            <li v-if='header[col].isNullable'>Is Nullable</li>
                            <li v-if='header[col].isForeign'>Is Foreign Key</li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import DataTable, { ColumnMetaData } from "xl2sql/dist/dataTable";
import FileInput from 'xl2sql/dist/fileInput';
import TableParser from 'xl2sql/dist/tableParser';

@Component({
    name: 'Xl2Sql'
})
export default class Xl2Sql extends Vue {

    input!: FileInput;
    error: string | null = null;
    datatable: DataTable | null = null;
    header: {[key: string]: ColumnMetaData} = {};
    
    mounted() {
        this.input = FileInput.generate(document.getElementById('uploader') as HTMLElement);
        this.input.onUpload(async (file) => {
            this.error = null;
            this.header = {};
            this.datatable = null;
            try {
                this.datatable = await TableParser.parseFile(file);
                
                for (const col of this.datatable.header) {
                    const info = this.datatable.getColumnInfo(col);
                    this.header[col] = info;
                }

                this.$nextTick(() => {
                    document.getElementById('datatable').appendChild(this.datatable.getHtml());
                })
            } catch(e) {
                this.error = e.message
            }
        })
    }
}

</script>

<style scoped lang="scss">
    .blog-post-title {
        p, h3 {
            margin: 0;
        }
    }

    .blog-post {}

    a {
        font-size: 20px;
    }
</style>