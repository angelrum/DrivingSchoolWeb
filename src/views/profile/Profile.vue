<template>
  <div>
    <div class="header">
      <h1 class="header-title">
        Добрый день, Иван!
      </h1>
      <p class="header-subtitle">У вас есть необработанные сообщения.</p>
    </div>
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header">
            <h5 class="card-title">Профиль пользователя</h5>
            <h6 class="card-subtitle text-muted">Профиль текущего пользователя.</h6>
          </div>
          <div class="card-body">
            <User :is-edit="true"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import User from "@/components/User";

export default {
  name: "Profile",
  components: {User}
}
</script>

<style scoped>

</style>