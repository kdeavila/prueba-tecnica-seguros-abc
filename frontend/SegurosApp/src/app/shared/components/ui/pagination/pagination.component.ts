import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  template: `
    <div class="px-6 py-4 border-t border-gray-200 bg-gray-50">
      <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
        <p class="text-sm text-gray-600">
          Mostrando página {{ currentPage() }} de {{ totalPages() }} ({{ totalCount() }} registros)
        </p>
        <div class="flex items-center gap-2">
          <button
            (click)="onPageChange.emit(currentPage() - 1)"
            [disabled]="currentPage() <= 1"
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
            Anterior
          </button>
          <button
            (click)="onPageChange.emit(currentPage() + 1)"
            [disabled]="currentPage() >= totalPages()"
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
            Siguiente
          </button>
        </div>
      </div>
    </div>
  `
})
export class PaginationComponent {
  currentPage = input.required<number>();
  totalPages = input.required<number>();
  totalCount = input.required<number>();

  onPageChange = output<number>();
}
