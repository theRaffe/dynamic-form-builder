import { Injectable } from "@angular/core";
import { ComponentTypeEnum, typeInput } from "@form-builder/models";
// import { InputTextComponent} from '../components/input-text/input-text.component';
///import {} from "../../../shared/src/components"

@Injectable({providedIn: "root"})
export class ConfigComponentService {
    private resultTypeDict: Partial<Record<ComponentTypeEnum, any>> = {};


    async getComponentTypes(componentTypes: typeInput[]) {
        // const dictionary: { [key: ComponentTypeEnum]: any } = {};
        const componentTypeDict: Record<ComponentTypeEnum, { type:string, className:string }> = {
            [ComponentTypeEnum.Container]: { type: 'input-text', className: 'InputTextComponent' },
            [ComponentTypeEnum.InputDate]: { type: 'input-date', className: 'InputDateComponent' },
            [ComponentTypeEnum.InputNumber]: { type: 'input-number', className: 'InputNumberComponent' },
            [ComponentTypeEnum.InputRadio]: { type: 'input-radio', className: 'InputRadioComponent' },
            [ComponentTypeEnum.InputSelect]: { type: 'input-select', className: 'InputSelectComponent' },
            [ComponentTypeEnum.InputText]: { type: 'input-text', className: 'InputTextComponent' },
            [ComponentTypeEnum.MatInputText]: { type: 'custom-mat-input-text', className: 'CustomMatInputTextComponent' },
            [ComponentTypeEnum.MatInputSelect]: { type: 'custom-mat-input-select', className: 'CustomMatInputSelectComponent' },
            [ComponentTypeEnum.MatInputMulticheck]: { type: 'custom-mat-input-select', className: 'CustomMatInputSelectComponent' },
            [ComponentTypeEnum.MatInputRadio]: { type: 'custom-mat-input-radio', className: 'CustomMatInputRadioComponent' }

        };

        
        for(const inputType of componentTypes) {
            if (!this.resultTypeDict[inputType]) {
                const type = componentTypeDict[inputType].type;
                const className = componentTypeDict[inputType].className;
                const lazyContentComponent = await import(`../../../shared/src/components/${type}/${type}.component`);

                const componentClassName = lazyContentComponent[className];
                this.resultTypeDict[inputType] = componentClassName;
            }
        }

        return this.resultTypeDict;
    }
}