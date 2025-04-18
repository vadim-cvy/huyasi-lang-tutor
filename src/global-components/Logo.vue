<script setup lang="ts">
import logoSrc from '@/assets/img/logo.png'
import { RouterUtils } from '@/router/RouterUtils';
</script>

<template>
  <a class="logo" @click="RouterUtils.push( 'home' )">
    <img class="logo__img" :src="logoSrc" alt="Logo">

    <span class="logo__text">
      Huyasi
    </span>
  </a>
</template>

<style lang="scss">
@use '@/assets/css/mixins/typography.scss';
.logo
{
  display: flex;
  gap: 5px;
  align-items: center;

  &__img
  {
    height: 20px;
  }

  &__text
  {
    @include typography.h1;
    font-size: 24px;
  }
}
</style>