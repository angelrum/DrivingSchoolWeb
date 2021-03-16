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
          <SchoolEdit v-else :is-edit="true" :input-school="schools" @refreshSchool="getSchoolData" />
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
  components: { SchoolEdit, Loader },
  data: () => ({
    schools: {},
    id: '',
    loadingUser: true,
    loadingSchools: true,
    title: "Preliminary report",
    description: "California is a state in the western United States",
    rules: [(v) => v.length <= 25 || "Max 25 characters"],
    wordsRules: [(v) => v.trim().split(" ").length <= 5 || "Max 5 words"]
  }),
  async mounted() {
    this.id = this.$route.params.id;
    await this.getSchoolData();
    console.log("Это вывод со школы");
    console.log(this.schools);
    this.loadingSchools = false;
  },
  methods: {
    async getSchoolData() {
      this.loadingUser = true;
      await this.$store
          .dispatch("getAuthUser")
          .then(async (authUser) => {
            this.schools = await this.$store.dispatch("fetchSchoolById", this.id);
          })
          .finally(() => setTimeout(() => (this.loadingUser = false), 500));
    }
  }
};
</script>
