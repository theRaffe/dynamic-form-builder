import { Component, Input } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormControlComponent } from '@form-builder/models';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { NgFor } from '@angular/common';

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
    ],
})
export class CustomMatInputSelectComponent implements FormControlComponent {
    @Input()
    public formControlInput!: FormControl;

    @Input()
    placeholder = '';

    @Input()
   options?: any[] | undefined; 
}
