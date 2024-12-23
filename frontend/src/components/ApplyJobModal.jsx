import React, { useState } from "react";
import { Modal, Button, Form, Row, Col, Alert } from "react-bootstrap";
import { api } from "../utils/api";

const initialFormData = {
  name: "",
  email: "",
  photo: "",
  cv: "",
};

const ApplyJobModal = ({ job, onApplicationSubmitted }) => {
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(initialFormData);

  const handleClose = () => {
    setShow(false);
    setError("");
    setSuccess("");
    setFormData(initialFormData);
  };

  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    
    try {
      const resp = await api.applications.submit({
        job_id: job.id,
        ...formData
      });

      if (resp.error) {
        throw new Error(resp.error);
      }
      
      setSuccess("Application submitted successfully!");
      onApplicationSubmitted?.(resp);
      setTimeout(handleClose, 1500);
    } catch (err) {
      setError(err.message || "Failed to submit application");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow} className="w-100">
        Apply Now
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Apply for {job.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}
          
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="name" className="mb-3">
              <Form.Label>Full Name *</Form.Label>
              <Form.Control
                type="text"
                placeholder="John Doe"
                required
                value={formData.name}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="email" className="mb-3">
              <Form.Label>Email *</Form.Label>
              <Form.Control
                type="email"
                placeholder="john@example.com"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="photo" className="mb-3">
              <Form.Label>Photo URL</Form.Label>
              <Form.Control
                type="url"
                placeholder="https://example.com/photo.jpg"
                value={formData.photo}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="cv" className="mb-3">
              <Form.Label>CV/Resume *</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                required
                placeholder="Paste your CV or write about your experience..."
                value={formData.cv}
                onChange={handleChange}
              />
            </Form.Group>

            <Row className="mt-4">
              <Col>
                <Button 
                  variant="secondary" 
                  onClick={handleClose} 
                  className="w-100"
                  disabled={loading}
                >
                  Cancel
                </Button>
              </Col>
              <Col>
                <Button 
                  variant="primary" 
                  type="submit" 
                  className="w-100" 
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Submit Application"}
                </Button>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ApplyJobModal;
