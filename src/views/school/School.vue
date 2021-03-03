<template>
  <div class="col s12 m6">
    <h1 class="header-title">Страница школы "{{ schools.name }}"</h1>
    <v-form>
      <div class="col-md-12">
        <div class="card">
          <div class="card-header">
            <h5 class="card-title">{{ schools.shortName }}</h5>
            <h6 class="card-subtitle text-muted">Профиль текущей школы.</h6>
          </div>
          <div class="card-body">
            <Loader v-if="loading"/>
            <v-container>
              <v-row>
                <v-col>
                  <v-text-field
                    v-model="schools.shortName"
                    :label="$tc('name', 2)"
                    disabled
                    readonly
                    light
                  ></v-text-field>
                </v-col>

                <v-col>
                  <v-text-field
                    v-model="schools.phone"
                    :label="$t('phone')"
                    disabled
                    readonly
                    light
                  ></v-text-field>
                </v-col>

                <v-col>
                  <v-text-field
                    v-model="schools.email"
                    :label="$t('email')"
                    disabled
                    readonly
                    light
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-text-field
                    disabled
                    readonly
                    v-model="address.city"
                    light
                    :label="$t('city')"
                  ></v-text-field>
                </v-col>

                <v-col>
                  <v-text-field
                    disabled
                    readonly
                    v-model="address.street"
                    light
                    :label="$t('street')"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-text-field
                    disabled
                    readonly
                    v-model="address.building"
                    light
                    :label="$t('building')"
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field
                    disabled
                    readonly
                    v-model="address.home"
                    light
                    :label="$t('home')"
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field
                    disabled
                    readonly
                    v-model="address.floor"
                    light
                    :label="$t('floor')"
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field
                    disabled
                    readonly
                    v-model="address.office"
                    light
                    :label="$t('office')"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </div>
        </div>
      </div>
    </v-form>
  </div>
</template>

<script>
export default {
  name: "school",
  data: () => ({
    schools: {},
    address: {},
    loadingUser: true,
    loadingSchools: true,
    title: "Preliminary report",
    description: "California is a state in the western United States",
    rules: [(v) => v.length <= 25 || "Max 25 characters"],
    wordsRules: [(v) => v.trim().split(" ").length <= 5 || "Max 5 words"],
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
