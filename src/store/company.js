import axios from "axios";
const companyUrl = 'http://localhost:8080/companies/'

export default {
    actions: {
        async updateCompany({commit, dispatch}, company) {
            await axios.put(companyUrl, company)
                .then(() => commit('setSuccess', 'update.success'))
                .catch(e => dispatch('checkAuthError', e));
        }
    }
}