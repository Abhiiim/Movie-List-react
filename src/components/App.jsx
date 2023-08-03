import React, { useState, useEffect } from "react";
import Input from "./Input";
import SingleMovie from "./SingleMovie";
import {Link} from "react-router-dom"

function App () {
    const [keyword, setKeyword] = useState("");
    const [movies, setMovies] = useState([]);
    const [isClicked, setIsClicked] = useState(false);
    const [page, setPage] = useState(1);
    const [likedMovies, setLikedMovies] = useState(() => {
        return JSON.parse(localStorage.getItem('likedMovies')) || []
    });
    const [editedMovies, setEditedMovies] = useState(() => {
        return JSON.parse(localStorage.getItem('editedMovies')) || []
    });
    const [filterYear, setFilterYear] = useState("");
    const [isFiltered, setIsFiltered] = useState(false);
    const [filteredMovies, setFilteredMovies] = useState([]);

    useEffect(() => {
        if (isClicked) {
            const fetchData = async () => {
                try {
                    const response = await fetch('https://www.omdbapi.com/?apikey=f689c2ab&s=' + keyword + '&page=' + page); 
                    const data = await response.json();
                    setMovies(data.Search); 
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            };
            setIsClicked(false);
            fetchData(); 
        }
    }, [isClicked]);

    useEffect(() => {
        localStorage.setItem('likedMovies', JSON.stringify(likedMovies));
    }, [likedMovies]);

    useEffect(() => {
        localStorage.setItem('editedMovies', JSON.stringify(editedMovies));
    }, [editedMovies]);

    function handleChange (e) {
        setKeyword(e.target.value)
    }

    function handleSearch () {
        setIsClicked(true);
        setPage(1);
        setIsFiltered(false);
    }

    function previousPage () {
        if (page > 1) {
            setPage(page-1);
        }
        setIsClicked(true);
    }

    function nextPage () {
        setPage(page+1);
        setIsClicked(true);
    }

    function handleLike (index) {
        // let index = e.target.id;
        if (checkMovie(movies[index].imdbID, likedMovies)) {
            let newList = [];
            likedMovies.forEach(item => {
                if (item.imdbID !== movies[index].imdbID) {
                    newList.push(item);
                }
            });
            setLikedMovies([...newList]);
            localStorage.setItem('likedMovies', JSON.stringify(newList));
        } else {    
            setLikedMovies([...likedMovies, movies[index]]);
        }
    }

    function checkMovie(id, arr) {
        const foundItem = arr.find(item => item.imdbID === id);
        return foundItem !== undefined;
    };

    function returnMovie(id, arr) {
        const foundItem = arr.find(item => item.imdbID === id);
        return foundItem;
    };

    function handleFilter (e) {
        setFilterYear(e.target.value);
    }

    function filterMovies () {
        setIsFiltered(true);
        let filterList = [];
        movies.forEach(function (item) {
            if (item.Year == filterYear) {
                filterList.push(item);
            }
        });
        setFilteredMovies([...filterList]);
    }

    function handleEdit (index) {
        if (checkMovie(movies[index].imdbID, editedMovies)) {
            let editMovie = [...movies];
            let currMovie = returnMovie(movies[index].imdbID, editedMovies);
            let newTitle = prompt('Enter the new title:', currMovie.Title);

            if (newTitle !== null) {
                editMovie[index].Title = newTitle;
                setMovies([...editMovie]);
            }
            let editedList = [...editedMovies];
            editedList.forEach((item) => {
                if (item.imdbID === movies[index].imdbID) {
                    item.Title = newTitle;
                }
            });
            setEditedMovies([...editedList]);
        } else {
            let editMovie = [...movies];
            let newTitle = prompt('Enter the new title:', editMovie[index].Title);

            if (newTitle !== null) {
                editMovie[index].Title = newTitle;
                setMovies([...editMovie]);
            }
            setEditedMovies([...editedMovies, movies[index]]);
        }
        // console.log(editedMovies);
    }

    // console.log(movies);
    // localStorage.clear();

    return (
        <div className="container">
            <Input 
                handleChange={handleChange} 
                handleClick={handleSearch} 
                text="Search" 
                placeholder="Search Movies" 
            />
            <Link to="liked-movies">See Liked Movies</Link>
            <Input 
                handleChange={handleFilter} 
                handleClick={filterMovies} 
                text="Filter" 
                placeholder="Filter Movies by Year" 
            />
            <ul>
                {!isFiltered 
                    ? movies && movies.map((item, index)=> {
                        return (
                            <SingleMovie 
                                item={checkMovie(item.imdbID, editedMovies) ? returnMovie(item.imdbID, editedMovies) : item} 
                                likeMovie={() => handleLike(index)} 
                                index={index} 
                                text={checkMovie(item.imdbID, likedMovies) ? "Remove Like" : "Like"}
                                handleEdit={() => handleEdit(index)} 
                            />
                        )
                    })
                    : filteredMovies && filteredMovies.map((item, index)=> {
                        return (
                            <SingleMovie 
                                item={checkMovie(item.imdbID, editedMovies) ? returnMovie(item.imdbID, editedMovies) : item} 
                                likeMovie={() => handleLike(index)} 
                                index={index} 
                                text={checkMovie(item.imdbID, likedMovies) ? "Remove Like" : "Like"} 
                                handleEdit={() => handleEdit(index)}
                            />
                        )
                    })
                }
            </ul>
            <div className="pagination">
                <button onClick={previousPage}>Previous</button>
                <button onClick={nextPage}>Next</button>
            </div>
        </div>
    )
}

export default App;