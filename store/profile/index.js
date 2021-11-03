import { profileCollection, profilePage } from '@/services/firebase'

export const state = () => ({
  profile: [],
  page: null,
})

export const mutations = {
  setProfile(state, val) {
    if (val) {
      state.profile = val
    } else {
      state.profile = []
    }
  },
  setPage(state, val) {
    if (val) {
      state.page = val
    } else {
      state.page = []
    }
  },
}

export const actions = {
  setProfile({ commit }) {
    profileCollection.orderBy('lastName').onSnapshot((querySnapshot) => {
      const driverArray = []

      querySnapshot.forEach((doc) => {
        const profile = doc.data()
        profile.id = doc.id
        driverArray.push(profile)
      })
      commit('setProfile', driverArray[0])
    })

    profilePage.onSnapshot((querySnapshot) => {
      const driverArray = []

      querySnapshot.forEach((doc) => {
        const profile = doc.data()
        profile.id = doc.id
        driverArray.push(profile)
      })
      commit('setPage', driverArray[0])
    })
  },
}

export const getters = {
  getProfile(state) {
    return state.profile
  },
  getPage(state) {
    return state.page
  },
}
