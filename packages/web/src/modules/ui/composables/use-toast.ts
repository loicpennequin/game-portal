import { nanoid } from 'nanoid';
import { defineStore, storeToRefs } from 'pinia';
import { TypedRouteLocationRaw } from '~~/src/generated/typed-router';
import { TypedRouteList } from '~~/src/generated';
import { PartialBy } from '~~/src/utils/types';

export type Toast = {
  id: string;
  title: string;
  text?: string;
  colorScheme: string;
  icon: string;
  timeout: number;
  link?: TypedRouteLocationRaw<TypedRouteList>;
};
export type ToastInput = Omit<PartialBy<Toast, 'timeout'>, 'id'>;
export type ToastHelperInput = PartialBy<ToastInput, 'colorScheme' | 'icon'>;

const DEFAULT_TIMEOUT = 5000;

export const useToastStore = defineStore('toast', () => {
  const api = {
    toasts: ref<Toast[]>([]),

    add(input: ToastInput) {
      const id = nanoid(6);
      api.toasts.value.push({
        timeout: DEFAULT_TIMEOUT,
        id,
        ...input
      });

      setTimeout(() => {
        api.clear(id);
      }, input.timeout ?? DEFAULT_TIMEOUT);
    },

    clear(id: string) {
      const idx = api.toasts.value.findIndex(t => t.id === id);
      if (idx === -1) return;

      api.toasts.value.splice(idx, 1);
    },

    clearAll() {
      api.toasts.value = [];
    }
  };

  return api;
});

export const useToast = () => {
  const toastStore = useToastStore();
  const { toasts } = storeToRefs(toastStore);

  const addToastHelper =
    (colorScheme: string, icon: string) => (toast: ToastHelperInput) => {
      toastStore.add({
        colorScheme,
        icon,
        ...toast
      });
    };

  return {
    toasts,
    clear: toastStore.clear,
    clearAll: toastStore.clearAll,
    show: toastStore.add,
    showError: addToastHelper('red', 'close'),
    showWarning: addToastHelper('orange', 'warning-sign'),
    showSuccess: addToastHelper('green', 'check'),
    showInfo: addToastHelper('sky', 'info')
  };
};
