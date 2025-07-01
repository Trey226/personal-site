import "./resume.css";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Resume",
    description: "My resume",
};

export default function Resume() {
    return (
        <main>
            <div className="paper">
                <h1 className="name">Trey Gilliam</h1>
                <div className="contact-info">
                    <a href="mailto:treygilliam1@gmail.com">Treygilliam1@gmail.com</a>
                    &nbsp;
                    <a href="treymakesthings.com">Treymakesthings.com</a>
                </div>
                <hr />
                <div className="professional-summary">
                    <h2 className="section-header">Professional Summary</h2>
                    <div className="general-text">
                        Results-oriented Software Engineer with a B.S. in Software Engineering and a Minor in Economics, 
                        offering a unique blend of full-stack development skills and quantitative analysis capabilities. 
                        Eager to apply my strong foundation in software development, statistical analysis, and business logic to a 
                        challenging role.
                    </div>
                </div>
                <hr />
                <div className="education">
                    <h2 className="section-header">Education</h2>
                    <div className="uco">
                        <h3 className="highlight">B.S. in Software Engineering from University of Central Oklahoma</h3>
                        <p className="general-text">Edmond, Oklahoma - May 2025</p>
                    </div>
                    <div className="sogang">
                        <h3 className="highlight">Minor in Economics from Sogang University</h3>
                        <p className="general-text">Seoul, South Korea - May 2024</p>
                    </div>
                </div>
                <hr />
                
            </div>
        </main>
    );
}