import axios from "axios";
const userUrl = 'http://localhost:8080/users/'

export default {
    actions: {
        async fetchUserById({commit, dispatch}, id) {
            try {
                const response = await axios.get(userUrl + id)
                return response.data
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async updateUser({commit, dispatch}, user) {
            try {
                await axios.put(userUrl, user)
                commit('setSuccess', 'update.success')
            } catch (e) {
                commit('setError', e)
                throw e
            }
        }
    },
    mutations: {
        saveUser(state, user) {
            state.user = user
        }
    }
}