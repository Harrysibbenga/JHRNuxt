import { videoCollection, storage } from '@/services/firebase'

export const state = () => ({
  video: '',
  videos: [],
  msg: {},
})

export const mutations = {
  setVideo(state, val) {
    state.video = val
  },
  setVideos(state, val) {
    state.videos = val
  },
  setMsg(state, val) {
    state.msg = val
  },
}

export const actions = {
  uploadVideo({ commit }, payload) {
    return new Promise((resolve) => {
      const file = payload.file
      const alt = payload.alt
      const storageRef = storage.ref('videos/' + file.name)
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
            videoCollection
              .add({
                name: file.name,
                createdOn: new Date(),
                url: downloadURL,
                alt,
              })
              .then((doc) => {
                const id = doc.id
                videoCollection
                  .doc(id)
                  .get()
                  .then((doc) => {
                    const video = doc.data()
                    video.id = id
                    commit('setVideo', video)
                    resolve(video)
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
  setVideos({ commit }) {
    videoCollection.orderBy('createdOn').onSnapshot((querySnapshot) => {
      const videoArray = []

      querySnapshot.forEach((doc) => {
        const video = doc.data()
        video.id = doc.id
        videoArray.push(video)
      })
      commit('setVideos', videoArray)
    })
  },
}
export const getters = {
  getVideo(state) {
    return state.video
  },
  getVideos(state) {
    return state.videos
  },
  getMsg(state) {
    return state.msg
  },
}
