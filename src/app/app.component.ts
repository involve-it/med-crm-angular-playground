import {ApplicationRef, ChangeDetectorRef, Component, ElementRef, ViewChild} from '@angular/core';
import { RestService } from "./rest.service";
import {AppointmentStatus, AppointmentStatusToColorMapping} from "./models";

const INITIAL_SIZE = '45px';

@Component({
  selector: 'med-app-root',
  styleUrls: ['./app.component.css'],
  templateUrl: 'app.component.html',
})
export class AppComponent {
  @ViewChild('filterButton') filterButton?: ElementRef;

  title = 'medical-crm';
  displayFilterBar = true;
  showFilterButton = true;
  filterButtonTop = '0';
  pageTopCss = INITIAL_SIZE;
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
  onShow() {
    const filtersDiv = document.getElementsByClassName('p-sidebar')[0];
    const filtersHeight = filtersDiv.scrollHeight;
    this.pageTopCss = `${filtersHeight}px`;
  }
  onHide() {
    this.pageTopCss = INITIAL_SIZE;
  }
  constructor(private service: RestService, private cdr: ChangeDetectorRef, private ar: ApplicationRef) {}
}
