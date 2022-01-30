import React from 'react';
import ReactDOM from 'react-dom';
import {createStore,applyMiddleware} from 'redux';

import './index.css';
import App from './components/App';
import rootReducer from './reducers';

//function logger(obj,next,action)
//logger(obj)(next)(action)
const logger = function({dispatch, getState}){
  return function(next){
    return function(action){
      //middleware code
      console.log('ACTION_TYPE = ',action.type);
      next(action);  //to move to next middleware or to call dispatch again at end of last middleware
    }
  }
}


const store = createStore(rootReducer,applyMiddleware(logger));  // movies is a reducer -> pure function
console.log('store',store);
// console.log('BEFORE STATE',store.getState());   //initial state is defined in reducer function

// store.dispatch({
//   type:'ADD_MOVIES',
//   movies : [ {name :'Superman'}]
// })

// console.log('AFTER STATE',store.getState()); 

ReactDOM.render(
  <React.StrictMode>
    <App store={store}/>
  </React.StrictMode>,
  document.getElementById('root')
);


