import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Form } from 'react-bootstrap';

const Report = ({ show, id, onHide }) => {
  const [reason, setReason] = useState('---------');
  const [existingReport, setExistingReports] = useState([]);
  useEffect(() => {
    setExistingReports(localStorage.getItem('reportedReviews') || []);
  }, []);

  const handleSubmit = () => {
    localStorage.setItem('reportedReviews', [...existingReport, id]);
  };

  return (
    <Modal show={show} onHide={onHide} style={{ opacity: 1 }}>
      <Modal.Header closeButton>
        <Modal.Title>Report form</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate onSubmit={handleSubmit}>
          <Form.Group controlId="authorName">
            <Form.Label>Reason for report</Form.Label>
            <Form.Control as="select" required type="name" value={reason} onChange={(e) => setReason(e.target.value)}>
              <option>Offensive language</option>
              <option>Inappropriate picture</option>
              <option>Harassment</option>
            </Form.Control>
            <Form.Control.Feedback type="invalid">Please select a reason</Form.Control.Feedback>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          type="primary"
          onClick={() => {
            handleSubmit();
            onHide();
          }}
        >
          Submit report
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

Report.propTypes = {
  show: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  onHide: PropTypes.func.isRequired,
};

export default Report;
