<template>
  <router-view/>
</template>

<style lang="scss">
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
</style>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  created(): void {
    this.$store.dispatch('loadToDos');
  }
})
</script>


