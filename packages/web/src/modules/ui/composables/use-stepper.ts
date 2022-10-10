import { InjectionKey, Ref } from 'vue';
import { TabsContext } from './use-tabs';

export type StepperContext = TabsContext & {
  currentStep: Ref<number>;
};

export const stepperInjectionKey = Symbol(
  'stepper'
) as InjectionKey<StepperContext>;

type UseStepperProviderOptions = {
  selectedIndex: Ref<number>;
  currentStep: Ref<number>;
};
export const useStepperProvider = ({
  selectedIndex,
  currentStep
}: UseStepperProviderOptions) => {
  const tabsContext = useTabsProvider(selectedIndex);

  const api = {
    ...tabsContext,
    currentStep
  };

  provide(stepperInjectionKey, api);

  return api;
};

export const useStepper = () => useSafeInject(stepperInjectionKey);
