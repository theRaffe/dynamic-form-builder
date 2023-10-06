import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormControlComponent, FormControlSelectComponent } from '@form-builder/models';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { NgFor, NgIf } from '@angular/common';

@Component({
    selector: 'custom-mat-input-text',
    templateUrl: './custom-mat-input-select.component.html',
    styleUrls: ['./custom-mat-input-select.component.css'],
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        NgFor,
        NgIf,
    ],
})
export class CustomMatInputSelectComponent implements FormControlSelectComponent {
    formGroup?: FormGroup<any> | undefined;
    @Input()
    public formControlInput!: FormControl;

    @Input()
    placeholder = '';

    @Input()
    options!: any[];

    @Input()
    isMultiple!: boolean;

    getErrorMessage() {
        if (this.formControlInput.hasError('required')) {
            return 'You must enter a value';
        }
        return '';
    }
}
