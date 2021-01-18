import React from 'react';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import Review from './Review';

const Controller = require('../../controllers');

const Reviews = (props) => {
  const [reviews, setReviews] = React.useState([]);
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

  return (
    <Container>
      {reviews.map((review) => (
        <Row>
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
