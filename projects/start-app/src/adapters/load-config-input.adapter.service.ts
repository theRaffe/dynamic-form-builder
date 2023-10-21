import { Observable } from "rxjs";
import { LoadConfigService } from "../services/load-config-inputs.service";
import { FormInputConfig } from "@form-builder/models";
import { Injectable } from "@angular/core";

export interface ILoadConfigInput {
    getInputsConfiguration(): Observable<any>;
}

@Injectable({ providedIn: "root"})
export class LoadConfigInputAdapter implements ILoadConfigInput {
    constructor(
        private readonly _loadConfiInputService: LoadConfigService,
    ){ }

    /**
     * Execute API to get the control inputs to build a form group
     *
     * @returns object with form input configuration and other object with object that represents the output object to submit
     */
    public getInputsConfiguration(): Observable<FormInputConfig> {
        return this._loadConfiInputService.getInputsConfiguration();
    }

}