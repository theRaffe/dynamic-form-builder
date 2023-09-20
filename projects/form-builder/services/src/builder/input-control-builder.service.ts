import { ComponentRef, Injectable, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormControlComponent, InputStructure } from '@form-builder/models';
import { ConfigComponentService } from '../config/config-components';

/**
 * Service to create different formControls given a list of `InputStructure`
 */
@Injectable()
export class InputControlBuilderService {
    private componentRefs: ComponentRef<any>[] = [];
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
            const clazzComponent = componentTypes[input.type];
            const newComponentRef = vcr.createComponent(clazzComponent);
            const formControlComponent = <FormControlComponent>(
                newComponentRef.instance
            );
            formControlComponent.formControlInput = formGroup.get(input.name);
            this.componentRefs.push(newComponentRef);
            console.log({newComponentRef});
        }

        return this.componentRefs;
    }

    /**
     * Get only InputStructure items of `container` type
     * @param inputs list of InputStructure
     * @returns a list of InputStructure
     */
    public getContainers(inputs: InputStructure[]): InputStructure[] {
        return inputs.filter((input) => input.type === 'container');
    }

    public initializeFormContainer(inputs: InputStructure[]) {
        const containers = this.getContainers(inputs);
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
}
