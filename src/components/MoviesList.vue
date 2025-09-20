<template>
  <div class="movie-list-container">
    <button @click="addHandler" class="circle-button plus-button" type="button">+</button>
    <form @submit.prevent="searchHandler">
      <InputText
        v-model="inputSearchValue"
        placeholder="Search by title"
        class="search-input-container"
      />
    </form>
    <div class="movie-list">
      <MovieCard
        v-for="movie in moviesList"
        :title="movie.title"
        :director="movie.director"
        :genres="movie.genres"
        @click="updateHandler(movie.id)"
      />
    </div>
  </div>
</template>
<script setup>
import { computed, ref } from 'vue'
import InputText from './InputText.vue'
import MovieCard from './MovieCard.vue'
import { useMoviesStore } from '@/stores/movies'

const emit = defineEmits(['add-movie', 'update-movie'])

const moviesStore = useMoviesStore()

const inputSearchValue = ref('')
const searchQuery = ref('')

const moviesList = computed(() => {
  if (!searchQuery.value.length) {
    return moviesStore.getMovies
  }

  return moviesStore.getMovies.filter((movie) => movie.title.includes(searchQuery.value))
})

const addHandler = () => {
  emit('add-movie')
}

const updateHandler = (id) => {
  emit('update-movie', id)
}

const searchHandler = () => {
  searchQuery.value = inputSearchValue.value
}
</script>

<style scoped>
.search-input-container {
  width: 100%;
}

.circle-button {
  background-color: #1a2a80;
  color: #ffffff;
  border-radius: 50%;
  border: 0;
  display: inline-block;
  width: 30px;
  height: 30px;
  font-size: 20px;
  margin-left: auto;
}

.plus-button {
  margin-bottom: 8px;
}

.movie-list-container {
  width: 100%;
}

.movie-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 12px;
}
</style>
