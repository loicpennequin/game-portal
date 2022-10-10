<script setup lang="ts">
const urls = ref<string[]>([]);

const { readAsDataURL } = useFileReader();

const vModel = computed<any>({
  get: () => [],
  set: async (val: Blob[]) => {
    urls.value.push(await readAsDataURL(val[0]));
  }
});

const currentStep = ref(0);
const selectedStep = ref(0);

const next = () => {
  currentStep.value++;

  nextTick(() => {
    selectedStep.value++;
  });
};

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
</script>

<template>
  <UiContainer max-w="screen-md" space-y-8>
    <UiSurface space-y-5>
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
    <UiSurface space-y-5>
      <h2 text-xl>Test stepper</h2>

      <UiStepper
        v-model:selected-index="selectedStep"
        :current-step="currentStep"
      >
        <UiStepperStep label="Step One">
          <UiSurface>
            Step 1 tab
            <UiButton @click="next()">Enable Step 2</UiButton>
          </UiSurface>
        </UiStepperStep>
        <UiStepperStep label="Step Two">
          <UiSurface>
            Step 2 tab
            <UiButton @click="next()">Enable Step 3</UiButton>
          </UiSurface>
        </UiStepperStep>
        <UiStepperStep label="Step Three">
          <UiSurface>Step 3 tab</UiSurface>
        </UiStepperStep>
      </UiStepper>
    </UiSurface>

    <UiSurface space-y-5>
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
  </UiContainer>
</template>
