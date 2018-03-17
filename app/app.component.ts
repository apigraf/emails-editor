import { Component, ViewEncapsulation } from '@angular/core';
import { EmailService } from './services/email.service';
import { IEmailsStats } from './services/email.service.interface';

@Component({
    selector: 'app',
    templateUrl: 'app.component.pug',
    styleUrls: ['./app.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent {
    public emails: string[] = [];

    constructor(private emailService: EmailService) {}

    public addRandomEmail() {
        const randomEmail = this.emailService.generate();
        this.emails.push(randomEmail);
    }

    public getEmailsCount(): void {
        const statsByEmailCount: IEmailsStats = this.emailService.getEmailsStats(this.emails);

        console.log(statsByEmailCount); // tslint:disable-line

        alert('Total emails: ' + statsByEmailCount.numberTotal +
            '\nValid emails: ' + statsByEmailCount.numberValid);
    }
}
