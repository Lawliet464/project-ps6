import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-association-message',
  templateUrl: './association-message.component.html'
})
export class AssociationMessageComponent implements OnInit {
  @Input() messages: string[] = [];

  constructor() { }

  ngOnInit(): void {
  }
}
