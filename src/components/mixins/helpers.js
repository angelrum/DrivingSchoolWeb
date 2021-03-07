export const helpers = {
    methods: {
        //переносим значение полей объекта в поля компонента
        fillComponentFields (value) {
            Object.getOwnPropertyNames(value).forEach(val => {
                if (this.hasOwnProperty(val) && val !== 'password')
                    this[val] = value[val];
            });
        },

        isObject (obj){
            return obj !== null && typeof obj === 'object'
        },

        isBoolean (val) {
            return typeof val === 'boolean'
        },

        isString (val) {
            return typeof val === 'string'
        },
        isNull (val) {
            return val === null || val === undefined
        },

        isFunction (val) {
            return typeof val === 'function'
        },
        looseClone (obj) {
            return JSON.parse(JSON.stringify(obj))
        }
    }

}