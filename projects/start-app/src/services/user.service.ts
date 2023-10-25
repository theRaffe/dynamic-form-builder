import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CREATE_NEW_USER, HOST_ENDPOINT } from '../constants/def-constants';

@Injectable({ providedIn: 'root' })
export class UserService {

    constructor(private readonly httpClient: HttpClient) {}

    /**
     * Execute API Service to create a new user
     *
     * @param payload of the user to create
     * @returns Observable of response of created user
     */
    public createNewUser(payload: any): Observable<any> {
        const endpoint = `${HOST_ENDPOINT}/${CREATE_NEW_USER}`;;
        return this.httpClient.post(endpoint, payload);
    }
}
