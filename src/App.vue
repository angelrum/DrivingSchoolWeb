<template>
  <div id="app">
    <component :is='layout'>
      <router-view/>
    </component>
  </div>
</template>

<script>
import EmptyLayout from "@/layouts/EmptyLayout";
import MainLayout from "@/layouts/MainLayout";
 export default {
   computed: {
     layout() {
       return (this.$route.meta.layout || 'empty') + '-layout'
     }
   },
   components: {
     EmptyLayout, MainLayout
   },
   //если получили ответ от сервера 401 Unautorized, то заворачиваем на logout
   created() {
     this.$http.interceptors.response.use(undefined, function (err) {
       return new Promise(((resolve, reject) => {
         if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
           this.$store.dispatch('logout')
         }
         throw err;
       }))
     })
   }
 }
</script>
<style>
  @import "assets/light.css";
  @import "assets/custom.css";
  /*@import "~materialize-css/dist/css/materialize.min.css";*/
</style>
