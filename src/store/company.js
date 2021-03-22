import axios from "axios";

const companyUrl = 'http://localhost:8080/companies/'
const instance = axios.create({withCredentials: true});

export default {
    actions: {
        async updateCompany({commit, dispatch}, company) {
            await instance.put(companyUrl, company)
                .then(() => commit('setSuccess', 'update.success'))
                .catch(e => dispatch('checkAuthError', e));
        }
    }
}