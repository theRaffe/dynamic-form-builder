import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { FormControlSelectComponent } from '@form-builder/models';

@Component({
    selector: 'custom-mat-input-text',
    templateUrl: './custom-mat-input-radio.component.html',
    styleUrls: ['./custom-mat-input-radio.component.css'],
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatRadioModule,
        NgFor,
    ],
})
export class CustomMatInputRadioComponent implements FormControlSelectComponent {
    formGroup?: FormGroup<any> | undefined;
    @Input()
    public formControlInput!: FormControl;

    @Input()
    placeholder = '';

    @Input()
    options!: any[];

    @Input()
    isMultiple!: boolean;
}
