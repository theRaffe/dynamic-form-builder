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
import { FormGroupOutput, InputStructure } from '@form-builder/models';
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
    public inputs: InputStructure[] = [];

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

    ngOnChanges(changes: SimpleChanges): void {
        if (!!changes['inputs'].currentValue) {
            this.initalizeForm(this.inputs);
        }
    }

    public ngAfterViewInit(): void {
        this.dynamicContainers?.changes
            .pipe(
                tap((containers: QueryList<ViewContainerRef>) => {
                    console.log({ containers });
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
        } else {
            this.allTabs = allTabs;
        }

        this.allInputFormControl = this.allTabs.flatMap((tab) => tab.inputs);
    }
}
