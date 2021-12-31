import {Component, Input, Output} from '@angular/core';
import {Appointment, AppointmentStatuses, AppointmentSteps} from './models';
import {StepsModule} from 'primeng/steps';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'appointment-details',
  template: `
    <div *ngIf="appointment">
      <ul>
        <li *ngIf="appointment.status">Status: <input />{{appointment.status}}</li>
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
    </div>
  `,
})
export class AppointmentNewComponent {
  @Output() appointment?: Appointment
}
