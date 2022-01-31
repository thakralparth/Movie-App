import React from "react";
import { data } from "../data";
import Navbar from "./Navbar";
import MovieCard from "./MovieCard";
import { addMovies, setShowFavourites } from "../actions";
import {StoreContext} from '../index'
import { connect } from "react-redux";

class App extends React.Component {
  componentDidMount(){
    //make api call to get movie data
    //dispatch action
    // const {store} = this.props;
    // store.subscribe(() =>{    //2 -> after action is dispatched ,store listen to state changes(subscribe)
    //   console.log('UPDATED');
    //   this.forceUpdate();  //not to be used generally
    // })

    this.props.dispatch(addMovies(data));  //1

    // console.log('STATE',store.getState());  //3
  }

  isMovieFavourite =(movie) =>{
    const {movies} =this.props;

    const index = movies.favourites.indexOf(movie);

    if(index !== -1){
      //foud the movie
      return true;
    }
    return false;
  }

  onChangeTab = (val)=>{
    this.props.dispatch(setShowFavourites(val));
  }
  
  render(){

      const {movies,search} = this.props; //{movies: , search:}  
      console.log('search',search);

      const { list,favourites,showFavourites }=movies;  //{list:[], favouries:[]}
      console.log('RENDER',this.props.store.getState());

      const displayMovies = showFavourites ? favourites : list;


      //we can only use our StoreContext.Consumer method inside render method

      

      return (
        <div className="App">
          <Navbar search={search}/>
          <div className="main">
              <div className="tabs">
                  <div className={`tab ${showFavourites ? '' : 'active-tabs'}`} onClick={()=>this.onChangeTab(false)}>Movies</div>
                  <div className={`tab ${showFavourites ? 'active-tabs' : ''}`} onClick={()=>this.onChangeTab(true)}>Favourites</div>
              </div>

              <div className="list">
                  {displayMovies.map((movie,index) => (
                    <MovieCard 
                    movie={movie} 
                    key={`movies-${index}`}
                    dispatch={this.props.dispatch}
                    isFavourite={this.isMovieFavourite(movie)}
                    />
                  ))}
              </div>
              {displayMovies.length === 0 ? <div className="no-movies">No movies to display!</div> : null}
          </div>
        </div>
      );
  }
}

// class AppWrapper extends React.Component{
//   render(){
//     return(
//       <StoreContext.Consumer>
//         {(store)=> (<App store={store} />)}
//       </StoreContext.Consumer>
//     )
//   }
// }

// export default AppWrapper;

function callback(state) {
  return {
    movies: state.movies,
    search: state.movies,
  };
}
const connectedComponent = connect(callback)(App);
export default connectedComponent;
