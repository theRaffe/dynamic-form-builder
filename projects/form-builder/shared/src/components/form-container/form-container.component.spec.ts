import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormContainerComponent } from './form-container.component';
import {
    FormBuilderService,
    InputControlBuilderService,
} from '@form-builder/services';
import { InputStructure } from '@form-builder/models';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const testInputs2Tab: InputStructure[] = [
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
        ],
    },
    {
        name: 'step2',
        title: 'Step 2',
        type: 'container',
        children: [
            {
                name: 'title',
                title: 'Title',
                type: 'text',
                validations: {
                    required: true,
                },
            },
            {
                name: 'age',
                title: 'Age',
                type: 'text',
                validations: {
                    required: true,
                },
            },
        ],
    },
]; 

describe('suite tests of FormContainer', () => {
    let component: FormContainerComponent;
    let fixture: ComponentFixture<FormContainerComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [FormContainerComponent],
            providers: [InputControlBuilderService, FormBuilderService],
            imports: [BrowserAnimationsModule, MatTabsModule],
        }).compileComponents();

        fixture = TestBed.createComponent(FormContainerComponent);
        component = fixture.componentInstance;
        // fixture.detectChanges();
    });

    it('Check rendering of a form with one tab', () => {
        expect(component).toBeTruthy();
        const inputs: InputStructure[] = [
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
                ],
            },
        ];
        component.initalizeForm(inputs);
        fixture.detectChanges();
        // console.log('====dynamicContainers:', component.dynamicContainers?.length);
        expect(component.dynamicContainers?.length).toEqual(2);
        expect(component.allTabs.length).toEqual(1);
    });

    it('Check rendering of a form with two tabs', () => {
        expect(component).toBeTruthy();
        
        component.initalizeForm(testInputs2Tab);
        fixture.detectChanges();
        expect(component.allTabs.length).toEqual(2);

        expect(component.dynamicContainers?.length).toEqual(4);
    });

    it('should execute formGroupOutput', () => {
        spyOn(component.formGroupOutput, 'emit');
        component.initalizeForm(testInputs2Tab);
        fixture.detectChanges();

        // component.ngAfterViewInit();
        expect(component.formGroupOutput.emit).toHaveBeenCalled();
    });
});
