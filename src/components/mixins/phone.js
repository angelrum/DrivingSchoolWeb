export const phone = {
    data: () => ({
        phonePattern: /^(\+7|8)[- _]*\(?[- _]*(\d{3}[- _]*\)?([- _]*\d){7}|\d\d[- _]*\d\d[- _]*\)?([- _]*\d){6})$/
    }),
    methods: {
        convertKeyToPhoneFormat(event) {
            const key = event.key;
            if (/\d/.test(key)) {
                let ph = this.phone === null || this.phone === undefined ? '' : this.phone;
                let value = ph.replace('+7(', '') + key;
                this.phone = this.convertStringToPhone(value);
                return event;
            } else if (Object.is(key, 'Backspace')) {
                return event;
            } else {
                event.preventDefault();
            }
        },
        convertStringToPhone(value) {
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
    }
}