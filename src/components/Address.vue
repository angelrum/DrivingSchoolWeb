<template>
  <div>
    <h6 v-if="title!==''" class="card-subtitle">{{title}}</h6>
    <v-row>
      <v-col>
        <v-text-field
            disabled
            readonly
            v-model="address.city"
            light
            :label="$t('city')">
        </v-text-field>
      </v-col>
      <v-col class="col-3">
        <v-text-field
            disabled
            readonly
            v-model="address.street"
            light
            :label="$t('street')">
        </v-text-field>
      </v-col>
      <v-col>
        <v-text-field
            disabled
            readonly
            v-model="address.building"
            light
            :label="$t('building')">
        </v-text-field>
      </v-col>
      <v-col>
        <v-text-field
            disabled
            readonly
            v-model="address.home"
            light
            :label="$t('home')">
        </v-text-field>
      </v-col>
      <v-col>
        <v-text-field
            disabled
            readonly
            v-model="address.floor"
            light
            :label="$t('floor')">
        </v-text-field>
      </v-col>
      <v-col>
        <v-text-field
            disabled
            readonly
            v-model="address.office"
            light
            :label="$t('office')">
        </v-text-field>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "Address",
  props: {
    address: {},
    title: ''
  }
}
</script>

<style scoped>

</style>