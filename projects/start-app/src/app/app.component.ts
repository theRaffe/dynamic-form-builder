import { Component } from '@angular/core';
import { InputStructure } from '@form-builder/models';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent {
    title = 'start-app';
    public initialInput: InputStructure = {
        name: 'nickname',
        required: true,
        title: 'Nickname',
        type: 'text',
    };
}
