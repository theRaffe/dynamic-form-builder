import { ComponentRef, Injectable, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
    ComponentRefDictType,
    ComponentTypeEnum,
    FormControlComponent,
    FormControlSelectComponent,
    InputStructure,
    typeInput,
} from '@form-builder/models';
import { ConfigComponentService } from '../config/config-components.service';

/**
 * Service to create different formControls given a list of `InputStructure`
 */
@Injectable()
export class InputControlBuilderService {
    private componentRefs: ComponentRef<any>[] = [];
    private componentRefsDict: ComponentRefDictType = {};

    public get formControlsDict() {
        return { ...this.componentRefsDict };
    }

    // TODO: create a component that use ViewChildren of ViewContainerRef to get all tab containers
    // see: https://medium.com/@teslenkooleg2017/angular-13-create-multiple-dynamic-components-using-directive-ngfor-effe0850a69d

    constructor(private configComponentService: ConfigComponentService) {}

    /**
     * Add input fields into the correspond view(vcr)
     *
     * @param inputs list of input fields to render
     * @param vcr container object where to render inputs
     * @param formGroup form that contains fields of the inputs
     * @returns
     */
    public async buildControls(
        inputs: InputStructure[],
        vcr: ViewContainerRef,
        formGroup: FormGroup
    ) {
        const allInputType = this.getInputTypes(inputs);
        const inputTypeSet = new Set(allInputType);
        const componentTypes =
            await this.configComponentService.getComponentTypes([
                ...inputTypeSet,
            ]);

        for (const input of inputs) {
            if (!this.componentRefsDict[input.name]) {
                const clazzComponent = componentTypes[input.type];
                const newComponentRef = vcr.createComponent(clazzComponent);
                const formControlComponent = <FormControlComponent>(
                    newComponentRef.instance
                );
                formControlComponent.formControlInput = formGroup.get(
                    input.name
                );
                formControlComponent.placeholder = input.title;
                if (this.isInputSelect(input.type as ComponentTypeEnum)) {
                    const controlInputSelect = formControlComponent as FormControlSelectComponent;
                    controlInputSelect.options = input.options ?? [];
                    if (input.type === 'mat-input-multicheck') {
                        controlInputSelect.isMultiple = true;
                    }
                }
                this.componentRefs.push(newComponentRef);
                this.componentRefsDict[input.name] = newComponentRef;
            } else {
                console.warn(
                    `Already exists a form control with name ${input.name}`
                );
            }
        }

        return this.componentRefs;
    }

    /**
     * Determine if type is an input select
     * 
     * @param type to evaluate
     * @returns true if param type is an input select
     */
    private isInputSelect(type: ComponentTypeEnum) {
        const list = [ComponentTypeEnum.MatInputMulticheck, ComponentTypeEnum.MatInputSelect];
        return list.includes(type);
    }

    /**
     * Get only InputStructure items of `container` type
     * @param inputs list of InputStructure
     * @returns a list of InputStructure
     */
    public getContainers(inputs: InputStructure[]): InputStructure[] {
        return inputs.filter((input) => input.type === 'container');
    }

    private getInputTypes(inputs: InputStructure[]): any[] {
        const result = [];
        for (const input of inputs) {
            if (input.type === 'container' && input.children?.length) {
                return this.getInputTypes(input.children);
            }

            result.push(input.type);
        }

        return result;
    }

    /**
     * method iterates componentRefs dictionary and frees the memory of each ComponentRef to avoid memory leak.
     */
    public releaseComponents():void {
        const allInputName = Object.keys(this.componentRefsDict);
        for(const inputName of allInputName) {
            this.componentRefsDict[inputName].destroy();
        }

        this.componentRefsDict = {};
    }


}
