import { createStore } from 'vuex';
import { SystemStore } from './systemStore';
import { ToDoStore } from './toDoStore';


export default createStore({
  modules: {
      toDoStore: ToDoStore, 
      systemStore: SystemStore
  }
})
