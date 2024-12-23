import React, { useState, useEffect } from 'react';
import { Badge, Card, Button, Spinner, Modal } from "react-bootstrap";
import { api } from "../utils/api";

export const MyJobList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [jobToDelete, setJobToDelete] = useState(null);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const data = await api.jobs.getMyJobs();
      setJobs(data);
    } catch (err) {
      setError("Failed to load jobs");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (job) => {
    setJobToDelete(job);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await api.jobs.deleteJob(jobToDelete.id);
      setJobs(jobs.filter(job => job.id !== jobToDelete.id));
      setShowDeleteModal(false);
    } catch (err) {
      setError("Failed to delete job");
    }
  };

  if (loading) return <Spinner animation="border" />;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="container">
      <h2 className="mb-4">My Job Postings</h2>
      {jobs.length === 0 ? (
        <p className="text-muted">No jobs posted yet.</p>
      ) : (
        <div className="row">
          {jobs.map((job) => (
            <div key={job.id} className="col-md-4 mb-4">
              <JobPostingCard job={job} onDelete={() => handleDeleteClick(job)} />
            </div>
          ))}
        </div>
      )}

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete the job posting:
          <strong> {jobToDelete?.title}</strong>?
          This action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteConfirm}>
            Delete Job
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

function JobPostingCard({ job, onDelete }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>{job.title}</Card.Title>
        <Badge bg="primary">{job.type}</Badge>
        <Card.Subtitle className="mb-2 mt-2 text-muted">
          Salary: ${job.salary.toLocaleString()}/year
        </Card.Subtitle>
        <Card.Text>
          <strong>Required Skills:</strong> {job.skills}
        </Card.Text>
        <Card.Text className="text-truncate">
          {job.description}
        </Card.Text>
        <div className="d-flex justify-content-end">
          <Button variant="danger" onClick={onDelete}>
            Delete Job
          </Button>
        </div>
      </Card.Body>
      <Card.Footer className="text-muted">
        Posted: {formatDate(job.date)}
      </Card.Footer>
    </Card>
  );
}
