import { Injectable } from '@angular/core';
import appointments from '../../parser/data/appointments.json';
import {Appointment, AppointmentsFilter} from "./models";
import {BehaviorSubject} from "rxjs";
import moment from 'moment';

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
    let ret = [...appointments];
    const statusesFilter = this.filter.value.statuses,
      doctorsFilter = this.filter.value.doctors,
      repsFilter = this.filter.value.representatives,
      settersFilter = this.filter.value.setters,
      labsFilter = this.filter.value.labs,
      citiesFilter = this.filter.value.cities,
      statesFilter = this.filter.value.states,
      datesFilter = this.filter.value.dates;

    if (statusesFilter && statusesFilter.length > 0) {
      ret = ret.filter(item => statusesFilter.find(item1 => item1.selected && item1.name === item.status));
    }
    if (doctorsFilter && doctorsFilter.length > 0) {
      ret = ret.filter(item => doctorsFilter.find(item1 => item1.name === item.doctor));
    }
    if (repsFilter && repsFilter.length > 0) {
      ret = ret.filter(item => repsFilter.find(item1 => item1.name === item.representative));
    }
    if (settersFilter && settersFilter.length > 0) {
      ret = ret.filter(item => settersFilter.find(item1 => item1.name === item.setter));
    }
    if (labsFilter && labsFilter.length > 0) {
      ret = ret.filter(item => labsFilter.find(item1 => item1.name === item.lab));
    }
    if (citiesFilter && citiesFilter.length > 0) {
      ret = ret.filter(item => citiesFilter.find(item1 => item1.name === item.city));
    }
    if (statesFilter && statesFilter.length > 0) {
      ret = ret.filter(item => statesFilter.find(item1 => item1.name === item.state));
    }
    if (datesFilter && datesFilter.length === 2) {
      window.moment = moment;
      ret = ret.filter(item =>
        moment(moment(item.date).format('yyyy-MM-DD')).isSameOrAfter(moment(moment(datesFilter[0]).format('yyyy-MM-DD')))
        && moment(moment(item.date).format('yyyy-MM-DD')).isSameOrBefore(moment(moment(datesFilter[1]).format('yyyy-MM-DD'))))
    }
    // @ts-ignore
    return ret;
  }

  async getStatuses() {
    const statusesExtended = [...new Set(appointments.map(app => app.status)), 'Scheduled', 'Rescheduled']
      .map(item => ({ name: item, value: item }));
    const statuses = this.filter.value.statuses;
    if (!statuses || statuses.length < 1) return statusesExtended;
    return statusesExtended.filter(item => statuses.find(item1 => item1.selected && item1.name === item.name))
  }
  async getRepresentatives() {
    return [...new Set(appointments.map(app => app.representative))].map(item => ({ name: item, value: item }));
  }
  async getSetters() {
    return [...new Set(appointments.map(app => app.setter))].map(item => ({ name: item, value: item }));
  }
  async getLabs() {
    return [...new Set(appointments.map(app => app.lab))].map(item => ({ name: item, value: item }));
  }
  async getCities() {
    return [...new Set(appointments.map(app => app.city))].map(item => ({ name: item, value: item }));
  }
  async getStates() {
    return [...new Set(appointments.map(app => app.state))].map(item => ({ name: item, value: item }));
  }
  async getDoctors(unique = true) {
    const doctorsExtended = (unique? [...new Set(appointments.map(app => app.doctor))] : appointments.map(app => app.doctor))
      .map(item => ({ name: item, value: item }));
    const doctorsFilter = this.filter.value.doctors;
    if (!doctorsFilter || doctorsFilter.length < 1) return doctorsExtended;
    return doctorsExtended.filter(item => doctorsFilter.find(item1 => item1.name === item.name));
  }
  updateData(filters: AppointmentsFilter) {
    const newFilter = {...this.filter.getValue(), ...filters};
    this.filter.next(newFilter);
  }
}

