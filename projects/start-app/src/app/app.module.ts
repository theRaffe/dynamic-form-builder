import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FormContainerModule } from '@form-builder/shared';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormContainerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
