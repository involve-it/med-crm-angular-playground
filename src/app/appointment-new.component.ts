import {Component, Input, OnInit, Output} from '@angular/core';
import {Appointment, AppointmentStatuses, AppointmentSteps} from './models';
import {StepsModule} from 'primeng/steps';
import {MenuItem, MessageService} from 'primeng/api';

@Component({
  selector: 'appointment-new',
  template: `
    <div>
      <ul>
        <li>Status:</li>
        <li>Month: <b></b></li>
        <li>Date: <b></b></li>
        <li>Doctor: <b></b></li>
        <li>Representative: <b></b></li>
        <li>City: <b></b></li>
        <li>State: <b></b></li>
        <li>Phone: <b></b></li>
        <li>Lab: <b></b></li>
        <li>LaunchDate: <b></b></li>
        <li>MonthScheduled: <b></b></li>
        <li>Poc: <b></b></li>
        <li>Setter: <b></b></li>
        <li><i>Notes: Work In Progress!</i></li>
      </ul>
    </div>
  `,
})
export class AppointmentNewComponent implements OnInit {
  @Output() appointment?: Appointment
  constructor() {}
  ngOnInit() {}
}
