import { Component } from '@angular/core';
import { RestService } from "./rest.service";
import {TabMenuModule} from 'primeng/tabmenu';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'med-home-page',
  template: `
    <p-tabView>
      <p-tabPanel header="Calendar">
        <med-calendar></med-calendar>
      </p-tabPanel>
      <p-tabPanel header="Table">
        content2
      </p-tabPanel>
      <p-tabPanel header="Stats">
        Content 3
      </p-tabPanel>
    </p-tabView>
  `
})
export class HomePageComponent {
  items: MenuItem[];
  constructor(private service: RestService) {
    this.items = [
      {label: 'Home', icon: 'pi pi-fw pi-home'},
      {label: 'Calendar', icon: 'pi pi-fw pi-calendar'},
      {label: 'Edit', icon: 'pi pi-fw pi-pencil'},
      {label: 'Documentation', icon: 'pi pi-fw pi-file'},
      {label: 'Settings', icon: 'pi pi-fw pi-cog'}
    ];
  }
  ngOnInit(): void {
    const appointments = this.service.getAppointments();
    console.log(appointments);
    const statuses = this.service.getStatuses();
    console.log(statuses);
  }
}
