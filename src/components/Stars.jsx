import React from 'react';
import PropTypes from 'prop-types';
import FilledStars from '../assets/filled-stars.png';
import EmptyStars from '../assets/empty-stars.png';

const Stars = ({ rating }) => (
  <div className="stars individual">
    <img
      className="stars"
      src={EmptyStars}
      alt=""
      style={{ width: '244px' }}
    />
    <img
      className="stars"
      src={FilledStars}
      alt=""
      style={{ width: `${rating * (244 / 5)}px` }}
    />
  </div>
);

Stars.propTypes = {
  rating: PropTypes.number.isRequired,
};

export default Stars;
