import React from "react";

const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <div className="container">
                <p>© {new Date().getFullYear()} Internship Platform. All Rights Reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
