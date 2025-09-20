import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useMoviesStore = defineStore('movies', () => {
  const movies = ref([])
  const getMovies = computed(() => movies.value)

  const addMovies = ({ title, director, summary, genres }) => {
    movies.value.push({
      id: new Date().getTime(),
      title: title ?? '',
      director: director ?? '',
      summary: summary ?? '',
      genres: genres ?? [],
    })
  }

  const removeMovies = (id) => {
    const index = getMovies.value.findIndex((movie) => movie.id === id)
    movies.value.splice(index, 1)
  }

  const updateMovies = (id, { title = '', director = '', summary = '', genres = [] }) => {
    const index = getMovies.value.findIndex((movie) => movie.id === id)
    movies.value.splice(index, 1, {
      id: new Date().getTime(),
      title: title,
      director: director,
      summary: summary,
      genres: genres,
    })
  }

  return { getMovies, addMovies, removeMovies, updateMovies }
})
