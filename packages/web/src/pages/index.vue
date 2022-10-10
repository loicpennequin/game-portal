<script setup lang="ts">
const urls = ref<string[]>([]);

// file input
const { readAsDataURL } = useFileReader();
const vModel = computed<any>({
  get: () => [],
  set: async (val: Blob[]) => {
    urls.value.push(await readAsDataURL(val[0]));
  }
});

// stepper
const currentStep = ref(0);
const selectedStep = ref(0);
const next = () => {
  currentStep.value++;

  nextTick(() => {
    selectedStep.value++;
  });
};

// autocomplete
const options = ['Orange', 'Banana', 'Strawberry', 'Apple', 'Grapes', 'Kiwi'];
const emojiByFruitName = {
  Orange: '🍊',
  Banana: '🍌',
  Strawberry: '🍓',
  Apple: '🍎',
  Grapes: '🍇',
  Kiwi: '🥝'
};
const selectedOption = ref<string>('');

// textarea
const text = ref(
  'Some text\nwith multiple lines\nanother one\nand another one'
);

// link
const { routes } = useTypedRouter();

// toast
const { showSuccess, showInfo, showError, showWarning } = useToast();
</script>

<template>
  <UiContainer max-w="screen-md" space-y-8>
    <UiSurface space-y-5 as="section">
      <h1 text-3xl>Game Portal</h1>

      <h2 text-xl>Test file input</h2>
      <UiFileInput v-model="vModel" id="my-file-input" accept="image/*" />
      <div flex gap-3>
        <img
          v-for="url in urls"
          :key="url"
          :src="url"
          w-18
          aspect-square
          object-cover
        />
      </div>
    </UiSurface>
    <UiSurface space-y-5 as="section">
      <h2 text-xl>Test stepper</h2>

      <UiStepper
        v-model:selected-index="selectedStep"
        :current-step="currentStep"
      >
        <UiStepperStep label="Step One">
          <UiSurface shadow-lg>
            Step 1 tab
            <UiButton @click="next()">Enable Step 2</UiButton>
          </UiSurface>
        </UiStepperStep>
        <UiStepperStep label="Step Two">
          <UiSurface shadow-lg>
            Step 2 tab
            <UiButton @click="next()">Enable Step 3</UiButton>
          </UiSurface>
        </UiStepperStep>
        <UiStepperStep label="Step Three">
          <UiSurface shadow-lg>Step 3 tab</UiSurface>
        </UiStepperStep>
      </UiStepper>
    </UiSurface>

    <UiSurface space-y-5 as="section">
      <h2 text-xl>Test autocomplete input</h2>

      <code block>selected option: {{ selectedOption }}</code>
      <UiAutoCompleteInput
        v-model="selectedOption"
        id="autocomplete"
        :options="options"
      >
        <template #option="{ option }">
          {{ emojiByFruitName[option as keyof typeof emojiByFruitName] }}
          {{ option }}
        </template>
      </UiAutoCompleteInput>
    </UiSurface>

    <UiSurface space-y-5 as="section">
      <h2 text-xl>Test autoresize textarea</h2>
      <UiTextArea v-model="text" />
    </UiSurface>

    <UiSurface space-y-5 as="section">
      <h2 text-xl>Test typed Link</h2>
      <UiLink :to="{ name: routes.games }">Browse games</UiLink>
    </UiSurface>

    <UiSurface space-y-5 as="section">
      <h2 text-xl>Test toast</h2>

      <div flex gap-3>
        <UiButton
          variant="ghost"
          @click="
            showInfo({
              title: 'I am a toast',
              text: 'some additional text'
            })
          "
        >
          Send info toast
        </UiButton>
        <UiButton
          variant="ghost"
          @click="
            showSuccess({
              title: 'I am a toast',
              text: 'some additional text'
            })
          "
        >
          Send success toast
        </UiButton>
        <UiButton
          variant="ghost"
          @click="
            showWarning({
              title: 'I am a toast',
              text: 'some additional text'
            })
          "
        >
          Send warning toast
        </UiButton>
        <UiButton
          variant="ghost"
          @click="
            showError({
              title: 'I am a toast',
              text: 'some additional text'
            })
          "
        >
          Send error toast
        </UiButton>
      </div>
    </UiSurface>
  </UiContainer>
</template>
