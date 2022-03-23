import { createStore, applyMiddleware, CombinedState } from 'redux'
import thunk from 'redux-thunk'
import reducer, { RootState } from './reducers'
import UsersApi from '../api/usersApi'

const loadState = (): undefined|any => {
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
  
const saveState = (state: RootState): void => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (e) {
      // Ignore write errors;
  }
};
  
const peristedState = loadState();
const usersApi: UsersApi = new UsersApi()

let store: any = createStore(
  reducer,
  peristedState,
  applyMiddleware(thunk.withExtraArgument(usersApi))
)

store.subscribe(() => {
  saveState(store.getState());
});

export default store
