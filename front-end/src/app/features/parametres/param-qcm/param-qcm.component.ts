import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-param-qcm',
  templateUrl: './param-qcm.component.html',
  styleUrls: ['./param-qcm.component.scss']
})
export class ParamQcmComponent implements OnChanges {
  @Input() label: string = '';
  @Input() options: string[] = [];
  @Input() checked: string[] = [];
  @Output() selectionChange = new EventEmitter<string[]>();

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['checked']) {
      this.checked = changes['checked'].currentValue;
    }
  }

  isChecked(option: string): boolean {
    return this.checked && this.checked.includes(option);
  }

  toggleOption(option: string, event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    const isCurrentlyChecked = checkbox.checked;

    let newSelection = [...this.checked];

    if (isCurrentlyChecked) {
      if (!newSelection.includes(option)) {
        newSelection.push(option);
      }
    } else {
      // Sécurité : on empêche de tout décocher s'il n'en reste qu'un
      if (newSelection.length <= 1) {
        checkbox.checked = true;
        return;
      }
      
      newSelection = newSelection.filter(item => item !== option);
    }

    this.checked = newSelection;
    this.selectionChange.emit(this.checked);
  }
}
