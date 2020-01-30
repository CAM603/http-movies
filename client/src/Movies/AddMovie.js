import React, {useState} from 'react';
import axios from 'axios';

const AddMovie = (props) => {
    const [newMovie, setNewMovie] = useState({
        id: null,
        title: '',
        director: '',
        metascore: '',
    })

    const handleChange = ev => {
    ev.persist();
    let value = ev.target.value;
    if (ev.target.name === "metascore") {
        value = parseInt(value);
    }
        setNewMovie({
        ...newMovie,
        [ev.target.name]: value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault()
        axios
            .post(`http://localhost:5000/api/movies`, newMovie)
            .then(res => {
                console.log(res)
                props.setMovies(res.data)
                props.history.push('/')
            })
            .catch(err => console.log(err))
    }

    return (
        <div>
            <h1>Add A Movie Here</h1>
            <form onSubmit={handleSubmit}>
                <input
                type="text"
                name="title"
                placeholder="title"
                value={newMovie.title}
                onChange={handleChange}
                />
                <input
                type="text"
                name="director"
                placeholder="director"
                value={newMovie.director}
                onChange={handleChange}
                />
                <input
                type="text"
                name="metascore"
                placeholder="metascore"
                value={newMovie.metascore}
                onChange={handleChange}
                />
                <button>Add</button>
            </form>
        </div>
    )
}

export default AddMovie;