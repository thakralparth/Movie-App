
import React from "react";
import { StoreContext } from "..";
// import {data} from '../data';
import {handleMovieSearch,addMovieToList} from '../actions';




class Navbar extends React.Component {

    constructor (props){
        super(props);
        this.state={
            searchText :'',
        }
    }

    handleAddToMovies =(movie) =>{
        this.props.dispatch(addMovieToList(movie));
        // this.setState({
        //     showSearchResults:false
        // })
    }

    handleSearch = ()=>{
        const {searchText}= this.state;

        this.props.dispatch(handleMovieSearch(searchText));
    }

    handleChange=(e)=>{
        this.setState({
            searchText: e.target.value
        })
    }
    render(){
        // const { showSearchResults } = this.state;
        const { result, showSearchResults } = this.props.search ;
        console.log(result);
        return (
                <div className="nav">
                    <div className="search-container">
                        <input onChange={this.handleChange}/>
                        <button id="search-btn" onClick={this.handleSearch}>Search</button>
                    
                        {showSearchResults && 
                            <div className="search-results">
                                <div className="search-result">
                                    <img src={result.Poster} alt="search-pic" />

                                    <div className="movie-info">
                                        <span>{result.Title}</span>
                                        <button onClick={()=>this.handleAddToMovies(result)}>
                                            Add To Movies
                                        </button>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            );
    }
  
}

class NavbarWrapper extends React.Component {
  render() {
    return (
      <StoreContext.Consumer>
        {(store) => (
          <Navbar dispatch={store.dispatch} search={this.props.search} />
        )}
      </StoreContext.Consumer>
    );
  }
}


export default NavbarWrapper;
