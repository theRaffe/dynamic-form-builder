import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormContainerComponent } from './form-container.component';
import { FormBuilderService, InputControlBuilderService } from '@form-builder/services';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        FormContainerComponent
    ],
    exports: [
        FormContainerComponent
    ],
    providers: [
        FormBuilderService,
        InputControlBuilderService,
    ]
})

export class FormContainerModule { }