import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';

@Component({ selector: 'app-param-slider',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './slider.html',
  styleUrls: ['./slider.css'], })

export class ParamSliderComponent {
  @Input() label = '';
  @Input() min = 0;
  @Input() max = 100;
  @Input() value = 50;
  @Input() step = 1;
  @Input() unit = '';
  @Input() iconMin = '';
  @Input() iconMax = '';
  @Output() valueChange = new EventEmitter<number>();

  onInputChange() {
    if (this.label === 'Taille de la police') {
      document.documentElement.style.setProperty('--font-size-base', `${this.value}px`);
    }
    this.valueChange.emit(this.value);
  }
}