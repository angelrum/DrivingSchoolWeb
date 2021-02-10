<template>
  <nav id="sidebar" class="sidebar" :class="{toggled:isOpen}">
    <router-link to="/" class="sidebar-brand">Автошкола</router-link>
    <div class="sidebar-content">
      <div class="sidebar-user">
        <v-img
            :src="avatar"
            class="img-fluid rounded-circle mb-2 m-auto"
            :alt="fullname"
            max-height="100px"
            max-width="100px"
            @click="goToProfile"></v-img>
        <div class="font-weight-bold">{{ fullname }}</div>
        <small>Администратор</small>
      </div>

      <ul class="sidebar-nav">
        <li class="sidebar-header">
          Меню
        </li>
        <li class="sidebar-item active">
          <a href="#dashboards" data-toggle="collapse" class="sidebar-link" aria-expanded="true">
            <i class="align-middle mr-2 fas fa-fw fa-home"></i> <span class="align-middle">Главная</span>
          </a>
          <ul id="dashboards" class="sidebar-dropdown list-unstyled collapse show" data-parent="#sidebar">
            <li class="sidebar-item active"><a class="sidebar-link" href="#">Страница 1</a></li>
            <li class="sidebar-item"><a class="sidebar-link" href="#">Страница 2</a></li>
            <li class="sidebar-item"><a class="sidebar-link" href="#">Страница 3</a></li>
          </ul>
        </li>
        <li class="sidebar-item"><a class="sidebar-link" href="#">
          <i class="align-middle mr-2 fas fa-fw fa-address-book"></i> <span class="align-middle">Контакты</span>
        </a></li>
        <li class="sidebar-header">
          Аналитика
        </li>
        <li class="sidebar-item">
          <a href="#ui" data-toggle="collapse" class="sidebar-link collapsed">
            <i class="align-middle mr-2 fas fa-fw fa-car"></i> <span class="align-middle">Расписание</span>
          </a>
          <ul id="ui" class="sidebar-dropdown list-unstyled collapse " data-parent="#sidebar">
            <li class="sidebar-item"><a class="sidebar-link" href="#">Расписание 1</a></li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Sidebar",
  data: () => ({
    fullname: null,
    avatar: null
  }),
  props: {
    isOpen: Boolean,
    authUser: {
      type: Object
    }
  },
  methods: {
    goToProfile() {
      this.$router.push("/profile");
    }
  },
  watch: {
    authUser: { //https://stackoverflow.com/questions/51292803/watch-props-change-on-vuejs/51292935
      immediate: true,
      deep: true,
      handler (value) {
        if (!Object.is(value, undefined)
            && value.hasOwnProperty('lastname')) {
          this.fullname = [value.lastname, value.firstname].join(' ');
          this.avatar = value.avatar === '' ? this.$t('anonymous.avatar') : value.avatar;
        } else {
          this.fullname = this.$t('anonymous.user');
          this.avatar = this.$t('anonymous.avatar');
        }
      }
    }
  }
}
</script>

<style scoped>

</style>