/**
 * Valid type of input controls
 */
export type typeInput =
    | 'text'
    | 'date'
    | 'number'
    | 'select'
    | 'container'
    | 'mat-input-text'
    | 'mat-input-select'
    | 'mat-input-multicheck'
    | 'mat-input-radio';
export interface validationRequired {
    required: boolean;
}

export interface validationRange {
    min: number;
    max: number;
}


export interface ValidationInput {
    required?: boolean;
    range?: validationRange;
    email?: boolean;
    minLength?: number;
    maxLength?: number;
}

/**
 * Model of input control
 */
export interface InputStructure {
    name: string;
    type: typeInput;
    title: string;
    disabled?: boolean;
    children?: InputStructure[];
    options?: any[];
    validations?: ValidationInput;
}

/**
 * Configuration of input controls and output result
 *
 * @inputStructure definition of each input control
 * @outputConfig definition of output object(JSON) 
 */
export interface FormInputConfig {
    inputStructure: InputStructure[];
    outputConfig: any
}
