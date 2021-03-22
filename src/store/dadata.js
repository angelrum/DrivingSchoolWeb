import axios from "axios";

const url = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address';
const TOKEN_API = 'd9809965bb90740fcc038682048212efb1985623';
const query = {
    count: 10,
    from_bound: { value: "region" },
    to_bound: { value: "house" },
    locations: [
        { country_iso_code: 'RU'}
    ]
}

export default {
    actions: {
        async fetchSuggestions({}, val) {
            const payload = {...JSON.parse(JSON.stringify(query)), query: val };
            return await axios.post(url, payload, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Token ${TOKEN_API}`
                }
            });
        }
    }
}

