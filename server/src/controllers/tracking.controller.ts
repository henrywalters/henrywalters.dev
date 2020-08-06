import {Controller, Ip, Param, Post} from "@nestjs/common";
import {ApiResponse, ResponseDto} from "../dtos/response.dto";
import {PageVisit} from "../entities/pageVisit.entity";

@Controller("v1/tracking")
export class TrackingController {
    @Post("page-visit/:page")
    public async track(@Ip() ip: string, @Param("page") page: string): Promise<ApiResponse<void, string>> {
        try {
            const pageVisit = new PageVisit();
            pageVisit.ip = ip;
            pageVisit.page = page;
            await pageVisit.save();
            return ResponseDto.Success(void 0);
        } catch (e) {
            return ResponseDto.Error(e.message);
        }
    }
}