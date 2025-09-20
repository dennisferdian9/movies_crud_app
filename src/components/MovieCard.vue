<template>
  <div class="card">
    <h3 class="card-title">{{ title }}</h3>
    <span class="card-director"
      ><span class="label">Director:</span> {{ director.length ? director : '-' }}</span
    >
    <div class="genre-container">
      <ChipLabel v-for="label in genres" :label="label" class="genre-chip" />
    </div>
  </div>
</template>

<script setup>
import ChipLabel from './ChipLabel.vue'

defineProps({
  title: {
    type: String,
    default: '',
  },
  director: {
    type: String,
    default: '',
  },
  genres: {
    type: Array,
    default: () => [],
  },
})
</script>

<style scoped>
.card {
  width: 100%;
  border: solid #000000 1px;
  border-radius: 12px;
  padding: 4px 8px;
  box-sizing: border-box;
}

.card-title {
  font-size: 20px;
}

.genre-container {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  justify-content: end;
}

.genre-chip {
  background-color: #f8f8f8;
  color: #000000;
}

.label {
  font-weight: 700;
}
</style>
