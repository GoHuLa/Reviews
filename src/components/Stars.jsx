import React from 'react';
import PropTypes from 'prop-types';
import FilledStars from '../assets/filled-stars-sm.png';
import EmptyStars from '../assets/empty-stars-sm.png';

/* CSS */
import style from './stars.module.css';

const Stars = ({ rating }) => (
  <span className={style.stars}>
    <img
      className={`${style.stars} ${style.individual}`}
      src={EmptyStars}
      alt=""
      style={{ width: '74x' }}
    />
    <img
      className={`${style.stars} ${style.individual}`}
      src={FilledStars}
      alt=""
      data-testid="rating-star"
      style={{ width: `${rating * (74 / 5)}px` }}
    />
  </span>
);

Stars.propTypes = {
  rating: PropTypes.number.isRequired,
};

export default Stars;
