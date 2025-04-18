<script setup lang="ts">
import GlobalHeader from './GlobalHeader.vue';
import GlobalNavigation from './GlobalNavigation.vue';

defineProps<{
  title: string
}>()
</script>

<template>
  <GlobalHeader :title="title"/>

  <slot/>

  <GlobalNavigation/>
</template>