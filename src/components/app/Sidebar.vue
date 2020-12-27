<template>
  <nav id="sidebar" class="sidebar" :class="{toggled:isOpen}">
    <router-link to="/" class="sidebar-brand">Автошкола</router-link>
    <div class="sidebar-content">
      <div class="sidebar-user">
        <img src="https://img.icons8.com/bubbles/60/000000/user-male.png" class="img-fluid rounded-circle mb-2" alt="Ivanov Ivan">
        <div class="font-weight-bold">Иванов Иван</div>
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
  props: ['isOpen']
}
</script>

<style scoped>

</style>