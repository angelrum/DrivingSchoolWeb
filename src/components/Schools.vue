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
          <v-col class="sm3">
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
        <Address :address="school.address"/>
        <v-row class="justify-content-end">
          <v-col class="col-sm-auto" >
            <v-btn small color="primary" class="btn" :to="{name:'school', params: { id: school.id }}">
              {{ $t('goto') }}
            </v-btn>
          </v-col>
        </v-row>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
import Address from "@/components/Address";
export default {
  components: {Address},
  props: ['schools'],
  name: "Schools",
  data: () => ({
    edit: true
  })
}
</script>

<style scoped>

</style>