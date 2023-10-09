import { NgFor } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { FormControlSelectComponent, ValidationInput } from '@form-builder/models';
import { tap } from 'rxjs';
import { getErrorMessageInput$ } from '../../utilities';

@Component({
    selector: 'custom-mat-input-text',
    templateUrl: './custom-mat-input-radio.component.html',
    styleUrls: ['./custom-mat-input-radio.component.scss'],
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatRadioModule,
        NgFor,
    ],
})
export class CustomMatInputRadioComponent implements FormControlSelectComponent, OnInit {
    formGroup?: FormGroup<any> | undefined;
    @Input()
    public formControlInput!: FormControl;

    @Input()
    public placeholder = '';

    @Input()
    public options!: any[];

    @Input()
    public isMultiple!: boolean;

    /**
     * object that contains validations(optional)
     * * required
     * * max, set maximun value for numeric type
     * * min, set minimum value for numeric type
     * * minlength, set minimum number of characters for string inputs
     * * maxlength, set maximum number of characters for string inputs
     * * email, validate input string with email format
     */
    @Input()
    public validations: ValidationInput | undefined;

    public errorMessages: string[] = [];

    public ngOnInit(): void {
        getErrorMessageInput$(this.formControlInput, this.validations)
            .pipe(tap((errors) => (this.errorMessages = errors)))
            .subscribe();
    }
}
