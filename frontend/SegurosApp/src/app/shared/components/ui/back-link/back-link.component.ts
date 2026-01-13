import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-back-link',
  standalone: true,
  imports: [RouterLink],
  template: `
    <a [routerLink]="to()" class="inline-flex items-center text-sm text-gray-500 hover:text-emerald-600 mb-4">
      <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
      </svg>
      {{ text() }}
    </a>
  `
})
export class BackLinkComponent {
  to = input.required<string>();
  text = input('Volver');
}
