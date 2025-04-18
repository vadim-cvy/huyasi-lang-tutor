<script setup lang="ts">
import Screen from '@/global-components/Screen.vue';
import { ref, watch } from 'vue';

const nativeLanguage: string[] = ['English', 'Russian', '日本語'];
const educationLanguage: string[] = ['English', 'Russian', '日本語'];
let choicedNativeLanguage = ref<string>('');
let choicedEducationLanguage = ref<string>('');

watch(choicedNativeLanguage, (newLang) => {
  localStorage.setItem('userNaviteLanguage', newLang)
})

</script>

<template>
  <Screen>
    <select v-model="choicedNativeLanguage" name="nativeLanguage" id="nativeLanguage">
      <option value="">Please, choice your language</option>
      <option v-for="lang in nativeLanguage" :key="lang" :value="lang">{{ lang }}</option>
    </select>
    <select v-model="choicedEducationLanguage" name="educationLanguage" id="educationLanguage">
      <option value="">Please, choice your education language</option>
      <option v-for="lang in educationLanguage" :key="lang" :value="lang">{{ lang }}</option>
    </select>
  </Screen>
</template>