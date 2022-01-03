<template>
  <div class="home">
    <Header/>
    <ToDoList/>
    <Modal/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Header from '@/components/Header.vue';
import ToDoList from '@/components/ToDoList.vue';
import Modal from '@/components/ToDoModal.vue';

export default defineComponent({
  name: 'Home',
  components: {
    Header,
    ToDoList, 
    Modal,
  },
});
</script>
