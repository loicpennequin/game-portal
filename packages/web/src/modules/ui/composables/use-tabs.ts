import { InjectionKey, Ref } from 'vue';

type Tab = {
  label: string;
  icon?: string;
};

export type TabsContext = {
  tabs: Ref<Tab[]>;
  selectedIndex: Ref<number>;

  addTab(tab: Tab): void;
};

export const tabsInjectionKey = Symbol('tabs') as InjectionKey<TabsContext>;

export const useTabsProvider = (selectedIndex: Ref<number>) => {
  const api = {
    selectedIndex,
    tabs: ref<Tab[]>([]),
    addTab(tab: Tab) {
      if (api.tabs.value.find(t => t.label === tab.label)) return;
      api.tabs.value?.push(tab);
    }
  };

  provide(tabsInjectionKey, api);

  return api;
};

export const useTabs = () => useSafeInject(tabsInjectionKey);
