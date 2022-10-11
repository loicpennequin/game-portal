import { Placement } from '@floating-ui/core';
import { InjectionKey, Ref } from 'vue';
import {
  getFocusableChildren,
  KEYBOARD
} from '~~/src/modules/ui/utils/dom-helpers';
import { Maybe } from '~~/src/utils/types';

export type DropdownContext = {
  placement: Placement;
  isOpened: Ref<boolean>;
  toggleNode: Ref<Maybe<HTMLElement>>;
  menuNode: Ref<Maybe<HTMLElement>>;

  open: () => void;
  close: () => void;
  toggle: () => void;
};

export const dropdownInjectionKey = Symbol(
  'dropdown'
) as InjectionKey<DropdownContext>;

export type UseDropdownProviderOptions = {
  placement?: Placement;
};

export const useDropdownProvider = (
  isOpened: Ref<boolean>,
  { placement = 'bottom' }: UseDropdownProviderOptions = {}
) => {
  const activeElement = useActiveElement();
  const toggleNode = ref<Maybe<HTMLElement>>();
  const menuNode = ref<Maybe<HTMLElement>>();

  useFloatingUi(
    isOpened,
    computed(() => ({
      popperNode: unrefElement(menuNode),
      triggerNode: unref(toggleNode),
      placement
    }))
  );

  const isTriggerNodeFocused = computed(
    () => activeElement.value === toggleNode.value
  );
  const isFocusInsideMenu = computed(
    () => activeElement.value && menuNode.value?.contains(activeElement.value)
  );

  const focusFirstMenuElement = () => {
    nextTick(() => {
      if (isFocusInsideMenu.value) return;

      getFocusableChildren(menuNode.value)[0]?.focus();
    });
  };

  const api = {
    isOpened,
    placement,
    open: () => {
      if (isOpened.value) return;
      isOpened.value = true;
      focusFirstMenuElement();
    },
    close: ({ shouldRefocusToggle = true } = {}) => {
      if (!isOpened.value) return;
      isOpened.value = false;
      shouldRefocusToggle && toggleNode.value?.focus();
    },
    toggle: () => {
      isOpened.value = !isOpened.value;
      nextTick(() => {
        if (isOpened.value) focusFirstMenuElement();
      });
    },
    toggleNode,
    menuNode
  };

  watch(activeElement, () => {
    if (!isOpened.value) return;
    if (activeElement.value === document.body) return; // when tabbing sometimes the focus briefly goes to the body ?! ignore that...
    const isOutside = !isTriggerNodeFocused.value && !isFocusInsideMenu.value;
    if (isOutside) api.close({ shouldRefocusToggle: false });
  });

  if (!import.meta.env.SSR) {
    useEventListener(window, 'keydown', e => {
      switch (e.key) {
        case KEYBOARD.Escape:
          api.close();
      }
    });
  }

  provide(dropdownInjectionKey, api);

  return api;
};

export const useDropdown = () => useSafeInject(dropdownInjectionKey);
