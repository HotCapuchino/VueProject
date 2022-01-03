<template>
    <div class="header">
        <button>Clear local storage</button>
        <button>Add</button>
    </div>
</template>

<style lang="scss">
    .header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 10px 30px;
    }
</style>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'Header',
})
</script>
