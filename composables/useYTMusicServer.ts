import { ref } from 'vue'

const isInitialized = ref(false)
const isLoading = ref(false)
const error = ref<string | null>(null)

export function useYTMusicServer() {
  const getSong = async (videoId: string) => {
    isLoading.value = true
    error.value = null

    try {
      const response = await $fetch(`/api/ytmusic/song/${videoId}`)
      return response
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to fetch song'
      error.value = errorMsg
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const getArtist = async (artistId: string) => {
    isLoading.value = true
    error.value = null

    try {
      const response = await $fetch(`/api/ytmusic/artist/${artistId}`)
      return response
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to fetch artist'
      error.value = errorMsg
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const getAlbum = async (albumId: string) => {
    isLoading.value = true
    error.value = null

    try {
      const response = await $fetch(`/api/ytmusic/album/${albumId}`)
      return response
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to fetch album'
      error.value = errorMsg
      throw err
    } finally {
      isLoading.value = false
    }
  }

  return {
    getSong,
    getArtist,
    getAlbum,
    isInitialized,
    isLoading,
    error,
  }
}
