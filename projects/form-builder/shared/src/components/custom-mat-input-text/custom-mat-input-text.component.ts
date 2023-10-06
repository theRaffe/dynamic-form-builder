import { Component, Input } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormControlComponent } from '@form-builder/models';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgIf } from '@angular/common';

@Component({
    selector: 'custom-mat-input-text',
    templateUrl: './custom-mat-input-text.component.html',
    styleUrls: ['./custom-mat-input-text.component.css'],
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        NgIf,
    ],
})
export class CustomMatInputTextComponent implements FormControlComponent {
    @Input()
    public formControlInput!: FormControl;

    @Input()
    placeholder = '';

    getErrorMessage() {
        if (this.formControlInput.hasError('required')) {
            return 'You must enter a value';
        }
        return '';
    }
}
