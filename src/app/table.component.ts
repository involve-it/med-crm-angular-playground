import {Component, OnInit, ViewChild} from '@angular/core';
import {RestService} from "./rest.service";
import {Appointment, AppointmentStatusToColorMapping} from "./models";
import {FullCalendarComponent} from "@fullcalendar/angular";
import {Table} from "primeng/table";

@Component({
  selector: 'med-table',
  template: `
    <div class="card">
      <h5>Filter Menu</h5>
      <p>Filters are displayed in an overlay.</p>
      <p-table #dt1 [value]="appointments" dataKey="id"
               [rows]="10" [showCurrentPageReport]="true" [rowsPerPageOptions]="[10,25,50]" [loading]="loading"
               styleClass="p-datatable-gridlines"
               [paginator]="true" currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
               [globalFilterFields]="['name','country.name','representative.name','status']">
        <ng-template pTemplate="caption">
          <div class="p-d-flex">
            <button pButton label="Clear" class="p-button-outlined" icon="pi pi-filter-slash"
                    (click)="clear(dt1)"></button>
            <span class="p-input-icon-left p-ml-auto">
                    <i class="pi pi-search"></i>
              <!--                    <input pInputText type="text" (input)="dt1.filterGlobal($event.target.value, 'contains')" placeholder="Search keyword" />-->
                </span>
          </div>
        </ng-template>
        <ng-template pTemplate="header">
          <tr>
            <th>
              <div class="p-d-flex p-jc-between p-ai-center">
                Status
                <!--<p-columnFilter field="status" matchMode="in" display="menu" [showMatchModes]="false"
                                [showOperator]="false" [showAddButton]="false">
                  <ng-template pTemplate="filter" let-value let-filter="filterCallback">
                    <p-multiSelect [options]="statuses" optionLabel="name"  optionValue="value" placeholder="Any" (onChange)="filter($event.value)" display="chip"></p-multiSelect>
                  </ng-template>
                </p-columnFilter>-->
              </div>
            </th>
            <th>
              <div class="p-d-flex p-jc-between p-ai-center">
                Month Set
                <p-columnFilter type="text" field="name" display="menu"></p-columnFilter>
              </div>
            </th>
            <th>
              <div class="p-d-flex p-jc-between p-ai-center">
                Date
<!--                <p-columnFilter type="date" field="date" display="menu"></p-columnFilter>-->
              </div>
            </th>
            <th>
              <div class="p-d-flex p-jc-between p-ai-center">
                Doctor
                <p-columnFilter field="doctor" matchMode="in" display="menu" [showMatchModes]="false"
                                [showOperator]="false" [showAddButton]="false">
                  <ng-template pTemplate="filter" let-value let-filter="filterCallback">
                    <p-multiSelect [options]="doctors" optionLabel="name"  optionValue="value" placeholder="Any" (onChange)="filter($event.value)" display="chip">
                      <!--<ng-template let-option pTemplate="item">
                        <div class="p-multiselect-representative-option">
                          &lt;!&ndash;                          <img [alt]="option.label" src="assets/showcase/images/demo/avatar/{{option.image}}" width="32" style="vertical-align: middle" />&ndash;&gt;
                          <span class="p-ml-1">{{option}}</span>
                        </div>
                      </ng-template>-->
                    </p-multiSelect>
                  </ng-template>
                </p-columnFilter>
              </div>
            </th>
            <th>
              <div class="p-d-flex p-jc-between p-ai-center">
                Representative
                <p-columnFilter field="rep" matchMode="in" display="menu" [showMatchModes]="false"
                                [showOperator]="false" [showAddButton]="false">
                  <ng-template pTemplate="header">
                    <div class="p-px-3 p-pt-3 p-pb-0">
<!--                      <span class="p-text-bold">Agent Picker</span>-->
                    </div>
                  </ng-template>
                  <ng-template pTemplate="filter" let-value let-filter="filterCallback">
                    <p-multiSelect [options]="representatives" optionLabel="name"  optionValue="value" placeholder="Any" (onChange)="filter($event.value)" display="chip">
                    </p-multiSelect>
                    <!--<p-multiSelect [options]="representatives" placeholder="Any" (onChange)="filter($event.value)">
                      <ng-template let-option pTemplate="item">
                        <div class="p-multiselect-representative-option">
                          <img [alt]="option.label" src="assets/showcase/images/demo/avatar/{{option.image}}" width="32" style="vertical-align: middle" />
                          <span class="p-ml-1">{{option}}</span>
                        </div>
                      </ng-template>
                    </p-multiSelect>-->
                  </ng-template>
                </p-columnFilter>
              </div>
            </th>
          </tr>
        </ng-template>
        <ng-template pTemplate="body" let-appointment>
          <tr [ngStyle]="{'background-color': rowBgColor(appointment.status)}">
            <td [ngStyle]="{'border-left-width':'4px', 'border-left-color': statusColor(appointment.status)}">
              {{appointment.status}}
            </td>
            <td>
              <span>{{appointment.month}}</span>
            </td>
            <td>
              {{appointment.date}}
            </td>
            <td>
              {{appointment.doctor}}
            </td>
            <td>
              {{appointment.rep}}
            </td>
          </tr>
        </ng-template>
        <ng-template pTemplate="emptymessage">
          <tr>
            <td colspan="7">No appointments found.</td>
          </tr>
        </ng-template>
      </p-table>
    </div>
  `
})
export class TableComponent implements OnInit {

  appointments: Appointment[] = [];

  statuses: { value: string, name: string }[] = [];

  representatives: { value: string, name: string }[] = [];

  doctors: { value: string, name: string }[] = [];

  selectedStatuses = [];

  loading: boolean = true;

  activityValues: number[] = [0, 100];

  constructor(private restService: RestService) {
  }

  async ngOnInit() {
    // subscribe to global filter changes:
    this.restService.filter.subscribe(async () => {
      this.appointments = await this.restService.getAppointments();
      this.representatives = await this.restService.getRepresentatives();
      this.doctors = await this.restService.getDoctors();
      this.statuses = await this.restService.getStatuses();
      this.loading = false;
    });
  }
  rowBgColor(status: string) {
    if (status && (status === 'Rep Cancelled' || status === 'Not Interested'
      || status === 'Doctor Cancelled'|| status === 'Not Qualified')) return '#ffd8d8';
    else return 'inherited';
  }
  statusColor(status: string) {
    if (!status) return 'inherited';
    return AppointmentStatusToColorMapping.find(map => map.name === status)?.color;
  }
  clear(table: Table) {
    table.clear();
  }
}
