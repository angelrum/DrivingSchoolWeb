export const vuelidate = {
    methods: {
        vuelidateNameErrors(field) {
            const errors = [];
            let v = this.$v;
            //если валидация на уровне поля класса (address.city), то необходимо до этого уровня провалиться
            field.toString().split('.').forEach(value => {
                v = (v!==null && v.hasOwnProperty(value)) ? v[value] : null;
            })
            if (v!==null) {
                if (!v.$dirty) return errors
                //пробигаемся по всем параметрам валидации, установленным полю
                Object.getOwnPropertyNames(v.$params).forEach(param => {
                    if (!v[param]) {
                        let message = this.$t(param); //собираем текст ошибки
                        if (message.includes('{}')) { //если есть символ {} то нужно подменить его на значение св-ва min или max
                            let text = v.$params[param].hasOwnProperty('min') ? v.$params[param]['min']
                                : (v.$params[param].hasOwnProperty('max') ? v.$params[param]['max'] : '')
                            message = message.replace('{}', text);
                        }
                        errors.push(message);
                    }
                })
            }
            return errors;
        }
    }
}