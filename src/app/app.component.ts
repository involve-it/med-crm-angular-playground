import { Component } from '@angular/core';
import {FileReaderService} from "./file-reader.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'medical-crm';
  constructor(private service: FileReaderService) {
    debugger;
  }
  ngOnInit(): void {
    const appointments = this.service.getAppointments();
    console.log(appointments);
  }
}
