import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Col, Flex, Pagination, Row, Select } from 'antd';
import { getMovies } from '../../store/MoviesReducer/action';
import { RootState, useAppDispatch } from '../../store/store';
import styles from './Movies.module.css';
import { MOVIE_FILTERS_ITEMS } from '../../constants/movie-filters';
import MovieCard from '../MovieCard';

const Movies = () => {
  const dispatch = useAppDispatch();
  const { movies } = useSelector((store: RootState) => store.movies);
  const [page, setPage] = useState<number>(1);
  const [sortBy, setSortBy] = useState<string>('popularity.desc');

  useEffect(() => {
    dispatch(getMovies({ page, sortBy }));
  }, [dispatch, page, sortBy]);

  return (
    <div className={styles.container}>
      <Flex align={'center'} justify={'space-between'}>
        <h1 className={styles.text}>All Movies</h1>
        <Select
          defaultValue={sortBy}
          style={{ width: 250 }}
          onChange={value => setSortBy(value)}
          options={MOVIE_FILTERS_ITEMS}
        />
      </Flex>

      <Row gutter={[32, 24]}>
        {movies.rows.map((el, idx) => (
          <Col className={styles.col} span={6} key={idx}>
            <MovieCard movie={el} />
          </Col>
        ))}
      </Row>
      <Pagination
        current={page}
        rootClassName={styles.pagin}
        defaultCurrent={1}
        pageSize={20}
        total={10000}
        onChange={pageNumber => {
          setPage(pageNumber);
        }}
        showSizeChanger={false}
      />
    </div>
  );
};

export default Movies;
