import { ComponentRef } from "@angular/core";
import { FormGroup } from "@angular/forms";

/**
 * Dictionary of ComponentRef, this has pair of name of formField input with its ComponentRef
 */
export type ComponentRefDictType = { [index: string]: ComponentRef<any> };

/**
 * Object represents a formGroup and a dictionary of components @ComponentRefDictType
 */
export interface FormGroupOutput {
    formGroup: FormGroup;
    componentRefDict: ComponentRefDictType;
    getOutputFromForm: () => any;
}