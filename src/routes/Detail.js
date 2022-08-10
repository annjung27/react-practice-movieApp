import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Detail() {
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState([]);
  const { id } = useParams();
  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    setMovie(json.data.movie);
    setLoading(false);
  };

  useEffect(() => {
    getMovie();
  }, []);
  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <img src={movie.medium_cover_image} alt={movie.title} />
          <h3>{movie.title}</h3>
          <p>Genres:</p>
          {movie.genres.map((item) => (
            <ul key={item}>
              <li>{item}</li>
            </ul>
          ))}
          <p>
            <a href={movie.url} target="_blank" rel="noreferrer">
              Learn More
            </a>
          </p>
        </div>
      )}
    </div>
  );
}

export default Detail;
