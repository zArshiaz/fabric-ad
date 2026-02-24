import {Component, input} from '@angular/core';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-widget',
  imports: [
    NgClass
  ],
  templateUrl: './widget.html',
  styleUrl: './widget.css',
})
export class Widget {

  title=input.required<string>();
  count=input.required<number>();
  color=input<string>("text-white");
}
