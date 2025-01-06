import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

const StudentProfileForm: React.FC = () => {
    const [profile, setProfile] = useState({
        name: "",
        bio: "",
        location: "",
        education: [
            { institution: "", degree: "", major: "", graduationYear: "" },
        ],
        experience: [{ company: "", role: "", duration: "", description: "" }],
        skills: "",
        preferences: { fieldOfInterest: "", locationPreference: "", availability: "" },
        resume: null as File | null,
    });

    // Handle input changes for static fields
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProfile((prev) => ({ ...prev, [name]: value }));
    };

    // Handle dynamic section changes (Education, Experience)
    const handleDynamicChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        index: number,
        section: "education" | "experience"
    ) => {
        const { name, value } = e.target;
        const updatedSection = [...profile[section]];
        updatedSection[index] = { ...updatedSection[index], [name]: value };
        setProfile((prev) => ({ ...prev, [section]: updatedSection }));
    };

    // Add new entry for dynamic sections
    const handleAddEntry = (section: "education" | "experience") => {
        const newEntry =
            section === "education"
                ? { institution: "", degree: "", major: "", graduationYear: "" }
                : { company: "", role: "", duration: "", description: "" };
        setProfile((prev) => ({ ...prev, [section]: [...prev[section], newEntry] }));
    };

    // Remove entry for dynamic sections
    const handleRemoveEntry = (index: number, section: "education" | "experience") => {
        const updatedSection = [...profile[section]];
        updatedSection.splice(index, 1);
        setProfile((prev) => ({ ...prev, [section]: updatedSection }));
    };

    // Handle file upload
    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files[0]) {
            setProfile((prev) => ({ ...prev, resume: files[0] }));
        }
    };


    // Handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Profile Data:", profile);
    };

    return (
        <div className="container mt-4">
            <h1>Build Your Profile</h1>
            <Form onSubmit={handleSubmit}>
                {/* Section 1 */}
                <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        value={profile.name}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Bio</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        name="bio"
                        value={profile.bio}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Location</Form.Label>
                    <Form.Control
                        type="text"
                        name="location"
                        value={profile.location}
                        onChange={handleChange}
                    />
                </Form.Group>

                {/* Section 3: Education */}
                <h3>Education</h3>
                {profile.education.map((edu, index) => (
                    <div key={index} className="mb-3">
                        <Form.Group>
                            <Form.Label>Institution</Form.Label>
                            <Form.Control
                                type="text"
                                name="institution"
                                value={edu.institution}
                                onChange={(e) => handleDynamicChange(e, index, "education")}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Degree</Form.Label>
                            <Form.Control
                                type="text"
                                name="degree"
                                value={edu.degree}
                                onChange={(e) => handleDynamicChange(e, index, "education")}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Major</Form.Label>
                            <Form.Control
                                type="text"
                                name="major"
                                value={edu.major}
                                onChange={(e) => handleDynamicChange(e, index, "education")}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Graduation Year</Form.Label>
                            <Form.Control
                                type="text"
                                name="graduationYear"
                                value={edu.graduationYear}
                                onChange={(e) => handleDynamicChange(e, index, "education")}
                            />
                        </Form.Group>
                        <Button
                            variant="danger"
                            className="mt-2"
                            onClick={() => handleRemoveEntry(index, "education")}
                        >
                            Remove
                        </Button>
                    </div>
                ))}
                <Button
                    variant="success"
                    onClick={() => handleAddEntry("education")}
                >
                    Add Education
                </Button>

                {/* Section 4: Experience */}
                <h3 className="mt-4">Experience</h3>
                {profile.experience.map((exp, index) => (
                    <div key={index} className="mb-3">
                        <Form.Group>
                            <Form.Label>Company</Form.Label>
                            <Form.Control
                                type="text"
                                name="company"
                                value={exp.company}
                                onChange={(e) => handleDynamicChange(e, index, "experience")}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Role</Form.Label>
                            <Form.Control
                                type="text"
                                name="role"
                                value={exp.role}
                                onChange={(e) => handleDynamicChange(e, index, "experience")}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Duration</Form.Label>
                            <Form.Control
                                type="text"
                                name="duration"
                                value={exp.duration}
                                onChange={(e) => handleDynamicChange(e, index, "experience")}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={2}
                                name="description"
                                value={exp.description}
                                onChange={(e) => handleDynamicChange(e, index, "experience")}
                            />
                        </Form.Group>
                        <Button
                            variant="danger"
                            className="mt-2"
                            onClick={() => handleRemoveEntry(index, "experience")}
                        >
                            Remove
                        </Button>
                    </div>
                ))}
                <Button
                    variant="success"
                    onClick={() => handleAddEntry("experience")}
                >
                    Add Experience
                </Button>

                {/* Section 5: Skills */}
                <Form.Group className="mt-4">
                    <Form.Label>Skills</Form.Label>
                    <Form.Control
                        type="text"
                        name="skills"
                        value={profile.skills}
                        onChange={handleChange}
                    />
                </Form.Group>

                {/* Section 6: Preferences */}
                <h3 className="mt-4">Preferences</h3>
                <Form.Group>
                    <Form.Label>Field of Interest</Form.Label>
                    <Form.Control
                        type="text"
                        name="fieldOfInterest"
                        value={profile.preferences.fieldOfInterest}
                        onChange={(e) =>
                            setProfile((prev) => ({
                                ...prev,
                                preferences: { ...prev.preferences, fieldOfInterest: e.target.value },
                            }))
                        }
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Location Preference</Form.Label>
                    <Form.Control
                        type="text"
                        name="locationPreference"
                        value={profile.preferences.locationPreference}
                        onChange={(e) =>
                            setProfile((prev) => ({
                                ...prev,
                                preferences: { ...prev.preferences, locationPreference: e.target.value },
                            }))
                        }
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Availability</Form.Label>
                    <Form.Control
                        type="text"
                        name="availability"
                        value={profile.preferences.availability}
                        onChange={(e) =>
                            setProfile((prev) => ({
                                ...prev,
                                preferences: { ...prev.preferences, availability: e.target.value },
                            }))
                        }
                    />
                </Form.Group>

                {/* Section 7: Resume Upload */}
                <Form.Group className="mt-4">
                    <Form.Label>Upload Resume</Form.Label>
                    <Form.Control
                        type="file"
                        onChange={handleFileUpload}
                    />
                </Form.Group>

                <Button variant="primary" type="submit" className="mt-4">
                    Save Profile
                </Button>
            </Form>
        </div>
    );
};

export default StudentProfileForm;
