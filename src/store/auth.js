import axios from "axios";
import store from '@/store'
const authUrl = 'http://localhost:8080/auth/';

//https://webdevblog.ru/autentifikacii-v-vue-s-ispolzovaniem-vuex/
export default {
    state: {
        status: '',
        token: localStorage.getItem('token') || '',
        user: {}
    },
    actions: {
        async login ({commit, dispatch}, {username, password}) {
            commit('auth_request');
            return await axios.post(authUrl + 'login', {}, {
                auth: {username, password}
            }).then((response) => {
                    const token = response.headers['x-csrf-token'];
                    const user = response.data;
                    dispatch('successProcess', {user, token});
                    return user;
                }, (error) => {
                    dispatch('errorProcess', error)
                });
            },
        async logout({commit}) {
            return new Promise(((resolve, reject) => {
                commit('logout');
                localStorage.removeItem('token');
                delete axios.defaults.headers.common['x-csrf-token'];
                resolve()
            }))
        },
        getAuthUser({commit, dispatch}) {
            return new Promise((resolve, reject) => {
                let authUser = store.getters.authUser;
                if (!!authUser) {
                    axios.get(authUrl + 'user', {})
                        .then((response) => {
                            const token = response.headers['x-csrf-token'];
                            const user = response.data;
                            dispatch('successProcess', {user, token});
                            resolve(user);
                        }, (error) => {
                            dispatch('errorProcess', error)
                            reject(error);
                        })
                } else {
                    resolve(authUser);
                }

            })
        },
        successProcess({commit}, {user, token}) {
            localStorage.setItem('token', token);
            axios.defaults.headers.common['x-csrf-token'] = token;
            commit('auth_success', {token, user});
        },
        errorProcess({commit}, error) {
            console.log(error)
            localStorage.removeItem('token');
            delete axios.defaults.headers.common['x-csrf-token'];
            commit('auth_error');
        }
    },
    mutations: {
        auth_request(state) {
            state.status = 'loading'
        },
        auth_success(state, {token, user}) {
            state.status = 'success';
            state.token = token;
            state.user = user;
        },
        auth_error(state) {
            state.status = 'error';
        },
        logout(state) {
            state.status = '';
            state.token = '';
        }
    },
    getters: {
        isLoggedIn: state => !!state.token,
        authStatus: state => state.status,
        authUser: state => state.user
    }
}