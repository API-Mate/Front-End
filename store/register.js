export const state = () => ({
  // register properties
  newUserRegistered: false
})

/* REGISTER SHOP CUSTOMER - CREATE NEW USER */
export const actions = {
  async create({ commit }, data) {
    /* send register action to API */
    await this.$axios.post('/authentication-function', {
      action: "register",
      data: { fname: data.attributes.fname, lname: data.attributes.lname, email: data.attributes.email, password: data.attributes.password }
    })

    /* extract login data  */
    const loginData = {
      action: 'login',
      data: {
        email: data.attributes.email,
        password: data.attributes.password
      }
    }

    /* login newly created user and redirect to home (redirect config is in nuxt.config) */
    this.$auth.loginWith('local', {
      data: loginData
    })

    /* update store */
    commit('newUserRegistered', true)

    Promise.resolve(true)
  }
}

// The mutations available in the store
// These are used to modify the store's state data
// It is not allowed to change the store state outside of mutations
export const mutations = {
  /**
   * Get the status of the newly created user needed for showing success toast after redirect
   * needed also for diferentiating cases where an user is redirected bu middleware 'auth'
   */
  newUserRegistered(state, status) {
    state.newUserRegistered = status
  }
}
