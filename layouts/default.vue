<template>
  <div class="layout">
    <slot />
  </div>
</template>

<script setup lang="ts"></script>

<style>
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.layout > *:nth-child(2) {
  flex: 1;
}
</style>
