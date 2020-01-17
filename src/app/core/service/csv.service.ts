import { Injectable } from '@angular/core';
import { EventFieldList, Event } from '../models/event/event';

/**
 * The service class to exports file as CSV format.
 * */
@Injectable({
  providedIn: 'root'
})
export class CsvService {
  /**
   * The function to export file as CSV format.
   * @param data The source data
   * @param fields The fields of csv file
   */
  public exportAsCSVFile(data: Array<Event>, fields: Array<EventFieldList>): string {
    let str = '';
    let row = '';

    row = fields.map(field => field.fieldName).join(';');
    str += `${row}\r\n`;

    data.forEach(element => {
      let line = '';
      fields.forEach(field => {
        if (line !== '') { line += ';'; }
        line += element[field.propName];
      });

      str += `${line}\r\n`;
    });

    return str;
  }
}
