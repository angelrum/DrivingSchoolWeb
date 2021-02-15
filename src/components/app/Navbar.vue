<template>
  <nav class="navbar navbar-expand navbar-theme">
    <a class="sidebar-toggle d-flex mr-2" @click.prevent="$emit('menubar')">
      <i class="hamburger align-self-center"></i>
    </a>
    <form class="form-inline d-none d-sm-inline-block">
      <input class="form-control form-control-lite" type="text" placeholder="Поиск...">
    </form>
    <div class="navbar-collapse collapse">
      <ul class="navbar-nav ml-auto">
        <li class="nav-item dropdown active">
          <a class="nav-link dropdown-toggle position-relative" href="#" id="messagesDropdown" data-toggle="dropdown">
            <i class="align-middle fas fa-envelope-open"></i>
          </a>
        </li>
        <li class="nav-item dropdown ml-lg-2">
          <a class="nav-link dropdown-toggle position-relative" href="#" id="alertsDropdown" data-toggle="dropdown">
            <i class="align-middle fas fa-bell"></i>
            <span class="indicator"></span>
          </a>
        </li>
        <li class="nav-item dropdown ml-lg-2">
          <a class="nav-link dropdown-toggle position-relative" href="#" id="userDropdown" data-toggle="dropdown">
            <i class="align-middle fas fa-cog"></i>
          </a>
        </li>
        <li class="nav-item dropdown ml-lg-2">
          <a class="nav-link dropdown-toggle position-relative" @click="logout" data-toggle="dropdown">
            <router-link to="/login"><i class="align-middle fas fa-sign-out-alt"></i></router-link>
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
name: "Navbar",
  methods: {
    logout() {
      this.$store.dispatch('logout');
    }
  }
}
</script>

<style scoped>

</style>