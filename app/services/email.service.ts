import { Injectable } from '@angular/core';
import { IEmailsStats } from './email.service.interface';

@Injectable()
export class EmailService {
    private readonly REGEXP_EMAIL = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // tslint:disable-line
    private readonly ABC_NUM = 'abcdefghijklmnopqrstuvwxyz0123456789';

    public isValid(email: string): boolean {
        return this.REGEXP_EMAIL.test(email);
    }

    public generate(): string {
        const nameLength = Math.random() * 10 + 1;
        const domainLength = Math.random() * 10 + 1;

        let email = '';
        for (let i = 0; i < nameLength; i++) {
            email += this.ABC_NUM.charAt(Math.round(this.ABC_NUM.length * Math.random()));
        }
        email += '@';
        for (let i = 0; i < domainLength; i++) {
            email += this.ABC_NUM.charAt(Math.round(this.ABC_NUM.length * Math.random()));
        }
        email += '.com';

        return email;
    }

    public getEmailsStats(emails: string[]): IEmailsStats {
        const emailsTotal = emails.length;
        const emailsValid = emails.filter((email) => this.isValid(email)).length;

        return {
            numberTotal: emailsTotal,
            numberValid: emailsValid
        };
    }
}