import {Directive, ElementRef, input, OnInit} from '@angular/core';
import tippy from 'tippy.js';

@Directive({
  selector: '[appTippy]',
})
export class Tippy implements OnInit {
  appTippy=input('')

  constructor(private el: ElementRef) { }

  ngOnInit(): void {
    tippy(this.el.nativeElement,{
      content:`<span dir="ltr">${this.appTippy()}</span>`,
      allowHTML:true
    })
  }

}
