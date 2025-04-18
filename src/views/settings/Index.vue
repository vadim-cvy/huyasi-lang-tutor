<script setup lang="ts">
  import Screen from '@/global-components/Screen.vue';
  import { ref, watch } from 'vue';
  import { useRouter } from 'vue-router';

  const router = useRouter();

  const languages = ['English', 'Russian', '日本語'];

  const nativeLanguage = ref(localStorage.getItem('userNativeLanguage') || '');
  const educationLanguage = ref(localStorage.getItem('userEducationLanguage') || '');
  const chatGptKey = ref(localStorage.getItem('chatGptKey') || '');

  watch(nativeLanguage, (newVal) => {
    localStorage.setItem('userNativeLanguage', newVal);
  });
  watch(educationLanguage, (newVal) => {
    localStorage.setItem('userEducationLanguage', newVal);
  });
  watch(chatGptKey, (newVal) => {
    localStorage.setItem('chatGptKey', newVal);
  });
</script>

<template>
  <Screen>
    <label>
        Native language:
        <select v-model="nativeLanguage" id="native-language">
          <option value="">Please, choose your native language</option>
          <option v-for="lang in languages" :key="lang" :value="lang">{{ lang }}</option>
        </select>
      </label>

      <label>
        Education language:
        <select v-model="educationLanguage" id="education-language">
          <option value="">Please, choose your education language</option>
          <option v-for="lang in languages" :key="lang" :value="lang">{{ lang }}</option>
        </select>
      </label>

      <label>
        ChatGPT API Key:
        <input
          v-model="chatGptKey"
          type="text"
          placeholder="Enter your ChatGPT key"
        />
      </label>
  </Screen>
</template>