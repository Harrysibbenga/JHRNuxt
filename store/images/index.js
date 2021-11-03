import { imageCollection, storage } from '@/services/firebase'

export const state = () => ({
  image: {},
  images: [],
  msg: {},
})

export const mutations = {
  setImage(state, val) {
    state.image = val
  },
  setImages(state, val) {
    state.images = val
  },
  setMsg(state, val) {
    state.msg = val
  },
}

export const actions = {
  uploadImage({ commit }, payload) {
    return new Promise((resolve, reject) => {
      const file = payload.file
      const alt = payload.alt
      const storageRef = storage.ref('images/' + file.name)
      const uploadTask = storageRef.put(file)

      this.$store.dispatch('global/setLoading', true)

      uploadTask.on(
        'state_changed',
        () => {
          // snapshot
        },
        () => {
          // Handle unsuccessful uploads
        },
        () => {
          // Handle successful uploads on complete
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            imageCollection
              .add({
                name: file.name,
                createdOn: new Date(),
                url: downloadURL,
                alt,
              })
              .then((doc) => {
                const id = doc.id
                imageCollection
                  .doc(id)
                  .get()
                  .then((doc) => {
                    const img = doc.data()
                    img.id = id
                    resolve(img)
                    this.$store.dispatch('global/setLoading', false)
                  })
                  .catch((err) => {
                    this.$store.dispatch('global/setLoading', false)
                    const msg = {
                      type: 'warning',
                      message: err.message,
                    }
                    commit('setMsg', msg)
                    reject(err)
                    setTimeout(() => {
                      commit('setMsg', {})
                    }, 8000)
                  })
              })
              .catch((err) => {
                this.$store.dispatch('global/setLoading', false)
                const msg = {
                  type: 'warning',
                  message: err.message,
                }
                commit('setMsg', msg)
                setTimeout(() => {
                  commit('setMsg', {})
                }, 8000)
              })
          })
        }
      )
    })
  },
  setImages({ commit }) {
    imageCollection.orderBy('createdOn', 'desc').onSnapshot((querySnapshot) => {
      const imagesArray = []

      querySnapshot.forEach((doc) => {
        const image = doc.data()
        image.id = doc.id
        imagesArray.push(image)
      })
      commit('setImages', imagesArray)
    })
  },
}

export const getters = {
  getImage(state) {
    return state.image
  },
  getImages(state) {
    return state.images
  },
  getMsg(state) {
    return state.msg
  },
}
