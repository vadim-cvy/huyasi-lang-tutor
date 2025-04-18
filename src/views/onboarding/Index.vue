<script setup lang="ts">
import Screen from '@/global-components/Screen.vue';
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const languages: string[] = ['English', 'Russian', '日本語'];
let languagesNativeLanguage = ref<string>('');
let languagesEducationLanguage = ref<string>('');

watch(languagesNativeLanguage, (newLang) => {
  localStorage.setItem('userNaviteLanguage', newLang)
})

</script>

<template>
  <Screen>
    <select v-model="languagesNativeLanguage" name="languages" id="languages">
      <option value="">Please, choice your language</option>
      <option v-for="lang in languages" :key="lang" :value="lang">{{ lang }}</option>
    </select>
    <select v-model="languagesEducationLanguage" name="languages" id="languages">
      <option value="">Please, choice your education language</option>
      <option v-for="lang in languages" :key="lang" :value="lang">{{ lang }}</option>
    </select>
    <button @click="router.push('/dictionary')">Go on</button>
  </Screen>
</template>