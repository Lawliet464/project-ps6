import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

interface PlateauOption {
  value: string;
  cols: number;
  rows: number;
  label: string;
}

@Component({
  selector: 'app-param-plateau',
  templateUrl: './param-plateau.component.html',
  styleUrls: ['./param-plateau.component.scss']
})
export class ParamPlateauComponent implements OnChanges {
  @Input() label: string = '';
  @Input() value: string = '4x4';
  @Output() valueChange = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  readonly plateauOptions: PlateauOption[] = [
    { value: '2x2', cols: 2, rows: 2, label: '2 × 2' }, //Facile
    { value: '3x2', cols: 3, rows: 2, label: '3 × 2' }, //Moyen
    { value: '4x2', cols: 4, rows: 2, label: '4 × 2' }, //Moyen
    { value: '4x3', cols: 4, rows: 3, label: '4 × 3' }, //Difficile
    { value: '4x4', cols: 4, rows: 4, label: '4 × 4' }]; //Difficile

  // Force la mise à jour visuelle quand configLocale change dans le parent
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['value']) {
      this.value = changes['value'].currentValue;
    }
  }
  
  getCells(count: number): number[] {
    return new Array(count);
  }

  onSelect(newValue: string): void {
    this.value = newValue;
    this.valueChange.emit(this.value);
  }
}