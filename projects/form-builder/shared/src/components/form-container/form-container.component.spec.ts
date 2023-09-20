import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormContainerComponent } from './form-container.component';
import { FormBuilderService, InputControlBuilderService } from '@form-builder/services';
import { InputStructure } from '@form-builder/models';

describe('suite tests of FormContainer', () => {
  let component: FormContainerComponent;
  let fixture: ComponentFixture<FormContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormContainerComponent ],
      providers: [
        InputControlBuilderService,
        FormBuilderService,
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
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
            ]
        }
        
    ];
    component.initalizeForm(inputs);
    fixture.detectChanges();
    // console.log('====dynamicContainers:', component.dynamicContainers?.length);
    expect(component.allTabs.length).toEqual(1);
  });
});
