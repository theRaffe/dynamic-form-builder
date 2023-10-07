import { AbstractControl, FormGroup } from "@angular/forms";

export interface FormControlComponent {
    formGroup?: FormGroup;
    formControlInput: AbstractControl | null;
    placeholder: string;
    validations?: any;
}

export interface FormControlSelectComponent extends FormControlComponent {
    options: any[];
    isMultiple?: boolean;
}
