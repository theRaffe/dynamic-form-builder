import { AbstractControl, FormGroup } from "@angular/forms";
import { ValidationInput } from "./input-structure.model";

export interface FormControlComponent {
    formGroup?: FormGroup;
    formControlInput: AbstractControl | null;
    placeholder: string;
    validations?: ValidationInput;
}

export interface FormControlSelectComponent extends FormControlComponent {
    options: any[];
    isMultiple?: boolean;
}
