import React, { createContext } from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import {createStore,applyMiddleware} from 'redux';

import './index.css';
import App from './components/App';
import rootReducer from './reducers';
import thunk from 'redux-thunk';
// import AppWrapper from './components/App';

//function logger(obj,next,action)
//logger(obj)(next)(action)
// const logger = function({dispatch, getState}){
//   return function(next){
//     return function(action){
//       //middleware code
//       console.log('ACTION_TYPE = ',action.type);
//       next(action);  //to move to next middleware or to call dispatch again at end of last middleware
//     }
//   }
// }

const logger =({dispatch,getState}) => (next) => (action) => {
  //logger code
    if(action.type !== 'function'){
      console.log('ACTION_TYPE = ',action.type);
    }
       
       next(action);  //to move to next middleware or to call dispatch again at end of last middleware
}

// const thunk =({dispatch,getState}) => (next) => (action) => {
//   //logger code
//       if (typeof action === 'function'){
//         action(dispatch);
//         return;
//       }
//       next(action);
// }

//we also have inbuilt thunk in redux npm i redux-thunk


const store = createStore(rootReducer,applyMiddleware(logger,thunk));  // movies is a reducer -> pure function
console.log('store',store);

export const StoreContext = createContext(store);

console.log('StoreContext',StoreContext);

// class Provider extends React.Component{
//   render(){
//     const { store } =this.props;
//     // console.log('st',store);
//     return(
//       <StoreContext.Provider value={store}>
//           {this.props.children}
//       </StoreContext.Provider>
//     )
//   }
// }
// console.log('BEFORE STATE',store.getState());   //initial state is defined in reducer function

// store.dispatch({
//   type:'ADD_MOVIES',
//   movies : [ {name :'Superman'}]
// })

// console.log('AFTER STATE',store.getState()); 



// ReactDOM.render(
//   <StoreContext.Provider value={store}>
//     <App store={store}/>
//   </StoreContext.Provider>,
//   document.getElementById('root')
// );

ReactDOM.render(
  
  <Provider store={store}>
    <App store={store} />
  </Provider>,
  document.getElementById('root')
);


