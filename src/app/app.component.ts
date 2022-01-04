import {ApplicationRef, ChangeDetectorRef, Component, ElementRef, ViewChild} from '@angular/core';
import { RestService } from "./rest.service";
import {AppointmentStatus, AppointmentStatuses, AppointmentStatusToColorMapping} from "./models";

@Component({
  selector: 'med-app-root',
  styleUrls: ['./app.component.css'],
  templateUrl: 'app.component.html',
})
export class AppComponent {
  @ViewChild('filterButton') filterButton?: ElementRef;

  title = 'medical-crm';
  displayFilterBar = false;
  showFilterButton = true;
  filterButtonTop = '0';
  menuItems = [...AppointmentStatusToColorMapping].map(item => ({...item, selected: false}))
  updatedStatuses(statuses: AppointmentStatus[]) {
    this.service.updateData({ statuses });
  }

  ngAfterViewInit() {}
  onFilterClick({ checked }: { checked: boolean }) {
    this.displayFilterBar = !checked;
  }
  onFilterClick1({ checked }: { checked: boolean }) {
    this.showFilterButton = !checked;
  }
  onHide() {}
  onShow() {}
  constructor(private service: RestService, private cdr: ChangeDetectorRef, private ar: ApplicationRef) {}
}
