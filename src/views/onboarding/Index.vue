<script setup lang="ts">
  import Screen from '@/global-components/Screen.vue';
  import { ref, watch } from 'vue';
  import { useRouter } from 'vue-router';

  const router = useRouter();
  const languages: string[] = ['English', 'Russian', '日本語'];
  let nativeLanguage = ref<string>('');
  let educationLanguage = ref<string>('');

  watch(nativeLanguage, (newLang) => {
    localStorage.setItem('userNaviteLanguage', newLang)
  })

  watch(educationLanguage, (newLang) => {
    localStorage.setItem('userEducationLanguage', newLang)
  })

  const goToDictionary = () => {
    if (nativeLanguage.value && educationLanguage.value) {
      router.push('/dictionary');
    } else {
      alert('Please choose both languages!');
    }
  };
</script>

<template>
  <Screen title="Onboarding">
    <label>
      Native language:
      <select v-model="nativeLanguage" name="languages" id="native-languages">
        <option value="">Please, choice your language</option>
        <option v-for="lang in languages" :key="lang" :value="lang">{{ lang }}</option>
      </select>
    </label>

    <label>
      Education language:
      <select v-model="educationLanguage" name="languages" id="education-languages">
        <option value="">Please, choice your education language</option>
        <option v-for="lang in languages" :key="lang" :value="lang">{{ lang }}</option>
      </select>
    </label>

    <button
      :disabled="!nativeLanguage || !educationLanguage"
      @click="goToDictionary()"
    >
      Go on
    </button>
  </Screen>
</template>