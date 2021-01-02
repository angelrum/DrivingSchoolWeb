<template>
  <v-form ref="userForm" lazy-validation>
    <v-row>
      <v-col class="col-3 text-center">
        <v-avatar width="100" height="100">
          <img :src="user.avatar"
               :alt="user.lastname + '_' + user.firstname"/>
        </v-avatar>
<!--        <v-img-->
<!--            :src="user.avatar"-->
<!--            max-height="100"-->
<!--            max-width="100"-->
<!--            class="m-auto"-->
<!--        ></v-img>-->
      </v-col>
      <v-col>
        <v-row>
          <v-col>
            <v-text-field
                :readonly="!edit"
                :disabled="!edit"
                :clearable="edit"
                v-model="user.lastname"
                :counter="edit ? 30: null"
                :label="$t('lastname')"
                :rules="[rules.required]"
                required>
            </v-text-field>
          </v-col>
          <v-col>
            <v-text-field
                :readonly="!edit"
                :disabled="!edit"
                :clearable="edit"
                v-model="user.firstname"
                :counter="edit ? 30: null"
                :label="$t('firstname')"
                :rules="[rules.required]"
                required>
            </v-text-field>
          </v-col>
          <v-col>
            <v-text-field
                :readonly="!edit"
                :disabled="!edit"
                :clearable="edit"
                v-model="user.middlename"
                :counter="edit ? 30: null"
                :label="$t('middlename')"
                required>
            </v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
                :readonly="!edit"
                :disabled="!edit"
                :clearable="edit"
                v-model="user.email"
                :counter="edit ? 30: null"
                :label="$t('email')"
                :append-icon="user.emailStatus ? 'fa-check-circle green--text':'fa-question-circle orange--text'"
                :color="user.emailStatus ? 'green' : 'orange'"
                :rules="[rules.email]"
                required>
            </v-text-field>
          </v-col>
          <v-col>
            <v-text-field
                :readonly="!edit"
                :disabled="!edit"
                :clearable="edit"
                :value="user.phone"
                :counter="edit ? 16: null"
                :label="$t('phone')"
                :rules="[rules.phone]"
                :append-icon="user.phoneStatus ? 'fa-check-circle green--text':'fa-question-circle orange--text'"
                :color="user.phoneStatus ? 'green' : 'orange'"
                @keypress="checkInputKey"
                required>
            </v-text-field>
          </v-col>
          <v-col>
            <v-text-field
                :append-icon="!show ? 'mdi-eye' : 'mdi-eye-off'"
                :type="!show ? 'text': 'password'"
                :readonly="!edit"
                :disabled="!edit"
                @click:append="show = !show"
                v-model="user.password"
                :counter="edit ? 20: null"
                :label="$t('password')"
                :rules="[rules.required, rules.min]"
                required>
            </v-text-field>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <div v-if="isEdit">
      <v-row v-if="edit" class="justify-content-end">
        <v-col class="col-sm-auto" >
          <button class="btn btn-pill btn-danger" @click.prevent="$emit('updateUser')">{{ $t('cancel') }}</button>
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

export default {
  name: "User",
  props: {
    isEdit: Boolean,
    inputUser: {
      type: Object,
      required: true
    }
  },
  data: ()=>({
    count: 0,
    edit: false,
    show: true,
    rules: {
      required: value => !!value || 'Не должно быть пустым',
      min: value => value.length >= 3 || 'Не менее 3 символов',
      email: value => {
        if (!value) return true
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return pattern.test(value) || 'Введите правильный email.'
      },
      phone: value => {
        const pattern = /^(\+7|8)[- _]*\(?[- _]*(\d{3}[- _]*\)?([- _]*\d){7}|\d\d[- _]*\d\d[- _]*\)?([- _]*\d){6})$/
        return pattern.test(value) || 'Введите правильный номер телефона.'
      }
    }
  }),
  computed: {
    user: {
      get: function () {
        return (typeof this.inputUser !== "undefined")
                ? Object.assign({}, this.inputUser) : null
      },
      set: function (value) {
        this.$store.commit("saveUser", value)
      }
    }
  },

  // computed: {
  //   user: {
  //     get: function () {
  //       return this.inputUser
  //     },
  //     set: function (value) {
  //       this.user.id = value.id
  //       this.user.active = value.active
  //       this.user.avatar = value.avatar
  //       this.user.firstname = value.firstname
  //       this.user.lastname = value.lastname
  //       this.user.middlename = value.middlename
  //       this.user.email = value.email
  //       this.user.emailStatus = value.emailStatus
  //       this.user.phone = value.phone
  //       this.user.phoneStatus = value.phoneStatus
  //       this.user.password = value.password
  //       this.user.score = value.score
  //     }
  //   }
  // },
  methods: {
    async saveProfile() {
      if (this.$refs.userForm.validate()) {
        await this.$store.dispatch('updateUser', this.user)
        await this.clearProfile()
      } else {
        this.$store.commit('setError', 'update.validation')
      }
    },
    async clearProfile() {
      this.edit = !this.edit
      const u = await this.$store.dispatch('fetchUserById', 1000)
      delete u.schools
      this.user = Object.assign({}, u)
    },
    checkInputKey(event) {
      const key = event.key
      debugger
      if (/\d/.test(key)) {
        return event
      } else {
        event.preventDefault()
      }
    },
    checkInputValue(event) {
      debugger
      console.log(event)
      const copy = Object.assign({}, this.user)
      copy.phone = '';
      this.user = copy
    },
    updateStyle() {
      document.querySelectorAll('.v-icon.v-icon--disabled')
          .forEach(el => el.classList.remove('v-icon--disabled'))
    }
  },
  mounted() {
    this.updateStyle()
  },
  updated() {
    this.updateStyle()
  }
}
</script>

<style scoped>
  .pb-21 {
    padding-bottom: 21px;
  }
</style>