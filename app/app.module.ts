import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { EmailsEditorModule } from './components/emails-editor/emails-editor.module';
import { EmailService } from './services/email.service';

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        FormsModule,
        EmailsEditorModule
    ],
    declarations: [
        AppComponent
    ],
    providers: [
        EmailService
    ],
    bootstrap: [
        AppComponent
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class AppModule {}
