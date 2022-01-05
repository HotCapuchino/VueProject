<template>
    <div class="toDo-wrapper">
        <div v-bind:class="this.done ?  'done ' : 'not-done'" class="heading-panel">
            <label>
                <span v-show="this.important" class="importance">!!!</span>
                <span v-bind:class="this.done ? 'done' : ''">{{!this.done ? 'Unfinished' : 'Finished'}}</span>
                <span v-show="this.important" class="importance">!!!</span>
                <input type="checkbox" v-model="this.done" @update:modelValue="() => changeToDo('done')"/>
            </label>
        </div>
        <div class="toDo-card">
            <div class="toDo-card-info">
                <div class="toDo-card-info--title field">{{this.toDo.title}}</div>
                <div class="field">{{this.toDo.description}}</div>
                <label class="field">
                    <span>Important</span>
                    <input type="checkbox" v-model="this.important" @update:modelValue="() => changeToDo('important')" v-bind:disabled="this.done"/>
                </label>
            </div>
            <div class="buttons-block">
                <button v-bind:disabled="this.done" @click="this.openEditingModal">Edit</button>
                <button @click="this.deleteSelectedToDo">Delete</button>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
    .toDo-wrapper {
        margin-right: 25px;

        .heading-panel {
           border-top-left-radius: 10px;
           border: 1px solid #35495e;
           padding: 5px 0; 
           
           border-bottom: none;

            &.done {
                background-color: #41b883;
                opacity: 0.7;
            }

            &.not-done {
                background-color: #e6da3d;
            }

            span {
                font-weight: 600;
                cursor: pointer;

                &.done {
                    text-decoration: line-through;
                }

                &.importance {
                    font-size: 16px;
                    color: #c73833;
                    margin: 0 5spx;
                }
            }

            input {
                display: none;
            }
        }

        .toDo-card {
            box-sizing: border-box;
            width: 20%;
            min-width: 250px;
            height: 200px;
            border-bottom-right-radius: 10px;
            margin-bottom: 20px;
            padding: 10px 20px 20px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: flex-start;
            border: 1px solid #35495e;

            &-info {
                display: flex;
                flex-direction: column;
                align-items: flex-start;

                &--title {
                    font-size: 24px;
                    font-weight: 600;
                }
    
                .field {
                    margin-bottom: 10px;
                }
            }

            .buttons-block {
                button {
                    background-color: #35495e;
                    border: 2px solid transparent;
                    color: white;
                    border-radius: 3px;
                    min-width: 50px; 
                    font-size: 14px;
                    cursor: pointer;

                    &:disabled {
                        cursor: default;
                        opacity: 0.6;
                        pointer-events: none;
                    }
    
                    &:hover {
                        color: #35495e;
                        background-color: white;
                        border-color: #35495e;
                    }

                    &:first-child {
                        margin-right: 10px;
                    }
                }
            }

        }
    }
</style>

<script lang="ts">
import { ToDo } from '@/store/types';
import { defineComponent } from 'vue';
import { mapMutations, mapState } from 'vuex';

export default defineComponent({
    name: 'SingleToDo',
    props: {
        toDo: {
            required: true,
        }
    },
    data() {
        return {
            done: (this.toDo as ToDo).done,
            important: (this.toDo as ToDo).important
        }
    },
    computed: {
        ...mapState({
            modalVisible: (state: any) => state.systemStore.modalVisible,
        }),
    },
    methods: {
        ...mapMutations([
            'deleteToDo',
            'openModal',
            'editToDo'
        ]), 
        openEditingModal(): void {
            if (!this.modalVisible) {
                this.openModal((this.toDo as ToDo).id);
            }
        }, 
        deleteSelectedToDo(): void {
            this.deleteToDo((this.toDo as ToDo).id);
        },
        changeToDo(changed: 'done' | 'important'): void {
            // workaround to get rid of proxy obj
            const newToDo = JSON.parse(JSON.stringify(this.toDo)) as ToDo;
            if (changed === 'done') {
                newToDo.done = this.done;
            } else {
                newToDo.important = this.important;
            }
            console.log('new', newToDo);
            this.editToDo(newToDo);
        }
    },
})
</script>