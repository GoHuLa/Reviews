/* eslint-disable no-underscore-dangle */
import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { useParams } from 'react-router-dom';

import FilledStars from '../assets/filled-stars.png';
import EmptyStars from '../assets/empty-stars.png';
import Review from './Review';

/* CSS */
import style from './stars.module.css';

const axios = require('axios');
const Controller = require('../../controllers');

const url = `http://localhost:${process.env.PORT || 3000}`;

const Reviews = () => {
  const [reviews, setReviews] = React.useState([]);
  const [avgRating, setAvgRating] = React.useState(5);
  const [removedElement, setRemovedElement] = React.useState(false);

  const report = (id) => {
    axios.delete(`${url}/api/reviews/${id}`)
      .then(() => setReviews(reviews.filter((r) => r._id !== id)))
      .then(() => setRemovedElement(true));
  };
  const { prodId } = useParams();

  React.useEffect(() => {
    (async () => {
      try {
        const res = await Controller.getReview(prodId);
        setReviews(res);
      } catch (err) {
        setReviews([]);
      }
    })();
    return () => setRemovedElement(false);
  }, [prodId, removedElement]);

  React.useEffect(() => {
    if (!reviews.length) { return; }
    const avg = reviews.reduce((m, i) => m + i.rating, 0) / reviews.length;
    setAvgRating(avg);
  }, [reviews]);

  return (
    <>
      {!reviews.length
        ? (
          <Container>
            <Row>
              No reviews found. Be the first to write one!
            </Row>
          </Container>
        )
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
                <Review report={report} review={review} />
                <hr />
              </>
            ))}
            {/* <Row>{photoArray.length ? photos : <></>}</Row> */}
          </Container>
        )}
    </>
  );
};

export default Reviews;
