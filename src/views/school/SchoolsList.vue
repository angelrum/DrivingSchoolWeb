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
          <SchoolEdit v-else :is-edit="true" :input-school="schools" :input-address="address" @refreshSchool="getSchoolData" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SchoolEdit from "@/components/SchoolEdit";
import Loader from "@/components/app/Loader";

export default {
  name: "SchoolsList",
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
    const id = this.$route.params.id;
    this.schools = await this.getSchoolData(id);
    this.address = this.schools.address;
    console.log(this.schools);
    console.log(this.address);
    this.loadingSchools = false;
  },
  methods: {
    async getSchoolData(id) {
      this.loadingUser = true;
      let school;
      await this.$store
          .dispatch("getAuthUser")
          .then(async (authUser) => {
            school = await this.$store.dispatch("fetchSchoolById", id);
          })
          .finally(() => setTimeout(() => (this.loadingUser = false), 500));
      return school;
    }
  }
};
</script>