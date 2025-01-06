import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

interface InternshipCardProps {
    position: string;
    type: string;
    city: string;
    companyLogo: string;
}

const InternshipCard: React.FC<InternshipCardProps> = ({
    position,
    type,
    city,
    companyLogo,
}) => {
    return (
        <div className="card mb-3 shadow-sm" style={{ maxWidth: "540px" }}>
            <div className="row g-0 align-items-center">
                {/* Left: Company Logo */}
                <div className="col-md-2 d-flex align-items-center justify-content-center">
                    <img
                        src={companyLogo}
                        alt="Company Logo"
                        className="img-fluid rounded-circle"
                        style={{ width: "50px", height: "50px", objectFit: "cover" }}
                    />
                </div>

                {/* Right: Internship Details */}
                <div className="col-md-10">
                    <div className="card-body">
                        <h5 className="card-title mb-1">{position}</h5>
                        <p className="card-text mb-1 text-muted">
                            <small>{type}</small>
                        </p>
                        <p className="card-text">
                            <small className="text-muted">{city}</small>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InternshipCard;
