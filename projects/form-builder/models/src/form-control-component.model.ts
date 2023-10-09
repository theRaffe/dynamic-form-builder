import { AbstractControl, FormGroup } from "@angular/forms";
import { ValidationInput } from "./input-structure.model";

/**
 * Interface of Form Control Input Component
 */
export interface FormControlComponent {
    formGroup?: FormGroup;
    /**
     * formControl of a formGroup
     */
    formControlInput: AbstractControl | null;
    /**
     * text used as placeholder of input text
     */
    placeholder: string;
    /**
     * object that contains validations(optional)
     * * required
     * * max, set maximun value for numeric type
     * * min, set minimum value for numeric type
     * * minlength, set minimum number of characters for string inputs
     * * maxlength, set maximum number of characters for string inputs
     * * email, validate input string with email format
     */
    validations?: ValidationInput;
}

/**
 * Interface for select components
 */
export interface FormControlSelectComponent extends FormControlComponent {
    /**
     * list of options to show in the component
     */
    options: any[];
    /**
     * flag to select multiple options
     */
    isMultiple?: boolean;
}
