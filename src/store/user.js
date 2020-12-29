import axios from "axios";
const userUrl = 'http://localhost:8080/users/'

export default {
    actions: {
        async fetchUserById({commit, dispatch}, id) {
            try {
                const response = await axios.get(userUrl + id)
                return response.data
            } catch (e) {
                throw e
            }
        }
    }
}