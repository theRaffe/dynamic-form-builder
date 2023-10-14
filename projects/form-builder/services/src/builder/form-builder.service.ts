import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InputStructure } from '@form-builder/models';

/**
 * Service to create a formGroup given a list of InputStructure
 */
@Injectable()
export class FormBuilderService {
    constructor(private readonly formBuilder: FormBuilder) {}

    public buildForm(inputs: InputStructure[]): FormGroup {
        const result = this.formBuilder.group(this.buildFormInputs(inputs));

        return result;
    }

    private buildFormInputs(inputs: InputStructure[]): { [k: string]: any } {
        const result: { [k: string]: any } = {};
        for (const input of inputs) {
            if (input.type === 'container' && input.children?.length) {
                const formInputs = this.buildFormInputs(input.children);
                Object.assign(result, formInputs);
            } else {
                const validators = [];
                const inputValidators = input?.validations;
                if (!!inputValidators) {
                    if (inputValidators.required) {
                        validators.push(Validators.required);
                    }

                    if (inputValidators.range?.min !== undefined) {
                        validators.push(
                            Validators.min(inputValidators.range?.min)
                        );
                    }

                    if (inputValidators.range?.max !== undefined) {
                        validators.push(
                            Validators.max(inputValidators.range?.max)
                        );
                    }

                    if (inputValidators.email) {
                        validators.push(Validators.email)
                    }

                    if(inputValidators.minLength !== undefined) {
                        validators.push(
                            Validators.minLength(inputValidators.minLength)
                        );
                    }

                    if(inputValidators.maxLength !== undefined) {
                        validators.push(
                            Validators.maxLength(inputValidators.maxLength)
                        );
                    }
                }
                result[input.name] = [
                    { value: '', disabled: input.disabled },
                    validators,
                ];
            }
        }

        return result;
    }

    /**
     * Get data from formGroup and returning and object according to outputConfig
     *
     * @param formGroup source of the data
     * @param outputConfig output format of the result object
     */
    public getOutputFromForm(formGroup:FormGroup, outputConfig: any) {
        const source = formGroup.getRawValue();
        const tempResult = structuredClone(outputConfig);
        this.fillObjectOutputInner(tempResult, source);

        return tempResult;
    }

    /**
     * Iterate through outputConfig to fill with source data
     *
     * @param tempResult temporal object to fill with result data
     * @param valuesDict source of data(formGroup data)
     */
    private fillObjectOutputInner(tempResult:any, valuesDict:any) {
        const keyValueCode = '<value>';
        const allKeys = Object.getOwnPropertyNames(tempResult);
        
        for(const keyName of allKeys) {
        const hasProperties =Object.getOwnPropertyNames(tempResult[keyName]).length > 0;
        if (tempResult[keyName] === keyValueCode) {
            tempResult[keyName] = valuesDict[keyName];
        } else if (typeof tempResult[keyName] === 'object' && hasProperties) {
            this.fillObjectOutputInner(tempResult[keyName], valuesDict);
        }
        }
    }
}
