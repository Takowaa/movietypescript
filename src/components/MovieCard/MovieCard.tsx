import styles from './MovieCard.module.css';
import { Link } from 'react-router-dom';
import { FC } from 'react';
import { MovieCardProps } from './MovieCard.types.ts';

const MovieCard: FC<MovieCardProps> = ({ movie }) => {
  return (
    <div>
      <Link to={`/movie/${movie.id}`}>
        <img
          className={styles.img}
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w600_and_h900_bestv2/${movie.poster_path}`
              : 'https://previews.123rf.com/images/oculo/oculo2004/oculo200400003/143645399-no-image-available-icon.jpg'
          }
          alt=""
        />

        <p className={styles.title}>{movie.title}</p>
        <p className={styles.date}>{movie.release_date}</p>
      </Link>
    </div>
  );
};

export default MovieCard;
