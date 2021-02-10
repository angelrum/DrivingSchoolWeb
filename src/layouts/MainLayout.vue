<template>
  <div data-app class="wrapper v-application">
    <Sidebar :is-open="isOpen" :auth-user="authUser"/>
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
    isOpen: true,
    authUser: {
      type: Object
    }
  }),
  async created() {
    this.$store.dispatch('getAuthUser')
        .then(result => this.authUser = result)
        .catch(error => {
          debugger
          this.$router.push('/login')
        })
  },
  computed: {
    info() {
      return this.$store.getters.info
    }
  },
  watch: {
    info(info) {
      let html = ''
      info.details.forEach(val => { html += Object.is(html, '') ? this.$t(val) : '<br>' + this.$t(val) })
      this.$noty.hasOwnProperty(info.type)
          ? this.$noty[info.type](html)
          : this.$noty.error(html)
    }
  },
  components: {
    Navbar, Sidebar
  }
}
</script>

<style scoped>

</style>