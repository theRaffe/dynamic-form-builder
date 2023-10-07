import { Component, Input, OnInit } from '@angular/core';
import {
    FormControl,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
} from '@angular/forms';
import { FormControlComponent } from '@form-builder/models';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgFor, NgIf } from '@angular/common';
import { getErrorMessage } from '../../utilities/index';
import { tap } from 'rxjs';
@Component({
    selector: 'custom-mat-input-text',
    templateUrl: './custom-mat-input-text.component.html',
    styleUrls: ['./custom-mat-input-text.component.scss'],
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        NgIf,
        NgFor,
    ],
})
export class CustomMatInputTextComponent
    implements FormControlComponent, OnInit
{
    
    formGroup?: FormGroup<any> | undefined;
    @Input()
    public formControlInput!: FormControl;

    @Input()
    placeholder = '';

    @Input()
    validations: any;

    public errorMessages:string [] = [];

    getErrorMessage() {
        const messages = getErrorMessage(
            this.formControlInput,
            this.validations
        );
        if (messages.length) {
            return messages.join('\\n');
        }

        return '';
    }

    public ngOnInit(): void {
        this.formControlInput.statusChanges.pipe(
            tap(status => {
                this.errorMessages = [];
                if (status === 'INVALID') {
                    const messages = getErrorMessage(
                        this.formControlInput,
                        this.validations
                    );
                    this.errorMessages = messages;
                }
            })
        ).subscribe();
    }
}
