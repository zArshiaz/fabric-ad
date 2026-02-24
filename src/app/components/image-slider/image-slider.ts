import {Component, Input, OnInit, signal} from '@angular/core';
import {ImageDto} from '../../dtos/product.dto';
import {NgIcon} from '@ng-icons/core';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-image-slider',
  templateUrl: './image-slider.html',
  styleUrl: './image-slider.css',
  imports: [
    NgIcon,
    NgClass
  ]
})
export class ImageSlider {
  @Input() images!: ImageDto[];

  currentIndex = signal(0);

  prevImage() {
    const newIndex = this.currentIndex() === 0 ? this.images.length - 1 : this.currentIndex() - 1;
    this.currentIndex.set(newIndex);
  }

  nextImage() {
    const newIndex = (this.currentIndex() + 1) % this.images.length;
    this.currentIndex.set(newIndex);
  }

}
