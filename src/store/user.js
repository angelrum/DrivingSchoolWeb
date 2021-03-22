import axios from "axios";

const instance = axios.create({withCredentials : true})
const userUrl = 'http://localhost:8080/users/';
export default {
    actions: {
        async fetchUserById({commit, dispatch}, id) {
            return await instance.get(userUrl + id)
                .then(response => response.data)
                .catch(e => dispatch('checkAuthError', e))
        },
        async updateUser({commit, dispatch}, user) {
            await instance.put(userUrl, user)
                .then(() => commit('setSuccess', 'update.success'))
                .catch(e => dispatch('checkAuthError', e));
        }
    }
    // mutations: {
    //     saveUser(state, user) {
    //         state.user = user
    //     }
    // }
}