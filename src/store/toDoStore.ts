import { ToDo } from './types';
import { uuid } from 'uuidv4';

export const toDoStore = {
    state: {
        toDos: [] as ToDo[],
    },
    getters: {
        allToDos: (state: any): void => {
          return state.toDos;
        },
        finishedToDos: (state: any): void => {
            return state.toDos.filter((toDo: ToDo) => toDo.done);
        },
        unfinishedToDos: (state: any): void => {
            return state.toDos.filter((toDo: ToDo) => !toDo.done);
        },
        importantToDos: (state: any): void => {
            return state.toDos.filter((toDo: ToDo) => toDo.important);
        },
        notImportantToDos: (state: any): void => {
            return state.toDos.filter((toDo: ToDo) => !toDo.important);
        },
        getToDoById: (state: any) => (id: string): ToDo => {
          return state.toDos.find((toDo: ToDo) => toDo.id === id);
        },
    },
    mutations: {
        setToDos(state: any, toDos: ToDo[]): void {
            state.toDos = toDos;
        },

        addToDo(state: any, toDo: ToDo): void {
          const newId = uuid();
          const newToDo = {
            ...toDo,
            id: newId, 
          };

          state.toDos.push(newToDo);
          localStorage.setItem('toDos', JSON.stringify(state.toDos));
        },
    
        deleteToDo(state: any, id: string): void {
          const foundIndex = state.toDos.findIndex((toDo: ToDo) => toDo.id === id);

          if (foundIndex >= 0) {
            state.toDos.splice(foundIndex, 1);
            localStorage.setItem('toDos', JSON.stringify(state.toDos));
          } else {
            console.warn(`unable to delete toDo with id: ${id}`);
          }

          console.log('todos after', state.toDos);
        },
    
        editToDo(state: any, newToDo: ToDo): void {
          const foundIndex = state.toDos.findIndex((toDo: ToDo) => toDo.id === newToDo.id);

          if (foundIndex >= 0) {
            state.toDos[foundIndex] = newToDo;
            localStorage.setItem('toDos', JSON.stringify(state.toDos));
          } else {
            console.warn(`unable to delete toDo with id: ${newToDo.id}`);
          }
        }
    },
    actions: {
        loadToDos(context: any): void {
            const toDoString = localStorage.getItem('toDos');
            if (toDoString) {
                context.commit('setToDos', JSON.parse(toDoString));
            } else {
                console.warn('unable to load toDos from local storage');
            }
        },
        loadToDo: (context: any, id: string): ToDo => {
          return context.state.toDos.find((toDo: ToDo) => toDo.id === id);
        },
        clearLocalStorage(_: any): void {
            localStorage.removeItem('toDos');
            window.location.reload();
        }
    }
};