import {Component, Input} from '@angular/core';
import {Appointment, AppointmentStatuses, AppointmentSteps} from './models';
import {StepsModule} from 'primeng/steps';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'appointment-details',
  template: `
    <div *ngIf="appointment">
      <ul>
        <li *ngIf="appointment.status">Status: <b>{{appointment.status}}</b></li>
        <li *ngIf="appointment.month">Month: <b>{{appointment.month}}</b></li>
        <li *ngIf="appointment.date">Date: <b>{{appointment.date}}</b></li>
        <li *ngIf="appointment.doctor">Doctor: <b>{{appointment.doctor}}</b></li>
        <li *ngIf="appointment.representative">Representative: <b>{{appointment.representative}}</b></li>
        <li *ngIf="appointment.city">City: <b>{{appointment.city}}</b></li>
        <li *ngIf="appointment.state">State: <b>{{appointment.state}}</b></li>
        <li *ngIf="appointment.phone">Phone: <b>{{appointment.phone}}</b></li>
        <li *ngIf="appointment.lab">Lab: <b>{{appointment.lab}}</b></li>
        <li *ngIf="appointment.launchDate">LaunchDate: <b>{{appointment.launchDate}}</b></li>
        <li *ngIf="appointment.monthScheduled">MonthScheduled: <b>{{appointment.monthScheduled}}</b></li>
        <li *ngIf="appointment.poc">Poc: <b>{{appointment.poc}}</b></li>
        <li *ngIf="appointment.setter">Setter: <b>{{appointment.setter}}</b></li>
        <li *ngIf="appointment.notes"><i>{{appointment.notes}}</i></li>
      </ul>
      <p-steps [model]="items" [readonly]="false" [activeIndex]="activeIndex()"></p-steps>
    </div>
  `,
})
export class AppointmentDetailsComponent {
  @Input() appointment?: Appointment

  items: MenuItem[] = [];

  ngOnInit() { this.items = AppointmentSteps.map(step => ({label: step.name})) }
  activeIndex(): number {
    const status = this.appointment?.status;
    if (status) {
      // @ts-ignore
      const index: number = AppointmentStatuses[status];
      const step = AppointmentSteps.find(step => step.values.indexOf(index) !== -1);
      // @ts-ignore
      return step.index;
    } else {
      return 0
    }
  }
}
