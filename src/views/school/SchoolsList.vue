<template>
  <div id="app">
    <v-app id="inspire">
      <v-card>
        <v-card-title>
          <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table
            :headers="headers"
            :items="schools"
            :search="search"
        >
          <template #item.name="{ item }">
            <router-link :to="{name: 'school', params: { id: item.id }}">
              {{ item.name }}
            </router-link>
          </template>
        </v-data-table>
      </v-card>
    </v-app>
  </div>
</template>

<script>
import SchoolEdit from "@/components/SchoolEdit";
import Loader from "@/components/app/Loader";

export default {
  name: "SchoolsList",
  components: { SchoolEdit, Loader },
  data: () => ({
    schools: [],
    address: {},
    loadingSchools: true,
    search: '',
    headers: [
      {
        text: 'Название',
        align: 'start',
        filterable: true,
        value: 'name',
      },
      { text: 'Город', value: 'address.city' },
      { text: 'Улица', value: 'address.street' },
      { text: 'Телефон', value: 'phone' }
    ],


  }),
  async mounted() {

    this.schools = await this.getAllSchool();
    console.log(this.schools);

    this.loadingSchools = false;
  },
  methods: {
    async getAllSchool() {
      this.loadingSchools = true;
      let schools;
      await this.$store
          .dispatch("getAuthUser")
          .then(async (authUser) => {

            schools = await this.$store.dispatch("fetchAllSchool");
          })
          .finally(() => setTimeout(() => (this.loadingSchools = false), 500));
      return schools;
    }
  }
};
</script>