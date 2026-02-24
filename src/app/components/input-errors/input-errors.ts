import {Component, Input} from '@angular/core';
import {AbstractControl} from '@angular/forms';

@Component({
  selector: 'app-input-errors',
  imports: [],
  templateUrl: './input-errors.html',
})
export class InputErrors {
@Input('control')
  control: AbstractControl|null=null
  @Input('class')
  class: string|null=null
}
