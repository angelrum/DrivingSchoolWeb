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
   }
 }
</script>
<style>
  @import "assets/light.css";
  @import "assets/custom.css";
  /*@import "~materialize-css/dist/css/materialize.min.css";*/
</style>
