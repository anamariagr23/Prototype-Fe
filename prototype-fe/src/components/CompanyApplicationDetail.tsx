// components/CompanyApplicationDetail.tsx
import React, { useState, useEffect } from 'react';
import { Container, Card, Badge, Row, Col, Spinner, Alert, Button } from 'react-bootstrap';
import { Download } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import type { CompanyApplication, ApplicationStatus } from '../types/CompanyApplications';
import { APPLICATION_STATUSES } from '../types/CompanyApplications';
import StatusUpdateModal from './StatusUpdateModal';

const CompanyApplicationDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [application, setApplication] = useState<CompanyApplication | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const token = localStorage.getItem('auth_token');
        const response = await fetch(`http://localhost:7979/api/company/applications/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch application details');
        }

        const data = await response.json();
        setApplication(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchApplication();
  }, [id]);

  const handleStatusChange = async (newStatus: ApplicationStatus) => {
    try {
      setUpdatingStatus(true);
      const token = localStorage.getItem('auth_token');
      const response = await fetch(`http://localhost:7979/api/company/applications/${id}/status`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newStatus)
      });

      if (!response.ok) {
        throw new Error('Failed to update status');
      }

      setApplication(prev => prev ? { ...prev, status: newStatus } : null);
    } catch (err) {
      throw err; // Let the modal handle the error
    } finally {
      setUpdatingStatus(false);
    }
  };

  const handleDocumentDownload = async (documentId: number, fileName: string) => {
    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch(`http://localhost:7979/api/documents/${documentId}/download`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Download failed');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading document:', error);
    }
  };

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center min-vh-100">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  if (error || !application) {
    return (
      <Container className="mt-4">
        <Alert variant="danger">{error || 'Application not found'}</Alert>
        <Button variant="outline-primary" onClick={() => navigate('/company/applications')}>
          Back to Applications
        </Button>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <div className="mb-4">
        <Button variant="outline-primary" onClick={() => navigate('/company/applications')}>
          ← Back to Applications
        </Button>
      </div>

      <Card className="shadow-sm">
        <Card.Body>
          <Row>
            {/* Header Section */}
            <Col xs={12} className="mb-4">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <h2 className="mb-1">{application.internship.position}</h2>
                  <p className="text-muted mb-0">Application #{application.id}</p>
                </div>
                <Button
                  variant="outline-primary"
                  onClick={() => setShowStatusModal(true)}
                  disabled={updatingStatus}
                >
                  {application.status} <i className="bi bi-chevron-down ms-2"></i>
                </Button>
              </div>
            </Col>

            {/* Applicant Info */}
            <Col md={6} className="mb-4">
              <Card className="h-100">
                <Card.Body>
                  <h4>Applicant Information</h4>
                  <p className="mb-2"><strong>Name:</strong> {application.student.fullName}</p>
                  <p className="mb-2"><strong>Program:</strong> {application.student.academicProgram}</p>
                  <p className="mb-3">
                    <strong>Applied on:</strong> {new Date(application.appliedAt).toLocaleDateString()}
                  </p>

                  <h5 className="mb-2">Documents</h5>
                  <div className="d-flex flex-wrap gap-2">
                    {application.documents.map((doc) => (
                      <Button
                        key={doc.id}
                        variant="outline-primary"
                        size="sm"
                        onClick={() => handleDocumentDownload(doc.id, doc.fileName)}
                      >
                        <Download size={14} className="me-1" />
                        {doc.fileName}
                      </Button>
                    ))}
                  </div>
                </Card.Body>
              </Card>
            </Col>

            {/* Skills Match */}
            <Col md={6} className="mb-4">
              <Card className="h-100">
                <Card.Body>
                  <h4>Skills Assessment</h4>
                  
                  <div className="mb-4">
                    <h6 className="text-success mb-2">Matching Skills</h6>
                    <div className="d-flex flex-wrap gap-2">
                      {application.matchingSkills.map((skill) => (
                        <Badge key={skill} bg="success">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h6 className="text-danger mb-2">Missing Skills</h6>
                    <div className="d-flex flex-wrap gap-2">
                      {application.missingSkills.map((skill) => (
                        <Badge key={skill} bg="danger">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="mt-3">
                    <div className="progress">
                      <div
                        className="progress-bar bg-success"
                        style={{
                          width: `${(application.matchingSkills.length /
                            (application.matchingSkills.length + application.missingSkills.length)) *
                            100}%`
                        }}
                      />
                    </div>
                    <small className="text-muted">
                      Skills Match: {application.matchingSkills.length} of{' '}
                      {application.matchingSkills.length + application.missingSkills.length} required skills
                    </small>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <StatusUpdateModal
            show={showStatusModal}
            onHide={() => setShowStatusModal(false)}
            currentStatus={application.status}
            onUpdateStatus={handleStatusChange}
            applicationId={application.id}
          />
        </Card.Body>
      </Card>
    </Container>
  );
};

export default CompanyApplicationDetail;