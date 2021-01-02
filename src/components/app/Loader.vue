<template>
  <div class="text-center">
    <v-progress-circular
        indeterminate
        :color="color">
    </v-progress-circular>
  </div>
</template>

<script>
export default {
name: "Loader",
  computed: {
    color() {
      const colors = ['primary', 'purple', 'green', 'amber']
      return colors[Math.floor(Math.random() * 4)]
    }
  }
}
</script>

<style scoped>

</style>