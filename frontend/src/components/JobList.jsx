import React, { useState, useEffect } from "react";
import { Card, Badge, Spinner, Dropdown } from "react-bootstrap";
import { api } from "../utils/api";
import ApplyJobModal from "./ApplyJobModal";

export const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState(null);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [jobTypes, setJobTypes] = useState([]);
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await api.jobs.getAll();
        setJobs(data);
        setFilteredJobs(data);
        const jTypes = data.map((job) => job.type);
        setJobTypes(jTypes);
      } catch (err) {
        setError("Failed to load jobs");
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);
  useEffect(() => {
    if (filter) {
      const filtered = jobs.filter((job) => job.type === filter);
      setFilteredJobs(filtered);
    } else {
      setFilteredJobs(jobs);
    }
  }, [filter, jobs]);

  if (loading) return <Spinner animation="border" />;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (<>
    <Dropdown>
      <Dropdown.Toggle variant="outline" className="border border-black" id="dropdown-basic">
        Filter by Type
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.ItemText
          style={{ cursor: 'pointer' }}
          className="thedropdown"
          onClick={() => setFilter(null)}>All</Dropdown.ItemText>
        {
          jobTypes.map((type) => (
            <Dropdown.ItemText
             style={{ cursor: 'pointer' }}
            //  i want to change color of bg of hover
            className="thedropdown"
             key={type} onClick={() => setFilter(type)}>{type}</Dropdown.ItemText>
          ))
        }
          <style jsx>{`
          .thedropdown:hover {
            background-color: #f8f9fa;
          }
          `}</style>
      </Dropdown.Menu>
    </Dropdown>
    <div className="d-flex flex-wrap">
      {filteredJobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  </>
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