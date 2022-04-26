import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducers'
import UsersApi from '../library/usersApi'
import UsersService from '../library/usersService';

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
const usersApi: UsersApi = new UsersApi();
const usersService: UsersService = new UsersService(usersApi);
const store: any = createStore(
  reducer,
  peristedState,
  applyMiddleware(thunk.withExtraArgument(usersService))
)

store.subscribe(() => {
  saveState(store.getState());
});

export type RootState = ReturnType<typeof store.getState>
export default store
