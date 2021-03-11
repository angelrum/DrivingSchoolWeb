import axios from "axios";
const schoolUrl = 'http://localhost:8080/schools/'

export default {
    actions: {
        async fetchAllSchool({dispatch}) {
            return await axios.get(schoolUrl)
                .then(response => response.data)
                .catch(e => dispatch('checkAuthError', e))
        },
        async fetchSchoolById({commit, dispatch}, schoolId) {
            return await axios.get(schoolUrl + schoolId)
                .then(response => response.data)
                .catch(e => dispatch('checkAuthError', e))
        },
        async updateSchool({commit, dispatch}, school) {
            await axios.put(schoolUrl, school)
                .then(() => commit('setSuccess', 'update.success'))
                .catch(e => dispatch('checkAuthError', e));
        }

    }
}