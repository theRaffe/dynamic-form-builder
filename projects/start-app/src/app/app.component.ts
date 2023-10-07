import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormGroupOutput, InputStructure } from '@form-builder/models';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
    public initialInputs!: InputStructure[];
    public singleFormInputs!: InputStructure[];
    public formGroup1: FormGroup | undefined;
    public formGroup2: FormGroup | undefined;
    
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
                        type: 'text',
                        validations: {
                            required: true,
                        },
                    },
                    {
                        name: 'nickname',
                        title: 'Nickname',
                        type: 'text',
                        validations: {
                            required: true,
                        },
                    },
                ]
            },
            {
                name: 'step2',
                title: 'Step 2',
                type: 'container',
                children: [
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
                            email: true,
                            minLength: 8
                        },
                    },
                    {
                        name: 'department',
                        title: 'Area de Interes',
                        type: 'mat-input-select',
                        validations: {
                            required: true,
                        },
                        options: [
                            {
                                description: "Frontend"
                            },
                            {
                                description: "Backend"
                            },
                            {
                                description: "Otro"
                            }
                        ]
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
                                code: 'Javascript'
                            },
                            {
                                description: 'Python',
                                code: 'Python'
                            },
                            {
                                description: 'Rust',
                                code: 'Rust'
                            },
                            {
                                description: 'Java',
                                code: 'Java'
                            },
                        ]
                    },
                ]
            }
            
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
                        description: 'Junior'
                    },
                    {
                        description: 'Senior'
                    },
                    {
                        description: 'Architech'
                    },
                ]
            }
        ]
    }

    title = 'start-app';
    public initialInput: InputStructure = {
        name: 'nickname',
        title: 'Nickname',
        type: 'text',
    };

    public onFormGroupOutput1($event: FormGroupOutput) {
        this.formGroup1 = $event.formGroup;
        // this.formGroup1.invalid
    }

    public onFormGroupOutput2($event: FormGroupOutput) {
        this.formGroup2 = $event.formGroup;
    }
}
