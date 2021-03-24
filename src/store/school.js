import axios from "axios";

const schoolUrl = 'http://localhost:8080/schools/';
const instance = axios.create({withCredentials : true});

export default {
    actions: {
        async fetchAllSchool({dispatch}) {
            return await instance.get(schoolUrl)
                .then(response => response.data)
                .catch(e => dispatch('checkAuthError', e))
        },
        async fetchSchoolById({commit, dispatch}, schoolId) {
            return await instance.get(schoolUrl + schoolId)
                .then(response => response.data)
                .catch(e => dispatch('checkAuthError', e))
        },
        async updateSchool({commit, dispatch}, school) {
            await instance.put(schoolUrl, school)
                .then(() => commit('setSuccess', 'update.success'))
                .catch(e => dispatch('checkAuthError', e));
        }

    }
}