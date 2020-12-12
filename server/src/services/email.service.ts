import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";

export interface EmailSender {
    label: string,
    email: string,
}

export interface EmailOptions {
    template: string;
    subject: string;
    context?: Object;
    to: EmailSender;
    from?: EmailSender;
    priority?: 'high' | 'normal' | 'low';
}

function email_env_key(emailType: string): string {
    return `EMAIL_${emailType.toUpperCase()}`;
}

function label_env_key(emailType: string): string {
    return `EMAIL_${emailType.toUpperCase()}_LABEL`;
}

export const EmailSenders: {[key: string]: EmailSender} = {
    default: {
        label: label_env_key('default'),
        email: email_env_key('default'),
    },
    // TODO: Set up this account in MX ROUTES, add transport notion to the service so SSL emails work.
    // notifications: {
    //    label: label_env_key('notifications'),
    //    email: email_env_key('notifications'),
    // }
}

@Injectable()
export class EmailService {
    constructor(private readonly email: MailerService) {
        const missing_vars = [];
        for (const key in EmailSenders) {
            const label_key = label_env_key(key);
            const email_key = email_env_key(key);
            if (!process.env[label_key]) {
                missing_vars.push(label_key);
            } else {
                EmailSenders[key].label = process.env[label_key];
            }

            if (!process.env[email_key]) {
                missing_vars.push(email_key);
            } else {
                EmailSenders[key].email = process.env[email_key];
            }
        }
        if (missing_vars.length > 0) {
            throw new Error(`The following environment variables are missing but are configured as defaults in Email Service\n\n: ${missing_vars.join(",\n")}`);
        }
    }

    private emailStr(sender: EmailSender): string {
        return `${sender.label} <${sender.email}>`;
    }

    public async send(options: EmailOptions) {
        console.log(this.emailStr(options.to));
        console.log(options.from ? this.emailStr(options.from) : this.emailStr(EmailSenders.default))
        await this.email.sendMail({
            to: this.emailStr(options.to),
            from: options.from ? this.emailStr(options.from) : this.emailStr(EmailSenders.default),
            subject: options.subject,
            template: options.template,
            // TODO: extend this if the need arises. For now, it does not.
            attachments: [{
                cid: 'business_logo.PNG',
                path: process.cwd() + '/assets/business_logo.PNG',
                filename: 'business_logo.PNG'
            }],
            context: options.context ? options.context : {},
        })
    }
}