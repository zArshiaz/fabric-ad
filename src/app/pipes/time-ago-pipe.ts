import { Pipe, PipeTransform } from '@angular/core';
import dayjs from 'dayjs';
import  relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/fa.js'
dayjs.locale('fa')
dayjs.extend(relativeTime);
@Pipe({
  name: 'timeAgo',
})
export class TimeAgoPipe implements PipeTransform {

  transform( value: Date | string | number | null | undefined) {
    if (!value) return '';
    return dayjs(value).fromNow();
  }
}
