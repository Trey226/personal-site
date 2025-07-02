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
                    <a href="/lol">Treymakesthings.com</a>
                </div>
                <hr />
                <div className="professional-summary">
                    <h2 className="section-header">Professional Summary</h2>
                    <p className="general-text">
                        Results-oriented Software Engineer with a B.S. in Software Engineering and a Minor in Economics, 
                        offering a unique blend of full-stack development skills and quantitative analysis capabilities. 
                        Eager to apply my strong foundation in software development, statistical analysis, and business logic to a 
                        challenging role.
                    </p>
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
                    <div className="course-work">
                        <h3 className="highlight">Relevent Coursework:</h3>
                        <p className="general-text">
                        Data Structures and Algorithms, Object Oriented Design, Operating Systems, 
                        Database Systems, Computer Applications in Statistics, International Finance, Behavioral Econ
                        </p>
                    </div>
                </div>
                <hr />
                <div className="technical-skills">
                    <h2 className="section-header">Technical Skills</h2>
                    <div className="inline">
                        <h3 className="highlight">Languages:</h3> &nbsp;
                        <p className="general-text">Python, C++, Typescript, C#, Java, SQL, R, JavaScript, Dart, HTML, CSS</p>
                    </div>
                    <div className="inline">
                        <h3 className="highlight">Web Frameworks:</h3> &nbsp;
                        <p className="general-text">ASP.NET Core (EF), Next.js, React, Flask, Tailwind, Bootstrap</p>
                    </div>
                    <div className="inline">
                        <h3 className="highlight">AI/ML & Data Science:</h3> &nbsp;
                        <p className="general-text">Scikit-learn, Pandas, NumPy, Matplotlib, ggplot, tidyr</p>
                    </div>
                    <div className="inline">
                        <h3 className="highlight">Databases:</h3> &nbsp;
                        <p className="general-text">MySQL, Azure SQL, Firebase (Firestore, Real-time Database)</p>
                    </div>
                    <div className="inline">
                        <h3 className="highlight">Tools & Technologies:</h3> &nbsp;
                        <p className="general-text">GitHub, Docker, Azure, Bash, Vercel, Hugging Face</p>
                    </div>
                    <div className="inline">
                        <h3 className="highlight">DevOps:</h3> &nbsp;
                        <p className="general-text">Agile, Scrum, CI/CD (GitHub Actions)</p>
                    </div>
                </div>
                <hr />
                <div className="projects">
                    <h2 className="section-header">Projects</h2>
                    <div className="site">
                        <div className="space-between">
                            <h3 className="highlight"><a href="/lol">This Site!</a></h3>
                            <h3 className="highlight">React, Next.js, HTML, CSS</h3>
                        </div>
                        <ul className="general-text">
                            <li>
                                This is like the 3rd time I have summarized this website on this website. 
                                A'hem, tHiS iS a SiTe FoR mE tO sHoWcAsE mY pErSoNaL pRoJeCtS.
                            </li>
                            <li>
                                This resume is built out of 100% raw HTML and CSS. Go ahead, inspect element and check for yourself. 
                                This is my magnum opus.
                            </li>
                        </ul>
                    </div>
                    <div className="ctrl-c">
                        <div className="space-between">
                            <h3 className="highlight"><a href="/projects">Ctrl-C Ctrl-Eat</a></h3>
                            <h3 className="highlight">ASP.NET Core, C#, MySQL, Entity Framework</h3>
                        </div>
                        <ul className="general-text">
                            <li>
                                Full-stack digital recipe book built using ASP.NET Core, with secure user authentication and a 
                                MySQL database using Entity Framework for ORM. <br /> 
                                (Spring 2025 capstone)
                            </li>
                        </ul>
                    </div>
                    <div className="ontime">
                        <div className="space-between">
                            <h3 className="highlight"><a href="/projects">Ontime</a></h3>
                            <h3 className="highlight">JS, Firebase, Agile/Scrum</h3>
                        </div>
                        <ul className="general-text">
                            <li>
                                This was a group project I did for a Software Engineering class. We followed Agile & Scrum practices. I contributed 
                                from 10,300km away, and 14 hours ahead. <br /> 
                                (Spring 2024 semester abroad)
                            </li>
                            <li>
                                It is a single page application that acts as a schedule planner complete with activity tags, and push notifications to alert
                                the users of upcoming events.
                            </li>
                        </ul>
                    </div>
                </div>
                <hr />
                <div className="experience">
                    <h2 className="section-header">Experience</h2>
                    <div className="research">
                        <h3 className="highlight">Student Researcher</h3>
                        <ul className="general-text">
                            <li>
                                Designed a Qualtrics survey aimed at answering key research questions, navigated the IRB approval process, 
                                collected data from participants, and authored an R Markdown script to perform statistical analysis and visualization.
                            </li>
                            <li>
                            Presented findings in a formal IMRAD-style report, providing data-driven recommendations that informed curriculum improvements.
                            </li>
                        </ul>
                    </div>
                </div>
                <hr />
                <div className="clubs">
                    <h2 className="section-header">Clubs & Activities</h2>
                    <div className="cyber">
                        <h3 className="highlight">Cybersecurity Club President</h3>
                        <ul>
                            <li>
                                Organized bi-weekly technical workshops and professional speaker events for 30+ members, 
                                increasing enrollment by 60% over 18 months.
                            </li>
                        </ul>
                    </div>
                    <div className="gla">
                        <h3 className="highlight">Global Leadership Ambassador</h3>
                        <ul>
                            <li>
                                Hosted weekly meetings providing information on how to study abroad and supported monthly events.
                            </li>
                            <li>
                                Assisted students with properly navigating the challenges of applying for, and obtaining visas for various countries.
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </main>
    );
}