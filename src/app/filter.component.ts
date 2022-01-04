import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {RestService} from "./rest.service";
import {DialogModule} from 'primeng/dialog';
import {
  Appointment,
  AppointmentStatus,
  AppointmentStatuses,
  AppointmentStatusToColorMapping,
  AppointmentSteps
} from "./models";
import {FullCalendarComponent} from "@fullcalendar/angular";

@Component({
  selector: 'med-filter',
  styles: [`
    :host ::ng-deep .status-button {

    }
  `],
  template: `
    <div>
      <span class="p-buttonset">
        <button [style]="{'background-color': item.color, 'opacity': item.selected? 0.33: 1}" class="status-button"
                *ngFor="let item of itsMenuItems; index as i;" pButton type="button" [label]="item.name"
                [icon]="item.selected? 'pi pi-times': ''" iconPos="right" (click)="onClick(item)"></button>
      </span>
    </div>

  `,
})
export class FilterComponent implements OnInit {
  @Input()
  menuItems: AppointmentStatus[] = [];

  itsMenuItems: AppointmentStatus[] = [];

  @Output()
  updatedStatuses = new EventEmitter<AppointmentStatus[]>();
  // menuItems = [...AppointmentStatusToColorMapping].map(item => ({...item, selected: false}));
  constructor() {}

  ngOnInit(): void {
    this.itsMenuItems = this.menuItems.map(a => ({...a}));
  }
  onClick(item: any) {
    item.selected = !item.selected;
    this.updateStatuses();
  }
  private updateStatuses() {
    this.updatedStatuses.emit(this.itsMenuItems.filter(item => item.selected));
  }
}
