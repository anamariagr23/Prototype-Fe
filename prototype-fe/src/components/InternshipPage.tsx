// import React, { useState } from "react";
// import { Button, Modal, Form, Badge } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { useNavigate } from "react-router-dom";

// // Internship Card Component
// interface InternshipCardProps {
//     id: string; // Add unique ID for each job
//     position: string;
//     type: string;
//     city: string;
//     companyLogo: string;
// }

// const InternshipCard: React.FC<InternshipCardProps> = ({
//     id,
//     position,
//     type,
//     city,
//     companyLogo,
// }) => {
//     const navigate = useNavigate();

//     const handleClick = () => {
//         navigate(`/job/${id}`); // Navigate to job details page
//     };

//     return (
//         <div
//             className="card mb-3 shadow-sm"
//             style={{ width: "300px", cursor: "pointer" }}
//             onClick={handleClick}
//         >
//             <div className="d-flex align-items-center h-100">
//                 <div
//                     className="d-flex justify-content-center align-items-center"
//                     style={{ width: "30%", padding: "10px" }}
//                 >
//                     <img
//                         src={companyLogo}
//                         alt="Company Logo"
//                         className="img-fluid rounded-circle"
//                         style={{ width: "60px", height: "60px", objectFit: "cover" }}
//                     />
//                 </div>
//                 <div style={{ width: "70%", padding: "10px" }}>
//                     <h5 className="card-title mb-1 text-truncate">{position}</h5>
//                     <p className="card-text mb-1 text-muted text-truncate">
//                         <small>{type}</small>
//                     </p>
//                     <p className="card-text text-muted text-truncate">
//                         <small>{city}</small>
//                     </p>
//                 </div>
//             </div>
//         </div>
//     );
// };

// // Main Page Component
// const InternshipPage: React.FC = () => {
//     const [showModal, setShowModal] = useState(false);
//     const [filters, setFilters] = useState<{ [key: string]: string }>({});
//     const [searchQuery, setSearchQuery] = useState("");

//     // Example internships data
//     const [internships, setInternships] = useState([
//         {
//             id: "1",
//             position: "Software Engineer Intern",
//             type: "Hybrid",
//             city: "San Francisco, CA",
//             companyLogo: "/ernstandyoung_logo.jpeg",
//         },
//         {
//             id: "2",
//             position: "Marketing Intern",
//             type: "On-site",
//             city: "New York, NY",
//             companyLogo: "/company.jpeg",
//         },
//         {
//             id: "3",
//             position: "Graphic Designer Intern",
//             type: "Remote",
//             city: "Seattle, WA",
//             companyLogo: "/ernstandyoung_logo.jpeg",
//         },
//     ]);

//     // Open and close modal
//     const handleShow = () => setShowModal(true);
//     const handleClose = () => setShowModal(false);

//     // Handle filter changes
//     const handleFilterChange = (key: string, value: string) => {
//         setFilters({ ...filters, [key]: value });
//     };

//     // Save selected filters
//     const handleSaveFilters = () => {
//         setShowModal(false);
//     };

//     // Remove a filter chip
//     const handleRemoveFilter = (key: string) => {
//         const updatedFilters = { ...filters };
//         delete updatedFilters[key];
//         setFilters(updatedFilters);
//     };

//     // Filter internships based on filters
//     const filteredInternships = internships.filter((internship) => {
//         const matchesSearch = internship.position
//             .toLowerCase()
//             .includes(searchQuery.toLowerCase());
//         const matchesFilters = Object.entries(filters).every(([key, value]) =>
//             internship[key.toLowerCase() as keyof typeof internship]?.includes(value)
//         );
//         return matchesSearch && matchesFilters;
//     });

//     return (
//         <div className="container mt-4">
//             {/* Search bar and filter button */}
//             <div className="d-flex align-items-center">
//                 <input
//                     type="text"
//                     className="form-control"
//                     placeholder="Search internships..."
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                 />
//                 <Button className="ms-2" variant="primary" onClick={handleShow}>
//                     Filters
//                 </Button>
//             </div>

//             {/* Display selected filters as chips */}
//             <div className="mt-3">
//                 {Object.entries(filters).map(([key, value]) => (
//                     <Badge
//                         key={key}
//                         pill
//                         bg="secondary"
//                         className="me-2"
//                         style={{ cursor: "pointer" }}
//                         onClick={() => handleRemoveFilter(key)}
//                     >
//                         {key}: {value} ✕
//                     </Badge>
//                 ))}
//             </div>

//             {/* Internship list */}
//             <div
//                 className="d-flex flex-wrap justify-content-center align-items-start"
//                 style={{
//                     gap: "20px", // Space between cards
//                     marginTop: "20px",
//                 }}
//             >
//                 {filteredInternships.length > 0 ? (
//                     filteredInternships.map((internship, index) => (
//                         <InternshipCard
//                             key={index}
//                             position={internship.position}
//                             type={internship.type}
//                             city={internship.city}
//                             companyLogo={internship.companyLogo}
//                             id={internship.id} />
//                     ))
//                 ) : (
//                     <p className="text-muted">No internships found</p>
//                 )}
//             </div>

//             {/* Filters modal */}
//             <Modal show={showModal} onHide={handleClose}>
//                 <Modal.Header closeButton>
//                     <Modal.Title>Filter Internships</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     <Form>
//                         <Form.Group className="mb-3">
//                             <Form.Label>Category</Form.Label>
//                             <Form.Control
//                                 as="select"
//                                 onChange={(e) =>
//                                     handleFilterChange("Category", e.target.value)
//                                 }
//                             >
//                                 <option value="">Select</option>
//                                 <option value="Tech">Tech</option>
//                                 <option value="Marketing">Marketing</option>
//                                 <option value="Design">Design</option>
//                             </Form.Control>
//                         </Form.Group>
//                         <Form.Group className="mb-3">
//                             <Form.Label>Location</Form.Label>
//                             <Form.Control
//                                 type="text"
//                                 placeholder="Enter location"
//                                 onChange={(e) =>
//                                     handleFilterChange("City", e.target.value)
//                                 }
//                             />
//                         </Form.Group>
//                         <Form.Group className="mb-3">
//                             <Form.Label>Type</Form.Label>
//                             <Form.Check
//                                 type="radio"
//                                 label="Remote"
//                                 name="type"
//                                 onChange={() => handleFilterChange("Type", "Remote")}
//                             />
//                             <Form.Check
//                                 type="radio"
//                                 label="On-site"
//                                 name="type"
//                                 onChange={() => handleFilterChange("Type", "On-site")}
//                             />
//                             <Form.Check
//                                 type="radio"
//                                 label="Hybrid"
//                                 name="type"
//                                 onChange={() => handleFilterChange("Type", "Hybrid")}
//                             />
//                         </Form.Group>
//                     </Form>
//                 </Modal.Body>
//                 <Modal.Footer>
//                     <Button variant="secondary" onClick={handleClose}>
//                         Close
//                     </Button>
//                     <Button variant="primary" onClick={handleSaveFilters}>
//                         Save Filters
//                     </Button>
//                 </Modal.Footer>
//             </Modal>
//         </div>
//     );
// };

// export default InternshipPage;
import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

// Internship Card Component
interface InternshipCardProps {
    id: string;
    position: string;
    type: string;
    city: string;
    companyLogo: string;
}

const InternshipCard: React.FC<InternshipCardProps> = ({
    id,
    position,
    type,
    city,
    companyLogo,
}) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/job/${id}`);
    };

    return (
        <div
            className="card mb-3 shadow-sm"
            style={{ width: "500px", cursor: "pointer" }}
            onClick={handleClick}
        >
            <div className="d-flex align-items-center h-100">
                <div
                    className="d-flex justify-content-center align-items-center"
                    style={{ width: "30%", padding: "10px" }}
                >
                    <img
                        src={companyLogo}
                        alt="Company Logo"
                        className="img-fluid rounded-circle"
                        style={{ width: "60px", height: "60px", objectFit: "cover" }}
                    />
                </div>
                <div style={{ width: "70%", padding: "10px" }}>
                    <h5 className="card-title mb-1 text-truncate">{position}</h5>
                    <p className="card-text mb-1 text-muted text-truncate">
                        <small>{type}</small>
                    </p>
                    <p className="card-text text-muted text-truncate">
                        <small>{city}</small>
                    </p>
                </div>
            </div>
        </div>
    );
};

// Main Page Component
const InternshipPage: React.FC = () => {
    const [showModal, setShowModal] = useState(false);
    const [filters, setFilters] = useState<{ [key: string]: string }>({});
    const [searchQuery, setSearchQuery] = useState("");
    const [internships, setInternships] = useState<InternshipCardProps[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch internships from the backend
    useEffect(() => {
        const fetchInternships = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch("http://localhost:7979/api/Internships/search");
                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }
                const data = await response.json();

                // Map backend data to the component's required format
                const mappedInternships = data.map((job: any) => ({
                    id: job.id.toString(),
                    position: job.position,
                    type: job.workLocationType,
                    city: job.city || "N/A",
                    companyLogo: job.company.logo,
                }));
                setInternships(mappedInternships);
            } catch (err: any) {
                setError(err.message || "An error occurred while fetching internships.");
            } finally {
                setLoading(false);
            }
        };

        fetchInternships();
    }, []);

    // Open and close modal
    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    // Handle filter changes
    const handleFilterChange = (key: string, value: string) => {
        setFilters({ ...filters, [key]: value });
    };

    // Save selected filters
    const handleSaveFilters = () => {
        setShowModal(false);
    };

    // Remove a filter chip
    const handleRemoveFilter = (key: string) => {
        const updatedFilters = { ...filters };
        delete updatedFilters[key];
        setFilters(updatedFilters);
    };

    // Filter internships based on filters
    const filteredInternships = internships.filter((internship) => {
        const matchesSearch = internship.position
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
        const matchesFilters = Object.entries(filters).every(([key, value]) =>
            internship[key.toLowerCase() as keyof typeof internship]?.includes(value)
        );
        return matchesSearch && matchesFilters;
    });

    if (loading) {
        return <p>Loading internships...</p>;
    }

    if (error) {
        return <p className="text-danger">{error}</p>;
    }

    return (
        <div className="container mt-4">
            {/* Search bar and filter button */}
            <div className="d-flex align-items-center">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search internships..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button className="ms-2" variant="primary" onClick={handleShow}>
                    Filters
                </Button>
            </div>

            {/* Display selected filters as chips */}
            <div className="mt-3">
                {Object.entries(filters).map(([key, value]) => (
                    <Badge
                        key={key}
                        pill
                        bg="secondary"
                        className="me-2"
                        style={{ cursor: "pointer" }}
                        onClick={() => handleRemoveFilter(key)}
                    >
                        {key}: {value} ✕
                    </Badge>
                ))}
            </div>

            {/* Internship list */}
            <div
                className="d-flex flex-wrap justify-content-center align-items-start"
                style={{
                    gap: "20px", // Space between cards
                    marginTop: "20px",
                }}
            >
                {filteredInternships.length > 0 ? (
                    filteredInternships.map((internship, index) => (
                        <InternshipCard
                            key={index}
                            position={internship.position}
                            type={internship.type}
                            city={internship.city}
                            companyLogo={internship.companyLogo}
                            id={internship.id}
                        />
                    ))
                ) : (
                    <p className="text-muted">No internships found</p>
                )}
            </div>

            {/* Filters modal */}
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Filter Internships</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                as="select"
                                onChange={(e) =>
                                    handleFilterChange("Category", e.target.value)
                                }
                            >
                                <option value="">Select</option>
                                <option value="Tech">Tech</option>
                                <option value="Marketing">Marketing</option>
                                <option value="Design">Design</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Location</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter location"
                                onChange={(e) =>
                                    handleFilterChange("City", e.target.value)
                                }
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Type</Form.Label>
                            <Form.Check
                                type="radio"
                                label="Remote"
                                name="type"
                                onChange={() => handleFilterChange("Type", "Remote")}
                            />
                            <Form.Check
                                type="radio"
                                label="On-site"
                                name="type"
                                onChange={() => handleFilterChange("Type", "On-site")}
                            />
                            <Form.Check
                                type="radio"
                                label="Hybrid"
                                name="type"
                                onChange={() => handleFilterChange("Type", "Hybrid")}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSaveFilters}>
                        Save Filters
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default InternshipPage;
