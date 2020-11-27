import {Body, Controller, Header, Headers, Ip, Param, Post, Get, UseGuards} from "@nestjs/common";
import { Privileges } from "src/constants/privileges.constants";
import { AuthenticateFor } from "src/guards/authenticateFor.guard";
import { Db } from "typeorm";
import {ApiResponse, ResponseDto} from "../dtos/response.dto";
import {PageVisit} from "../entities/pageVisit.entity";

const axios = require('axios').default;

interface PageVisitRequest {
    page: string;
    source?: string;
}

@Controller("v1/tracking")
export class TrackingController {
    @Post("page-visit")
    public async track(@Headers("x-forwarded-for") ip: string, @Body() req: PageVisitRequest): Promise<ApiResponse<void, string>> {
        try {
            const pageVisit = new PageVisit();
            if (req.source) pageVisit.source = req.source;
            pageVisit.page = req.page;

            if (ip) {
                const location = (await axios.get(process.env.LOCATION_API + "?ip=" + ip)).data;         
                pageVisit.ip = ip;
                pageVisit.country = location.country;
                pageVisit.state = location.region;
                pageVisit.city = location.city;
            } else {
                pageVisit.ip = 'localhost';
                pageVisit.country = 'N/A';
                pageVisit.state = 'N/A';
                pageVisit.city = 'N/A';
            }
           
            await pageVisit.save();
            return ResponseDto.Success(void 0);
        } catch (e) {
            return ResponseDto.Error(e.message);
        }
    }

    @Get("page-visit/report")
    @UseGuards(new AuthenticateFor(Privileges.ADMIN))
    public async getPageVisitReport() {
        const tsQuery = await PageVisit.createQueryBuilder()
            .select([
                'CAST(timestamp as Date) as date',
                'COUNT (DISTINCT ip) as distinctVisitors',
                'COUNT (ip) as pageVisits'
            ])
            .groupBy('CAST(timestamp as DATE)')
            .orderBy('CAST(timestamp as DATE)', 'DESC')

        const query = await PageVisit.createQueryBuilder()
            .select([
                'COUNT (DISTINCT ip) as distinctVisitors',
                'COUNT (ip) as pageVisits'
            ]);

        try {
            const tsRes = (await tsQuery.getRawMany()).map(x => {
                return {
                    date: x.date, 
                    distinctVisitors: parseInt(x.distinctVisitors), 
                    pageVisits: parseInt(x.pageVisits)
                }
            })

            const res = (await query.getRawOne());
            res.distinctVisitors = parseInt(res.distinctVisitors);
            res.pageVisits = parseInt(res.pageVisits);

            return ResponseDto.Success({
                timeseries: tsRes,
                aggregate: res,
            })
        } catch (e) {
            return ResponseDto.Error(e.message);
        }
    }
}