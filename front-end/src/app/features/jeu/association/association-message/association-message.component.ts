import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-association-message',
  templateUrl: './association-message.component.html'
})
export class AssociationMessageComponent implements OnInit {
  @Input() text: string = '';
  @Input() type: 'info' | 'erreur' | 'ordre' | 'theme' | 'mixte' = 'info';

  constructor() { }

  ngOnInit(): void {
  }
}