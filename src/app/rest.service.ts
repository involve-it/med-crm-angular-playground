import { Injectable } from '@angular/core';
import appointments from '../../parser/data/appointments.json';
import {Appointment, AppointmentsFilter} from "./models";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
// let's mock server call for now, importing data from hard-coded files:
export class RestService {
  filter: BehaviorSubject<AppointmentsFilter> = new BehaviorSubject<AppointmentsFilter>({ statuses: [] });
  constructor() {
    // @ts-ignore (debug only):
    window.appointments = appointments;
  }

  // @ts-ignore
  async getAppointments(): Promise<Appointment[]> {
    const statuses = this.filter.value.statuses;
    // @ts-ignore
    if (statuses.length < 1) return appointments;
    const ret = appointments.filter(item => this.filter.value.statuses.find(item1 => item1.selected && item1.name === item.status));
    // @ts-ignore
    return ret;
  }

  async getStatuses() {
    const statusesExtended = [...new Set(appointments.map(app => app.status)), 'Scheduled', 'Rescheduled']
      .map(item => ({ name: item, value: item }));
    if (this.filter.value.statuses.length < 1)
      return statusesExtended;
    return statusesExtended.filter(item => this.filter.value.statuses.find(item1 => item1.selected && item1.name === item.name))
  }
  async getRepresentatives() {
    return [...new Set(appointments.map(app => app.rep))].map(item => ({ name: item, value: item }));
  }
  async getDoctors() {
    return [...new Set(appointments.map(app => app.doctor))].map(item => ({ name: item, value: item }));
  }
  updateData(filters: AppointmentsFilter) {
    this.filter.next({...this.filter, ...filters});
  }
}

