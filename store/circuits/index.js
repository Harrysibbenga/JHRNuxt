import { circuitsCollection } from '@/services/firebase'

export const state = () => ({
  circuit: '',
  circuits: [],
})

export const mutations = {
  setCircuit(state, val) {
    state.circuit = val
  },
  setCircuits(state, val) {
    state.circuits = val
  },
}

export const actions = {
  setCircuit({ commit }, id) {
    circuitsCollection
      .doc(id)
      .get()
      .then((doc) => {
        const circuit = doc.data()
        commit('setCircuit', circuit)
      })
  },
  setCircuits({ commit }) {
    circuitsCollection.orderBy('title', 'desc').onSnapshot((querySnapshot) => {
      const circuitsArray = []

      querySnapshot.forEach((doc) => {
        const circuit = doc.data()
        circuit.id = doc.id
        circuitsArray.push(circuit)
      })
      commit('setCircuits', circuitsArray)
    })
  },
}

export const getters = {
  getCircuit(state) {
    return state.circuit
  },
  getCircuits(state) {
    return state.circuits
  },
}
