import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {NgIcon} from '@ng-icons/core';

@Component({
  selector: 'app-print-star',
  imports: [
    NgIcon
  ],
  templateUrl: './print-star.html',
  styleUrl: './print-star.css',
  standalone: true
})
export class PrintStar implements OnChanges {

  @Input({required:true}) count!: number;

  fullStar = 0;
  halfStar = 0;
  noStar = 0;

  ngOnChanges(): void {
    const rating = Math.max(0, Math.min(5, this.count));
    this.fullStar = Math.floor(rating);
    this.halfStar = rating - this.fullStar >= 0.5 ? 1 : 0;
    this.noStar = 5 - (this.fullStar + this.halfStar);
  }
}
