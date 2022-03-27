import { Body, Controller, Delete, Get, Post, Put, Req, UseGuards } from "@nestjs/common";
import { Request } from "express";
import { Privileges } from "src/constants/privileges.constants";
import { ResponseDto } from "src/dtos/response.dto";
import { AuthenticateFor } from "src/guards/authenticateFor.guard";

const axios = require('axios').default;

@Controller('v1/accounting')
export class AccountingController {

    private buildUrl(req: Request) {
        return req.url.replace(`/v1/accounting`, process.env.ACCOUNTING_API);
    }

    private async getProxy(req: Request) {
        try {
            const url = this.buildUrl(req);
            return ResponseDto.Success((await axios.get(url)).data);
        } catch (e) {
            return ResponseDto.Error(e.response.data);
        }
    }

    private async postProxy(req: Request, data: any) {
        try {
            const url = this.buildUrl(req);
            return ResponseDto.Success((await axios.post(url, data)).data);
        } catch (e) {
            return ResponseDto.Error(e.response.data);
        }
    }

    private async putProxy(req: Request, data: any) {
        try {
            const url = this.buildUrl(req);
            return ResponseDto.Success((await axios.put(url, data)).data);
        } catch (e) {
            return ResponseDto.Error(e.response.data);
        }
    }

    private async deleteProxy(req: Request) {
        try {
            const url = this.buildUrl(req);
            return ResponseDto.Success((await axios.delete(url)).data);
        } catch (e) {
            return ResponseDto.Error(e.response.data);
        }
    }

    // Clients API

    @Get('clients/*')
    @UseGuards(new AuthenticateFor(Privileges.ADMIN))
    public async getClientProxy(@Req() req: Request) {
        console.log(req);
        return await this.getProxy(req);
    }

    @Post('clients/*')
    @UseGuards(new AuthenticateFor(Privileges.ADMIN))
    public async postClientsProxy(@Req() req: Request, @Body() body) {
        return await this.postProxy(req, body);
    }

    @Put('clients/*')
    @UseGuards(new AuthenticateFor(Privileges.ADMIN))
    public async putClientsProxy(@Req() req: Request, @Body() body) {
        return await this.putProxy(req, body);
    }

    @Delete('clients/*')
    @UseGuards(new AuthenticateFor(Privileges.ADMIN))
    public async deleteClientsProxy(@Req() req: Request) {
        return await this.deleteProxy(req);
    }

    // Projects API
    @Get('projects/*')
    @UseGuards(new AuthenticateFor(Privileges.ADMIN))
    public async getProjectsProxy(@Req() req: Request) {
        console.log(req);
        return await this.getProxy(req);
    }

    @Post('projects/*')
    @UseGuards(new AuthenticateFor(Privileges.ADMIN))
    public async postProjectsProxy(@Req() req: Request, @Body() body) {
        return await this.postProxy(req, body);
    }

    @Put('projects/*')
    @UseGuards(new AuthenticateFor(Privileges.ADMIN))
    public async putProjectsProxy(@Req() req: Request, @Body() body) {
        return await this.putProxy(req, body);
    }

    @Delete('projects/*')
    @UseGuards(new AuthenticateFor(Privileges.ADMIN))
    public async deleteProjectsProxy(@Req() req: Request) {
        return await this.deleteProxy(req);
    }

    // Quotes API

    @Get('quotes')
    @UseGuards(new AuthenticateFor(Privileges.ADMIN))
    public async getQuotes(@Req() req: Request) {
        return await this.getProxy(req);
    }

    @Post('quotes/*')
    @UseGuards(new AuthenticateFor(Privileges.ADMIN))
    public async createQuote(@Req() req: Request, @Body() body) {
        return await this.postProxy(req, body);
    }

    @Delete('quotes/:id')
    @UseGuards(new AuthenticateFor(Privileges.ADMIN))
    public async deleteQuote(@Req() req: Request) {
        return await this.deleteProxy(req);
    }

    // Note that anyone can get a single invoice
    @Get('quotes/:id')
    public async getQuote(@Req() req: Request) {
        return await this.getProxy(req);
    }


    // Invoices API

    @Get('invoices')
    @UseGuards(new AuthenticateFor(Privileges.ADMIN))
    public async getInvoices(@Req() req: Request) {
        return await this.getProxy(req);
    }

    @Post('invoices/*')
    @UseGuards(new AuthenticateFor(Privileges.ADMIN))
    public async createInvoice(@Req() req: Request, @Body() body) {
        return await this.postProxy(req, body);
    }

    // Note that anyone can get a single invoice
    @Get('invoices/*')
    public async getInvoice(@Req() req: Request) {
        return await this.getProxy(req);
    }

    @Delete('invoices/*')
    public async voidInvoice(@Req() req: Request) {
        return await this.deleteProxy(req);
    }

    // Payments API

    // As well as make a payment
    @Post('payments')
    public async makePayment(@Req() req: Request, @Body() body) {
        return await this.postProxy(req, body);
    }
}