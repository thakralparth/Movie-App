import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';

import './index.css';
import App from './components/App';
import movies from './reducers';


const store = createStore(movies);  // movies is a reducer -> pure function
console.log('store',store);
console.log('BEFORE STATE',store.getState());   //initial state is defined in reducer function

store.dispatch({
  type:'ADD_MOVIES',
  movies : [ {name :'Superman'}]
})

console.log('AFTER STATE',store.getState()); 

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);


