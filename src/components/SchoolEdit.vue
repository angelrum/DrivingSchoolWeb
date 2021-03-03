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
            light
          ></v-text-field>
        </v-col>

        <v-col>
          <v-text-field
            v-model="school.phone"
            :label="$t('phone')"
            :readonly="!edit"
            :disabled="!edit"
            light
          ></v-text-field>
        </v-col>

        <v-col>
          <v-text-field
            v-model="school.email"
            :label="$t('email')"
            :readonly="!edit"
            :disabled="!edit"
            light
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field
            :readonly="!edit"
            :disabled="!edit"
            v-model="address.city"
            light
            :label="$t('city')"
          ></v-text-field>
        </v-col>

        <v-col>
          <v-text-field
            :readonly="!edit"
            :disabled="!edit"
            v-model="address.street"
            light
            :label="$t('street')"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field
            :readonly="!edit"
            :disabled="!edit"
            v-model="address.building"
            light
            :label="$t('building')"
          ></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            :readonly="!edit"
            :disabled="!edit"
            v-model="address.home"
            light
            :label="$t('home')"
          ></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            :readonly="!edit"
            :disabled="!edit"
            v-model="address.floor"
            light
            :label="$t('floor')"
          ></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            :readonly="!edit"
            :disabled="!edit"
            v-model="address.office"
            light
            :label="$t('office')"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>

    <div v-if="isEdit">
      <v-row v-if="edit" class="justify-content-end">
        <v-col class="col-sm-auto">
          <button
            class="btn btn-pill btn-danger"
            @click.prevent="$emit('updateUser')"
          >
            {{ $t("cancel") }}
          </button>
        </v-col>
        <v-col class="col-sm-auto">
          <button class="btn btn-pill btn-success" @click.prevent="saveProfile">
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
export default {
  name: "SchoolEdit",
  props: {
    isEdit: Boolean,
    inputSchool: {
      type: Object,
      required: true,
    },
    inputAddress: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    count: 0,
    edit: false,
    show: true,
    school: {
      name: "",
      phone: "",
      email: "",
    },
    address: {
      city: "",
      street: "",
      build: "",
      house: "",
      floor: "",
      ofice: "",
    },
    rules: {
      required: (value) => !!value || "Не должно быть пустым",
      min: (value) => value.length >= 3 || "Не менее 3 символов",
      email: (value) => {
        if (!value) return true;
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || "Введите правильный email.";
      },
      phone: (value) => {
        const pattern = /^(\+7|8)[- _]*\(?[- _]*(\d{3}[- _]*\)?([- _]*\d){7}|\d\d[- _]*\d\d[- _]*\)?([- _]*\d){6})$/;
        return pattern.test(value) || "Введите правильный номер телефона.";
      },
    },
  }),
  methods: {
    async saveProfile() {
      if (this.$refs.userForm.validate()) {
        await this.$store.dispatch("updateUser", this.user);
        await this.clearProfile();
      } else {
        this.$store.commit("setError", "update.validation");
      }
    },
    async clearProfile() {
      this.edit = !this.edit;
      const u = await this.$store.dispatch("fetchUserById", 1000);
      delete u.schools;
      this.user = Object.assign({}, u);
    },
    async checkInputValue(event) {
      const key = event.key;
      if (/\d/.test(key)) {
        let ph = Object.is(this.user.phone, null) ? "" : this.user.phone;
        let value = ph.replace("+7(", "") + key;
        this.phone = await this.$store.dispatch("convertStringToPhone", value);
        return event;
      } else if (Object.is(key, "Backspace")) {
        return event;
      } else {
        event.preventDefault();
      }
    },
    updateStyle() {
      document
        .querySelectorAll(".v-icon.v-icon--disabled")
        .forEach((el) => el.classList.remove("v-icon--disabled"));
    },
  },
  mounted() {
    this.updateStyle();
    debugger;
    this.school = Object.assign({}, this.inputSchool);
    this.address = Object.assign({}, this.inputAddress);
  },
  updated() {
    this.updateStyle();
  },
};
</script>
