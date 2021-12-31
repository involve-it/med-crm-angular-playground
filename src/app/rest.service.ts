import { Injectable } from '@angular/core';
// import * as fs from 'fs';
import appointments from '../../parser/data/appointments.json';

@Injectable({
  providedIn: 'root'
})
export class FileReaderService {

  constructor() {
    debugger;
    // const file = fs.readFileSync(__dirname + '/data/CRM Task.xlsx');
    // console.log(file);
  }
  getAppointments() {
    debugger;
    return appointments;
  }
}
