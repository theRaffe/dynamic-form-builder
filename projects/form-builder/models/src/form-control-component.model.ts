import { AbstractControl, FormGroup } from "@angular/forms";

export interface FormControlComponent {
    formGroup?: FormGroup;
    formControlInput: AbstractControl | null;
    placeholder: string;
    options?: any[];
}

