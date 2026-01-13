import { Component, input } from '@angular/core';

type AlertType = 'error' | 'success';

@Component({
  selector: 'app-alert',
  standalone: true,
  template: `
    <div class="p-4 border flex items-center gap-3" 
         [class.bg-red-50]="type() === 'error'" 
         [class.border-red-200]="type() === 'error'"
         [class.bg-emerald-50]="type() === 'success'" 
         [class.border-emerald-200]="type() === 'success'">
      <svg 
        class="w-5 h-5 shrink-0" 
        [class.text-red-500]="type() === 'error'"
        [class.text-emerald-500]="type() === 'success'"
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24">
        @if (type() === 'error') {
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        } @else {
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
        }
      </svg>
      <p class="text-sm" [class.text-red-700]="type() === 'error'" [class.text-emerald-700]="type() === 'success'">
        {{ message() }}
      </p>
    </div>
  `
})
export class AlertComponent {
  type = input<AlertType>('error');
  message = input.required<string>();
}
