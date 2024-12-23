import React, { useState, useEffect } from "react";
import { Card, Badge, Button, Spinner } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { api } from "../utils/api";
import ApplyJobModal from "./ApplyJobModal";

export const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await api.jobs.getAll();
        setJobs(data);
      } catch (err) {
        setError("Failed to load jobs");
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  if (loading) return <Spinner animation="border" />;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="d-flex flex-wrap">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
};

const JobCard = ({ job }) => {
  // Format the date to be more readable
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Card style={{ width: "18rem", margin: "1rem" }}>
      {job.picture && (
        <Card.Img 
          variant="top" 
          src={job.picture} 
          alt="Company logo"
          style={{ height: "120px", objectFit: "contain", padding: "1rem" }}
        />
      )}
      <Card.Body>
        <Card.Title>{job.title}</Card.Title>
        <Badge bg="primary" className="mb-2">{job.type}</Badge>
        <Card.Text>
          <strong>Salary:</strong> ${job.salary.toLocaleString()}/year<br />
          <strong>Required Skills:</strong> {job.skills}<br />
          <strong>Posted:</strong> {formatDate(job.date)}
        </Card.Text>
        <Card.Text className="text-truncate">
          {job.description}
        </Card.Text>
        <ApplyJobModal 
          job={job} 
          onApplicationSubmitted={(application) => {
            console.log('Application submitted:', application);
            // You can add additional handling here if needed
          }}
        />
      </Card.Body>
    </Card>
  );
};