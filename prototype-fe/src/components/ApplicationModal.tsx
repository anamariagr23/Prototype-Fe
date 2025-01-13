import { useState, FormEvent, ChangeEvent } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

interface ApplicationModalProps {
  show: boolean;
  onHide: () => void;
  internshipId: number;
}

const ApplicationModal: React.FC<ApplicationModalProps> = ({ show, onHide, internshipId }) => {
  const [resume, setResume] = useState<File | null>(null);
  const [coverLetter, setCoverLetter] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    setIsSuccess(false);

    if (!resume || !coverLetter) {
      setError('Please upload both resume and cover letter');
      setIsSubmitting(false);
      return;
    }

    const formData = new FormData();
    formData.append('resume', resume);
    formData.append('coverLetter', coverLetter);

    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch(`http://localhost:7979/api/InternshipApplications/submit/${internshipId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error('Failed to submit application');
      }

      setIsSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (
    setter: (file: File | null) => void
  ) => (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    setter(files ? files[0] : null);
  };

  const handleViewApplications = () => {
    onHide();
    navigate('/my-applications');
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Submit Application</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {isSuccess ? (
          <div className="text-center">
            <Alert variant="success">
              Application submitted successfully!
            </Alert>
            <Button 
              variant="primary" 
              onClick={handleViewApplications}
              className="mt-3"
            >
              View My Applications
            </Button>
          </div>
        ) : (
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Resume</Form.Label>
              <Form.Control
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange(setResume)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Cover Letter</Form.Label>
              <Form.Control
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange(setCoverLetter)}
                required
              />
            </Form.Group>

            {error && <Alert variant="danger">{error}</Alert>}

            <div className="d-grid gap-2">
              <Button 
                variant="primary" 
                type="submit" 
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </Button>
            </div>
          </Form>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default ApplicationModal;