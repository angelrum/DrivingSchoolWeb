<template>
  <div>
    <h6 v-if="title!==''" class="card-subtitle">{{title}}</h6>
    <v-row>
      <v-col>
        <v-autocomplete
            ref="tempAddress.addressFull"
            v-model="tempAddress.addressFull"
            :items="addresses"
            :label="$t('address')"
            :readonly="!edit"
            :disabled="!edit"
            :clearable="edit"
            clear-icon="fa-times"
            hide-no-data
            hide-selected
            :loading="loading"
            :search-input.sync="searchAddress"
            :filter="autocompleteFilter"
            @input="$v.tempAddress.addressFull.$touch()"
            @blur="$v.tempAddress.addressFull.$touch()"
            :error-messages="addressErrors"
            return-object
        ></v-autocomplete>
      </v-col>
      <v-col class="col-1">
        <v-text-field
            :readonly="!edit"
            :disabled="!edit"
            :clearable="edit"
            clear-icon="fa-times"
            v-model="inAddress.floor"
            :label="$t('floor')"
            @input="$v.inAddress.floor.$touch()"
            @blur="$v.inAddress.floor.$touch()"
            :error-messages="floorErrors">
        </v-text-field>
      </v-col>
      <v-col class="col-1">
        <v-text-field
            :readonly="!edit"
            :disabled="!edit"
            :clearable="edit"
            clear-icon="fa-times"
            v-model="inAddress.office"
            :label="$t('office')"
            @input="$v.inAddress.office.$touch()"
            @blur="$v.inAddress.office.$touch()"
            :error-messages="officeErrors">
        </v-text-field>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { required, numeric, minLength } from 'vuelidate/lib/validators';
import { vuelidate } from "@/components/mixins/vuelidate";
import { helpers } from "@/components/mixins/helpers";

export default {
  name: "Address",
  mixins: [vuelidate, helpers],
  props: {
    inAddress: {
      type: Object,
      default: {
        postalCode: '',
        region: '',
        city: '',
        settlement: '',
        street: '',
        house: '',
        floor: '',
        office: '',
        latitude: '',
        longitude: '',
        qcGeo: 5
      }
    },
    title: '',
    edit: false,
  },
  data: () => ({
    tempAddress: {
      addressFull: '',
      floor: '',
      office: ''
    },
    loading: false,
    searchAddress: '',
    addresses: [],
    update: true
  }),
  validations: {
    tempAddress: {
      addressFull: { required, minLength: minLength(10) }
    },
    inAddress: {
      floor:  { numeric }
    }
  },
  computed: {
    addressErrors() {
      return this.vuelidateNameErrors('tempAddress.addressFull');
    },
    floorErrors() {
      return this.vuelidateNameErrors('inAddress.floor');
    },
    officeErrors() {
      return this.vuelidateNameErrors('inAddress.office');
    }
  },
  watch: {
    searchAddress(val) {
      this.loading = true;
      if (!this.isNull(val) && val.length >= 2
          && (!this.addresses.includes(val) || this.addresses.length!==1) ) {
        this.addresses.length = 0;
        this.$store.dispatch('fetchSuggestions', val).then(response => {
              const suggestions = !this.isNull(response.data.suggestions) ? response.data.suggestions : null;
              if (!this.isNull(suggestions)) {
                suggestions.forEach(el => {
                  this.addresses.push(el.value);
                  if (el.value === val) this.saveAddress(el.data);
                });
              }
        })
      } else if (this.isNull(val) && !this.addresses.includes(val)) {
        Object.getOwnPropertyNames(this.inAddress)
            .filter(field => field!=='id')
            .forEach(field => this.inAddress[field] = '');
        this.inAddress.qcGeo = 5;
      }
      this.loading = false;
      return val;
    },
    inAddress: {
      immediate: true,
      handler: function(value) {
        this.parseInsertAddress(value);
      }
    }
  },
  methods: {
    autocompleteFilter(item, queryText, itemText) { //отключаем стандартный фильтр
      return true;
    },
    saveAddress(data) {
      this.inAddress.country = 'RUS';
      this.inAddress.region = data.region_with_type;
      this.inAddress.city = data.city_with_type;
      this.inAddress.settlement = data.settlement_with_type;
      this.inAddress.street = data.street_with_type;
      this.inAddress.house = [data.house_type, data.house].join(' ');
      this.inAddress.latitude = data.geo_lat;
      this.inAddress.longitude = data.geo_lon;
      this.inAddress.qcGeo = data.qc_geo;
      this.inAddress.postalCode = data.postal_code;
    },
    parseInsertAddress(address) {
      let fullAddress = '';
      Object.getOwnPropertyNames(address).forEach(field => {
        if (( field === 'region' || field === 'city'
            || field === 'settlement' || field === 'street' || field === 'house')
            && address[field] !== '') {
          fullAddress = fullAddress ==='' ? address[field] : [fullAddress, address[field]].join(', ');
        } else if ((field === 'office' || field === 'floor')
            && !this.isNull(address[field]) && address[field] !== '') {
          this.tempAddress[field] = address[field];
        }
      });
      this.tempAddress.addressFull = fullAddress;
      this.addresses.push(fullAddress);
    }
  }
}
</script>

<style scoped>

</style>