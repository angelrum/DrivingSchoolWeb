<template>
  <v-expansion-panels>
    <v-expansion-panel
        v-for="school of schools"
        :key="school.id">
      <v-expansion-panel-header>
        {{ school.name }}
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-row>
          <v-col>
            <v-text-field
                disabled
                readonly
                v-model="school.shortName"
                light
                :label="$tc('name', 2)">
            </v-text-field>
          </v-col>
          <v-col>
            <v-text-field
                disabled
                readonly
                v-model="school.phone"
                light
                :label="$t('phone')">
            </v-text-field>
          </v-col>
          <v-col>
            <v-text-field
                disabled
                readonly
                v-model="school.email"
                light
                :label="$t('email')">
            </v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
                disabled
                readonly
                v-model="school.address.city"
                light
                :label="$t('city')">
            </v-text-field>
          </v-col>
          <v-col class="col-3">
            <v-text-field
                disabled
                readonly
                v-model="school.address.street"
                light
                :label="$t('street')">
            </v-text-field>
          </v-col>
          <v-col>
            <v-text-field
                disabled
                readonly
                v-model="school.address.building"
                light
                :label="$t('building')">
            </v-text-field>
          </v-col>
          <v-col>
            <v-text-field
                disabled
                readonly
                v-model="school.address.home"
                light
                :label="$t('home')">
            </v-text-field>
          </v-col>
          <v-col>
            <v-text-field
                disabled
                readonly
                v-model="school.address.floor"
                light
                :label="$t('floor')">
            </v-text-field>
          </v-col>
          <v-col>
            <v-text-field
                disabled
                readonly
                v-model="school.address.office"
                light
                :label="$t('office')">
            </v-text-field>
          </v-col>
        </v-row>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
export default {
  props: ['schools'],
  name: "School",
  data: () => ({
    edit: true
  })
}
</script>

<style scoped>

</style>