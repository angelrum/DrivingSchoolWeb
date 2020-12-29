<template>
  <v-form>
    <v-row>
      <v-col class="col-3 m-auto">
        <v-img
            :src="user.avatar"
            max-height="100"
            max-width="100"
            class="m-auto"
        ></v-img>
      </v-col>
      <v-col>
        <v-row>
          <v-col>
            <v-text-field
                :readonly="!edit"
                :clearable="edit"
                v-model="user.lastname"
                :counter="edit ? 30: null"
                label="Фамилия"
                :rules="[rules.required]"
                required>
            </v-text-field>
          </v-col>
          <v-col>
            <v-text-field
                :readonly="!edit"
                :clearable="edit"
                v-model="user.firstname"
                :counter="edit ? 30: null"
                label="Имя"
                :rules="[rules.required]"
                required>
            </v-text-field>
          </v-col>
          <v-col>
            <v-text-field
                :readonly="!edit"
                :clearable="edit"
                v-model="user.middlename"
                :counter="edit ? 30: null"
                label="Отчество"
                required>
            </v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
                :readonly="!edit"
                :clearable="edit"
                v-model="user.email"
                :counter="edit ? 30: null"
                label="Email"
                :append-icon="user.emailStatus ? 'fa-check-circle green--text':'fa-question-circle orange--text'"
                :color="user.emailStatus ? 'green' : 'orange'"
                :rules="[rules.email]"
                required>
            </v-text-field>
          </v-col>
          <v-col>
            <v-text-field
                :readonly="!edit"
                :clearable="edit"
                v-model="user.phone"
                :counter="edit ? 16: null"
                label="Номер телефона"
                :rules="[rules.phone]"
                :append-icon="user.phoneStatus ? 'fa-check-circle green--text':'fa-question-circle orange--text'"
                :color="user.phoneStatus ? 'green' : 'orange'"
                required>
            </v-text-field>
          </v-col>
          <v-col>
            <v-text-field
                :append-icon="!show ? 'mdi-eye' : 'mdi-eye-off'"
                :type="!show ? 'text': 'password'"
                :readonly="!edit"
                @click:append="show = !show"
                v-model="user.password"
                :counter="edit ? 20: null"
                label="Пароль"
                :rules="[rules.required]"
                required>
            </v-text-field>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <div v-if="isEdit">
      <v-row v-if="edit" class="justify-content-end">
        <v-col class="col-sm-auto" >
          <button class="btn btn-pill btn-danger" @click.prevent="clearProfile">Отменить</button>
        </v-col>
        <v-col class="col-sm-auto">
          <button class="btn btn-pill btn-success">Сохранить</button>
        </v-col>
      </v-row>
      <v-row v-else-if="!edit" class="justify-content-end">
        <v-col class="col-sm-auto">
          <button class="btn btn-pill btn-primary" @click.prevent="edit=!edit">Изменить</button>
        </v-col>
      </v-row>
    </div>
  </v-form>
</template>

<script>
export default {
  name: "User",
  props: ['isEdit'], //можно ли редактировать форму
  data: ()=>({
    edit: false,
    show: true,
    user: {
      id: null,
      active: true,
      avatar: 'https://img.icons8.com/bubbles/100/000000/elvis-presley.png',
      firstname: '',
      lastname: '',
      middlename: '',
      email: '',
      emailStatus: false,
      phone: '',
      phoneStatus: false,
      password:'',
      score: 0
    },
    rules: {
      required: value => !!value || 'Не должно быть пустым',
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
  methods: {
    saveProfile() {

    },
    async clearProfile() {
      this.edit = !this.edit
      this.user = await this.$store.dispatch('fetchUserById', 1000)
    }
  },
  async mounted() {
    this.user = await this.$store.dispatch('fetchUserById', 1000)
  }
}
</script>

<style scoped>
  .pb-21 {
    padding-bottom: 21px;
  }
</style>