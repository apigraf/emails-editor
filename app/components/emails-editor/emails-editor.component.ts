import {
    Component,
    OnInit,
    ElementRef,
    forwardRef
} from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    FormGroup,
    NG_VALUE_ACCESSOR,
    ControlValueAccessor
} from '@angular/forms';
import { EmailService } from '../../services/email.service';

@Component({
    selector: 'emails-editor',
    templateUrl: 'emails-editor.component.pug',
    styleUrls: ['./emails-editor.component.scss'],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => EmailsEditorComponent),
        multi: true
    }]
})
export class EmailsEditorComponent implements OnInit, ControlValueAccessor {
    private readonly ADD_EMAIL_KEYS: number[] = [
        13, // Enter
        188, // Comma
        9 // Tab
    ];
    private readonly REMOVE_EMAIL_KEYS: number[] = [
        8 // Backspace
    ];

    public emailForm: FormGroup;
    public emails: string[] = [];

    // For ngModule (ControlValueAccessor):
    private onChangeCallback: (_: any) => void;
    private onTouchedCallback: () => void;

    constructor(
        public emailService: EmailService,
        private formBuilder: FormBuilder,
        private elementRef: ElementRef) {}

    // From ControlValueAccessor interface:

    public writeValue(value: any) {
        if (value !== this.emails) {
            this.emails = value;
        }
    }

    public registerOnChange(fn: any) {
        this.onChangeCallback = fn;
    }

    public registerOnTouched(fn: any) {
        this.onTouchedCallback = fn;
    }

    // From OnInit interface:

    public ngOnInit() {
        this.emailForm = this.formBuilder.group({
            emailControl: ''
        });
    }

    // Public methods:

    public setFocusToInput() {
        this.onBlur();
        this.elementRef.nativeElement.querySelectorAll('input')[0].focus();
    }

    public get emailControl(): AbstractControl {
        return this.emailForm.get('emailControl');
    }

    public onKeydown(event: KeyboardEvent): void {
        const isAddEmail = this.ADD_EMAIL_KEYS.indexOf(event.keyCode) !== -1;
        if (isAddEmail) {
            this.addEmails([this.inputValue]);
            event.preventDefault();
        }

        const isRemoveEmail = this.REMOVE_EMAIL_KEYS.indexOf(event.keyCode) !== -1;
        if (isRemoveEmail && this.inputValue === '') {
            if (this.emails.length) {
                const lastEmail = this.emails[this.emails.length - 1];

                this.removeEmail(lastEmail);
            }

            event.preventDefault();
        }
    }

    public onPaste(event: any): void {
        const data = event.clipboardData || (event.originalEvent && event.originalEvent.clipboardData);
        const insertedText = data.getData('text/plain');

        if (insertedText !== '') {
            const newEmails = insertedText
                .trim()
                .split(',')
                .filter((email) => !!email)
                .map((email) => email.trim());

            if (newEmails.length > 0) {
                this.addEmails(newEmails);
            }

            setTimeout(() => this.emailControl.setValue(''));
        }
    }

    public onBlur(): void {
        if (this.inputValue.trim() !== '') {
            this.addEmails([this.inputValue]);
        }
    }

    public removeEmail(email): void {
        this.emails = this.emails.filter((item: string) => item !== email);
        this.onChangeCallback(this.emails);
    }

    // Private methods:

    private get inputValue(): string {
        return this.emailControl.value;
    }

    private addEmails(emails: string[]): void {
        emails = emails
            .map((email) => email.trim())
            .filter((email) => email !== '');

        emails.forEach((email) => {
            const isEmailExist = this.emails.find((value) =>
                value.toLowerCase() === email.toLowerCase()
            );

            if (!isEmailExist) {
                this.emails.push(email);
            }
        });

        this.emailControl.setValue('');

        this.onChangeCallback(this.emails);
    }
}