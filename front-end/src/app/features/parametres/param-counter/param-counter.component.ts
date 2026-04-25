import { Component, Input, Output, EventEmitter, OnInit} from '@angular/core';

@Component({
  selector: 'app-param-counter',
  templateUrl: './param-counter.component.html',
  styleUrls: ['./param-counter.component.scss']
})
export class ParamCounterComponent implements OnInit {
  @Input() label: string = '';
  @Input() description: string = ''; 
  @Input() min: number = 1;
  @Input() max: number = 10;
  @Input() value: number = 1;

  @Output() valueChange = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
    // Initialisation conforme au modèle UniCA
  }

  get descriptionParts(): string[] {
    return this.description.split('{value}');
  }

  update(delta: number): void {
    const newValue = this.value + delta;
    if (newValue >= this.min && newValue <= this.max) {
      this.value = newValue;
      this.valueChange.emit(this.value);
    }
  }
}