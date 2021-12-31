const fs = require('fs');
var Excel = require('exceljs');
var wb = new Excel.Workbook();
const filePath = __dirname+'/data/CRM.xlsx';
wb.xlsx.readFile(filePath).then(function(){
  var sh = wb.getWorksheet(1);
  const appointments = []
  for (let i = 5; i <= sh.rowCount; i++) {
    if (sh.getRow(i).values.length > 1) {
      appointments.push({
        status: sh.getRow(i).getCell(1).value,
        month: sh.getRow(i).getCell(2).value,
        date: sh.getRow(i).getCell(3).value,
        doctor: sh.getRow(i).getCell(4).value,
        rep: sh.getRow(i).getCell(5).value,
        city: sh.getRow(i).getCell(6).value,
        state: sh.getRow(i).getCell(7).value,
        phone: sh.getRow(i).getCell(8).value,
        lab: sh.getRow(i).getCell(9).value,
        launchDate: sh.getRow(i).getCell(10).value,
        monthScheduled: sh.getRow(i).getCell(11).value,
        poc: sh.getRow(i).getCell(12).value,
        setter: sh.getRow(i).getCell(13).value,
        confirmationCallDate: sh.getRow(i).getCell(14).value,
        notes: sh.getRow(i).getCell(15).value,
      });
    }

  }
  const statuses = [...new Set(appointments.map(app => app.status)), 'Scheduled', 'Rescheduled']; // + Scheduled, Rescheduled etc
  fs.writeFileSync(__dirname + '/data/appointments.json', JSON.stringify(appointments));
  fs.writeFileSync(__dirname + '/data/statuses.json', JSON.stringify(statuses));
});
