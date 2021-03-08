<template>
  <div class="text-center mt-4">
    <h1 class="h2">{{ $t('sign.welcome') }}</h1>
    <p class="lead">{{$t('sign.title')}}</p>
    <div class="card">
      <div class="card-body">
        <div class="m-md-5">
          <v-img class="m-auto" src="https://img.icons8.com/bubbles/100/000000/car.png" height="120px" width="120px"/>
          <v-form ref="authForm" @submit.prevent="signIn">
            <v-row>
              <v-col>
                <v-text-field
                    v-model="phone"
                    prepend-inner-icon="fas fa-phone"
                    :label="$t('phone')"
                    clearable
                    clear-icon="fa-times"
                    @keydown="convertKeyToPhoneFormat"
                    @input="$v.phone.$touch()"
                    @blur="$v.phone.$touch()"
                    :error-messages="$v.phone.$dirty && !$v.phone.required ? $t('required') : ( $v.phone.$dirty && !$v.phone.phoneFormat ? $t('phoneFormat') : null )"
                    class="f-size"
                    :success="success"
                    :error="error">
                </v-text-field>
                <v-text-field
                    v-model = "password"
                    :append-icon="show ? 'fa-eye' : 'fa-eye-slash'"
                    :type="show ? 'text': 'password'"
                    @click:append="show = !show"
                    prepend-inner-icon="fa-unlock-alt"
                    :label="$t('password')"
                    @input="$v.password.$touch()"
                    @blur="$v.password.$touch()"
                    :error-messages="passwordErrors"
                    :success="success"
                    :error="error">
                </v-text-field>
              </v-col>
            </v-row>
            <v-snackbar
                v-model="error"
                :timeout="timeout"
                rounded="pill"
                color="red darken-2">
              {{ $t('sign.auth.error') }}
              <template v-slot:action="{ attrs }">
                <v-icon class="m-sm-3" @click="error = false">fas fa-times</v-icon>
              </template>
            </v-snackbar>
            <v-row>
              <v-col class="col-sm-auto m-auto">
                <v-btn type="submit"
                    depressed
                    color="primary">{{$t('sign.in')}}
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { phone } from "@/components/mixins/phone";
import { vuelidate } from "@/components/mixins/vuelidate";
import { required } from 'vuelidate/lib/validators'

export default {
  mixins: [phone, vuelidate],
  name: "Login",
  data: () => ({
    show: false,
    phone: "",
    password: "",
    success: false,
    error: false,
    timeout: 2000
  }),
  validations: {
    password: { required },
    phone: {
      required,
      phoneFormat(val) {
        return this.phonePattern.test(val); }
    },
  },
  computed: {
    passwordErrors() {
      return this.vuelidateNameErrors('password');
    }
  },
  methods: {
    async signIn() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return
      }
      await this.$store.dispatch('login', { username: this.phone, password: this.password })
          .then(() => {
            this.success = true;
            setTimeout(() => { this.$router.push({name: 'home'}) }, 500)
          })
          .catch(() => {
            this.error = true;
          });
    }
  },
  mounted() {
    this.phone = '+7(911) 111-11-11';
    this.password = '12345'
  }
}
</script>

<style scoped>
.text-center >>> input {
  text-align: center;
}
.text-center >>> label {
  margin-left: 10px;
}
.f-size {
  font-size: 1.5em;
}

</style>