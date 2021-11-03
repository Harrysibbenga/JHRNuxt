import { driversCollection } from '@/services/firebase'

export const state = () => ({
  allDrivers: [],
  driver: null,
})

export const mutations = {
  setDrivers(state, val) {
    if (val) {
      state.allDrivers = val
    } else {
      state.allDrivers = []
    }
  },
  setDriver(state, val) {
    if (val) {
      state.driver = val
    } else {
      state.driver = null
    }
  },
  clearDriver(state) {
    state.driver = null
  },
  clearDrivers(state) {
    state.allDrivers = null
  },
}

export const actions = {
  setDriver({ commit }, id) {
    driversCollection
      .doc(id)
      .get()
      .then((doc) => {
        const driver = doc.data()
        commit('setDriver', driver)
      })
  },
  setDrivers({ commit }) {
    driversCollection.orderBy('lastName').onSnapshot((querySnapshot) => {
      const driversArray = []

      querySnapshot.forEach((doc) => {
        const driver = doc.data()
        driver.id = doc.id
        driversArray.push(driver)
      })
      commit('setDrivers', driversArray)
    })
  },
}

export const getters = {
  getDriver(state) {
    return state.driver
  },
  getDrivers(state) {
    return state.allDrivers
  },
}
