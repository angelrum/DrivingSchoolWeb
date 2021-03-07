<template>
  <v-form ref="userForm">
    <v-row>
      <v-col class="col-3 text-center">
        <v-avatar width="150" height="150">
          <img :src="avatar"
               :alt="lastname + '_' + firstname"/>
        </v-avatar>
      </v-col>
      <v-col>
        <v-row>
          <v-col>
            <v-text-field
                :readonly="!edit"
                :disabled="!edit"
                :clearable="edit"
                clear-icon="fa-times"
                v-model="lastname"
                :counter="edit ? 30: null"
                :label="$t('lastname')"
                @input="$v.lastname.$touch()"
                @blur="$v.lastname.$touch()"
                :error-messages="lastnameErrors"
                required>
            </v-text-field>
          </v-col>
          <v-col>
            <v-text-field
                :readonly="!edit"
                :disabled="!edit"
                :clearable="edit"
                clear-icon="fa-times"
                v-model="firstname"
                :counter="edit ? 30: null"
                :label="$t('firstname')"
                @input="$v.firstname.$touch()"
                @blur="$v.firstname.$touch()"
                :error-messages="firstnameErrors">
            </v-text-field>
          </v-col>
          <v-col>
            <v-text-field
                :readonly="!edit"
                :disabled="!edit"
                :clearable="edit"
                clear-icon="fa-times"
                v-model="middlename"
                :counter="edit ? 30: null"
                :label="$t('middlename')">
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
                v-model="email"
                :counter="edit ? 30: null"
                :label="$t('email')"
                :append-icon="emailStatus ? 'fa-check-circle green--text':'fa-question-circle orange--text'"
                :color="emailStatus ? 'green' : 'orange'"
                @input="$v.email.$touch()"
                @blur="$v.email.$touch()"
                :error-messages="$v.email.$dirty && !$v.email.email ? $t('user.email.email'):null">
            </v-text-field>
          </v-col>
          <v-col>
            <v-text-field
                :readonly="!edit"
                :disabled="!edit"
                :clearable="edit"
                clear-icon="fa-times"
                v-model="phone"
                :counter="edit ? 17: null"
                :label="$t('phone')"
                :append-icon="phoneStatus ? 'fa-check-circle green--text':'fa-question-circle orange--text'"
                :color="phoneStatus ? 'green' : 'orange'"
                @input="$v.phone.$touch()"
                @blur="$v.phone.$touch()"
                @keydown="convertKeyToPhoneFormat"
                :error-messages="$v.phone.$dirty && !$v.phone.required ? $t('required') : ( $v.phone.$dirty && !$v.phone.phoneFormat ? $t('phoneFormat') : null )">
            </v-text-field>
          </v-col>
          <v-col>
            <v-text-field
                type="password"
                :readonly="!edit"
                :disabled="!edit"
                v-model="password"
                :counter="edit ? 20: null"
                :label="$t('password')"
                @input="$v.password.$touch()"
                @blur="$v.password.$touch()"
                :error-messages="passwordErrors">
            </v-text-field>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <div v-if="isEdit">
      <v-row v-if="edit" class="justify-content-end">
        <v-col class="col-sm-auto" >
          <button class="btn btn-pill btn-danger" @click.prevent="$emit('refreshUser')">{{ $t('cancel') }}</button>
        </v-col>
        <v-col class="col-sm-auto">
          <button class="btn btn-pill btn-success" @click.prevent="saveProfile">{{ $t('save') }}</button>
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

import {email, required, minLength} from 'vuelidate/lib/validators'
import {vuelidate} from "@/components/mixins/vuelidate";
import {phone} from "@/components/mixins/phone";
import {helpers} from "@/components/mixins/helpers";

export default {
  name: "User",
  mixins: [vuelidate, phone, helpers],
  props: {
    isEdit: Boolean,
    inputUser: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    count: 0,
    edit: false,
    show: true,
    user: {
      type: Object
    },
    id: null,
    firstname: '',
    lastname: '',
    phone: '',
    email: '',
    emailStatus: false,
    phoneStatus: false,
    middlename: '',
    avatar: '',
    password: '',
    full_password: '******'
  }),
  validations: {
    firstname:  { required, minLength: minLength(3) },
    lastname:   { required, minLength: minLength(3) },
    email:      { email },
    phone: {
      required,
      phoneFormat(val) {
        return this.phonePattern.test(val); }
    },
    password: {required, minLength: minLength(3)}
  },
  computed: {
    lastnameErrors() {
      return this.vuelidateNameErrors('lastname');
    },
    firstnameErrors() {
      return this.vuelidateNameErrors('firstname');
    },
    passwordErrors() {
      return this.vuelidateNameErrors('password');
    }
  },
  methods: {
    async saveProfile() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return
      }
      const user = {...this.inputUser};
      Object.getOwnPropertyNames(user).forEach(val => {
        if (this.hasOwnProperty(val) && val !== 'password') user[val] = this[val];
      });
      user.password = this.password === this.full_password ? '' : this.password;
      await this.$store.dispatch('updateUser', user);
      this.$emit('refreshUser');
    },
    updateStyle() {
      document.querySelectorAll('.v-icon.v-icon--disabled')
          .forEach(el => el.classList.remove('v-icon--disabled'))
    }
  },
  mounted() {
    this.updateStyle();
    this.password = this.full_password;
  },
  watch: {
    inputUser: {
      deep: true,
      immediate: true,
      handler: function(value) {
        this.fillComponentFields(value);
      }
    },
    email: {
      handler: function (value) {
        this.emailStatus = value === this.inputUser.email;
      }
    },
    phone: {
      handler: function (value) {
        this.phoneStatus = value === this.inputUser.phone;
      }
    }
  },
  updated() {
    this.updateStyle()
  }
}
</script>

<style scoped>

</style>