<script setup lang="ts">
import GlobalHeader from './GlobalHeader.vue';
import GlobalNavigation from './GlobalNavigation.vue';
</script>

<template>
  <GlobalHeader/>

  <slot></slot>

  <GlobalNavigation/>
</template>