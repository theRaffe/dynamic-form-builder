import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormControlComponent } from '@form-builder/models';

@Component({
    selector: 'form-input-text',
    templateUrl: './input-text.component.html',
    styleUrls: ['./input-text.component.css'],
})
export class InputTextComponent implements FormControlComponent {
    
    // @Input()
    // public formGroup!: FormGroup;
    
    @Input()
    public formControlInput!: FormControl;

    @Input()
    placeholder = '';
    
}
