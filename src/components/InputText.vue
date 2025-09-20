<template>
  <div class="input-text-container">
    <span v-if="label.length" class="input-label">{{ label }}</span>
    <input type="text" class="input-text" :placeholder="placeholder" v-model="inputValue" />
  </div>
</template>

<script setup>
defineProps({
  placeholder: {
    type: String,
    default: 'input text',
  },
  label: {
    type: String,
    default: '',
  },
})

const inputValue = defineModel()
</script>

<style scoped>
.input-text-container {
  position: relative;
  width: 100%;
}

.input-text {
  border-radius: 4px;
  padding: 8px 6px;
  width: 100%;
  height: 100%;
  outline: 0;
  box-sizing: border-box;
}

.input-label {
  position: absolute;
  font-size: 12px;
  background-color: #ffffff;
  top: -6px;
  left: 12px;
  padding: 0 4px;
}
</style>
