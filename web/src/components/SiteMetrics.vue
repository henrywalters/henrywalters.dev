<template>
    <div v-if="initialized" class="row">
        <div class="col-md-3 text-center pt-5">
            <h3>{{summary.aggregate.distinctVisitors}}</h3>
            <p class="text-center">Total Unique Visitors</p>
            <h3>{{summary.aggregate.pageVisits}}</h3>
            <p class="text-center">Total Page Visits</p>
        </div>
        <div class="col-md-9" >
            <chart :options="chartOptions" />
        </div>
    </div>
</template>

<script lang="ts">
import {Component, Vue, Mixins} from "vue-property-decorator";
import { PageVisitSumary, TrackingService } from "../services/tracking.service";
import {Chart,} from 'highcharts-vue';
import {ChartOptions} from 'highcharts';

@Component({
    components: {
        Chart,
    }
})
export default class SiteMetrics extends Vue {
    private service!: TrackingService;
    private summary!: PageVisitSumary;
    private initialized = false;

    private totalPageVisits: number = 0;
    private uniqueVisitors: number = 0;

    private chartOptions: any = {
        title: {
            text: 'Daily Summary'
        },
        xAxis: {
            type: 'datetime'
        },
        credits: {
            enabled: false
        },
        legend: {
            enabled: true,
        },
        series: [],
    }

    private async created() {
        this.service = new TrackingService();
        const res = await this.service.getPageVisitReport();
        if (res.success) {
            this.summary = res.result;
            this.initialized = true;

            this.chartOptions.series.push({
                name: 'Daily Visitors',
                data: this.summary.timeseries.map(x => {
                    return [new Date(x.date).getTime() , x.pageVisits];
                })
            })

            console.log(new Date(this.summary.timeseries[0].date).getTime());

            this.chartOptions.series.push({
                name: 'Unique Daily Visitors',
                data: this.summary.timeseries.map(x => {
                    return [new Date(x.date).getTime(), x.distinctVisitors];
                })
            })
        }

        console.log(this.summary);
    }
}

</script>