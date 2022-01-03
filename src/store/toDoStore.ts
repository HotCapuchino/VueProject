import { createStore } from 'vuex'
import { ToDo } from './types';
import { uuid } from 'uuidv4'

export const ToDoStore = createStore({
    state: {
        toDos: [] as ToDo[],
    },
    getters: {
        finishedToDos: (state): ToDo[] => {
            return state.toDos.filter(toDo => toDo.done);
        },
        unfinishedToDos: (state): ToDo[] => {
            return state.toDos.filter(toDo => !toDo.done);
        },
        importantToDos: (state): ToDo[] => {
            return state.toDos.filter(toDo => toDo.important);
        },
        notImportantToDos: (state): ToDo[] => {
            return state.toDos.filter(toDo => !toDo.important);
        }
    },
    mutations: {
        setToDos(state, toDos: ToDo[]): void {
            state.toDos = toDos;
        },

        addToDo(state, toDo: ToDo): void {
          const newId = uuid();
          const newToDo = {
            ...toDo,
            id: newId, 
          };

          state.toDos.push(newToDo);
          localStorage.setItem('toDos', JSON.stringify(state.toDos));
        },
    
        deleteToDo(state, id: string): void {
          const foundIndex = state.toDos.findIndex(toDo => toDo.id === id);
          if (foundIndex >= 0) {
            state.toDos.splice(foundIndex, 1);
            localStorage.setItem('toDos', JSON.stringify(state.toDos));
          } else {
            console.warn(`unable to delete toDo with id: ${id}`);
          }
        },
    
        editToDo(state, newToDo: ToDo): void {
          const foundIndex = state.toDos.findIndex(toDo => toDo.id === newToDo.id);
          if (foundIndex >= 0) {
            state.toDos[foundIndex] = newToDo;
            localStorage.setItem('toDos', JSON.stringify(state.toDos));
          } else {
            console.warn(`unable to delete toDo with id: ${newToDo.id}`);
          }
        }
    },
    actions: {
        loadToDos(context): void {
            const toDoString = localStorage.getItem('toDos');
            if (toDoString) {
                context.dispatch('setToDos', JSON.parse(toDoString));
            } else {
                console.warn('unable to load toDos from local storage');
            }
        },
        clearLocalStorage(_): void {
            localStorage.removeItem('toDos');
        }
    }
})