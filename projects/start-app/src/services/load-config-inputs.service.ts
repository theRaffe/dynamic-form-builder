import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormInputConfig } from '@form-builder/models';
import { Observable } from 'rxjs';
import { GET_INPUTS_CONFIG, HOST_ENDPOINT } from '../constants/def-constants';

@Injectable({ providedIn: 'root' })
export class LoadConfigService {
    constructor(private readonly httpClient: HttpClient) {}

    public getInputsConfiguration():Observable<FormInputConfig> {
        const endpoint = `${HOST_ENDPOINT}/${GET_INPUTS_CONFIG}`;
        return this.httpClient.get<FormInputConfig>(endpoint);
    }
}
