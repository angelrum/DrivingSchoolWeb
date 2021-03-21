<template>
  <v-form ref="companyForm">
    <v-row>
      <v-col>
        <v-text-field
            :readonly="!edit"
            :disabled="!edit"
            :clearable="edit"
            clear-icon="fa-times"
            :counter="edit ? 90 : null"
            :label="$tc('name', 1)"
            v-model="company.name"
            @input="$v.company.name.$touch()"
            @blur="$v.company.name.$touch()"
            :error-messages="nameErrors"
        >
        </v-text-field>
      </v-col>
      <v-col class="col-5">
        <v-text-field
            :readonly="!edit"
            :disabled="!edit"
            :clearable="edit"
            clear-icon="fa-times"
            :counter="edit ? 30 : null"
            :label="$tc('name', 2)"
            v-model="company.shortName"
            @input="$v.company.shortName.$touch()"
            @blur="$v.company.shortName.$touch()"
            :error-messages="shortNameErrors"
        >
        </v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-text-field
            :readonly="!edit"
            :disabled="!edit"
            :clearable="edit"
            clear-icon="fa-times"
            :label="$tc('phone')"
            @input="$v.company.phone.$touch()"
            @blur="$v.company.phone.$touch()"
            v-model="company.phone"
            @keydown="checkPhoneKey"
            :error-messages="$v.company.phone.$dirty && !$v.company.phone.required ? $t('required')
            : ( $v.company.phone.$dirty && !$v.company.phone.phoneFormat ? $t('phoneFormat') : null )">
        </v-text-field>
      </v-col>
      <v-col>
        <v-text-field
            :readonly="!edit"
            :disabled="!edit"
            :clearable="edit"
            clear-icon="fa-times"
            :label="$tc('email')"
            @input="$v.company.email.$touch()"
            @blur="$v.company.email.$touch()"
            v-model="company.email"
            :error-messages="$v.company.email.$dirty && !$v.company.email.email ? $t('user.email.email'):null">
        >
        </v-text-field>
      </v-col>
      <v-col>
        <v-text-field
            :readonly="!edit"
            :disabled="!edit"
            :clearable="edit"
            clear-icon="fa-times"
            :label="$tc('website')"
            v-model="company.website"></v-text-field>
      </v-col>
    </v-row>
    <Address v-if="!isNull(company.addressLegal)" :in-address="company.addressLegal"
             :title="$tc('address.legal')" :edit="edit"/>
    <Address v-if="!isNull(company.addressActual) && !equalAddress" :in-address="company.addressActual"
             :title="$tc('address.actual')" :edit="edit"/>
    <label class="custom-control custom-checkbox">
      <input v-model="equalAddress" type="checkbox" role="checkbox" :disabled="!edit" class="custom-control-input">
      <span class="custom-control-label h6">Фактический адрес совпадает с юридическим</span>
    </label>
    <div v-if="isEdit">
      <v-row v-if="edit" class="justify-content-end">
        <v-col class="col-sm-auto" >
          <button class="btn btn-pill btn-danger" @click.prevent="$emit('refreshCompany')">{{ $t('cancel') }}</button>
        </v-col>
        <v-col class="col-sm-auto">
          <button class="btn btn-pill btn-success" @click.prevent="save">{{ $t('save') }}</button>
        </v-col>
      </v-row>
      <v-row v-else-if="!edit" class="justify-content-end">
        <v-col class="col-sm-auto">
          <button class="btn btn-pill btn-primary" @click.prevent="edit=!edit">{{ $t('edit') }}</button>
        </v-col>
      </v-row>
    </div>
  </v-form>
</template>

<script>
import { helpers } from "@/components/mixins/helpers";
import {email, required, minLength, numeric} from 'vuelidate/lib/validators'
import { vuelidate } from "@/components/mixins/vuelidate";
import { phone } from "@/components/mixins/phone";
import Address from "@/components/Address";

export default {
  name: "Company",
  mixins: [helpers, vuelidate, phone],
  props: ['inCompany', 'isEdit'],
  components: { Address },
  data: () => ({
    edit: false,
    equalAddress: false,
    company: {
      name: '',
      shortName: '',
      phone: '',
      email: '',
      website: '',
      addressLegal: null,
      addressActual: null
    },
  }),

  validations: {
    company: {
      name: { minLength: minLength(5), required },
      shortName: { minLength: minLength(3), required },
      phone: {
        required,
        phoneFormat(val) {
          return this.phonePattern.test(val); }
      },
      email: { email },
      addressLegal: {
        city:   { required },
        street: { required },
        floor:  { numeric }
      },
      addressActual: {
        city:   { required },
        street: { required },
        floor:  { numeric }
      }
    }
  },

  computed: {
    nameErrors() {
      return this.vuelidateNameErrors('company.name');
    },
    shortNameErrors() {
      return this.vuelidateNameErrors('company.shortName');
    },
  },
  watch: {
    inCompany: {
      deep: true,
      immediate: true,
      handler: function (value) {
        this.company = this.looseClone(value);
        this.equalAddress = this.company.addressActual.id === this.company.addressLegal.id;
      }
    }
  },
  methods: {
    async save() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return
      }
      const al = this.company.addressLegal;
      const aa = this.company.addressActual;
      if (this.equalAddress) { //адреса равны
        this.company.addressLegal = aa;
      } else if(al.id === aa.id && !this.equalAddress) { //ранее адреса были равны, но теперь их разъединили
        delete this.company.addressActual.id; //удаляем id, что бы был создан новый адрес
      }
      await this.$store.dispatch('updateCompany', this.company);
      this.$emit('refreshCompany');
    },
    checkPhoneKey(event) {
      let result = this.convertKeyToPhoneFormat(event);
      if (!this.isNull(result) && /\d/.test(result.key)) {
        let ph = this.isNull(this.company.phone) ? '' : this.company.phone;
        let value = ph.replace('+7(', '') + result.key;
        this.company.phone = this.convertStringToPhone(value);
      }
      return result;
    }
  },
  // mounted() {
  //   document.querySelectorAll('.v-input--checkbox').forEach(el => {
  //     el.classList.remove('v-input');
  //     el.getElementsByClassName('v-label').forEach(e => {
  //       e.classList.remove('v-label')
  //     })
  //   })
  // }
}
</script>
<style scoped>
.h6 label {
  font-weight: 400!important;
}
</style>