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
            <Loader v-if="loading"/>
            <User v-else :is-edit="true" :input-user="user" @updateUser="getUserData"/>
          </div>
        </div>
      </div>
    </div>
    <div v-if="!Object.is(company, null)" class="row">
      <div class="col-md-12">
        <Loader v-if="loading"/>
        <Company v-else :company="company"/>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <Loader v-if="loading"/>
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

export default {
  name: "Profile",
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
      password:'',
      score: 0
    },
    schools: null,
    company: null,
    loading: true
  }),
  async mounted() {
    this.getUserData();
  },
  methods: {
    getUserData() {
      this.loading = true;
      this.$store.dispatch('getAuthUser')
          .then(async authUser => {
            debugger
            const user = await this.$store.dispatch('fetchUserById', authUser.id);
            if (user.hasOwnProperty('schools')) {
              this.schools = Object.assign([], user.schools);
              delete user.schools;
            }
            if (user.hasOwnProperty('company')) {
              this.company = Object.assign([], user.company);
              delete user.company;
            }
            this.user = user;
            return user;
          })
          .finally(()=> setTimeout(() => {
            this.loading = false;
          }, 500))
    }
  }
}
</script>

<style scoped>

</style>