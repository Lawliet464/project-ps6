import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-param-slider',
  templateUrl: './param-slider.component.html',
  styleUrls: ['./param-slider.component.scss']
})
export class ParamSliderComponent implements OnInit {
  @Input() label: string = '';
  @Input() min: number = 0;
  @Input() max: number = 100;
  @Input() value: number = 50;
  @Input() step: number = 1;
  @Input() unit: string = '';
  @Input() iconMin: string = '';
  @Input() iconMax: string = '';
  
  @Output() valueChange = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  onInputChange(): void {
    if (this.label === 'Taille de la police') {
      document.documentElement.style.setProperty('--font-size-base', `${this.value}px`);
    }
    this.valueChange.emit(this.value);
  }
}