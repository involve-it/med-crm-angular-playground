export interface Appointment {
  status: AppointmentStatuses;
  month: Months;
  date: Date;
  doctor: string;
  representative: string;
  city: string;
  state: string;
  phone: string;
  lab: string;
  launchDate: Date;
  monthScheduled: Months;
  poc: string;
  setter: string;
  notes: string;
}

export enum Months {
  January, February, March, April, May, June, July, August, September,
  October, November, December,
}

export enum AppointmentStatuses {
  'Interested',
  'Confirmed',
  'Rep Cancelled',
  'Not Interested',
  'Doctor Cancelled',
  'Not Qualified',
  'Producing',
  'Verified',
  'Scheduled',
  'Rescheduled',
}
//name/values
export const AppointmentSteps = [
  {index: 0, values: [AppointmentStatuses.Interested], name: 'Initial'},
  {index: 1, values: [AppointmentStatuses.Confirmed, AppointmentStatuses['Rep Cancelled'], AppointmentStatuses['Not Interested'],
    AppointmentStatuses['Doctor Cancelled'], AppointmentStatuses['Not Qualified']], name: 'Decision'},
  {index: 2, values: [AppointmentStatuses.Producing], name: 'Producing' },
  {index: 3, values: [AppointmentStatuses.Verified], name: 'Verified'},
  {index: 4, values: [AppointmentStatuses.Scheduled, AppointmentStatuses.Rescheduled], name: 'Scheduled'},
]
