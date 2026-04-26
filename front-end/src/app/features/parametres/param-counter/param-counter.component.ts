import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-param-counter',
  templateUrl: './param-counter.component.html',
  styleUrls: ['./param-counter.component.scss']
})
export class ParamCounterComponent implements OnChanges {
  @Input() label: string = '';
  @Input() description: string = ''; 
  @Input() min: number = 1;
  @Input() max: number = 10;
  @Input() value: number = 1;
  @Output() valueChange = new EventEmitter<number>();

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['value']) {
      this.value = changes['value'].currentValue;
    }
  }

  update(delta: number): void {
    const newValue = this.value + delta;
    if (newValue >= this.min && newValue <= this.max) {
      this.value = newValue;
      this.valueChange.emit(this.value);
    }
  }

  get descriptionParts(): string[] {
    return this.description.split('{value}');
  }
}