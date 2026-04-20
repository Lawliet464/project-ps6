import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'jeu-association-message',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (text) {
      <div class="message-association"
           [class.message-erreur-ordre]="type === 'ordre'"
           [class.message-erreur-theme]="type === 'theme'"
           [class.message-erreur-mixte]="type === 'mixte'"
           [class.message-info]="type === 'info'"
           [class.message-erreur]="type === 'erreur'"
           [innerHTML]="text">
      </div>
    }
  `,
  styles: [`
    .message-association {
      margin: 0.8rem auto;
      max-width: 600px;
      padding: 14px 20px;
      border-radius: 12px;
      font-size: 1rem;
      font-weight: 600;
      text-align: center;
      line-height: 1.7;
      animation: fadeIn 0.3s ease;
    }
    .message-erreur        { background: #fde8e8; border: 2px solid #e05c5c; color: #c0392b; }
    .message-erreur-ordre  { background: #fde8e8; border: 2px solid #e05c5c; color: #c0392b; }
    .message-erreur-theme  { background: #fff3e0; border: 2px solid #f5a623; color: #b36a00; }
    .message-erreur-mixte  { background: #fff8ec; border: 2px solid #f5a623; color: #7a4500; }
    .message-info          { background: #fdf7fa; border: 2px solid #875C74; color: #875C74; }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  `]
})
export class AssociationMessage {
  @Input() text = '';
  @Input() type: 'info' | 'erreur' | 'ordre' | 'theme' | 'mixte' = 'info';
}
