import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="bg-white border border-gray-200 p-12">
      <div class="flex flex-col items-center justify-center text-center">
        <div class="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
          <svg class="w-8 h-8 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
          </svg>
        </div>
        <h3 class="text-lg font-medium text-gray-900 mb-2">{{ title() }}</h3>
        <p class="text-gray-500 mb-6">{{ description() }}</p>
        @if (showAction()) {
          <a [routerLink]="actionLink()" class="inline-flex items-center px-4 py-2.5 bg-emerald-600 text-white hover:bg-emerald-700 transition-colors font-medium">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
            </svg>
            {{ actionText() }}
          </a>
        }
      </div>
    </div>
  `
})
export class EmptyStateComponent {
  title = input('No hay datos');
  description = input('No se encontraron registros');
  showAction = input(true);
  actionText = input('Agregar nuevo');
  actionLink = input('/');
}
