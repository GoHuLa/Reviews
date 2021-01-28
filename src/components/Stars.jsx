import React, { useImperativeHandle, forwardRef, useRef } from 'react';
import PropTypes from 'prop-types';
import FilledStars from '../assets/filled-stars-sm.png';
import EmptyStars from '../assets/empty-stars-sm.png';

/* CSS */
import style from './stars.module.css';

function Stars({ rating }, ref) {
  const starRef = useRef();
  useImperativeHandle(ref, () => ({
    x: starRef.current.x,
    width: starRef.current.width,
  }));
  return (
    <span className={style.stars}>
      <img
        className={`${style.stars} ${style.individual}`}
        src={EmptyStars}
        ref={starRef}
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
}

// eslint-disable-next-line no-func-assign
Stars = forwardRef(Stars);

Stars.propTypes = {
  rating: PropTypes.number.isRequired,
};

export default Stars;
