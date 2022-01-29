import React from "react";
import { data } from "../data";
import Navbar from "./Navbar";
import MovieCard from "./MovieCard";

class App extends React.Component {
  componentDidMount(){
    //make api call to get movie data
    //dispatch action
    const {store} = this.props;
    store.subscribe(() =>{    //2 -> after action is dispatched ,store listen to state changes(subscribe)
      console.log('UPDATED');
      this.forceUpdate();  //not to be used generally
    })

    store.dispatch({    //1
      type:'ADD_MOVIES',
      movies:data 
    });
    console.log('STATE',store.getState());  //3
  }
  
  render(){

            
      const movies=this.props.store.getState();
      console.log('RENDER');
      return (
        <div className="App">
          <Navbar />
          <div className="main">
              <div className="tabs">
                  <div className="tab">Movies</div>
                  <div className="tab">Favourites</div>
              </div>

              <div className="list">
                  {movies.map((movie,index) => (
                    <MovieCard movie={movie} key={`movies-${index}`}/>
                  ))}
              </div>
          </div>
        </div>
      );
  }
}

export default App;
