<template>
  <div class="chip-container">{{ label }}</div>
</template>

<script setup>
defineProps({
  label: {
    type: String,
    default: '',
  },
})
</script>

<style scoped>
.chip-container {
  padding: 4px 8px;
  border-radius: 12px;
  width: max-content;
}
</style>
