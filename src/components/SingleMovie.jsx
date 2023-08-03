import React from "react";

function SingleMovie (props) {
    return (
        <div key={props.item.imdbID} className="single_movie">
            <div className="movie_details">
                <img src={props.item.Poster} className="poster" />
                <div className="movie_name">
                    <div>{props.item.Title}</div>
                    <div>Year: {props.item.Year}</div>
                </div>
            </div>
            <div className="buttons">
                <button onClick={props.likeMovie} id={props.index}>{props.text}</button>
                <button onClick={props.handleEdit}>Edit Details</button>
            </div>
        </div>
    )
}

export default SingleMovie;