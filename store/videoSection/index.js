import { videoSection } from '@/services/firebase'

export const state = () => ({
  video: '',
})

export const mutations = {
  setVideo(state, val) {
    state.video = val
  },
}

export const actions = {
  setVideo({ commit }) {
    videoSection.orderBy('createdOn').onSnapshot((querySnapshot) => {
      const videoArray = []

      querySnapshot.forEach((doc) => {
        const video = doc.data()
        video.id = doc.id
        videoArray.push(video)
      })
      commit('setVideo', videoArray)
    })
  },
}

export const getters = {
  getVideo(state) {
    return state.video
  },
}
