import { ComponentRef } from "@angular/core";
import { FormGroup } from "@angular/forms";

export type ComponentRefDictType = { [index: string]: ComponentRef<any> };
export interface FormGroupOutput {
    formGroup: FormGroup;
    componentRefDict: ComponentRefDictType;
}