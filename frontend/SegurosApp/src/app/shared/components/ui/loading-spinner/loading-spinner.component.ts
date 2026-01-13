import { Component, input } from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  template: `
    <div class="bg-white border border-gray-200 p-12">
      <div class="flex flex-col items-center justify-center">
        <div class="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
        <p class="mt-4 text-gray-500">{{ message() }}</p>
      </div>
    </div>
  `
})
export class LoadingSpinnerComponent {
  message = input('Cargando...');
}
