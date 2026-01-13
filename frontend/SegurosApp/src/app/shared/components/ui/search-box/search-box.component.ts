import { Component, input, output, model } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-box',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="flex flex-col sm:flex-row gap-3">
      <div class="relative">
        <input
          type="text"
          [(ngModel)]="searchTerm"
          (keyup.enter)="onSearch.emit(searchTerm())"
          [placeholder]="placeholder()"
          class="w-full sm:w-80 pl-10 pr-4 py-2.5 border border-gray-300 focus:ring-0 focus:border-emerald-500 outline-none transition-colors"
        />
        <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
        </svg>
      </div>
      <button
        (click)="onSearch.emit(searchTerm())"
        class="px-4 py-2.5 bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors font-medium">
        Buscar
      </button>
      @if (showClear()) {
        <button
          (click)="handleClear()"
          class="px-4 py-2.5 bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors font-medium">
          Limpiar
        </button>
      }
    </div>
  `
})
export class SearchBoxComponent {
  placeholder = input('Buscar...');
  showClear = input(false);
  searchTerm = model('');

  onSearch = output<string>();
  onClear = output<void>();

  handleClear(): void {
    this.searchTerm.set('');
    this.onClear.emit();
  }
}
