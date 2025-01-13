import { useState, useEffect } from 'react';
import { Card, Badge, Button, Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import { Download } from 'lucide-react';

interface Company {
  id: string;
  name: string;
  logo: string;
}

interface Internship {
  id: number;
  position: string;
  workLocationType: string;
  city: string | null;
  employmentType: string;
  company: Company;
  description: string;
  requirements: string[];
  startingDate: string;
  duration: string;
  numberOfPlaces: number;
  applicationsReceived: number;
  applicationDeadline: string;
}

interface Document {
  id: number;
  fileName: string;
  fileType: string;
  uploadedAt: string;
}

interface Application {
  id: number;
  status: string;
  appliedAt: string;
  internship: Internship;
  documents: Document[];
}

const getStatusVariant = (status: string): string => {
  switch (status.toLowerCase()) {
    case 'pending':
      return 'warning';
    case 'shortlisted':
      return 'info';
    case 'rejected':
      return 'danger';
    case 'accepted':
      return 'success';
    default:
      return 'secondary';
  }
};

const formatDuration = (duration: string): string => {
  const days = parseInt(duration.split('.')[0]);
  if (days >= 30) {
    const months = Math.round(days / 30);
    return `${months} month${months > 1 ? 's' : ''}`;
  }
  return `${days} days`;
};

const MyApplicationsPage: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const token = localStorage.getItem('auth_token');
        const response = await fetch('http://localhost:7979/api/student/applications', {
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

  if (error) {
    return (
      <Container className="mt-4">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <h1 className="display-4 mb-4">My Applications</h1>
      
      {applications.length === 0 ? (
        <Card className="text-center p-5">
          <Card.Body>
            <Card.Title className="mb-3">No Applications Yet</Card.Title>
            <Card.Text className="text-muted">
              You haven't applied to any internships yet. Start exploring opportunities!
            </Card.Text>
            <Button variant="primary" href="/main-page">Browse Internships</Button>
          </Card.Body>
        </Card>
      ) : (
        <Row>
          {applications.map((application) => (
            <Col key={application.id} xs={12} className="mb-4">
              <Card className="shadow-sm">
                <Card.Body>
                  <Row>
                    {/* Company Logo and Basic Info */}
                    <Col md={3} className="text-center mb-3 mb-md-0">
                      <img
                        src={application.internship.company.logo}
                        alt={`${application.internship.company.name} logo`}
                        className="rounded-circle mb-2"
                        style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                      />
                      <h5 className="mb-1">{application.internship.company.name}</h5>
                      <Badge bg={getStatusVariant(application.status)} className="px-3 py-2">
                        {application.status}
                      </Badge>
                    </Col>

                    {/* Position and Details */}
                    <Col md={5}>
                      <h4>{application.internship.position}</h4>
                      <p className="text-muted mb-2">
                        <i className="bi bi-geo-alt me-2"></i>
                        {application.internship.workLocationType}
                        {application.internship.city && ` • ${application.internship.city}`}
                      </p>
                      <p className="text-muted mb-2">
                        <i className="bi bi-calendar me-2"></i>
                        Applied on: {new Date(application.appliedAt).toLocaleDateString()}
                      </p>
                      <p className="text-muted mb-0">
                        <i className="bi bi-clock me-2"></i>
                        Duration: {formatDuration(application.internship.duration)}
                      </p>
                    </Col>

                    {/* Requirements and Documents */}
                    <Col md={4}>
                      <div className="mb-3">
                        <h6 className="mb-2">Required Skills:</h6>
                        {application.internship.requirements.map((req, index) => (
                          <Badge 
                            key={index} 
                            bg="light" 
                            text="dark" 
                            className="me-2 mb-2"
                          >
                            {req}
                          </Badge>
                        ))}
                      </div>
                      
                      {application.documents.length > 0 && (
                        <div>
                          <h6 className="mb-2">Uploaded Documents:</h6>
                          {application.documents.map((doc) => (
                            <Button
                              key={doc.id}
                              variant="outline-primary"
                              size="sm"
                              className="me-2 mb-2"
                              onClick={() => handleDocumentDownload(doc.id, doc.fileName)}
                            >
                              <Download size={14} className="me-1" />
                              {doc.fileName.length > 20 
                                ? `${doc.fileName.substring(0, 20)}...` 
                                : doc.fileName}
                            </Button>
                          ))}
                        </div>
                      )}
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

export default MyApplicationsPage;