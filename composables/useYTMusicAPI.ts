import { ref } from 'vue'
import YTMusic from 'ytmusic-api'

let ytmusicInstance: YTMusic | null = null

export const useYTMusicAPI = () => {
  const isInitialized = ref(false)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const initialize = async () => {
    if (isInitialized.value || ytmusicInstance) return

    try {
      isLoading.value = true
      ytmusicInstance = new YTMusic()
      await ytmusicInstance.initialize()
      isInitialized.value = true
      error.value = null
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to initialize YTMusic API'
      console.error('YTMusic API initialization error:', error.value)
    } finally {
      isLoading.value = false
    }
  }

  const getSong = async (videoId: string) => {
    await initialize()
    if (!ytmusicInstance) throw new Error('YTMusic API not initialized')
    return ytmusicInstance.getSong(videoId)
  }

  const getArtist = async (artistId: string) => {
    await initialize()
    if (!ytmusicInstance) throw new Error('YTMusic API not initialized')
    return ytmusicInstance.getArtist(artistId)
  }

  const getAlbum = async (albumId: string) => {
    await initialize()
    if (!ytmusicInstance) throw new Error('YTMusic API not initialized')
    return ytmusicInstance.getAlbum(albumId)
  }

  return {
    isInitialized,
    isLoading,
    error,
    initialize,
    getSong,
    getArtist,
    getAlbum,
  }
}
