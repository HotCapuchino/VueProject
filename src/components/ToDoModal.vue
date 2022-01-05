<template>
    <div class="modal-background" v-show="this.modalVisible" @mousedown="(event) => closingModal(event)">
        <div class="modal-wrapper">
            <div class="modal-header">
                <h1>{{ `${this.editingToDoId.length > 0 ? 'Editing' : 'Adding'} ToDo` }}</h1>
            </div>
            <div class="toDo-info">
                <label class="toDo-info--field">
                    <span>Title</span>
                    <input type="text" v-model="this.newToDo.title" required @update:modelValue="updateToDo">
                </label>
                <label class="toDo-info--field">
                    <span>Description</span>
                    <textarea v-model="this.newToDo.description" required @update:modelValue="updateToDo"></textarea>
                </label>
                <label class="toDo-info--field">
                    <span>Date</span>
                    <input type="date" v-model="this.newToDo.createdAt" required @update:modelValue="updateToDo">
                </label>
                <label class="toDo-info--field row">
                    <span>Important</span>
                    <input type="checkbox" v-model="this.newToDo.important" @update:modelValue="updateToDo">
                </label>
            </div>
            <div class="control-buttons-block">
                <button v-bind:disabled="!validToDo" @click="onSaveClick">{{ this.editingToDoId.length > 0 ? 'Save' : 'Add' }}</button>
                <button @click="closeModal">Cancel</button>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
    .modal-background {
        position: absolute;
        background-color: rgba(144, 144, 144, 0.3);
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;

        .modal-wrapper {
            box-sizing: border-box;
            position: relative;
            background-color: white;
            max-width: 500px;
            max-height: 600px;
            top: 200px;
            margin: auto;
            z-index: 10px;
            opacity: 1;
            padding: 0px 30px 20px 30px;
            border-radius: 5px;

            .modal-header {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                padding-top: 20px;
                margin-bottom: 30px;

                h1 {
                    margin: 0;
                    color: #35495e;
                }
            }

            .toDo-info {
                display: flex;
                flex-direction: column;
                align-items: flex-start;

                input, textarea {
                    border-radius: 5px;
                    padding: 3px 7px;
                    color: #35495e;
                    font-weight: 600;
                }

                span {
                    font-size: 14px;
                    color: #41b883;
                    font-weight: 600;
                    margin-bottom: 3px;
                }

                &--field {
                    margin-bottom: 10px;
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;

                    &.row {
                        flex-direction: row;
                    }
                }
            }

            .control-buttons-block {
                display: flex;
                flex-direction: row;
                width: 100%;

                button {
                    background-color: #35495e;
                    border: 2px solid transparent;
                    color: white;
                    border-radius: 5px;
                    padding: 5px 12px;
                    min-width: 80px;
                    font-size: 16px;
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
import { mapGetters, mapMutations, mapState } from 'vuex';

export default defineComponent({
    name: 'Modal', 
    data() {
        return {
            newToDo: {} as ToDo,
            validToDo: false, 
        }
    }, 
    computed: {
        ...mapState({
            modalVisible: (state: any): boolean => state.systemStore.modalVisible,
            editingToDoId: (state: any): string => state.systemStore.editingToDoId,
        }),
        ...mapGetters([
            'getToDoById'
        ]),
    },
    methods: {
        ...mapMutations([
            'closeModal',
            'editToDo',
            'addToDo',
        ]),
        closingModal(event: Event): void {
            if (event.target instanceof HTMLElement) {
                if (!event.target.closest('.modal-wrapper')) {
                    this.newToDo = {} as ToDo;
                    this.closeModal();
                    event.stopImmediatePropagation();
                }
            }
        },
        onSaveClick() {
            if (this.editingToDoId.length > 0) {
                this.editToDo(this.newToDo);
            } else {
                this.addToDo(this.newToDo);
            }
            this.newToDo = {} as ToDo;
            this.closeModal();
        },
        updateToDo() {
            if (this.newToDo.title && this.newToDo.description && this.newToDo.createdAt) {
                this.validToDo = true;
            } else {
                this.validToDo = false;
            }
        }
    },
    watch: {
        editingToDoId() {
            if (this.editingToDoId.length > 0) {
                // workaround to get rid of proxy obj
                this.newToDo = JSON.parse(JSON.stringify(this.getToDoById(this.editingToDoId)));
            }
        }
    }
})
</script>