// import React from "react";
// import { Button } from "react-bootstrap";
// import { useParams } from "react-router-dom";

// const jobs = [
//     {
//         id: "1",
//         position: "Software Engineer Intern",
//         type: "Hybrid",
//         city: "San Francisco, CA",
//         companyLogo: "/ernstandyoung_logo.jpeg",
//         description: "Develop and maintain software solutions...",
//         requirements: [
//             "Experience with React",
//             "Strong problem-solving skills",
//             "Good communication skills",
//         ],
//         perks: ["Flexible hours", "Health insurance", "Work from home"],
//     },
//     {
//         id: "2",
//         position: "Marketing Intern",
//         type: "On-site",
//         city: "New York, NY",
//         companyLogo: "/company.jpeg",
//         description: "Assist in developing marketing strategies...",
//         requirements: ["Understanding of marketing concepts", "Creativity"],
//         perks: ["Free meals", "Mentorship program"],
//     },
// ];

// const InternshipDetails: React.FC = () => {
//     const { id } = useParams<{ id: string }>(); // Get job ID from URL
//     const job = jobs.find((job) => job.id === id);

//     if (!job) {
//         return <p>Job not found.</p>;
//     }

//     return (
//         <div className="container mt-4">
//             <div className="d-flex align-items-center mb-4">
//                 <img
//                     src={job.companyLogo}
//                     alt={job.position}
//                     style={{ width: "80px", height: "80px", objectFit: "cover", marginRight: "20px" }}
//                 />
//                 <div>
//                     <h1>{job.position}</h1>
//                     <p className="text-muted">
//                         {job.type} | {job.city}
//                     </p>
//                 </div>
//             </div>

//             <h4>Description</h4>
//             <p>{job.description}</p>

//             <h4>Requirements</h4>
//             <ul>
//                 {job.requirements.map((req, index) => (
//                     <li key={index}>{req}</li>
//                 ))}
//             </ul>

//             <h4>Perks</h4>
//             <ul>
//                 {job.perks.map((perk, index) => (
//                     <li key={index}>{perk}</li>
//                 ))}
//             </ul>

//             <Button variant="primary" className="mt-3">
//                 Apply Now
//             </Button>
//         </div>
//     );
// };

// export default InternshipDetails;
import React from "react";
import { Button, Card, Row, Col, ListGroup } from "react-bootstrap";
import { useParams } from "react-router-dom";

const jobs = [
    {
        id: "1",
        position: "Software Engineer Intern",
        type: "Hybrid",
        internshipType: "Full-time",
        city: "San Francisco, CA",
        companyLogo: "/ernstandyoung_logo.jpeg",
        description: "Develop and maintain software solutions...",
        requirements: [
            "Experience with React",
            "Strong problem-solving skills",
            "Good communication skills",
        ],
        perks: ["Flexible hours", "Health insurance", "Work from home"],
        startingDate: "March 1, 2025",
        period: "3 months",
        numberOfPlaces: 5,
        applicationsReceived: 23,
        applicationDeadline: "February 15, 2025",
    },
    {
        id: "2",
        position: "Marketing Intern",
        type: "On-site",
        internshipType: "Part-time",
        city: "New York, NY",
        companyLogo: "/company.jpeg",
        description: "Assist in developing marketing strategies...",
        requirements: ["Understanding of marketing concepts", "Creativity"],
        perks: ["Free meals", "Mentorship program"],
        startingDate: "April 15, 2025",
        period: "6 months",
        numberOfPlaces: 2,
        applicationsReceived: 15,
        applicationDeadline: "April 1, 2025",
    },
];

const InternshipDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>(); // Get job ID from URL
    const job = jobs.find((job) => job.id === id);

    if (!job) {
        return <p>Job not found.</p>;
    }

    return (
        <div className="container mt-4">
            <Card className="shadow-lg">
                <Card.Body>
                    {/* Job Header */}
                    <Row className="align-items-center mb-4">
                        <Col md={2} className="text-center">
                            <img
                                src={job.companyLogo}
                                alt={job.position}
                                className="img-fluid rounded-circle"
                                style={{ width: "100px", height: "100px", objectFit: "cover" }}
                            />
                        </Col>
                        <Col md={10}>
                            <h1 className="fw-bold">{job.position}</h1>
                            <p className="text-muted mb-0">
                                {job.type} | {job.city}
                            </p>
                        </Col>
                    </Row>

                    {/* Additional Details */}
                    <Row className="mb-4">
                        <Col md={6}>
                            <p>
                                <strong>Starting Date:</strong> {job.startingDate}
                            </p>
                            <p>
                                <strong>Period:</strong> {job.period}
                            </p>
                            <p>
                                <strong>Internship Type:</strong> {job.internshipType}
                            </p>
                        </Col>
                        <Col md={6}>
                            <p>
                                <strong>Application Deadline:</strong> {job.applicationDeadline}
                            </p>
                            <p>
                                <strong>Number of Places:</strong> {job.numberOfPlaces}
                            </p>
                            <p>
                                <strong>Applications Received:</strong> {job.applicationsReceived}
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

                    {/* Perks */}
                    <h4 className="mt-4">Perks</h4>
                    <ListGroup className="mb-4">
                        {job.perks.map((perk, index) => (
                            <ListGroup.Item key={index} className="border-0">
                                <i className="bi bi-gift text-primary me-2"></i>
                                {perk}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>

                    {/* Apply Button */}
                    <div className="text-center mt-4">
                        <Button variant="primary" size="lg">
                            Apply Now
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
};

export default InternshipDetails;
