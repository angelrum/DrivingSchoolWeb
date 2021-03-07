<template>
  <div>
    <h6 v-if="title!==''" class="card-subtitle">{{title}}</h6>
    <v-row>
      <v-col>
        <v-text-field
            :readonly="!edit"
            :disabled="!edit"
            :clearable="edit"
            clear-icon="fa-times"
            v-model="address.city"
            :label="$t('city')"
            @input="$v.address.city.$touch()"
            @blur="$v.address.city.$touch()"
            :error-messages="cityErrors">
        </v-text-field>
      </v-col>
      <v-col class="col-3">
        <v-text-field
            :readonly="!edit"
            :disabled="!edit"
            :clearable="edit"
            clear-icon="fa-times"
            v-model="address.street"
            :label="$t('street')"
            @input="$v.address.street.$touch()"
            @blur="$v.address.street.$touch()"
            :error-messages="streetErrors">
        </v-text-field>
      </v-col>
      <v-col>
        <v-text-field
            :readonly="!edit"
            :disabled="!edit"
            :clearable="edit"
            clear-icon="fa-times"
            v-model="address.building"
            :label="$t('building')">
        </v-text-field>
      </v-col>
      <v-col>
        <v-text-field
            :readonly="!edit"
            :disabled="!edit"
            :clearable="edit"
            clear-icon="fa-times"
            v-model="address.home"
            :label="$t('home')"
            @input="$v.address.home.$touch()"
            @blur="$v.address.home.$touch()"
            :error-messages="homeErrors">
        </v-text-field>
      </v-col>
      <v-col>
        <v-text-field
            :readonly="!edit"
            :disabled="!edit"
            :clearable="edit"
            clear-icon="fa-times"
            v-model="address.floor"
            :label="$t('floor')"
            @input="$v.address.floor.$touch()"
            @blur="$v.address.floor.$touch()"
            :error-messages="floorErrors">
        </v-text-field>
      </v-col>
      <v-col>
        <v-text-field
            :readonly="!edit"
            :disabled="!edit"
            :clearable="edit"
            clear-icon="fa-times"
            v-model="address.office"
            :label="$t('office')"
            @input="$v.address.office.$touch()"
            @blur="$v.address.office.$touch()"
            :error-messages="officeErrors">
        </v-text-field>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { required, numeric } from 'vuelidate/lib/validators';
import { vuelidate } from "@/components/mixins/vuelidate";
import { helpers } from "@/components/mixins/helpers";

export default {
  name: "Address",
  mixins: [vuelidate, helpers],
  props: {
    address: {
      type: Object,
      default: {
        city: '',
        street: '',
        building: '',
        home: '',
        floor: '',
        office: ''
      }
    },
    title: '',
    edit: false,
  },
  data: () => ({

  }),
  validations: {
    address: {
      city:   { required },
      street: { required },
      floor:  { numeric }
    }
  },
  computed: {
    cityErrors() {
      return this.vuelidateNameErrors('address.city');
    },
    streetErrors() {
      return this.vuelidateNameErrors('address.street');
    },
    homeErrors() {
      return this.vuelidateNameErrors('address.home');
    },
    floorErrors() {
      return this.vuelidateNameErrors('address.floor');
    },
    officeErrors() {
      return this.vuelidateNameErrors('address.office');
    }
  },
  watch: {

  }
}
</script>

<style scoped>

</style>