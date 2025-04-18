<script setup lang="ts">
import Logo from './Logo.vue';

defineProps<{
  title: string
}>()
</script>

<template>
  <div class="global-header">
    <Logo/>

    <h1 class="global-header__title">
      {{ title }}
    </h1>
  </div>
</template>

<style lang="scss">
.global-header
{
  display: flex;
  gap: 20px;

  &__title
  {
    width: 100%;
    text-align: center;
    font-size: 24px;
  }
}
</style>