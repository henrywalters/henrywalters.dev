import BaseService from "@/services/base.service";

export class TrackingService extends BaseService<void, void, void> {
    constructor() {
        super("Tracking Service");
    }

    public async trackPageVisit(page: string): Promise<void> {
        try {
            await this.http.post("tracking/page-visit/" + page, {});
            return void 0;
        } catch (e) {
            return void 0;
        }
    }
}