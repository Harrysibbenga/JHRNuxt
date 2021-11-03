import { gb4Pg } from '@/services/firebase'

export const state = () => ({
  content: {},
})

export const mutations = {
  setContent(state, val) {
    state.content = val
  },
}

export const actions = {
  setContent({ commit }) {
    gb4Pg.onSnapshot((querySnapshot) => {
      const contentArray = []

      querySnapshot.forEach((doc) => {
        const content = doc.data()
        content.id = doc.id
        contentArray.push(content)
      })
      commit('setContent', contentArray[0])
    })
  },
}

export const getters = {
  getContent(state) {
    return state.content
  },
}
