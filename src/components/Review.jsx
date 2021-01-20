import React from 'react';
import PropTypes from 'prop-types';
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Badge from 'react-bootstrap/Badge';

import Stars from './Stars';

const moment = require('moment');

// const Review = ({ review }) => (
//   <div className="review">
//     <Media as="li">
//       <Media.Body>
//         <h5>
//           <p>{review.author.name}</p>
//           <Stars rating={review.rating} />
//         </h5>
//         <br />
//         <small>{review.purchased ? 'bought' : 'didn\'t buy'}</small>
//         <p>
//           {review.body}
//         </p>
//       </Media.Body>
//       {review.photo ? <Image src={review.photo} rounded /> : <></>}
//     </Media>
//   </div>
// );

const Review = ({ review }) => {
  const purchased = <small>Purchased item</small>;

  return (

    <div className="review">
      <Row>
        <Col>
          <Row>
            <h5>
              <p>
                <small>
                  {review.author.name}
                  {'   '}
                  {moment(review.createdAt).format('MMM D, YYYY')}
                </small>
              </p>
            </h5>
          </Row>
          <Row>
            <Stars rating={review.rating} />
          </Row>
        </Col>
        <Row>
          <Col md={8}>
            <p>
              {review.body}
            </p>
            <br />
            {(review.purchased || review.photo) && purchased}
          </Col>
          <Col>
            {review.photo ? <Image src={review.photo} rounded /> : <></>}
          </Col>
        </Row>
      </Row>
    </div>
  );
};

Review.propTypes = {
  review: PropTypes.shape({
    author: PropTypes.shape({
      name: PropTypes.string.isRequired,
      photo: PropTypes.string,
    }),
    rating: PropTypes.number.isRequired,
    purchased: PropTypes.bool.isRequired,
    body: PropTypes.string.isRequired,
    photo: PropTypes.string,
    createdAt: PropTypes.string,
  }).isRequired,
};

export default Review;
