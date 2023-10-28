import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
    FormGroupOutput,
    FormInputConfig,
    InputStructure,
} from '@form-builder/models';
import { LoadConfigInputAdapter } from '../adapters/load-config-input.adapter.service';
import { catchError, tap, throwError } from 'rxjs';
import { UserAdapterService } from '../adapters/user.adapter.service';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { FormContainerModule } from '@form-builder/shared';
import { MainSpinnerComponent } from '../components/main-spinner/main-spinner.component';
import { CommonModule } from '@angular/common';
import { LoadingService } from '../services/loading.service';
import { AngularToastifyModule, ToastService } from 'angular-toastify';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: true,
    imports: [
        CommonModule,
        FormContainerModule,
        MatButtonModule,
        HttpClientModule,
        MainSpinnerComponent,
        AngularToastifyModule,
    ],
    providers: [ToastService],
})
export class AppComponent implements OnInit {
    public initialInputs!: InputStructure[];
    public singleFormInputs!: InputStructure[];
    public formGroup1: FormGroup | undefined;
    public formGroup2: FormGroup | undefined;
    public formInputConfig1!: FormInputConfig;
    public formInputConfig2!: FormInputConfig;
    private getOutputFromForm1!: () => any;
    public isLoadingSpinner = false;

    constructor(
        private readonly loadConfigInputAdapter: LoadConfigInputAdapter,
        private readonly userAdapterService: UserAdapterService,
        private readonly loadingService: LoadingService, 
        private readonly _toastService: ToastService
    ) {}

    ngOnInit(): void {
        this.initialInputs = [
            {
                name: 'step1',
                title: 'Step 1',
                type: 'container',
                children: [
                    {
                        name: 'fullName',
                        title: 'Full Name',
                        type: 'mat-input-text',
                        validations: {
                            required: true,
                        },
                    },
                    {
                        name: 'nickname',
                        title: 'Nickname',
                        type: 'mat-input-text',
                        validations: {
                            required: true,
                            email: true,
                            minLength: 8,
                        },
                    },
                ],
            },
            {
                name: 'step2',
                title: 'Step 2',
                type: 'container',
                children: [
                    {
                        name: 'department',
                        title: 'Area de Interes',
                        type: 'mat-input-select',
                        validations: {
                            required: true,
                        },
                        options: [
                            {
                                description: 'Frontend',
                            },
                            {
                                description: 'Backend',
                            },
                            {
                                description: 'Otro',
                            },
                        ],
                    },
                    {
                        name: 'language',
                        title: 'Programing Languages',
                        type: 'mat-input-multicheck',
                        validations: {
                            required: true,
                        },
                        options: [
                            {
                                description: 'Javascript',
                                code: 'Javascript',
                            },
                            {
                                description: 'Python',
                                code: 'Python',
                            },
                            {
                                description: 'Rust',
                                code: 'Rust',
                            },
                            {
                                description: 'Java',
                                code: 'Java',
                            },
                        ],
                    },
                ],
            },
        ];

        this.singleFormInputs = [
            {
                name: 'fullName2',
                title: 'Full Name2',
                type: 'mat-input-text',
                validations: {
                    required: true,
                },
            },
            {
                name: 'nickname2',
                title: 'Nickname2',
                type: 'mat-input-text',
                validations: {
                    required: true,
                },
            },
            {
                name: 'experience',
                title: 'Nivel de experiencia',
                type: 'mat-input-radio',
                validations: {
                    required: true,
                },
                options: [
                    {
                        description: 'Junior',
                    },
                    {
                        description: 'Senior',
                    },
                    {
                        description: 'Architech',
                    },
                ],
            },
        ];

        this.loadingService.loadingSub.pipe().subscribe((loading) => {
            this.isLoadingSpinner = loading;
        });

        this.loadConfigInputAdapter.getInputsConfiguration().pipe(
            this.loadingService.withLoader(),
            tap(formInputConfig => this.formInputConfig1 = formInputConfig )
        ).subscribe();

        this.formInputConfig2 = {
            inputStructure: this.singleFormInputs,
            outputConfig: {},
        };
    }

    title = 'start-app';
    public initialInput: InputStructure = {
        name: 'nickname',
        title: 'Nickname',
        type: 'text',
    };

    public onFormGroupOutput1($event: FormGroupOutput) {
        this.formGroup1 = $event.formGroup;
        this.getOutputFromForm1 = $event.getOutputFromForm;
    }

    public onFormGroupOutput2($event: FormGroupOutput) {
        this.formGroup2 = $event.formGroup;
    }

    public submitForm1() {
        const outputResult = this.getOutputFromForm1();
        console.log({ outputResult });
        this.userAdapterService.createNewUser(outputResult).pipe(
            this.loadingService.withLoader(),
            tap(result => this._toastService.success('User created succefully!')),
            catchError(err => {
                this._toastService.error('An error occurred at creating user.');
                return throwError(() => err);
            })
        ).subscribe();
    }
}
