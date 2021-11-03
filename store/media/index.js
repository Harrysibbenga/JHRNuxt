import { mediaCollection } from '@/services/firebase'

export const state = () => ({
  media: [],
})

export const mutations = {
  setMedia(state, val) {
    if (val) {
      state.media = val
    } else {
      state.media = []
    }
  },
}

export const actions = {
  setMedia({ commit }) {
    mediaCollection.onSnapshot((querySnapshot) => {
      const driverArray = []

      querySnapshot.forEach((doc) => {
        const media = doc.data()
        media.id = doc.id
        driverArray.push(media)
      })
      commit('setMedia', driverArray[0])
    })
  },
}

export const getters = {
  getMedia(state) {
    return state.media
  },
}
