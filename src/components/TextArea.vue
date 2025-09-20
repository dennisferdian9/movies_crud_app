<template>
  <div class="text-area-container">
    <span v-if="label.length" class="text-area-label">{{ label }}</span>
    <textarea class="text-area" :placeholder="placeholder" v-model="inputValue" rows="3"></textarea>
  </div>
</template>

<script setup>
defineProps({
  placeholder: {
    type: String,
    default: 'placeholder text',
  },
  label: {
    type: String,
    default: '',
  },
})

const inputValue = defineModel()
</script>

<style scoped>
.text-area-container {
  position: relative;
  width: 100%;
}

.text-area {
  border-radius: 4px;
  padding: 8px 6px;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}

.text-area-label {
  position: absolute;
  font-size: 12px;
  background-color: #ffffff;
  top: -6px;
  left: 12px;
  padding: 0 4px;
}
</style>
