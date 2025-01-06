import React, { useState } from "react";
import { Button, Form, Badge } from "react-bootstrap";

const StudentProfileForm: React.FC = () => {
    const [profile, setProfile] = useState({
        name: "",
        bio: "",
        location: "",
        profilePicture: null as File | null,
        education: [
            { institution: "", degree: "", major: "", graduationYear: "" },
        ],
        experience: [{ company: "", role: "", duration: "", description: "" }],
        skills: [] as string[],
        usefulLinks: [] as string[],
        projects: [{ title: "", description: "" }],
        resume: null as File | null,
    });

    // Handle input changes for static fields
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProfile((prev) => ({ ...prev, [name]: value }));
    };

    // Handle dynamic section changes (Education, Experience, Projects)
    const handleDynamicChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        index: number,
        section: "education" | "experience" | "projects"
    ) => {
        const { name, value } = e.target;
        const updatedSection = [...profile[section]];
        updatedSection[index] = { ...updatedSection[index], [name]: value };
        setProfile((prev) => ({ ...prev, [section]: updatedSection }));
    };

    // Add new entry for dynamic sections
    const handleAddEntry = (section: "education" | "experience" | "projects") => {
        const newEntry =
            section === "education"
                ? { institution: "", degree: "", major: "", graduationYear: "" }
                : section === "experience"
                    ? { company: "", role: "", duration: "", description: "" }
                    : { title: "", description: "" };
        setProfile((prev) => ({ ...prev, [section]: [...prev[section], newEntry] }));
    };

    // Remove entry for dynamic sections
    const handleRemoveEntry = (index: number, section: "education" | "experience" | "projects") => {
        const updatedSection = [...profile[section]];
        updatedSection.splice(index, 1);
        setProfile((prev) => ({ ...prev, [section]: updatedSection }));
    };

    // Handle file uploads (profile picture and resume)
    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, field: "profilePicture" | "resume") => {
        const files = e.target.files;
        if (files && files[0]) {
            setProfile((prev) => ({ ...prev, [field]: files[0] }));
        }
    };

    // Handle skills as chips
    const handleAddSkill = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            const skill = (e.target as HTMLInputElement).value.trim();
            if (skill && !profile.skills.includes(skill)) {
                setProfile((prev) => ({ ...prev, skills: [...prev.skills, skill] }));
            }
            (e.target as HTMLInputElement).value = "";
        }
    };

    const handleRemoveSkill = (skill: string) => {
        setProfile((prev) => ({
            ...prev,
            skills: prev.skills.filter((s) => s !== skill),
        }));
    };

    // Handle useful links
    const handleAddLink = () => {
        setProfile((prev) => ({ ...prev, usefulLinks: [...prev.usefulLinks, ""] }));
    };

    const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const updatedLinks = [...profile.usefulLinks];
        updatedLinks[index] = e.target.value;
        setProfile((prev) => ({ ...prev, usefulLinks: updatedLinks }));
    };

    const handleRemoveLink = (index: number) => {
        const updatedLinks = [...profile.usefulLinks];
        updatedLinks.splice(index, 1);
        setProfile((prev) => ({ ...prev, usefulLinks: updatedLinks }));
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
                {/* Profile Picture */}
                <Form.Group className="mb-3">
                    <Form.Label>Profile Picture</Form.Label>
                    <Form.Control
                        type="file"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFileUpload(e, "profilePicture")}
                    />
                </Form.Group>

                {/* Name, Bio, Location */}
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

                {/* Education Section */}
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

                {/* Experience Section */}
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

                {/* Skills Section */}
                <h3 className="mt-4">Skills</h3>
                <Form.Group className="mb-3">
                    <Form.Label>Add Skills (Press Enter)</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Type a skill and press Enter"
                        onKeyDown={handleAddSkill}
                    />
                </Form.Group>
                <div>
                    {profile.skills.map((skill, index) => (
                        <Badge
                            key={index}
                            bg="primary"
                            className="me-2"
                            style={{ cursor: "pointer" }}
                            onClick={() => handleRemoveSkill(skill)}
                        >
                            {skill} ✕
                        </Badge>
                    ))}
                </div>

                {/* Useful Links Section */}
                <h3 className="mt-4">Useful Links</h3>
                {profile.usefulLinks.map((link, index) => (
                    <div key={index} className="mb-3">
                        <Form.Control
                            type="text"
                            as="input" // Ensures the element is treated as <input>
                            placeholder="Enter link"
                            value={link}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleLinkChange(e, index)}
                        />
                        <Button
                            variant="danger"
                            className="mt-2"
                            onClick={() => handleRemoveLink(index)}
                        >
                            Remove
                        </Button>
                    </div>
                ))}
                <Button variant="success" onClick={handleAddLink}>
                    Add Link
                </Button>


                {/* Personal Projects Section */}
                <h3 className="mt-4">Personal Projects</h3>
                {profile.projects.map((proj, index) => (
                    <div key={index} className="mb-3">
                        <Form.Group>
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                name="title"
                                value={proj.title}
                                onChange={(e) => handleDynamicChange(e, index, "projects")}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="description"
                                value={proj.description}
                                onChange={(e) => handleDynamicChange(e, index, "projects")}
                            />
                        </Form.Group>
                        <Button
                            variant="danger"
                            className="mt-2"
                            onClick={() => handleRemoveEntry(index, "projects")}
                        >
                            Remove
                        </Button>
                    </div>
                ))}
                <Button
                    variant="success"
                    onClick={() => handleAddEntry("projects")}
                >
                    Add Project
                </Button>

                {/* Resume Upload */}
                <Form.Group className="mt-4">
                    <Form.Label>Upload Resume</Form.Label>
                    <Form.Control
                        type="file"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFileUpload(e, "resume")}
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
