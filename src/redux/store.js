import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducers'

const loadState = () => {
    try {
      const serializedState = localStorage.getItem('state');
      if(serializedState === null) {
        return undefined;
      }
      return JSON.parse(serializedState);
    } catch (e) {
      return undefined;
    }
  };
  
const saveState = (state) => {
  console.log(store.getState())
  try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem('state', serializedState);
  } catch (e) {
      // Ignore write errors;
  }
};
  
const peristedState = loadState();

let store = createStore(
    reducer,
    peristedState,
    applyMiddleware(thunk)
)

store.subscribe(() => {
    console.log(store.getState())
    saveState(store.getState());
});

export default store