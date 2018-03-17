import { EmailService } from './email.service';

describe('EmailService', () => {
    let emailsService: EmailService;

    beforeEach(() => {
        emailsService = new EmailService();
    });

    it('isValid returns true (email is valid)', () => {
        expect(emailsService.isValid('test@test.com')).toBe(true);
    });

    it('isValid returns false (email is invalid)', () => {
        expect(emailsService.isValid('test@')).toBe(false);
    });

    it('generate valid email', () => {
        expect(emailsService.isValid(emailsService.generate())).toEqual(true);
    });

    it('getEmailsStats is work', () => {
        expect(emailsService.getEmailsStats(['test@test.com', 'tadam@tata.net', 'invalid'])).toEqual({
            numberTotal: 3,
            numberValid: 2
        });
    });
});