import axios from "axios";
import Vue from 'vue'
const userUrl = 'http://localhost:8080/users/'

export default {
    actions: {
        async fetchUserById({commit, dispatch}, id) {
            try {
                const response = await axios.get(userUrl + id)
                return response.data
            } catch (e) {
                Vue.prototype.$noty.error("Ошибка при получении данных")
                throw e
            }
        }
    }
}