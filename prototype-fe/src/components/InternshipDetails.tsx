import React from "react";
import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";

const jobs = [
    {
        id: "1",
        position: "Software Engineer Intern",
        type: "Hybrid",
        city: "San Francisco, CA",
        companyLogo: "/ernstandyoung_logo.jpeg",
        description: "Develop and maintain software solutions...",
        requirements: [
            "Experience with React",
            "Strong problem-solving skills",
            "Good communication skills",
        ],
        perks: ["Flexible hours", "Health insurance", "Work from home"],
    },
    {
        id: "2",
        position: "Marketing Intern",
        type: "On-site",
        city: "New York, NY",
        companyLogo: "/company.jpeg",
        description: "Assist in developing marketing strategies...",
        requirements: ["Understanding of marketing concepts", "Creativity"],
        perks: ["Free meals", "Mentorship program"],
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
            <div className="d-flex align-items-center mb-4">
                <img
                    src={job.companyLogo}
                    alt={job.position}
                    style={{ width: "80px", height: "80px", objectFit: "cover", marginRight: "20px" }}
                />
                <div>
                    <h1>{job.position}</h1>
                    <p className="text-muted">
                        {job.type} | {job.city}
                    </p>
                </div>
            </div>

            <h4>Description</h4>
            <p>{job.description}</p>

            <h4>Requirements</h4>
            <ul>
                {job.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                ))}
            </ul>

            <h4>Perks</h4>
            <ul>
                {job.perks.map((perk, index) => (
                    <li key={index}>{perk}</li>
                ))}
            </ul>

            <Button variant="primary" className="mt-3">
                Apply Now
            </Button>
        </div>
    );
};

export default InternshipDetails;
