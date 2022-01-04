import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MedCalendarModule } from "./calendar.module";
import {TabMenuModule} from "primeng/tabmenu";
import {TabViewModule} from "primeng/tabview";
import {HomePageComponent} from "./home-page.component";
import {AppRouterModule} from "./app-router.module";
import {RouterModule} from "@angular/router";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AppointmentNewComponent} from "./appointment-new.component";
import {TableComponent} from "./table.component";
import {TableModule} from "primeng/table";
import {DropdownModule} from "primeng/dropdown";
import {MultiSelectModule} from "primeng/multiselect";
import {SidebarModule} from "primeng/sidebar";
import {ToggleButtonModule} from "primeng/togglebutton";
import { FormsModule } from '@angular/forms';
import {FilterComponent} from "./filter.component";
import {ButtonModule} from 'primeng/button';
import {CalendarModule} from "primeng/calendar";
@NgModule({
  declarations: [
    AppComponent, HomePageComponent, AppointmentNewComponent, TableComponent, FilterComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    MedCalendarModule,
    TabMenuModule,
    TabViewModule,
    RouterModule,
    AppRouterModule,
    BrowserAnimationsModule,
    TableModule,
    DropdownModule,
    MultiSelectModule,
    SidebarModule,
    ToggleButtonModule,
    ButtonModule,
    CalendarModule,
  ],
  providers: [],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
