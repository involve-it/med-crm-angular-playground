import {Component, OnDestroy, OnInit,} from '@angular/core';
import {RestService} from "./rest.service";
import {Appointment, AppointmentStatusToColorMapping, ItemBase} from "./models";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'med-chart',
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
    <div class="grid">
      <div class="col-12 sm:col-12 md:col-6 lg:col-4 xl:col-3"><div class="box bg-gray-100">
          <h4>Statuses</h4>
          <p-chart type="pie" [data]="statuses" [options]="options"></p-chart>
      </div></div>
      <div class="col-12 sm:col-12 md:col-6 lg:col-4 xl:col-3"><div class="box bg-gray-100">
          <h4>Reps</h4>
          <p-chart type="pie" [data]="representatives" [options]="options"></p-chart>
      </div></div>
      <div class="col-12 sm:col-12 md:col-6 lg:col-4 xl:col-3"><div class="box bg-gray-100">
          <h4>Labs</h4>
          <p-chart type="pie" [data]="labs" [options]="options" ></p-chart>
      </div></div>
      <div class="col-12 sm:col-12 md:col-6 lg:col-4 xl:col-3"><div class="box bg-gray-100">
          <h4>Setters</h4>
          <p-chart type="pie" [data]="setters" [options]="options"></p-chart>
      </div></div>
      <div class="col-12 sm:col-12 md:col-12 lg:col-12 xl:col-12"><div class="box bg-gray-100">
          <h4>Months</h4>
          <p-chart type="line" [data]="months" [options]="options"></p-chart>
      </div></div>
    </div>
  `,
})
export class ChartComponent implements OnInit, OnDestroy {
  options: any = {};
  config: any;
  statuses: any;
  representatives: any;
  labs: any;
  setters: any;
  months: any;
  private unsubscribe$: Subject<any> = new Subject<any>();

  constructor(private restService: RestService) {}

  async ngOnInit() {
    this.restService.filter.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(async () => {
      const appointments = await this.restService.getAppointments();
      this.options = this.getOptions(appointments);
      this.statuses = this.getData(appointments, 'status');
      this.representatives = this.getData(appointments, 'representative');
      this.labs = this.getData(appointments, 'lab');
      this.setters = this.getData(appointments, 'setter');
      this.months = this.getData(appointments, 'month');
    });
  }
  ngOnDestroy() {
    this.unsubscribe$.complete();
  }
  getOptions(appointments: Appointment[]) {
    return {}
  }
  getData(appointments: Appointment[], type: string) {
    if (!type) throw 'getData:: type not provided';
    const amount = appointments.reduce((acc: any, cur: any) => {
      if (!acc[cur[type]]) {
        acc[cur[type]] = { count: 1 }
      } else {
        acc[cur[type]].count += 1;
      }
      return acc;
    }, {});

    const colors = (new Array(Object.keys(amount).length)).fill('').map((item) => '#'+(Math.random().toString(16)+'00000').slice(2,8));
    return {
      labels: Object.keys(amount),
      datasets: [
        {
          data: Object.values(amount).map((val: any) => val.count),
          backgroundColor: colors,
          hoverBackgroundColor: colors,
        }
      ]
    };
  }
}
