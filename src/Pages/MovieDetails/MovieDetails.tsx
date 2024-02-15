import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getActors, getOneMovie } from '../../store/MoviesReducer/action.ts';
import { Col, Flex, Image, Row } from 'antd';
import styles from './MovieDetails.module.css';
import { RootState, useAppDispatch } from '../../store/store.ts';
import noPhoto from '../../assets/images/no-poster.png';
const MovieDetails = () => {
  const { id } = useParams() as { id: string };
  const {
    movieDetails: { data, loading, error },
    actors,
  } = useSelector((store: RootState) => store.movies);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getOneMovie(+id));
    dispatch(getActors(+id));
  }, [dispatch, id]);

  if (loading === 'pending') {
    return '...loading';
  } else if (loading === 'failed') {
    return error;
  }

  return (
    <div className={styles.container}>
      <Flex justify={'space-between'}>
        <Col span={6}>
          <Image
            src={
              data?.poster_path
                ? `https://image.tmdb.org/t/p/w600_and_h900_bestv2/${data?.poster_path}`
                : noPhoto
            }
            alt=""
          />
        </Col>

        <div>
          <h2 className={styles.title}>{data?.title}</h2>

          <p className={styles.view}>Обзор:</p>
          <p className={styles.overview}>{data?.overview}</p>
          <Flex>
            <p className={styles.date}>Realise date: {data?.release_date}</p>
          </Flex>
        </div>
      </Flex>
      {actors && (
        <>
          <h3 className={styles.actors}>Актеры:</h3>
          <Row gutter={[32, 24]}>
            {actors.map(actor => (
              <Col span={6} key={actor.id}>
                <Image
                  src={
                    actor.profile_path
                      ? `https://image.tmdb.org/t/p/w600_and_h900_bestv2/${actor.profile_path}`
                      : 'https://previews.123rf.com/images/oculo/oculo2004/oculo200400003/143645399-no-image-available-icon.jpg'
                  }
                />
                <p className={styles.name}>{actor.name}</p>
              </Col>
            ))}
          </Row>
        </>
      )}
    </div>
  );
};

export default MovieDetails;
