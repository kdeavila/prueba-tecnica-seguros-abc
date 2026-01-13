import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-confirm-modal',
  standalone: true,
  template: `
    <div class="fixed inset-0 z-50 overflow-y-auto">
      <div class="flex min-h-full items-center justify-center p-4">
        <div class="fixed inset-0 bg-black/50 transition-opacity" (click)="onCancel.emit()"></div>
        <div class="relative bg-white max-w-md w-full p-6">
          <div class="mb-4">
            <h3 class="text-lg font-semibold text-gray-900">{{ title() }}</h3>
            <p class="text-sm text-gray-500">{{ subtitle() }}</p>
          </div>
          <p class="text-gray-600 mb-6">
            <ng-content></ng-content>
          </p>
          <div class="flex justify-end gap-3">
            <button
              (click)="onCancel.emit()"
              class="px-4 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors font-medium">
              {{ cancelText() }}
            </button>
            <button
              (click)="onConfirm.emit()"
              [disabled]="loading()"
              class="px-4 py-2 bg-red-600 text-white hover:bg-red-700 transition-colors font-medium disabled:opacity-50">
              {{ loading() ? loadingText() : confirmText() }}
            </button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ConfirmModalComponent {
  title = input('Confirmar acción');
  subtitle = input('Esta acción no se puede deshacer');
  cancelText = input('Cancelar');
  confirmText = input('Confirmar');
  loadingText = input('Procesando...');
  loading = input(false);

  onCancel = output<void>();
  onConfirm = output<void>();
}
