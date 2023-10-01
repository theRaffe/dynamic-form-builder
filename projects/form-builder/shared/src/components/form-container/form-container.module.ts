import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { FormContainerComponent } from './form-container.component';

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
})

export class FormContainerModule { }