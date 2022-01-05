<template>
    <div class="toDoList-wrapper">
        <div class="options-block">
            <button v-bind:class="category === categories.ALL ? 'active' : ''" @click="() => changeToDoCategory(categories.ALL)">All</button>
            <button v-bind:class="category === categories.FINISHED ? 'active' : ''" @click="() => changeToDoCategory(categories.FINISHED)">Finished</button>
            <button v-bind:class="category === categories.UNFINISHED ? 'active' : ''" @click="() => changeToDoCategory(categories.UNFINISHED)">Unfinished</button>
            <button v-bind:class="category === categories.IMPORTANT ? 'active' : ''" @click="() => changeToDoCategory(categories.IMPORTANT)">Important</button>
            <button v-bind:class="category === categories.NOT_IMPORTANT ? 'active' : ''" @click="() => changeToDoCategory(categories.NOT_IMPORTANT)">Not Important</button>
        </div>
        <div class="toDos-block">
            <div class="empty-block" v-show="!this.sortedToDos.length">Nothing to show...</div>
            <div class="toDos-row" v-show="this.sortedToDos.length" v-for="toDosBlock in this.sortedToDos" v-bind:key="toDosBlock">
                <div class="toDos-row--date">{{ toDosBlock[0].createdAt }}</div>
                <div class="toDos-row--toDos">
                    <SingleToDo  v-for="toDo in toDosBlock" v-bind:key="toDo.id" :toDo="toDo"/>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
    .toDoList-wrapper {
        display: flex;
        flex-direction: column;
        width: 80%;
        padding: 100px 0;
        margin: auto;
        min-width: 600px;

        .options-block {
            display: flex;
            flex-direction: row;
            align-self: center;
            margin-bottom: 100px;
            width: 60%;
            justify-content: space-evenly;

            button {
                background-color: transparent;
                border: none;
                font-size: 18px;
                cursor: pointer;
                color: #35495e;

                &.active {
                    font-size: 24px;
                    font-weight: 600;
                    color: #41b883;
                }
            }
        }

        .toDos-block {
            display: flex;
            flex-direction: column;

            .toDos-row {
                display: flex;
                flex-direction: row;
                margin-bottom: 25px;

                &--date {
                    width: 20%;
                    padding: 20px 0;
                    font-weight: 600;
                    font-size: 18px;
                    color: #41b883;
                }

                &--toDos {
                    width: 80%;
                    display: flex;
                    flex-direction: row;
                    flex-wrap: wrap;
                }
            }

            .empty-block {
                font-weight: 600;
                font-size: 24px;
                color: #35495e;
            }
        }
    }
</style>

<script lang="ts">
import { defineComponent } from 'vue';
import SingleToDo from '@/components/ToDo.vue';
import { ToDo } from '@/store/types';
import { mapGetters } from 'vuex';

export enum ToDosCategory {
    ALL, 
    FINISHED,
    UNFINISHED,
    IMPORTANT,
    NOT_IMPORTANT,
}

export default defineComponent({
    name: 'ToDoList',
    data: () => {
        return {
            category: ToDosCategory.ALL,
            categories: ToDosCategory 
        }
    },
    computed: {
        ...mapGetters([
            'allToDos',
            'finishedToDos', 
            'unfinishedToDos', 
            'importantToDos',
            'notImportantToDos',
        ]),
        sortedToDos() {
            return this.filterToDos();
        }
    },
    methods: {
        changeToDoCategory(category: ToDosCategory): void {
            this.category = category;
        },
        filterToDos(): Array<Array<ToDo>> {
            let toDos: ToDo[] = [];
            switch(this.category) {
                case ToDosCategory.ALL: {
                    toDos = this.allToDos;
                    break;
                }
                case ToDosCategory.FINISHED: {
                    toDos = this.finishedToDos;
                    break;
                }
                case ToDosCategory.UNFINISHED: {
                    toDos = this.unfinishedToDos;
                    break;
                }
                case ToDosCategory.IMPORTANT: {
                    toDos = this.importantToDos;
                    break;
                }
                case ToDosCategory.NOT_IMPORTANT: {
                    toDos = this.notImportantToDos;
                }
            }

            return this.sortByDates(toDos);
        }, 
        sortByDates(toDos: ToDo[]): Array<Array<ToDo>> {
            const datesSet = new Set(toDos.map(toDo => toDo.createdAt).sort());
            const sortedToDos = [];

            for (const date of datesSet.values()) {
                const currentDateToDos = toDos.filter(toDo => toDo.createdAt === date);
                sortedToDos.push(currentDateToDos);
            }

            return sortedToDos;
        },
    },
    components: {
        SingleToDo
    }
})
</script>
