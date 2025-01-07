import React, { useState } from "react";
import { Badge, Button, Card, Form, Row, Col } from "react-bootstrap";

const InternshipCreationForm: React.FC = () => {
    const [internship, setInternship] = useState({
        id: "",
        position: "",
        type: "On-site",
        internshipType: "Full-time",
        city: "",
        companyLogo: "",
        description: "",
        requirements: [] as string[],
        perks: [] as string[],
        startingDate: "",
        period: "",
        numberOfPlaces: 1,
        applicationDeadline: "",
    });

    const [submittedInternships, setSubmittedInternships] = useState<any[]>([]);

    // Handle changes for text inputs
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setInternship((prev) => ({ ...prev, [name]: value }));
    };

    // Handle requirements and perks
    const handleAddChip = (field: "requirements" | "perks", value: string) => {
        setInternship((prev) => ({
            ...prev,
            [field]: [...prev[field], value],
        }));
    };

    const handleRemoveChip = (field: "requirements" | "perks", index: number) => {
        const updatedArray = [...internship[field]];
        updatedArray.splice(index, 1);
        setInternship((prev) => ({
            ...prev,
            [field]: updatedArray,
        }));
    };

    // Handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newInternship = {
            ...internship,
            id: (submittedInternships.length + 1).toString(), // Generate unique ID
        };
        setSubmittedInternships((prev) => [...prev, newInternship]);
        console.log("New Internship Submitted:", newInternship);
        setInternship({
            id: "",
            position: "",
            type: "On-site",
            internshipType: "Full-time",
            city: "",
            companyLogo: "",
            description: "",
            requirements: [],
            perks: [],
            startingDate: "",
            period: "",
            numberOfPlaces: 1,
            applicationDeadline: "",
        }); // Reset the form
    };

    return (
        <div className="container mt-4">
            <Card className="shadow p-4">
                <h1 className="text-center mb-4">Recruiter: Create an Internship</h1>
                <Form onSubmit={handleSubmit}>
                    {/* Position */}
                    <Form.Group className="mb-3">
                        <Form.Label>Position</Form.Label>
                        <Form.Control
                            type="text"
                            name="position"
                            value={internship.position}
                            onChange={handleChange}
                            placeholder="e.g., Software Engineer Intern"
                            required
                        />
                    </Form.Group>

                    <Row>
                        {/* Type (On-site/Remote/Hybrid) */}
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Type</Form.Label>
                                <Form.Select
                                    name="type"
                                    value={internship.type}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="On-site">On-site</option>
                                    <option value="Remote">Remote</option>
                                    <option value="Hybrid">Hybrid</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>

                        {/* Internship Type */}
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Internship Type</Form.Label>
                                <Form.Select
                                    name="internshipType"
                                    value={internship.internshipType}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="Full-time">Full-time</option>
                                    <option value="Part-time">Part-time</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>

                    {/* City */}
                    <Form.Group className="mb-3">
                        <Form.Label>City</Form.Label>
                        <Form.Control
                            type="text"
                            name="city"
                            value={internship.city}
                            onChange={handleChange}
                            placeholder="e.g., San Francisco, CA"
                            required
                        />
                    </Form.Group>

                    {/* Company Logo */}
                    <Form.Group className="mb-3">
                        <Form.Label>Company Logo URL</Form.Label>
                        <Form.Control
                            type="text"
                            name="companyLogo"
                            value={internship.companyLogo}
                            onChange={handleChange}
                            placeholder="e.g., https://company-logo.com/logo.png"
                        />
                    </Form.Group>

                    {/* Description */}
                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            name="description"
                            value={internship.description}
                            onChange={handleChange}
                            rows={3}
                            placeholder="Provide a short description of the internship..."
                            required
                        />
                    </Form.Group>

                    <Row>
                        {/* Starting Date */}
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Starting Date</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="startingDate"
                                    value={internship.startingDate}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        </Col>

                        {/* Period */}
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Period</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="period"
                                    value={internship.period}
                                    onChange={handleChange}
                                    placeholder="e.g., 3 months"
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        {/* Number of Places */}
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Number of Places</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="numberOfPlaces"
                                    value={internship.numberOfPlaces}
                                    onChange={handleChange}
                                    min="1"
                                    required
                                />
                            </Form.Group>
                        </Col>

                        {/* Application Deadline */}
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Application Deadline</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="applicationDeadline"
                                    value={internship.applicationDeadline}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    {/* Requirements */}
                    <Form.Group className="mb-3">
                        <Form.Label>Requirements</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Type a requirement and press Enter"
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && e.currentTarget.value.trim()) {
                                    e.preventDefault();
                                    handleAddChip("requirements", e.currentTarget.value.trim());
                                    e.currentTarget.value = "";
                                }
                            }}
                        />
                        <div className="mt-2">
                            {internship.requirements.map((req, index) => (
                                <Badge
                                    key={index}
                                    bg="primary"
                                    className="me-2"
                                    onClick={() => handleRemoveChip("requirements", index)}
                                    style={{ cursor: "pointer" }}
                                >
                                    {req} ✕
                                </Badge>
                            ))}
                        </div>
                    </Form.Group>

                    {/* Perks */}
                    <Form.Group className="mb-3">
                        <Form.Label>Perks</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Type a perk and press Enter"
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && e.currentTarget.value.trim()) {
                                    e.preventDefault();
                                    handleAddChip("perks", e.currentTarget.value.trim());
                                    e.currentTarget.value = "";
                                }
                            }}
                        />
                        <div className="mt-2">
                            {internship.perks.map((perk, index) => (
                                <Badge
                                    key={index}
                                    bg="success"
                                    className="me-2"
                                    onClick={() => handleRemoveChip("perks", index)}
                                    style={{ cursor: "pointer" }}
                                >
                                    {perk} ✕
                                </Badge>
                            ))}
                        </div>
                    </Form.Group>

                    <Button variant="primary" type="submit" className="w-100">
                        Create Internship
                    </Button>
                </Form>
            </Card>

            {/* Submitted Internships */}
            <div className="mt-5">
                <h2>Submitted Internships</h2>
                <Row>
                    {submittedInternships.map((job, index) => (
                        <Col md={6} lg={4} key={index}>
                            <Card className="mb-4 shadow-sm">
                                <Card.Body>
                                    <Card.Title>{job.position}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">
                                        {job.type} | {job.city}
                                    </Card.Subtitle>
                                    <Card.Text>
                                        <strong>Starting Date:</strong> {job.startingDate}
                                        <br />
                                        <strong>Period:</strong> {job.period}
                                        <br />
                                        <strong>Places:</strong> {job.numberOfPlaces}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
        </div>
    );
};

export default InternshipCreationForm;
