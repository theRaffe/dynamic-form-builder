import { Injectable } from "@angular/core";
import { UserService } from "../services/user.service";
import { Observable } from "rxjs";

export interface IUserAdapterService {
    createNewUser(payload: any): Observable<any>;
}

@Injectable({ providedIn: "root"})
export class UserAdapterService implements IUserAdapterService {
    constructor(
        private readonly userService: UserService,
    ) { }

    /**
     * method of creating new user adapter
     * 
     * @param payload of the user to create
     * @returns Observable of response of created user
     */
    public createNewUser(payload: any): Observable<any> {
        return this.userService.createNewUser(payload);
    }
}