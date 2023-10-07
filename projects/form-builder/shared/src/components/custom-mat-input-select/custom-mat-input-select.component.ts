import { NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormControlSelectComponent, ValidationInput } from '@form-builder/models';
import { tap } from 'rxjs';
import { getErrorMessageInput$ } from '../../utilities';

@Component({
    selector: 'custom-mat-input-text',
    templateUrl: './custom-mat-input-select.component.html',
    styleUrls: ['./custom-mat-input-select.component.scss'],
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        NgFor,
        NgIf,
    ],
})
export class CustomMatInputSelectComponent implements FormControlSelectComponent {
    formGroup?: FormGroup<any> | undefined;
    @Input()
    public formControlInput!: FormControl;

    @Input()
    placeholder = '';

    @Input()
    options!: any[];

    @Input()
    isMultiple!: boolean;

    @Input()
    validations: ValidationInput | undefined;

    public errorMessages: string[] = [];

    public ngOnInit(): void {
        getErrorMessageInput$(this.formControlInput, this.validations)
            .pipe(tap((errors) => (this.errorMessages = errors)))
            .subscribe();
    }
}
