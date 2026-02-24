import {Component, Input} from '@angular/core';
import {NgIcon} from '@ng-icons/core';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-alert',
  imports: [
    NgIcon,
    NgClass
  ],
  templateUrl: './alert.html',
  styleUrl: './alert.css',
})
export class Alert {
  @Input() type: 'success' | 'error' | 'warning' | 'info' = 'info';


  get icon(): string {
    switch (this.type) {
      case 'success': return '✔️';
      case 'error': return 'ionAlertCircleOutline';
      case 'warning': return 'ionWarningOutline';
      case 'info': return 'ℹ️';
      default: return '';
    }
  }
  get class(): string {
    switch (this.type) {
      case 'success': return '✔️';
      case 'error': return 'border-red-500 bg-red-100 text-red-500';
      case 'warning': return ' border-yellow-400 bg-yellow-50 text-yellow-400';
      case 'info': return 'ℹ️';
      default: return '';
    }
  }
}
