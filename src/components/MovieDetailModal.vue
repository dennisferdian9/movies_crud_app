<template>
  <div class="modal-outside">
    <div class="modal-container">
      <div @click="closeModalHandler" class="close-button">x</div>
      <h2 class="modal-title">Movies {{ method }}</h2>
      <div onsubmit.prevent="submitHandler" class="form-container">
        <div class="button-container">
          <button
            v-if="defaultId"
            type="button"
            class="button delete-button"
            @click="deleteHandler"
          >
            Delete
          </button>
          <button
            :disabled="submitIsDisabled"
            type="button"
            @click="submitHandler"
            class="button update-button"
          >
            Save
          </button>
        </div>

        <InputText label="Name" v-model="titleInput" />
        <InputText label="Director" v-model="directorInput" />
        <TextArea label="Summary" v-model="summaryInput" />
        <div class="chip-container">
          <ChipLabel
            :class="[genreInput.includes(label) ? 'picked-chip-label' : 'default-chip-label']"
            @click="pickGenreHandler(label)"
            v-for="label in genreList"
            :label="label"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import InputText from './InputText.vue'
import TextArea from './TextArea.vue'
import { useMoviesStore } from '@/stores/movies'
import ChipLabel from './ChipLabel.vue'

const props = defineProps({
  method: {
    type: String,
    default: 'update',
  },
  defaultId: {
    type: Number,
    default: null,
  },
})

const emit = defineEmits(['close'])
const moviesStore = useMoviesStore()

const genreList = computed(() => ['action', 'animation', 'drama', 'sci-fi'])

const titleInput = ref('')
const directorInput = ref('')
const summaryInput = ref('')
const genreInput = ref([])

const submitIsDisabled = computed(() => !titleInput.value.length)

const pickGenreHandler = (label) => {
  const indexGenre = genreInput.value.findIndex((genre) => genre === label)
  if (indexGenre < 0) {
    genreInput.value.push(label)
  } else genreInput.value.splice(indexGenre, 1)
}

const submitHandler = () => {
  if (submitIsDisabled.value) return
  const movieDataToInput = {
    title: titleInput.value,
    director: directorInput.value,
    summary: summaryInput.value,
    genres: genreInput.value,
  }
  if (props.method === 'create') {
    moviesStore.addMovies(movieDataToInput)
  } else {
    moviesStore.updateMovies(props.defaultId, movieDataToInput)
  }
  closeModalHandler()
}

const deleteHandler = () => {
  moviesStore.removeMovies(props.defaultId)
  closeModalHandler()
}

const closeModalHandler = () => {
  emit('close')
}

onMounted(() => {
  if (!props.defaultId) return
  const dataMovie = moviesStore.getMovies.find((movie) => movie.id === props.defaultId)

  if (!dataMovie) return

  titleInput.value = dataMovie.title
  directorInput.value = dataMovie.director
  summaryInput.value = dataMovie.summary
  genreInput.value = dataMovie.genres
})
</script>

<style scoped>
.modal-outside {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.8);
}
.modal-container {
  max-width: 980px;
  width: 100dvw;
  background-color: white;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  top: 50%;
  padding: 24px 16px;
  box-sizing: border-box;
}

.modal-title {
  margin-bottom: 16px;
}

.form-container {
  display: flex;
  flex-direction: column;
  gap: 12px 0px;
  width: 100%;
}

.button-container {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.button {
  border: 0;
  border-radius: 4px;
  outline: 0;
  color: #fff;
  font-weight: 700;
  padding: 8px 6px;
}

.button:disabled {
  background-color: #e5e0d8 !important;
}

.delete-button {
  background-color: #b45253;
}

.update-button {
  background-color: #064232;
}

.close-button {
  position: absolute;
  right: 24px;
  top: 24px;
  font-size: 32px;
}

.picked-chip-label {
  color: #ffffff;
  background-color: #239ba7;
  border: solid transparent 1px;
}

.default-chip-label {
  background-color: #f8f8f8;
  border: solid #e5e0d8 1px;
}

.chip-container {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}
</style>
