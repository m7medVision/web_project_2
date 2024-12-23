import React, { useState, useEffect } from "react";
import { Card, Badge, Spinner, Button } from "react-bootstrap";
import { api } from "../utils/api";

export const ApplicationList = () => {  // removed async
  const [applications, setApplications] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [applicationsData, jobsData] = await Promise.all([
          api.applications.getAll(),
          api.jobs.getAll()
        ]);
        setApplications(applicationsData);
        setJobs(jobsData);
      } catch (err) {
        setError("Failed to load applications");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <Spinner animation="border" />;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="container">
      <h2 className="mb-4">Applications Received</h2>
      {applications.length === 0 ? (
        <p className="text-muted">No applications received yet.</p>
      ) : (
        <div className="row">
          {applications.map((application) => (
            <div key={application.id} className="col-md-4 mb-4">
              <ApplicationCard 
                application={application} 
                job={jobs.find(job => job.id === application.job_id)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const ApplicationCard = ({ application, job }) => {  // removed async
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (!job) return null;

  return (
    <Card className="mb-3 shadow-sm">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-start">
          <div>
            <Card.Title className="mb-0">{application.name}</Card.Title>
            <Card.Subtitle className="text-muted mt-1">{application.email}</Card.Subtitle>
          </div>
          <div className="text-end">
            <Badge bg="primary" className="mb-2">{job.type}</Badge>
            <div className="text-muted small">
              Applied: {formatDate(application.created_at || new Date())}
            </div>
          </div>
        </div>

        <div className="mt-3">
          <p className="mb-1">
            <strong>Position:</strong> {job.title}
          </p>
          <p className="mb-1">
            <strong>Salary:</strong> ${job.salary.toLocaleString()}/year
          </p>
          {application.photo && (
            <img 
              src={application.photo} 
              alt={application.name}
              className="img-thumbnail mt-2 mb-2"
              style={{ maxWidth: "200px" }}
            />
          )}
          <p className="mb-1">
            <strong>CV/Experience:</strong>
          </p>
          <p className="text-muted">
            {application.cv}
          </p>
          <p className="mb-1">
            <strong>Required Skills:</strong>
          </p>
          <p className="text-muted">
            {job.skills}
          </p>
        </div>
      </Card.Body>
    </Card>
  );
};