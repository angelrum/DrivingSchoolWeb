<template>
  <div>
    <div class="header">
      <h1 class="header-title">
        Добрый день, Иван!
      </h1>
      <p class="header-subtitle">У вас есть необработанные сообщения.</p>
    </div>
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header">
            <h5 class="card-title">Профиль пользователя</h5>
            <h6 class="card-subtitle text-muted">Профиль текущего пользователя.</h6>
          </div>
          <div class="card-body">
            <Loader v-if="loadUser"/>
            <User v-else :is-edit="true" :input-user="user" @refreshUser="getUserData"/>
          </div>
        </div>
      </div>
    </div>
    <div v-if="!isNull(company)" class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header">
            <h6 class="card-title">Данные о компании.</h6>
          </div>
          <div class="card-body">
            <Loader v-if="loadCompany"/>
            <Company v-else :in-company="company" @refreshCompany="getCompanyData" :is-edit="this.$store.getters.isAdmin"/>
          </div>
        </div>
      </div>
    </div>
    <div v-if="!isNull(schools)" class="row">
      <div class="col-md-12">
        <Loader v-if="loadSchools"/>
        <Schools v-else :schools="schools"/>
      </div>
    </div>
  </div>
</template>

<script>
import User from "@/components/User";
import Schools from "@/components/Schools";
import Company from "@/components/Company";
import Loader from "@/components/app/Loader";
import {helpers} from "@/components/mixins/helpers";

export default {
  name: "Profile",
  mixins: [helpers],
  components: {Company, Schools, User, Loader },
  data: () => ({
    user: {
      id: null,
      active: true,
      avatar: '',
      firstname: '',
      lastname: '',
      middlename: '',
      email: '',
      emailStatus: false,
      phone: '',
      phoneStatus: false,
      score: 0
    },
    schools: null,
    company: null,
    loadUser: true,
    loadCompany: true,
    loadSchools: true
  }),
  async mounted() {
    //получаем все данные: пользователя, компанию, школы
    this.$store.dispatch('getAuthUser').then(async authUser => {
          const user = await this.$store.dispatch('fetchUserById', authUser.id);
          if (user.hasOwnProperty('schools')) {
            this.schools = {...user.schools};
            delete user.schools;
          }
          if (user.hasOwnProperty('company')
              && authUser.roles.includes('ADMIN')) {
            this.company = {...user.company};
            delete user.company;
          }
          this.user = user;
        })
        .finally(()=> setTimeout(() => {
          this.loadUser = false;
          this.loadSchools = false;
          this.loadCompany = false;
        }, 500))
  },
  methods: {
    //обновляем только пользователя
    async getUserData() {
      this.loadUser = true;
      this.$store.dispatch('refreshAuthUser').then((user) => {
        delete user.schools;
        delete user.company;
        this.user = {...user}
      }).finally(()=> setTimeout(() => {this.loadUser = false;}, 500))
    },
    //обновляем только данные компании
    async getCompanyData() {
      this.loadCompany = true;
      this.$store.dispatch('refreshAuthUser').then((user) => {
        this.company = ( user.hasOwnProperty('company')
            && this.$store.getters.isAdmin )
            ? {...user.company} : null;
      }).finally(()=> setTimeout(() => {this.loadCompany = false;}, 500));
    }
  }
}
</script>

<style scoped>

</style>