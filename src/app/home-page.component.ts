import {Component, Output, ViewChild} from '@angular/core';
import { RestService } from "./rest.service";
import {TabMenuModule} from 'primeng/tabmenu';
import {MenuItem} from 'primeng/api';
import {FullCalendarComponent} from "@fullcalendar/angular";
import {CalendarComponent} from "./calendar.component";

@Component({
  selector: 'med-home-page',
  template: `
    <p-tabView (onChange)="handleTabChange($event)">
      <p-tabPanel header="Stats">
        <med-chart></med-chart>
      </p-tabPanel>
      <p-tabPanel header="Table">
        <med-table></med-table>
      </p-tabPanel>
      <p-tabPanel header="Calendar">
        <med-calendar #medCalendar></med-calendar>
      </p-tabPanel>
    </p-tabView>
  `
})
export class HomePageComponent {
  @ViewChild('medCalendar')
  medCalendar?: CalendarComponent;
  constructor() {}
  handleTabChange({ originalEvent, index }: any) {
    if (index === 1) {
      setTimeout(() => {
        this.medCalendar?.calendarComponent?.ngAfterViewInit();
      }, 100);
    }
  }
  ngOnInit(): void {}
}
