/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';

import FilledStars from '../assets/filled-stars.png';
import EmptyStars from '../assets/empty-stars.png';
import Review from './Review';

/* CSS */
import style from './stars.module.css';

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
    <>
      {!reviews.length ? 'Loading...'
        : (
          <Container>
            <h3 data-testid="review-count">
              {`${reviews.length} review${reviews.length > 1 ? 's' : ''}`}
              <div className={style.stars}>
                <img
                  className={style.stars}
                  src={EmptyStars}
                  alt=""
                  style={{ width: '244px' }}
                />
                <img
                  className={style.stars}
                  src={FilledStars}
                  alt=""
                  data-testid="rating-stars"
                  style={{ width: `${avgRating * (244 / 5)}px` }}
                />
              </div>
            </h3>
            <hr />
            {reviews.map((review) => (
              <>
                <Review review={review} />
                <hr />
              </>
            ))}
            {/* <Row>{photoArray.length ? photos : <></>}</Row> */}
          </Container>
        )}
    </>
  );
};

Reviews.propTypes = {
  prodId: PropTypes.string.isRequired,
};

export default Reviews;
