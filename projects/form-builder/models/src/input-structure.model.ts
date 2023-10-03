
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

export interface InputStructure {
    name: string;
    type: typeInput;
    title: string;
    disabled?: boolean;
    children?: InputStructure[];
    options?: any[];
    validations?: {
        required?: boolean;
        range?: validationRange;
    };
}
