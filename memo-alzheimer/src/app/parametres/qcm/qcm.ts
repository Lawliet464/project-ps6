import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-param-qcm',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './qcm.html',
  styleUrls: ['./qcm.css']
})
export class ParamQcmComponent {
  @Input() label: string = '';
  @Input() options: string[] = [];
  @Input() checked: string[] = [];

  @Output() selectionChange = new EventEmitter<string[]>();

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