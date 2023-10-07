import { NgFor, NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {
    FormControl,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControlComponent, ValidationInput } from '@form-builder/models';
import { getErrorMessageInput$ } from '../../utilities/index';
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
    validations: ValidationInput | undefined;

    public errorMessages: string[] = [];

    public ngOnInit(): void {
        getErrorMessageInput$(this.formControlInput, this.validations)
            .pipe(tap((errors) => (this.errorMessages = errors)))
            .subscribe();
    }
}
