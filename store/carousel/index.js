import { carouselCollection } from '@/services/firebase'

export const state = () => ({
  images: [],
})

export const mutations = {
  setImages(state, val) {
    state.images = val
  },
}

export const actions = {
  setImages({ commit }) {
    carouselCollection.orderBy('createdOn').onSnapshot((querySnapshot) => {
      const imgArray = []

      querySnapshot.forEach((doc) => {
        const img = doc.data()
        img.id = doc.id
        imgArray.push(img)
      })
      commit('setImages', imgArray)
    })
  },
}

export const getters = {
  getImages(state) {
    return state.images
  },
}
