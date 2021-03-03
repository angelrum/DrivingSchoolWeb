<template>
  <div class="col s12 m6">
    <h1 class="header-title">Страница школы "{{ schools.name }}"</h1>
    <div class="col-md-12">
      <div class="card">
        <div class="card-header">
          <h5 class="card-title">{{ schools.shortName }}</h5>
          <h6 class="card-subtitle text-muted">Профиль текущей школы.</h6>
        </div>
        <div class="card-body">
          <Loader v-if="loadingUser" />
          <SchoolEdit v-else :is-edit="true" :input-school="schools" :input-address="address" @updateUser="getUserData" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SchoolEdit from "@/components/SchoolEdit";
import Loader from "@/components/app/Loader";

export default {
  name: "school",
  components: { SchoolEdit, Loader  },
  data: () => ({
    schools: {},
    address: {},
    loadingUser: true,
    loadingSchools: true,
    title: "Preliminary report",
    description: "California is a state in the western United States",
    rules: [(v) => v.length <= 25 || "Max 25 characters"],
    wordsRules: [(v) => v.trim().split(" ").length <= 5 || "Max 5 words"]
  }),
  async mounted() {
    const schools = await this.getUserData();
    this.schools = schools[0];
    this.address = this.schools.address;
    console.log(this.schools);
    console.log(this.address);
    this.loadingSchools = false;
  },
  methods: {
    async getUserData() {
      this.loadingUser = true;
      let schools;
      await this.$store
        .dispatch("getAuthUser")
        .then(async (authUser) => {
          const user = await this.$store.dispatch("fetchUserById", authUser.id);
          const temp = Object.assign([], user.schools);
          schools = temp;
          delete user.schools;
        })
        .finally(() => setTimeout(() => (this.loadingUser = false), 500));
      return schools;
    },
  },
};
</script>
