<template>
  <div data-app class="wrapper v-application">
    <Sidebar :is-open="isOpen"/>
    <div class="main">
      <Navbar @menubar="isOpen=!isOpen"/>
      <main class="content">
        <div class="container-fluid">
          <router-view/>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/app/Navbar";
import Sidebar from "@/components/app/Sidebar";

export default {
  name: "MainLayout",
  data: () => ({
    isOpen: true
  }),
  components: {
    Navbar, Sidebar
  }
}
</script>

<style scoped>

</style>