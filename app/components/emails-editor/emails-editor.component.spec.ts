import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {
    async,
    TestBed,
    ComponentFixture
} from '@angular/core/testing';
import { EmailsEditorComponent } from './emails-editor.component';
import { EmailService } from '../../services/email.service';

class EmailServiceMock {
    public isValid(email) {
        return true;
    }

    public generate() {
        return 'test@test.com';
    }
}

class FormBuilderMock {
    public group() {}
}

describe('EmailsEditorComponent', () => {
    let component: EmailsEditorComponent;
    let fixture: ComponentFixture<EmailsEditorComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [EmailsEditorComponent],
            providers: [
                { provide: EmailService, useClass: EmailServiceMock },
                { provide: FormBuilder, useClass: FormBuilderMock }
            ],
            schemas: [NO_ERRORS_SCHEMA]
        })
            .overrideTemplate(EmailsEditorComponent, '')
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EmailsEditorComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();
    });

    it('should be ready component', () => {
        expect(fixture).toBeDefined();
        expect(component).toBeDefined();
    });

    // TODO: Дописать тесты
});
