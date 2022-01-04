import {Component, ElementRef, OnInit, Output, ViewChild} from '@angular/core';
import {RestService} from "./rest.service";
import {DialogModule} from 'primeng/dialog';
import {Appointment, AppointmentStatuses, AppointmentStatusToColorMapping, AppointmentSteps} from "./models";
import {FullCalendarComponent} from "@fullcalendar/angular";

@Component({
  selector: 'med-calendar',
  template: `
    <full-calendar #calendar [options]="options"></full-calendar>
    <p-dialog #dRef header={{getTitle(selectedAppointment)}} [(visible)]="displayDetailsModal" [modal]="true" [draggable]="false"
              [style]="{width: '50vw'}" [dismissableMask]="true" (onShow)="onDialogShow()" styleClass="med-calendar">
      <appointment-details [appointment]="selectedAppointment"></appointment-details>
    </p-dialog>
  `,
})
export class CalendarComponent implements OnInit {
  @ViewChild('calendar')
  @Output('calendar')
  calendarComponent?: FullCalendarComponent;

  @ViewChild('dRef') dRef?: ElementRef;

  events: any[] | undefined;

  options: any;

  header: any;

  displayDetailsModal: boolean;

  selectedAppointment?: Appointment;

  constructor(private restService: RestService) {
    this.displayDetailsModal = false;
  }

  async ngOnInit() {
    this.restService.filter.subscribe(async () => {
      const appointments = await this.restService.getAppointments();
      this.options = this.getOptions(appointments);
    });

  }
  private getOptions(appointments: Appointment[]) {
    return {
      // initialDate : '2019-01-01',
      headerToolbar: {
        left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth'
        //right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      // initialView: 'timeGridWeek',
      events: appointments.map(appointment => ({title: `${appointment.doctor}@${appointment.lab}`, date: appointment.date,
        rawData: appointment})),
        eventClick: this.handleClick.bind(this), // bind is important!
      editable: true,
      selectable:true,
      selectMirror: true,
      dayMaxEvents: true,
      contentHeight: 600,
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
  onDialogShow() {
    const status = this.selectedAppointment?.status;
    if (!status) return;
    // @ts-ignore
    document.querySelector('.med-calendar .p-dialog-header').style.borderLeft = `3px ${AppointmentStatusToColorMapping[AppointmentStatuses[status]]?.color} solid`
    // @ts-ignore
    document.querySelectorAll('.med-calendar .p-steps .p-steps-item .p-steps-number').forEach(el =>el.style.background = `#ffffff`)
    // @ts-ignore
    document.querySelector('.med-calendar .p-steps .p-steps-item.p-highlight .p-steps-number').style.background = `${AppointmentStatusToColorMapping[AppointmentStatuses[status]]?.color}`
  }
}
