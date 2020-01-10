import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalendarComponent } from './calendar/calendar.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatInputModule, MatButtonModule, MatCheckboxModule, MatAutocompleteModule, MatListModule, MatCardModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from "@angular/material/icon";
import { HttpClientModule } from "@angular/common/http";
import { TestComponent } from './test/test.component';
import { TestOutputComponent } from './test-output/test-output.component';

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    TestComponent,
    TestOutputComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    DragDropModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    MatListModule,
    MatCardModule,
    MatIconModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
