import React, { useEffect, useState } from "react";
import { Button, Card, Row, Col, ListGroup } from "react-bootstrap";
import { useParams } from "react-router-dom";
import ApplicationModal from "./ApplicationModal";

interface Internship {
    id: number;
    position: string;
    workLocationType: string;
    city: string | null;
    employmentType: string;
    company: {
        id: string;
        logo: string;
        name: string;
    };
    description: string;
    requirements: string[];
    startingDate: string;
    duration: string;
    numberOfPlaces: number;
    applicationsReceived: number;
    applicationDeadline: string;
}

const InternshipDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>(); // Get the internship ID from the URL
    const [job, setJob] = useState<Internship | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [showModal, setShowModal] = useState(false);

    // Fetch the internship details by ID
    useEffect(() => {
        const fetchInternshipById = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(`http://localhost:7979/api/Internships/${id}`);
                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }
                const data: Internship = await response.json();
                setJob(data);
            } catch (err: any) {
                setError(err.message || "An error occurred");
            } finally {
                setLoading(false);
            }
        };

        fetchInternshipById();
    }, [id]);

    if (loading) {
        return <p>Loading internship details...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (!job) {
        return <p>Internship not found.</p>;
    }

    return (
        <div className="container mt-4">
            <Card className="shadow-lg">
                <Card.Body>
                    {/* Job Header */}
                    <Row className="align-items-center mb-4">
                        <Col md={2} className="text-center">
                            <img
                                src={job.company.logo}
                                alt={job.company.name}
                                className="img-fluid rounded-circle"
                                style={{ width: "100px", height: "100px", objectFit: "cover" }}
                            />
                        </Col>
                        <Col md={10}>
                            <h1 className="fw-bold">{job.position}</h1>
                            <p className="text-muted mb-0">
                                {job.workLocationType} | {job.city || "N/A"}
                            </p>
                            <p className="text-muted">
                                <strong>Company:</strong> {job.company.name}
                            </p>
                        </Col>
                    </Row>

                    {/* Additional Details */}
                    <Row className="mb-4">
                        <Col md={6}>
                            <p>
                                <strong>Starting Date:</strong>{" "}
                                {new Date(job.startingDate).toLocaleDateString()}
                            </p>
                            <p>
                                <strong>Duration:</strong> {parseDuration(job.duration)}
                            </p>
                            <p>
                                <strong>Employment Type:</strong> {job.employmentType}
                            </p>
                        </Col>
                        <Col md={6}>
                            <p>
                                <strong>Application Deadline:</strong>{" "}
                                {new Date(job.applicationDeadline).toLocaleDateString()}
                            </p>
                            <p>
                                <strong>Number of Places:</strong> {job.numberOfPlaces}
                            </p>
                            <p>
                                <strong>Applications Received:</strong>{" "}
                                {job.applicationsReceived}
                            </p>
                        </Col>
                    </Row>

                    {/* Job Description */}
                    <h4 className="mt-3">Description</h4>
                    <p>{job.description}</p>

                    {/* Requirements */}
                    <h4 className="mt-4">Requirements</h4>
                    <ListGroup className="mb-4">
                        {job.requirements.map((req, index) => (
                            <ListGroup.Item key={index} className="border-0">
                                <i className="bi bi-check-circle text-success me-2"></i>
                                {req}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>

                    {/* Apply Button */}
                    <div className="text-center mt-4">
                        <Button
                            variant="primary"
                            size="lg"
                            onClick={() => setShowModal(true)}
                        >
                            Apply Now
                        </Button>
                        <ApplicationModal
                            show={showModal}
                            onHide={() => setShowModal(false)}
                            internshipId={Number(id)}
                        />
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
};

// Helper function to parse ISO 8601 duration
const parseDuration = (duration: string): string => {
    const [days] = duration.split(".");
    return `${days} days`;
};

export default InternshipDetails;