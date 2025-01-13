// components/CompanyApplicationsList.tsx
import React, { useState, useEffect } from 'react';
import { Container, Card, Badge, Row, Col, Spinner, Alert, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import type { CompanyApplication } from '../types/CompanyApplications.ts';

const getStatusVariant = (status: string): string => {
  switch (status.toLowerCase()) {
    case 'pending':
      return 'warning';
    case 'shortlisted':
      return 'info';
    case 'interview scheduled':
      return 'primary';
    case 'interview completed':
      return 'secondary';
    case 'offer extended':
      return 'info';
    case 'hired':
      return 'success';
    case 'rejected':
      return 'danger';
    default:
      return 'secondary';
  }
};

const CompanyApplicationsList: React.FC = () => {
  const [applications, setApplications] = useState<CompanyApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const token = localStorage.getItem('auth_token');
        const response = await fetch('http://localhost:7979/api/company/applications', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch applications');
        }

        const data = await response.json();
        setApplications(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center min-vh-100">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-4">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="mb-0">Applications</h1>
      </div>

      {applications.length === 0 ? (
        <Card className="text-center p-5">
          <Card.Body>
            <Card.Title>No Applications Yet</Card.Title>
            <Card.Text className="text-muted">
              There are no applications to review at this time.
            </Card.Text>
          </Card.Body>
        </Card>
      ) : (
        <Row>
          {applications.map((application) => (
            <Col key={application.id} xs={12} className="mb-4">
              <Card 
                className="shadow-sm hover-card" 
                style={{ cursor: 'pointer' }}
                onClick={() => navigate(`/company/applications/${application.id}`)}
              >
                <Card.Body>
                  <Row>
                    <Col md={8}>
                      <div className="d-flex justify-content-between align-items-start mb-3">
                        <div>
                          <h4 className="mb-1">{application.internship.position}</h4>
                          <p className="text-muted mb-0">
                            Applied by {application.student.fullName} • {application.student.academicProgram}
                          </p>
                        </div>
                        <Badge bg={getStatusVariant(application.status)} className="ms-2">
                          {application.status}
                        </Badge>
                      </div>

                      <div className="mb-3">
                        <small className="text-muted">
                          Applied on: {new Date(application.appliedAt).toLocaleDateString()}
                        </small>
                      </div>

                      <div>
                        <h6 className="mb-2">Skills Match:</h6>
                        <div className="d-flex flex-wrap gap-2">
                          {application.matchingSkills.map((skill) => (
                            <Badge key={skill} bg="success" className="me-1">
                              {skill}
                            </Badge>
                          ))}
                          {application.missingSkills.map((skill) => (
                            <Badge key={skill} bg="light" text="dark" className="me-1">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </Col>

                    <Col md={4} className="text-md-end mt-3 mt-md-0">
                      <div>
                        <Button 
                          variant="outline-primary" 
                          className="w-100 mb-2"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/company/applications/${application.id}`);
                          }}
                        >
                          View Details
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default CompanyApplicationsList;