import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmailsEditorComponent } from './emails-editor.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        EmailsEditorComponent
    ],
    exports: [
        EmailsEditorComponent
    ]
})
export class EmailsEditorModule {}
