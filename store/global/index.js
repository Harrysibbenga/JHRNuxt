export const state = () => ({
  loading: false,
  modal: false,
})

export const mutations = {
  setLoading(state, val) {
    state.loading = val
  },
  setModal(state, val) {
    state.modal = val
  },
}

export const actions = {
  setLoading({ commit }, value) {
    commit('setLoading', value)
  },
  setModal({ commit }, value) {
    commit('setModal', value)
  },
}

export const getters = {
  getLoading(state) {
    return state.loading
  },
  getModal(state) {
    return state.modal
  },
}
