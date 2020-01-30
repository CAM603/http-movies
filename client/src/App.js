import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import axios from "axios";

import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import UpdateMovie from "./Movies/UpdateMovie";
import AddMovie from "./Movies/AddMovie";

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => setMovies(res.data))
      .catch(err => console.log(err.response));
  }, [])

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  return (
    <>
      <SavedList list={savedList} />
      <Route 
      exact path="/" 
      render={props => {
        return <MovieList {...props} movies={movies}/>
      }}/>
      <Route
        path="/movies/:id"
        render={props => {
          return <Movie 
                  {...props} 
                  addToSavedList={addToSavedList} 
                  savedList={savedList}
                  setMovies={setMovies} 
                  movies={movies}
                  />;
        }}
      />
      <Route path="/update-movie/:id"
      render={props => {
        return <UpdateMovie 
                {...props} 
                setMovies={setMovies} 
                movies={movies}
                />
      }}
      />
      <Route path="/add-movie"
      render={props => {
        return <AddMovie 
                {...props}
                setMovies={setMovies}
                />
      }}
      />
    </>
  );
};

export default App;
