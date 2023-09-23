import { Component, Input } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormControlComponent } from '@form-builder/models';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
    selector: 'custom-mat-input-text',
    templateUrl: './custom-mat-input-text.component.html',
    styleUrls: ['./custom-mat-input-text.component.css'],
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule],
})
export class CustomMatInputTextComponent implements FormControlComponent {
    @Input()
    public formControlInput!: FormControl;

    @Input()
    placeholder = '';
}
