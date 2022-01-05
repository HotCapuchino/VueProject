import { createStore } from 'vuex';
import { systemStore } from './systemStore';
import { toDoStore } from './toDoStore';


export default createStore({
  modules: {
    toDoStore, 
    systemStore
  }
});
