import {
    AfterViewInit,
    Component,
    Input,
    OnChanges,
    QueryList,
    SimpleChanges,
    ViewChildren,
    ViewContainerRef,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InputStructure } from '@form-builder/models';
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
export class FormContainerComponent implements AfterViewInit, OnChanges {
    public allContainers: InputStructure[] = [];
    public allTabs: TabContainer[] = [];
    private _formGroup!: FormGroup;

    @ViewChildren('dynamic', { read: ViewContainerRef })
    dynamicContainers: QueryList<ViewContainerRef> | undefined;

    @Input()
    public inputs: InputStructure[] = [];

    constructor(
        private readonly formBuilderService: FormBuilderService,
        private readonly inputControlBuilderService: InputControlBuilderService
    ) {}

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
                    // containers.map((vcr: ViewContainerRef, index: number) => {
                    //     vcr.clear();
                    //     const inputs = this.allTabs[index].inputs;
                    //     console.log('execute component:', index);
                    //     this.inputControlBuilderService.buildControls(
                    //         inputs,
                    //         vcr,
                    //         this._formGroup
                    //     );
                    // });
                    this.renderFormControlComponents(containers);
                })
            )
            .subscribe();
        console.log({ dynamicContainers: this.dynamicContainers });
        if (!!this.dynamicContainers) {
            this.renderFormControlComponents(this.dynamicContainers);
        }
    }

    private renderFormControlComponents(
        containers: QueryList<ViewContainerRef>
    ): void {
        containers.map((vcr: ViewContainerRef, index: number) => {
            vcr.clear();
            const inputs = this.allTabs[index].inputs;
            console.log('execute component:', index);
            this.inputControlBuilderService.buildControls(
                inputs,
                vcr,
                this._formGroup
            );
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
    }
}
