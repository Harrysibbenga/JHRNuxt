import { gb4Collection } from '@/services/firebase'

export const state = () => ({
  fixtures: [],
  fixture: '',
})

export const mutations = {
  setFixture(state, val) {
    state.fixture = val
  },
  setFixtures(state, val) {
    state.fixtures = val
  },
}

export const actions = {
  setFixture({ commit }, id) {
    gb4Collection
      .doc(id)
      .get()
      .then((doc) => {
        const fixture = doc.data()
        fixture.id = doc.id
        commit('setFixture', fixture)
      })
  },
  setFixtures({ commit }) {
    gb4Collection.orderBy('date').onSnapshot((querySnapshot) => {
      const fixturesArray = []

      querySnapshot.forEach((doc) => {
        const fixture = doc.data()
        fixture.id = doc.id
        fixturesArray.push(fixture)
      })
      commit('setFixtures', fixturesArray)
    })
  },
}

export const getters = {
  getFixture(state) {
    return state.fixture
  },
  getFixtures(state) {
    return state.fixtures
  },
}
