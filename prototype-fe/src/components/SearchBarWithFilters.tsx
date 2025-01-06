import React, { useState } from "react";
import { Button, Modal, Form, Badge } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const SearchBarWithFilters: React.FC = () => {
    const [showModal, setShowModal] = useState(false);
    const [filters, setFilters] = useState<{ [key: string]: string }>({});
    const [searchQuery, setSearchQuery] = useState("");

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

            {/* Filters modal */}
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Filter Internships</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        {/* Add more filters as needed */}
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
                                    handleFilterChange("Location", e.target.value)
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

export default SearchBarWithFilters;
