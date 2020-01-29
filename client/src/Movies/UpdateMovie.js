import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'

const initialMovie = {
    title: '',
    director: '',
    metascore: '',
}

const UpdateMovie = (props) => {
    const { id } = useParams();
    const [movie, setMovie] = useState(initialMovie)
    
    useEffect(() => {
        axios
        .get(`http://localhost:5000/api/movies/${id}`)
        .then(res => setMovie(res.data))
        .catch(err => console.log(err.response));
    }, [id])

    const handleChange = ev => {
        ev.persist();
        let value = ev.target.value;
        if (ev.target.name === 'metascore') {
            value = parseInt(value)
        }
        setMovie({
            ...movie,
            [ev.target.name]: value
        });
    } 

    const handleSubmit = event => {
        event.preventDefault();
        axios
            .put(`http://localhost:5000/api/movies/${id}`, movie)
            .then(res => {
                let updatedMovies = props.movies.map(movie => movie.id === res.data.id ? movie = res.data : movie)
                props.setMovies(updatedMovies)
                props.history.push('/')
            })
            .catch(err => console.log(err))
    }
    
    return (
        <div>
            <h1>Update This Movie</h1>
            <form onSubmit={handleSubmit}>
                <input 
                type="text"
                name="title"
                value={movie.title}
                onChange={handleChange}
                placeholder="title"
                />
                <input 
                type="text"
                name="director"
                value={movie.director}
                onChange={handleChange}
                placeholder="director"
                />
                <input 
                type="text"
                name="metascore"
                value={movie.metascore}
                onChange={handleChange}
                placeholder="metascore"
                />
                <button>Change</button>
            </form>
        </div>
    )
}

export default UpdateMovie;