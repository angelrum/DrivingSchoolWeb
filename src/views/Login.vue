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
                    v-model="login"
                    prepend-inner-icon="fas fa-phone"
                    :label="$t('phone')"
                    clearable
                    clear-icon="fa-times"
                    @keydown="convertInputValue"
                    :rules="[rules.required, rules.phonenumber]"
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
                    :rules="[rules.required]"
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
                <v-btn
                    depressed
                    color="primary"
                    type="submit">{{$t('sign.in')}}
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
export default {
name: "Login",
  data: () => ({
    show: false,
    login: "",
    password: "",
    success: false,
    rules: {
      required: value => !!value || 'Не должно быть пустым',
      phonenumber: value => {
        const pattern = /^(\+7|8)[- _]*\(?[- _]*(\d{3}[- _]*\)?([- _]*\d){7}|\d\d[- _]*\d\d[- _]*\)?([- _]*\d){6})$/
        return pattern.test(value) || 'Введите правильный номер телефона.'
      }
    },
    error: false,
    timeout: 2000
  }),
  methods: {
    async convertInputValue(event) {
      const key = event.key
      if (/\d/.test(key)) {
        let phone = Object.is(this.login, null) ? "" : this.login;
        let value = phone.replace('+7(', '') + key;
        this.login = await this.$store.dispatch("convertStringToPhone", value)
        return event;
      } else if (Object.is(key, 'Backspace')) {
        return event;
      } else {
        event.preventDefault();
      }
    },
    async signIn() {
      if (this.$refs.authForm.validate()) {
        await this.$store.dispatch("login", { username: this.login, password: this.password })
            .then(() => {
              this.success = true;
              setTimeout(() => { this.$router.push('/') }, 500)})
            .catch(err => this.error = true);
      }
    }
  },
  mounted() {
    this.login = '+7(911) 111-11-11';
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