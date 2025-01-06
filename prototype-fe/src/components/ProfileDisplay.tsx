import React from "react";
import { Badge, Card, Container, Row, Col, Button } from "react-bootstrap";

// Example JSON data (replace with actual data source)
const profileData = {
    name: "John Doe",
    bio: "Aspiring software engineer with a passion for AI and web development.",
    location: "San Francisco, CA",
    profilePicture: "/vite.svg",
    education: [
        {
            institution: "University of California, Berkeley",
            degree: "Bachelor's",
            major: "Computer Science",
            graduationYear: "2025",
        },
        {
            institution: "Stanford Online",
            degree: "Certification",
            major: "Data Science",
            graduationYear: "2023",
        },
    ],
    experience: [
        {
            company: "Tech Corp",
            role: "Software Engineering Intern",
            duration: "June 2022 - August 2022",
            description:
                "Developed and maintained internal tools using React and Node.js, improving team efficiency by 15%.",
        },
        {
            company: "Marketing Hub",
            role: "Data Analyst Intern",
            duration: "June 2021 - August 2021",
            description:
                "Analyzed marketing campaigns using Python and Tableau, contributing to a 10% increase in ROI.",
        },
    ],
    skills: ["JavaScript", "React", "Python", "SQL", "Data Visualization"],
    usefulLinks: [
        {
            label: "GitHub",
            url: "https://github.com/johndoe",
        },
        {
            label: "LinkedIn",
            url: "https://www.linkedin.com/in/johndoe/",
        },
        {
            label: "Portfolio",
            url: "https://johndoe.dev",
        },
    ],
    projects: [
        {
            title: "Personal Portfolio Website",
            description:
                "Developed a responsive portfolio website to showcase my projects, using React, Bootstrap, and Node.js.",
        },
        {
            title: "AI Chatbot",
            description:
                "Built an AI chatbot using Python and TensorFlow, deployed on AWS for seamless interaction.",
        },
    ],
    resume: "/path/to/resume.pdf",
};

const ProfileDisplay: React.FC = () => {
    const {
        name,
        bio,
        location,
        profilePicture,
        education,
        experience,
        skills,
        usefulLinks,
        projects,
        resume,
    } = profileData;

    return (
        <Container className="mt-4">
            {/* Header Section */}
            <Row className="mb-4">
                <Col md={3} className="text-center">
                    <img
                        src={profilePicture || "https://via.placeholder.com/150"}
                        alt="Profile"
                        className="rounded-circle img-fluid"
                        style={{ width: "150px", height: "150px", objectFit: "cover" }}
                    />
                </Col>
                <Col md={9}>
                    <h1>{name}</h1>
                    <p>{bio}</p>
                    <p>
                        <strong>Location:</strong> {location}
                    </p>
                </Col>
            </Row>

            {/* Education Section */}
            <h3>Education</h3>
            {education.map((edu, index) => (
                <Card className="mb-3" key={index}>
                    <Card.Body>
                        <Card.Title>{edu.institution}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">
                            {edu.degree} in {edu.major} (Class of {edu.graduationYear})
                        </Card.Subtitle>
                    </Card.Body>
                </Card>
            ))}

            {/* Experience Section */}
            <h3>Experience</h3>
            {experience.map((exp, index) => (
                <Card className="mb-3" key={index}>
                    <Card.Body>
                        <Card.Title>{exp.company}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">
                            {exp.role} ({exp.duration})
                        </Card.Subtitle>
                        <Card.Text>{exp.description}</Card.Text>
                    </Card.Body>
                </Card>
            ))}

            {/* Skills Section */}
            <h3>Skills</h3>
            <div className="mb-3">
                {skills.map((skill, index) => (
                    <Badge bg="primary" className="me-2" key={index}>
                        {skill}
                    </Badge>
                ))}
            </div>

            {/* Useful Links Section */}
            <h3>Useful Links</h3>
            <div className="mb-3">
                {usefulLinks.map((link, index) => (
                    <Button
                        key={index}
                        variant="link"
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="me-2"
                    >
                        {link.label}
                    </Button>
                ))}
            </div>

            {/* Projects Section */}
            <h3>Projects</h3>
            {projects.map((proj, index) => (
                <Card className="mb-3" key={index}>
                    <Card.Body>
                        <Card.Title>{proj.title}</Card.Title>
                        <Card.Text>{proj.description}</Card.Text>
                    </Card.Body>
                </Card>
            ))}

            {/* Resume Section */}
            <h3>Resume</h3>
            <a href={resume} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                Download Resume
            </a>
        </Container>
    );
};

export default ProfileDisplay;
