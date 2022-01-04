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

export interface ItemBase {
  name: string;
  value: string;
}

export interface AppointmentStatus {
  name: string;
  color: string;
  selected?: boolean;
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

export const AppointmentStatusToColorMapping: AppointmentStatus[] = [
  { name: 'Interested', color: '#75c1f3' },
  { name: 'Confirmed', color: '#0151c9' },
  { name: 'Rep Cancelled', color: '#ff0b28' },
  { name: 'Not Interested', color: '#ff0b28' },
  { name: 'Doctor Cancelled', color: '#ff0b28' },
  { name: 'Not Qualified', color: '#ff0b28' },
  { name: 'Producing', color: '#01c99a' },
  { name: 'Verified', color: '#01c99a' },
  { name: 'Scheduled', color: '#01c94a' },
  { name: 'Rescheduled', color: '#01c94a' },
]

//name/values
export const AppointmentSteps = [
  {index: 0, values: [AppointmentStatuses.Interested], name: 'Initial'},
  {index: 1, values: [AppointmentStatuses.Confirmed, AppointmentStatuses['Rep Cancelled'], AppointmentStatuses['Not Interested'],
    AppointmentStatuses['Doctor Cancelled'], AppointmentStatuses['Not Qualified']], name: 'Decision'},
  {index: 2, values: [AppointmentStatuses.Producing], name: 'Producing' },
  {index: 3, values: [AppointmentStatuses.Verified], name: 'Verified'},
  {index: 4, values: [AppointmentStatuses.Scheduled, AppointmentStatuses.Rescheduled], name: 'Scheduled'},
]

export interface AppointmentsFilter {
  statuses?: AppointmentStatus[];
  doctors?: ItemBase[];
  representatives?: ItemBase[];
  setters?: ItemBase[];
  labs?: ItemBase[];
  cities?: ItemBase[];
  states?: ItemBase[];
  dates?: Date[];
}
