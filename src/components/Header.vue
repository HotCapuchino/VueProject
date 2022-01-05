<template>
    <div class="header-wrapper">
        <div class="header-content">
            <div class="header-content--warning">All the data is stored to local storage by default</div>
            <div class="buttons-block">
                <button @click="this.clearLocalStorage">Clear local storage</button>
                <button @click="this.openAddingToDo">Add</button>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
    .header-wrapper {
        box-sizing: border-box;
        width: 100%;
        position: fixed;
        padding: 0 50px;
        height: 60px;
        border-bottom: 2px solid #35495e;
        background-color: #41b883;

        .header-content {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            height: 100%;

            &--warning {
                color: #35495e;
                font-size: 16px;
            }

            .buttons-block {
                width: 20%;
                display: flex;
                flex-direction: row;

                button {
                    background-color: #35495e;
                    border: 2px solid transparent;
                    color: white;
                    border-radius: 5px;
                    padding: 5px 12px;
                    max-height: 30px;
                    font-size: 16px;
                    cursor: pointer;
    
                    &:hover {
                        color: #35495e;
                        background-color: white;
                    }

                    &:first-child {
                        margin-right: 40px;
                    }
                }
            }
        }
    }
</style>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions, mapMutations, mapState } from 'vuex';

export default defineComponent({
    name: 'Header',
    computed: {
        ...mapState({
            modalVisible: (state: any) => state.systemStore.modalVisible,
        }),
    },
    methods: {
        ...mapMutations([
            'openModal',
        ]),
        ...mapActions([
            'clearLocalStorage',
        ]),
       openAddingToDo(): void {
           if (!this.modalVisible) {
               this.openModal('');
           }
       }
    }
})
</script>
