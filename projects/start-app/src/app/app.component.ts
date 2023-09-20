import { Component, OnInit } from '@angular/core';
import { InputStructure } from '@form-builder/models';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
    public initialInputs!: InputStructure[];
    
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
            }
            
        ];
    }

    title = 'start-app';
    public initialInput: InputStructure = {
        name: 'nickname',
        title: 'Nickname',
        type: 'text',
    };

}