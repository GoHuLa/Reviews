/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Collapse from 'react-bootstrap/Collapse';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Stars from './Stars';

import style from './newreview.module.css';

const axios = require('axios');

const url = `localhost:${process.env.PORT || 3000}`;

const NewReview = ({ change, prodId }) => {
  const [author, setAuthor] = useState('');
  const [body, setBody] = useState('');
  const [show, toggleShow] = useState(false);
  const [validated, setValidated] = useState(false);
  const [submitted, setSubmit] = useState(false);
  const [xOffset, setXOffset] = useState(0);
  const [tracking, toggleTracking] = useState(true);
  const [purchased, setPurchased] = useState(false);

  useEffect(() => {
    if (submitted) {
      axios.post(`${url}/api/reviews`, {
        author: { name: author }, rating: xOffset, body, purchased, prodId,
      })
        .then(() => change(true));
    }
  }, [submitted]);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (!form.checkValidity()) {
      event.stopPropagation();
    } else {
      setSubmit(true);
    }
    setValidated(true);
  };

  // eslint-disable-next-line no-underscore-dangle
  const _onMouseMove = (e) => {
    if (tracking) setXOffset((Math.min(e.screenX, -462) + 462 + 73) * (5 / 73));
  };

  const resetForm = () => {
    setAuthor('');
    setBody('');
    setXOffset(0);
    toggleTracking(true);
  };

  return (
    <>
      <div className={style.form}>

        <Button
          data-testid="toggle-form"
          // eslint-disable-next-line no-nested-ternary
          variant={show ? (submitted ? 'success' : 'danger') : 'primary'}
          style={{ borderRadius: `${(show && !submitted) ? '100%' : ''}` }}
          size={show ? 'sm' : 'md'}
          className={style.show}
          type="button"
          onClick={() => {
            toggleShow(!show);
            if (!submitted) resetForm();
          }}
        >
          {/* eslint-disable-next-line no-nested-ternary */}
          {show ? (submitted ? 'done' : 'X') : 'write a review'}
        </Button>
      </div>
      <Collapse className={style.collapsible} in={show}>
        <Form data-testid="new" noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group controlId="authorName">
            <Form.Label>Name</Form.Label>
            <Form.Control data-testid="name" disabled={submitted} required type="name" value={author} onChange={(e) => setAuthor(e.target.value)} />
            <Form.Control.Feedback type="invalid">Please provide a name</Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>Your rating</Form.Label>
            <span data-testid="mouse-stars" onMouseMove={(e) => _onMouseMove(e)} onClick={() => toggleTracking(false)}>
              <Stars rating={xOffset} />
            </span>
          </Form.Group>
          <Form.Group controlId="reviewBody">
            <Form.Label>Your review</Form.Label>
            <Form.Control data-testid="body" required disabled={submitted} as="textarea" rows={4} value={body} onChange={(e) => setBody(e.target.value)} />
            <Form.Control.Feedback type="invalid">Review body can&#39;t be empty</Form.Control.Feedback>
            <Form.Text>
              <small>
                Your review is subject to terms and services.
                If users find your review offensive, it will be removed.
              </small>
            </Form.Text>
          </Form.Group>
          <Form.Group>
            <Form.Check type="checkbox" label="I bought this product" value={purchased} onChange={() => setPurchased(!purchased)} />
          </Form.Group>
          <Button
            data-testid="submit"
            variant={submitted ? 'secondary' : 'outline-primary'}
            type="submit"
            size="sm"
            disabled={submitted}
          >
            {submitted ? 'review received' : 'submit'}
          </Button>
        </Form>
      </Collapse>
    </>
  );
};

NewReview.propTypes = {
  change: PropTypes.func.isRequired,
  prodId: PropTypes.string.isRequired,
};

export default NewReview;
