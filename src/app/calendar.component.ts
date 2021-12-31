import {Component, OnInit, ViewChild} from '@angular/core';
import {RestService} from "./rest.service";
import {DialogModule} from 'primeng/dialog';
import {Appointment} from "./models";
import {FullCalendarComponent} from "@fullcalendar/angular";

@Component({
  selector: 'med-calendar',
  template: `
    <full-calendar #calendar [options]="options"></full-calendar>
    <p-dialog header={{getTitle(selectedAppointment)}} [(visible)]="displayDetailsModal" [modal]="true" [draggable]="false"
              [style]="{width: '50vw'}" [dismissableMask]="true">
      <appointment-details [appointment]="selectedAppointment"></appointment-details>
    </p-dialog>
  `
})
export class CalendarComponent implements OnInit {
  @ViewChild('calendar') calendarComponent?: FullCalendarComponent;

  events: any[] | undefined;

  options: any;

  header: any;

  displayDetailsModal: boolean;

  selectedAppointment?: Appointment;

  constructor(private restService: RestService) {
    this.displayDetailsModal = false;
  }

  async ngOnInit() {
    const events = await this.restService.getAppointments();
    console.log(events);
    this.options = {
      // initialDate : '2019-01-01',
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth'
        //right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      // initialView: 'timeGridWeek',
      events: events.map(appointment => ({title: `${appointment.doctor}@${appointment.lab}`, date: appointment.date,
        rawData: appointment})),
      eventClick: this.handleClick.bind(this), // bind is important!
      editable: true,
      selectable:true,
      selectMirror: true,
      dayMaxEvents: true,
    };
  }
  handleClick({ event }: any) {
    // open Details modal window
    const { rawData } = event.extendedProps;
    // const calendarApi = this.calendarComponent?.getApi();
    this.selectedAppointment = rawData;
    this.displayDetailsModal = true;
  }
  getTitle(appointment?: Appointment) {
    if (!appointment) return ''
    else return `${appointment.setter} to ${appointment.doctor} @${appointment.lab}`
  }
}
