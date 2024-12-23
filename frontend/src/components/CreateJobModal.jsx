import React, { useState } from "react";
import { Modal, Button, Form, Row, Col, Alert } from "react-bootstrap";
import { api } from "../utils/api";

const initialFormData = {
  jobTitle: "",
  jobType: "Full-time",
  salary: "",
  description: "",
  skills: "",
  postingDate: new Date().toISOString().split('T')[0],
  logoUrl: "",
};

const CreateJobModal = ({ onJobCreated }) => {
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
      const resp = await api.jobs.create({
        title: formData.jobTitle,
        type: formData.jobType,
        salary: parseInt(formData.salary),
        description: formData.description,
        skills: formData.skills,
        picture: formData.logoUrl,
        date: formData.postingDate,
      });

      if (resp.error) {
        throw new Error(resp.error);
      }
      
      setSuccess("Job created successfully!");
      onJobCreated?.(resp);
      setTimeout(handleClose, 1500);
    } catch (err) {
      setError(err.message || "Failed to create job");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div onClick={handleShow}>
        Create New Job
      </div>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Create New Job</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}
          
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="jobTitle" className="mb-3">
              <Form.Label>Job Title *</Form.Label>
              <Form.Control
                type="text"
                placeholder="Job Title"
                required
                value={formData.jobTitle}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="jobType" className="mb-3">
              <Form.Label>Job Type *</Form.Label>
              <Form.Select
                required
                value={formData.jobType}
                onChange={handleChange}
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
              </Form.Select>
            </Form.Group>

            <Form.Group controlId="salary" className="mb-3">
              <Form.Label>Annual Salary (USD) *</Form.Label>
              <Form.Control
                type="number"
                placeholder="62000"
                required
                min={0}
                value={formData.salary}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="description" className="mb-3">
              <Form.Label>Description *</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                required
                placeholder="Job description..."
                value={formData.description}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="skills" className="mb-3">
              <Form.Label>Required Skills *</Form.Label>
              <Form.Control
                type="text"
                required
                placeholder="e.g., AWS, Git, Bash, Linux"
                value={formData.skills}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="postingDate" className="mb-3">
              <Form.Label>Posting Date *</Form.Label>
              <Form.Control
                type="date"
                required
                value={formData.postingDate}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="logoUrl" className="mb-3">
              <Form.Label>Company Logo URL</Form.Label>
              <Form.Control
                type="url"
                placeholder="https://example.com/logo.png"
                value={formData.logoUrl}
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
                  onClick={handleSubmit}
                >
                  {loading ? "Creating..." : "Create Job"}
                </Button>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CreateJobModal;
