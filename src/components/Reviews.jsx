/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import FilledStars from '../assets/filled-stars.png';
import EmptyStars from '../assets/empty-stars.png';
import Review from './Review';

const Controller = require('../../controllers');

const Reviews = (props) => {
  const [reviews, setReviews] = React.useState([]);
  const [avgRating, setAvgRating] = React.useState(5);
  React.useEffect(() => {
    (async () => {
      try {
        const res = await Controller.getReview(props.prodId);
        setReviews(res);
      } catch (err) {
        setReviews([]);
      }
    })();
  }, [props]);

  React.useEffect(() => {
    if (!reviews.length) { return; }
    const avg = reviews.reduce((m, i) => m + i.rating, 0) / reviews.length;
    setAvgRating(avg);
  }, [reviews]);

  return (
    <Container>
      <h3>
        {`${reviews.length} review${reviews.length > 1 ? 's' : ''}`}
        <div className="stars">
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
            data-testid="rating-stars"
            style={{ width: `${avgRating * (244 / 5)}px` }}
          />
        </div>
      </h3>
      {reviews.map((review) => (
        <Row key={review._id}>
          <Review review={review} />
        </Row>
      ))}
    </Container>
  );
};

Reviews.propTypes = {
  prodId: PropTypes.string.isRequired,
};

export default Reviews;
