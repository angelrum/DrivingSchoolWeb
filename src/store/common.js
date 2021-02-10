export default {
    state: {
        phonePattern: /^(\+7|8)[- _]*\(?[- _]*(\d{3}[- _]*\)?([- _]*\d){7}|\d\d[- _]*\d\d[- _]*\)?([- _]*\d){6})$/
    },
    actions: {
        convertStringToPhone({}, value) {
            let phonenumber = '+7(';
            for (let num of value) {
                if (/\d/i.test(num) && phonenumber.length < 17) {
                    switch (phonenumber.length) {
                        case 6:phonenumber += ") "; break;
                        case 11:
                        case 14: phonenumber += "-"; break;
                    }
                    phonenumber += num;
                }
            }
            phonenumber = phonenumber.substring(0, phonenumber.length - 1)
            return phonenumber;
        }
    }, getters: {
        phonePattern: state => state.phonePattern
    }
}