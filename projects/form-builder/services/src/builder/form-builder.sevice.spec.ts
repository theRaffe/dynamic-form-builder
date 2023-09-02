import { TestBed } from '@angular/core/testing';

import { FormBuilderService } from './form-builder.service';
import { FormBuilder, Validators } from '@angular/forms';
import { InputStructure } from '@form-builder/models';

describe('FormBuilderService', () => {
    let service: FormBuilderService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [FormBuilder, FormBuilderService],
        });
        service = TestBed.inject(FormBuilderService);
    });

    it('buildForm should return a formGroup with required validation', () => {
        const inputs: InputStructure[] = [
            {
                name: 'nickname',
                title: 'Nickname',
                type: 'text',
                validations: {
                    required: true,
                },
            },
        ];
        const result = service.buildForm(inputs);
        const nicknameControl = result.get('nickname');
        expect(nicknameControl).toBeTruthy();
        expect(nicknameControl?.hasValidator(Validators.required)).toBeTrue();

    });

    it('testing type container with child inputs', () => {
    
        const inputs: InputStructure[] = [
            {
                name: 'tab1',
                title: 'Tab 1',
                type: 'container',
                children: [
                    {
                        name: 'nickname',
                        title: 'Nickname',
                        type: 'text',
                        validations: {
                            required: true,
                        },
                    },
                    {
                        name: 'password',
                        title: 'Password',
                        type: 'text',
                        validations: {
                            required: true,
                        },
                    },
                ]
            },
        ];

        const result = service.buildForm(inputs);

        const nicknameControl = result.get('nickname');
        expect(nicknameControl).toBeTruthy();
        expect(nicknameControl?.hasValidator(Validators.required)).toBeTrue();

        const passwordControl = result.get('password');
        expect(passwordControl).toBeTruthy();
    });
});
