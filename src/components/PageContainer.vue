<template>
  <div class="page-container">
    <h1 class="page-title">Movies Collection</h1>
    <MoviesList
      class="movie-list-container"
      @add-movie="addMovieHandler"
      @update-movie="updateMovieHandler"
    />
    <MovieDetailModal
      v-if="detailModalIsShow"
      @close="closeModalHandler"
      :method="method"
      :default-id="defaultId"
    />
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import MovieDetailModal from './MovieDetailModal.vue'
import MoviesList from './MoviesList.vue'

const method = ref('')
const defaultId = ref(null)
const detailModalIsShow = computed(() => !!method.value.length)

const addMovieHandler = () => {
  method.value = 'create'
}

const updateMovieHandler = (id) => {
  method.value = 'update'
  defaultId.value = id
}

const closeModalHandler = () => {
  method.value = ''
  defaultId.value = null
}
</script>
<style>
.page-container {
  max-width: 1280px;
  width: 100dvw;
  margin: auto;
  padding: 0 4px;
  box-sizing: border-box;
}
.page-title {
  text-align: center;
}

.movie-list-container {
  max-width: 680px;
  margin: auto;
}
</style>
