// import { createPopper } from '@popperjs/core/lib/popper-lite.js';
// import preventOverflow from '@popperjs/core/lib/modifiers/preventOverflow.js';
// import flip from '@popperjs/core/lib/modifiers/flip.js';
// import offset from '@popperjs/core/lib/modifiers/offset';
// import arrow from '@popperjs/core/lib/modifiers/arrow';
// import { Instance, Placement } from '@popperjs/core';
import { Ref } from 'vue';
import {
  computePosition,
  Placement,
  flip,
  shift,
  offset
} from '@floating-ui/dom';
import { Maybe, MaybeRef } from '~~/src/utils/types';

export type UsePopperOptions = {
  triggerNode: Maybe<Element>;
  popperNode: Maybe<HTMLElement>;
  placement?: Placement;
};

export default function useFloatingUi(
  isOpen: Ref<boolean>,
  options: MaybeRef<UsePopperOptions>
) {
  const initializePopper = async () => {
    await nextTick();
    const { placement = 'bottom', popperNode, triggerNode } = unref(options);
    if (!triggerNode || !popperNode) return;

    computePosition(triggerNode, popperNode, {
      placement,
      middleware: [offset(10), flip(), shift({ padding: 12 })]
    }).then(({ x, y }) => {
      Object.assign(popperNode.style, {
        left: `${x}px`,
        top: `${y}px`
      });
    });
  };

  watch([isOpen], ([isOpen]) => {
    if (isOpen) initializePopper();
  });
}
