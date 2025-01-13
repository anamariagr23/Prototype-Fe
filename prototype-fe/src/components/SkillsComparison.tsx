// components/SkillsComparison.tsx
import React from 'react';
import { Badge, Card } from 'react-bootstrap';

interface SkillsComparisonProps {
    matchingSkills: string[];
    missingSkills: string[];
    className?: string;
}

const SkillsComparison: React.FC<SkillsComparisonProps> = ({
    matchingSkills,
    missingSkills,
    className = ''
}) => {
    const totalSkills = matchingSkills.length + missingSkills.length;
    const matchPercentage = (matchingSkills.length / totalSkills) * 100;

    return (
        <Card className={className}>
            <Card.Body>
                <h4>Skills Assessment</h4>
                
                <div className="mb-4">
                    <h6 className="text-success mb-2">Matching Skills</h6>
                    <div className="d-flex flex-wrap gap-2 mb-1">
                        {matchingSkills.map((skill) => (
                            <Badge key={skill} bg="success" className="d-flex align-items-center">
                                <i className="bi bi-check2 me-1"></i>
                                {skill}
                            </Badge>
                        ))}
                        {matchingSkills.length === 0 && (
                            <span className="text-muted fst-italic">No matching skills</span>
                        )}
                    </div>
                </div>

                <div className="mb-4">
                    <h6 className="text-danger mb-2">Missing Skills</h6>
                    <div className="d-flex flex-wrap gap-2 mb-1">
                        {missingSkills.map((skill) => (
                            <Badge key={skill} bg="danger" className="d-flex align-items-center">
                                <i className="bi bi-x me-1"></i>
                                {skill}
                            </Badge>
                        ))}
                        {missingSkills.length === 0 && (
                            <span className="text-muted fst-italic">No missing skills</span>
                        )}
                    </div>
                </div>

                <div className="mt-3">
                    <div className="progress" style={{ height: '10px' }}>
                        <div
                            className="progress-bar bg-success"
                            style={{ width: `${matchPercentage}%` }}
                            aria-valuenow={matchPercentage}
                            aria-valuemin={0}
                            aria-valuemax={100}
                        />
                    </div>
                    <div className="d-flex justify-content-between mt-2">
                        <small className="text-muted">
                            Match Rate: {matchPercentage.toFixed(0)}%
                        </small>
                        <small className="text-muted">
                            {matchingSkills.length} of {totalSkills} required skills
                        </small>
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
};

export default SkillsComparison;