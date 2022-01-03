<template>
    <div>ToDoList</div>
    <ToDo/>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ToDo from '@/components/ToDo.vue';

export default defineComponent({
    name: 'ToDoList',
    components: {
        ToDo
    }
})
</script>
