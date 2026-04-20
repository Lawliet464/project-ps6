import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-param-counter',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './counter.html',
  styleUrls: ['./counter.css']
})
export class ParamCounterComponent {
  @Input() label: string = '';
  @Input() description: string = ''; 
  @Input() min: number = 1;
  @Input() max: number = 10;
  @Input() value: number = 1;

  @Output() valueChange = new EventEmitter<number>();
  get descriptionParts() {
    return this.description.split('{value}');
  }

  update(delta: number) {
    const newValue = this.value + delta;
    if (newValue >= this.min && newValue <= this.max) {
      this.value = newValue;
      this.valueChange.emit(this.value);
    }
  }
}