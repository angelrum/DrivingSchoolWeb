<template>
  <v-form>
    <v-container>
      <v-row>
        <v-col>
          <v-text-field
            v-model="school.name"
            :label="$tc('name', 2)"
            :readonly="!edit"
            :disabled="!edit"
            :clearable="edit"
            clear-icon="fa-times"
            @input="$v.name.$touch()"
            light
          ></v-text-field>
        </v-col>

        <v-col>
          <v-text-field
            v-model="school.phone"
            :label="$t('phone')"
            :readonly="!edit"
            :disabled="!edit"
            :clearable="edit"
            clear-icon="fa-times"
            @input="$v.phone.$touch()"
            light
          ></v-text-field>
        </v-col>

        <v-col>
          <v-text-field
            v-model="school.email"
            :label="$t('email')"
            :readonly="!edit"
            :disabled="!edit"
            clear-icon="fa-times"
            @input="$v.email.$touch()"
            light
          ></v-text-field>
        </v-col>
      </v-row>

      <Address v-if="!isNull(school.address)" :edit="edit" :address="school.address" />

    </v-container>

    <div v-if="isEdit">
      <v-row v-if="edit" class="justify-content-end">
        <v-col class="col-sm-auto">
          <button
            class="btn btn-pill btn-danger"
            @click.prevent="$emit('refreshSchool', school.id)"
          >
            {{ $t("cancel") }}
          </button>
        </v-col>
        <v-col class="col-sm-auto">
          <button class="btn btn-pill btn-success" @click.prevent="saveSchool">
            {{ $t("save") }}
          </button>
        </v-col>
      </v-row>
      <v-row v-else-if="!edit" class="justify-content-end">
        <v-col class="col-sm-auto">
          <button
            class="btn btn-pill btn-primary"
            @click.prevent="edit = !edit"
          >
            {{ $t("edit") }}
          </button>
        </v-col>
      </v-row>
    </div>
  </v-form>
</template>
<script>
import Address from "@/components/Address";
import { helpers } from "@/components/mixins/helpers";
import { vuelidate } from "@/components/mixins/vuelidate";
import { phone } from "@/components/mixins/phone";
import {email, minLength, required} from "vuelidate/lib/validators";
export default {
  name: "SchoolEdit",
  components: {Address},
  mixins: [helpers, vuelidate, phone],
  props: {
    isEdit: Boolean,
    inputSchool: {
      type: Object,
      required: true,
    },
    inputAddress: {
      type: Object,
      required: true,
    }
  },
  data: () => ({
    count: 0,
    edit: false,
    show: true,
    active: "",
    school: {
      id: "",
      name: "",
      shortName: "",
      phone: "",
      email: "",
      address: {
        id: "",
        country: "",
        region: "",
        city: "",
        zip: "",
        street: "",
        home: "",
        floor: "",
        office: ""
      }
    },
    validations: {
      name:  { required, minLength: minLength(3) },
      shortName:   { required, minLength: minLength(3) },
      email:      { email },
      phone: {
        required,
        phoneFormat(val) {
          return this.phonePattern.test(val); }
      }
    },
  }),
  methods: {
    async saveSchool() {
      await this.$store.dispatch("updateSchool", this.school);
      this.school = await this.$emit('refreshSchool', this.school.id);
      //this.$emit('refreshSchool');
    },
    updateStyle() {
      document
        .querySelectorAll(".v-icon.v-icon--disabled")
        .forEach((el) => el.classList.remove("v-icon--disabled"));
    },
  },
  mounted() {
    this.updateStyle();
    this.school = Object.assign({}, this.inputSchool);
    delete this.school.companyId;
    this.address = Object.assign({}, this.inputAddress);
    console.log("Это вывод с редактора");
    console.log(this.school);
    console.log(this.address);
  },
  watch: {
    inputSchool: {
      deep: true,
      immediate: true,
      handler: function(value) {
        this.fillComponentFields(value);
      }
    },
    inputAddress: {
      deep: true,
      immediate: true,
      handler: function(value) {
        this.fillComponentFields(value);
      }
    }
  },
  updated() {
    this.updateStyle();
  },
};
</script>
