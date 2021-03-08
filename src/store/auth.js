import axios from "axios";
import store from '@/store'
import router from "@/router";
const authUrl = 'http://localhost:8080/auth/';

//https://webdevblog.ru/autentifikacii-v-vue-s-ispolzovaniem-vuex/
export default {
    state: {
        status: '',
        token: localStorage.getItem('token') || '',
        user:  localStorage.getItem('auth_user') || ''
    },
    actions: {
        async login ({commit, dispatch}, {username, password}) {
            commit('auth_request');
            return await axios.post(authUrl + 'login', {}, {
                auth: {username, password}
            }).then(async (response) => {
                    const token = response.headers['x-csrf-token'];
                    const user = response.data;
                    await dispatch('successProcess', {user, token}); //нужно дождаться записи
                    return user;
                }, (error) => {
                    dispatch('errorProcess', error)
                    throw error;
                });
            },
        async logout({commit}) {
            commit('logout');
            await axios.post(authUrl + 'logout', {})
                .finally(() => {
                    localStorage.removeItem('token');
                    localStorage.removeItem('auth_user');
                    delete axios.defaults.headers.common['x-csrf-token'];
                })
        },
        //получаем авторизованного пользователя из localStorage или перезапрашиваем из БД с обновлением localStorage
        getAuthUser({dispatch}) {
            return new Promise((resolve, reject) => {
                let authUser = store.getters.authUser;
                if (Object.keys(authUser).length === 0) {
                    dispatch('refreshAuthUser').then(result => resolve(result))
                } else {
                    resolve(authUser);
                }
            })
        },
        refreshAuthUser({dispatch}) { //обновляем localStorage
            return new Promise(((resolve, reject) => {
                axios.get(authUrl + 'user', {})
                    .then((response) => {
                        const token = response.headers['x-csrf-token'];
                        const user = response.data;
                        dispatch('successProcess', {user, token});
                        resolve(user);
                }, (error) => {
                        dispatch('checkAuthError', error)
                        reject(error);
                    })
            }))
        },
        checkAuthError({dispatch, commit}, e) {
            commit('setError', e)
            if (e.response.status === 401 || e.response.status === 404) {
                dispatch('logout');
                router.push('/login');
                return e;
            }
            throw e;
        },
        successProcess({commit}, {user, token}) {
            localStorage.setItem('auth_user', JSON.stringify(user));
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
            // state.user = user;
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
        isLoggedIn: state => !!state.user,
        authStatus: state => state.status,
        isAdmin: state => {
            let user = JSON.parse(state.user);
            return user.roles.includes('ADMIN');
        },
        authUser: state => {
            let user = state.user;
            try { return JSON.parse(user);}
            catch (e) { return user;}
        }
    }
}