<template>
  <div class="card">
    <div class="card-header">
      <h6 class="card-title">Данные о компании.</h6>
    </div>
    <div class="card-body">
      <v-row>
        <v-col>
          <v-text-field
              disabled
              readonly
              light
              :label="$tc('name', 1)"
              v-model="company.name"></v-text-field>
        </v-col>
        <v-col class="col-5">
          <v-text-field
              disabled
              readonly
              light
              :label="$tc('name', 2)"
              v-model="company.shortName"></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field
              disabled
              readonly
              light
              :label="$tc('phone')"
              v-model="company.phone"></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
              disabled
              readonly
              light
              :label="$tc('email')"
              v-model="company.email"></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
              disabled
              readonly
              light
              :label="$tc('website')" v-model="company.website"></v-text-field>
        </v-col>
      </v-row>
      <Address v-if="company.hasOwnProperty('addressLegal')"
               :address="company.addressLegal" :title="$tc('address.legal')"/>
      <Address v-if="company.hasOwnProperty('addressActual')"
               :address="company.addressActual" :title="$tc('address.actual')"/>
    </div>
  </div>
</template>

<script>
import Address from "@/components/Address";
export default {
  name: "Company",
  props: ['company'],
  components: {Address}
}
</script>

<style scoped>

</style>