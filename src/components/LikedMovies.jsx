import React, {useState, useEffect} from "react";
import SingleMovie from "./SingleMovie";

function LikedMovies () {
    const [likedMovies, setLikedMovies] = useState([]);

    useEffect(() => {
        const items = JSON.parse(localStorage.getItem('likedMovies'));
        if (items) setLikedMovies([...items]);
    }, []);

    function dislikeMovie (e) {
        let idx = e.target.id;
        let newList = [...likedMovies];
        newList.splice(idx, 1);
        setLikedMovies([...newList]);
        localStorage.setItem('likedMovies', JSON.stringify(newList));
    }

    // console.log(likedMovies);

    return (
        <div className="container">
            <h1>Liked Movies</h1>
            <ul>
                {likedMovies && likedMovies.map((item, index)=> {
                    return (
                        <SingleMovie item={item} likeMovie={dislikeMovie} index={index} text='Remove Like' />
                    )
                })}
            </ul>
        </div>
    )
}

export default LikedMovies;