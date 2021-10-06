import service from '../services/profile-service';

export const state = () => ({
  me: null,
});

export const mutations = {
  SET_RESOURCE: (state, me) => {
    state.me = me;
  }
};

export const actions = {
  async getConnectors() {
    const data = {
      "table": "API-Connectors",
      "query": "findAll",
      "record": null
    };
    return await this.$axios.post("data-function", data).then(response => {
      return response.data;
    });
  },
  async getMyRequest() {
    const data = {
      "table": "Requests",
      "query": "findAll",
      "record": null
    };
    return await this.$axios.post("data-function", data).then(response => {
      return response.data;
    });
  },

  me({ commit, dispatch }, params) {
    return service.get(params, this.$axios)
      .then((profile) => {
        commit('SET_RESOURCE', profile.list);
      });
  },

  update({ commit, dispatch }, params) {
    return service.update(params, this.$axios)
      .then((profile) => {
        commit('SET_RESOURCE', profile);
      });
  },
};

export const getters = {
  me: state => state.me
};
