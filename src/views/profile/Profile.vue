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
            <Loader v-if="loadingUser"/>
            <User v-else :is-edit="true" :input-user="user" @updateUser="getUserData"/>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <Loader v-if="loadingSchools"/>
        <School v-else :schools="schools"/>
      </div>
    </div>
  </div>
</template>

<script>
import User from "@/components/User";
import School from "@/components/School";
import Loader from "@/components/app/Loader";

export default {
  name: "Profile",
  components: {School, User, Loader },
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
    loadingUser: true,
    loadingSchools: true
  }),
  async mounted() {
    this.schools = await this.getUserData();
    this.loadingSchools = false
  },
  methods: {
    async getUserData() {
      this.loadingUser = true
      let schools
      try {
        const user = await this.$store.dispatch('fetchUserById', 1000)
        schools = Object.assign([], user.schools)
        delete user.schools
        this.user = user
      } catch (e) {
        //ignore
      } finally {
        setTimeout(()=>{
          this.loadingUser = false
        }, 500)
      }
      return schools
    }
  }
}
</script>

<style scoped>

</style>