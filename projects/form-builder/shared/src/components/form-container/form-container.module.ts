import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormContainerComponent } from './form-container.component';
import { FormBuilderService, InputControlBuilderService } from '@form-builder/services';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatTabsModule,
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