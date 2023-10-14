import {
    AfterViewInit,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnDestroy,
    Output,
    QueryList,
    SimpleChanges,
    ViewChildren,
    ViewContainerRef,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormGroupOutput, FormInputConfig, InputStructure } from '@form-builder/models';
import {
    FormBuilderService,
    InputControlBuilderService,
} from '@form-builder/services';
import { tap } from 'rxjs';

interface TabContainer {
    title: string;
    idTab: string;
    isActive: boolean;
    inputs: InputStructure[];
}

@Component({
    selector: 'form-container',
    templateUrl: './form-container.component.html',
    styleUrls: ['./form-container.component.css'],
    providers: [
        FormBuilderService,
        InputControlBuilderService,
    ]
})
export class FormContainerComponent
    implements AfterViewInit, OnChanges, OnDestroy
{
    public allContainers: InputStructure[] = [];
    public allTabs: TabContainer[] = [];
    private _formGroup!: FormGroup;

    @ViewChildren('dynamic', { read: ViewContainerRef })
    dynamicContainers: QueryList<ViewContainerRef> | undefined;

    @Input()
    public formInputConfig!: FormInputConfig;

    /**
     * this event notifies when formGroup and components are ready
     */
    @Output()
    public formGroupOutput: EventEmitter<FormGroupOutput> = new EventEmitter();

    public allInputFormControl!: InputStructure[];

    constructor(
        private readonly formBuilderService: FormBuilderService,
        private readonly inputControlBuilderService: InputControlBuilderService
    ) {}

    ngOnDestroy(): void {
        this.inputControlBuilderService.releaseComponents();
    }

    /**
     * Hook cycle to detect changes over inputs
     *
     * @param changes dictionary that contains changes of 'inputs'
     */
    ngOnChanges(changes: SimpleChanges): void {
        if (!!changes['formInputConfig'].currentValue) {
            this.initalizeForm(this.formInputConfig.inputStructure);
        }
    }

    /**
     * hook that is called after Angular has fully initialized,
     * to read all 'dynamic' elements and create input components inside
     */
    public ngAfterViewInit(): void {
        this.dynamicContainers?.changes
            .pipe(
                tap((containers: QueryList<ViewContainerRef>) => {
                    this.renderFormControlComponents(containers);
                })
            )
            .subscribe();

        if (!!this.dynamicContainers) {
            this.renderFormControlComponents(this.dynamicContainers);
        }
    }

    private renderFormControlComponents(
        containers: QueryList<ViewContainerRef>
    ): void {
        containers.map((vcr: ViewContainerRef, index: number) => {
            vcr.clear();
            const input = this.allInputFormControl[index];
            this.inputControlBuilderService.buildControls(
                [input],
                vcr,
                this._formGroup
            );
        });

        this.formGroupOutput.emit({
            componentRefDict: this.inputControlBuilderService.formControlsDict,
            formGroup: this._formGroup,
            getOutputFromForm: this.getOutputFromForm
        });
    }

    public initalizeForm(inputs: InputStructure[]): void {
        this._formGroup = this.formBuilderService.buildForm(inputs);
        this.allTabs = [];
        const allContainers =
            this.inputControlBuilderService.getContainers(inputs);
        const allTabs = allContainers.map((item, index): TabContainer => {
            return {
                title: item.title,
                idTab: item.name,
                isActive: index > 0,
                inputs: item.children || [],
            };
        });
        if (allTabs.length === 0) {
            allTabs.push({
                idTab: 'default-tab',
                title: '',
                inputs: inputs,
                isActive: true,
            });
        } 
        
        this.allTabs = allTabs;
        this.allInputFormControl = this.allTabs.flatMap((tab) => tab.inputs);
    }

    private getOutputFromForm = () => {
        return this.formBuilderService.getOutputFromForm(this._formGroup, this.formInputConfig.outputConfig);
    }
}
