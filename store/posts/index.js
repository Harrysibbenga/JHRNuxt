import moment from 'moment'
import { postsCollection } from '@/services/firebase'

export const state = () => ({
  allPosts: [],
  publishedPosts: [],
  post: null,
  postsByYear: [],
})

export const mutations = {
  setPosts(state, val) {
    if (val) {
      state.allPosts = val
    } else {
      state.allPosts = []
    }
  },
  setPostsByYear(state, val) {
    if (val) {
      state.postsByYear = val
    } else {
      state.postsByYear = []
    }
  },
  setPost(state, val) {
    if (val) {
      state.post = val
    } else {
      state.post = null
    }
  },
  setPublishedPosts(state, val) {
    if (val) {
      state.publishedPosts = val
    } else {
      state.publishedPosts = null
    }
  },
  clearPost(state) {
    state.post = null
  },
  clearPosts(state) {
    state.allPosts = null
  },
}

export const actions = {
  setPost({ commit }, id) {
    postsCollection
      .doc(id)
      .get()
      .then((doc) => {
        const post = doc.data()
        commit('setPost', post)
      })
  },
  setPostSlug({ commit }, slug) {
    return new Promise((resolve) => {
      postsCollection
        .where('slug', '==', slug)
        .get()
        .then((docs) => {
          docs.forEach((doc) => {
            const post = doc.data()
            post.id = doc.id
            commit('setPost', post)
            resolve(post)
          })
        })
        .catch(function (error) {
          console.log('Error getting documents: ', error)
        })
    })
  },
  setPosts({ commit }) {
    postsCollection.orderBy('date', 'desc').onSnapshot((querySnapshot) => {
      const now = moment().format()
      const postsArray = []

      querySnapshot.forEach((doc) => {
        const post = doc.data()
        post.id = doc.id
        if (!post.published) {
          postsCollection
            .doc(post.id)
            .update({
              published: now,
            })
            .then(function () {
              console.log('Document successfully updated!')
            })
            .catch(function (error) {
              console.error('Error updating document: ', error)
            })
        }
        if (!post.gallery) {
          postsCollection.doc(post.id).update({
            gallery: [],
          })
        }
        if (!post.quoteContent) {
          postsCollection.doc(post.id).update({
            quoteContent: '',
          })
        }
        postsArray.push(post)
      })
      commit('setPosts', postsArray)
      commit(
        'setPublishedPosts',
        postsArray.filter((post) => now >= post.published)
      )
    })
  },
  setPostsByYear({ commit }, year) {
    postsCollection
      .where('year', '==', year)
      .orderBy('date', 'desc')
      .onSnapshot((doc) => {
        const postsArray = []

        doc.forEach((doc) => {
          const post = doc.data()
          post.id = doc.id
          postsArray.push(post)
        })
        commit('setPostsByYear', postsArray)
      })
  },
}

export const getters = {
  getPost(state) {
    return state.post
  },
  getPosts(state) {
    return state.allPosts
  },
  getPublishedPosts(state) {
    return state.publishedPosts
  },
  getPostsByYear(state) {
    return state.postsByYear
  },
  getPage(state) {
    return state.page
  },
}
