import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {RestService} from "./rest.service";
import {DialogModule} from 'primeng/dialog';
import {
  Appointment,
  AppointmentStatus,
  AppointmentStatuses,
  AppointmentStatusToColorMapping,
  AppointmentSteps, ItemBase
} from "./models";
import {FullCalendarComponent} from "@fullcalendar/angular";
import {CalendarComponent} from "./calendar.component";

@Component({
  selector: 'med-filter',
  styles: [`
    :host ::ng-deep .p-dropdown-panel.doctors-dropdown-panel {
    }
    :host ::ng-deep .status-button {
    }
    :host ::ng-deep .horizontal-holder {
      overflow: scroll;
      width: 100%;
      text-align: left;
      white-space: nowrap;
      padding: 2px;
    }
  `],
  template: `
    <div style="height: 100%;">
      <div class="horizontal-holder">
        <span class="p-buttonset">
          <button [style]="{'background-color': item.color, 'opacity': item.selected? 0.33: 1}" class="status-button"
                  *ngFor="let item of itsMenuItems; index as i;" pButton type="button" [label]="item.name"
                  [icon]="item.selected? 'pi pi-times': ''" iconPos="right" (click)="onClick(item)"></button>
        </span>
      </div>
      <div class="horizontal-holder">
        <p-multiSelect [options]="doctors" [(ngModel)]="selectedDoctors" optionLabel="name"
                       [filter]="true" appendTo="body" filterBy="name"(onChange)="onChange($event, 0)"
                       display="chip" filterPlaceHolder="Filter.." placeholder="Doctors"></p-multiSelect>
        &nbsp;
        <p-multiSelect [options]="reps" optionLabel="name"
                       [filter]="true" appendTo="body" filterBy="name"(onChange)="onChange($event, 1)"
                       display="chip" filterPlaceHolder="Filter.." placeholder="Representatives"></p-multiSelect>
        &nbsp;
        <p-multiSelect [options]="setters" optionLabel="name"
                       [filter]="true" appendTo="body" filterBy="name"(onChange)="onChange($event, 2)"
                       display="chip" filterPlaceHolder="Filter.." placeholder="Setters"></p-multiSelect>
        &nbsp;
        <p-multiSelect [options]="labs" optionLabel="name"
                       [filter]="true" appendTo="body" filterBy="name"(onChange)="onChange($event, 3)"
                       display="chip" filterPlaceHolder="Filter.." placeholder="Labs"></p-multiSelect>
        &nbsp;
        <p-multiSelect [options]="cities" optionLabel="name"
                       [filter]="true" appendTo="body" filterBy="name"(onChange)="onChange($event, 4)"
                       display="chip" filterPlaceHolder="Filter.." placeholder="Cities"></p-multiSelect>
        &nbsp;
        <p-multiSelect [options]="states" optionLabel="name"
                       [filter]="true" appendTo="body" filterBy="name"(onChange)="onChange($event, 5)"
                       display="chip" filterPlaceHolder="Filter.." placeholder="States"></p-multiSelect>
      </div>
      <div class="horizontal-holder">
        <p-calendar #datesSelector appendTo="body" [(ngModel)]="rangeDates" selectionMode="range" [readonlyInput]="true"
                    placeholder="Dates (From - To)" inputId="range" [showButtonBar]="true"
                    (onSelect)="onDatesSelect()" (onClearClick)="onDatesSelect()">
        </p-calendar>
      </div>
    </div>
  `,
})
export class FilterComponent implements OnInit {
  @ViewChild('datesSelector')
  datesSelector?: CalendarComponent;

  @Input()
  menuItems: AppointmentStatus[] = [];

  itsMenuItems: AppointmentStatus[] = [];

  doctors: ItemBase[] = [];
  reps: ItemBase[] = [];
  setters: ItemBase[] = [];
  labs: ItemBase[] = [];
  cities: ItemBase[] = [];
  states: ItemBase[] = [];
  // @ts-ignore
  rangeDates: Date[];
  selectedDoctors?: ItemBase[];
  @Output()
  updatedStatuses = new EventEmitter<AppointmentStatus[]>();
  constructor(private restService: RestService) {}

  async ngOnInit() {
    this.itsMenuItems = this.menuItems.map(a => ({...a}));
    this.doctors = await this.restService.getDoctors();
    this.reps = await this.restService.getRepresentatives();
    this.setters = await this.restService.getSetters();
    this.labs = await this.restService.getLabs();
    this.cities = await this.restService.getCities();
    this.states = await this.restService.getStates();
  }
  onClick(item: any) {
    item.selected = !item.selected;
    this.updateStatuses();
  }
  onChange({originalEvent, value}: any, index: number = 0) {
    if (!value) this.updateFilter([]);
    else this.updateFilter(value, index);
  }
  onDatesSelect() {
    // @ts-ignore
    if (this.rangeDates === null) this.datesSelector?.toggle(); // clear button was hit
    const dates = this.rangeDates === null ? [] : this.rangeDates?.filter(date => !!date);
    if (!dates || (dates.length !== 0 && dates.length !== 2)) return;
    this.restService.updateData({dates});
    // @ts-ignore
    this.datesSelector?.toggle();
  }
  private updateStatuses() {
    this.updatedStatuses.emit(this.itsMenuItems.filter(item => item.selected));
  }
  private updateFilter(items: ItemBase[], index: number = 0) {
    switch (index) {
      case 0: {
        this.restService.updateData({doctors: items})
        break;
      }
      case 1: {
        this.restService.updateData({representatives: items})
        break;
      }
      case 2: {
        this.restService.updateData({setters: items})
        break;
      }
      case 3: {
        this.restService.updateData({labs: items})
        break;
      }
      case 4: {
        this.restService.updateData({cities: items})
        break;
      }
      case 5: {
        this.restService.updateData({states: items})
        break;
      }
    }
  }
}
