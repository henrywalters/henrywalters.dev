import BaseService, { ApiResponse } from "@/services/base.service";

export interface PageVisitDailySummary {
    date: Date;
    distinctVisitors: number;
    pageVisits: number;
}

export interface PageVisitAggregateSummary {
    distinctVisitors: number;
    pageVisits: number;
}

export interface PageVisitSumary {
    timeseries: PageVisitDailySummary[];
    aggregate: PageVisitAggregateSummary;
}

export class TrackingService extends BaseService<void, void, void> {
    constructor() {
        super("Tracking Service");
    }

    public async trackPageVisit(page: string, link: string, source?: string): Promise<void> {
        try {
            await this.client.post("tracking/page-visit", {
                page,
                source,
                link,
            });
            return void 0;
        } catch (e) {
            return void 0;
        }
    }

    public async getPageVisitReport(): Promise<ApiResponse<PageVisitSumary, void>> {
        try {
            return (await this.client.get('tracking/page-visit/report'));
        } catch (e) {
            throw new Error("Failed to get page visit report");
        }
    }
}