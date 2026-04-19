import { Component, Input, Output, EventEmitter } from '@angular/core';

interface PlateauOption {
  value: string;
  cols: number;
  rows: number;
  label: string;
}

@Component({
  selector: 'app-param-plateau',
  standalone: true,
  templateUrl: './plateau.html',
  styleUrls: ['./plateau.css']
})
export class ParamPlateauComponent {
  @Input() label: string = '';
  @Input() value: string = '4x4';
  @Output() valueChange = new EventEmitter<string>();

  readonly plateauOptions = [
    { value: '4x2', cols: 4, rows: 2, label: '4 × 2' },
    { value: '4x3', cols: 4, rows: 3, label: '4 × 3' },
    { value: '4x4', cols: 4, rows: 4, label: '4 × 4' },
    { value: '5x4', cols: 5, rows: 4, label: '5 × 4' },
    { value: '6x5', cols: 6, rows: 5, label: '6 × 5' },
  ];

  getCells(count: number): number[] {
    return new Array(count);
  }

  onSelect(newValue: string) {
    this.value = newValue;
    this.valueChange.emit(this.value);
  }
}