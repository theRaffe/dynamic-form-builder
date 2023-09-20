import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputControlBuilderService } from './input-control-builder.service';
import { FormControlComponent, InputStructure } from '@form-builder/models';
import { FormBuilder, Validators } from '@angular/forms';
import { InputTextComponent } from '@form-builder/shared';

@Component({
    template: '<ng-template #viewContainer></ng-template>',
})
class TestHostComponent {
    @ViewChild('viewContainer', { read: ViewContainerRef })
    viewContainer!: ViewContainerRef;
}

describe('InputControlBuilderService', () => {
    let fixture: ComponentFixture<TestHostComponent>;
    let service: InputControlBuilderService;
    let formBuilder: FormBuilder;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TestHostComponent],
            providers:[InputControlBuilderService, FormBuilder]
        }).compileComponents();
        fixture = TestBed.createComponent(TestHostComponent);
        service = TestBed.inject(InputControlBuilderService);
        formBuilder = TestBed.inject(FormBuilder);
    });

    it('test create single control at a container', async () => {
        fixture.detectChanges();
        const component = fixture.componentInstance;
        expect(component.viewContainer).toBeTruthy();

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
        const formGroup = formBuilder.group({
            nickname: ['', [Validators.required]],
        })
        const componentRefs = await service.buildControls(inputs, component.viewContainer, formGroup);
        expect(componentRefs.length).toEqual(1);

        expect(componentRefs[0].instance instanceof InputTextComponent).toBeTrue();
    });

    it('test create 2 input text form Control at a container', async () => {
        fixture.detectChanges();
        const component = fixture.componentInstance;
        expect(component.viewContainer).toBeTruthy();

        const inputs: InputStructure[] = [
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
        ];
        const formGroup = formBuilder.group({
            nickname: ['', [Validators.required]],
            fullName: ['', [Validators.required]]
        })
        const componentRefs = await service.buildControls(inputs, component.viewContainer, formGroup);
        expect(componentRefs.length).toEqual(2);

        expect(componentRefs[0].instance instanceof InputTextComponent).toBeTrue();
        expect(componentRefs[1].instance instanceof InputTextComponent).toBeTrue();

        const component1 = componentRefs[0].instance as FormControlComponent;
        const rawValue = component1.formControlInput?.parent?.getRawValue();
        expect(Object.keys(rawValue).indexOf('fullName') > -1).toBeTrue();

        const component2 = componentRefs[1].instance as FormControlComponent;
        const rawValue2 = component2.formControlInput?.parent?.getRawValue();
        expect(Object.keys(rawValue2).indexOf('nickname') > -1).toBeTrue();
    });
});
