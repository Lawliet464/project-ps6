import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

interface Stage {
  value: string;
  name: string;
  desc: string;
  color: string;
  bg: string;
}

@Component({
  selector: 'app-param-level',
  templateUrl: './param-level-selector.component.html',
  styleUrls: ['./param-level-selector.component.scss']
})
export class ParamLevelSelectorComponent implements OnInit {
  @Input() label: string = '';
  @Input() description: string = '';
  @Input() value: string = 'leger';
  
  @Output() valueChange = new EventEmitter<string>();

  readonly instanceId: string = Math.random().toString(36).substring(2, 9);

  readonly stages: Stage[] = [
    { value: 'leger', name: 'Niveau élevé', desc: 'Aides ponctuelles', color: '#B79D94', bg: '#F8F4F2' },
    { value: 'modere', name: 'Niveau modéré', desc: 'Aides régulières', color: '#875C74', bg: '#F4F0F2' },
    { value: 'severe', name: 'Niveau facile', desc: 'Aides continues', color: '#453750', bg: '#F0EFF2' },
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onSelect(newValue: string): void {
    this.value = newValue;
    this.valueChange.emit(this.value);
  }
}