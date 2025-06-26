import { Container, Typography } from "@mui/material";

export default function DynamicResume() {
    return (
        <Container maxWidth="md" sx={{ mt: 8, mb: 8 }}>
            <Typography variant="h3" component="h1" gutterBottom>
            Trey Gilliam
Treygilliam1@gmail.com | Treymakesthings.com  
PROFESSIONAL SUMMARY
Results-oriented Software Engineer with a B.S. in Software Engineering and a Minor in Economics, offering a unique blend of full-stack development skills and quantitative analysis capabilities. Eager to apply my strong foundation in software development, statistical analysis, and business logic to a challenging role.
EDUCATION
The University of Central Oklahoma
Bachelor of Science in Software Engineering | Graduated Spring 2025
Minor: Economics (Most credits completed in Spring 2024 at Sogang University, South Korea)
Relevant Coursework: Data Structures and Algorithms, Object Oriented Design, Operating Systems, Database Systems, Computer Applications in Statistics, International Finance, Behavioral Econ
TECHNICAL SKILLS
Languages: Python, C#, C++, JavaScript, Java, SQL, R, Dart
Web Frameworks: ASP.NET Core (EF), Next.js, React, Flask, Tailwind, Bootstrap
AI/ML & Data Science: Scikit-learn, Pandas, NumPy, Matplotlib, ggplot, tidyr
Databases: MySQL, Azure SQL, Firebase (Firestore, Real-time Database)
Tools & Technologies: GitHub, Docker, Azure, Bash, Vercel, Hugging Face
Methodologies & DevOps: Agile, Scrum, CI/CD (GitHub Actions)
PROJECTS
Ctrl-C Ctrl-Eat | C# ASP.Net JavaScript MySQL Entity Framework | demo available on personal site
Full-stack digital recipe book built using ASP.NET Core, with secure user authentication and a normalized MySQL database using Entity Framework for ORM. (Spring ‘25 capstone)
Beat the ATS | Python NumPy Scikit-learn | demo available on personal site
A resume keyword optimizer that uses the Term Frequency-Inverse Document Frequency of the resume and job description to calculate the cosine similarity between the two to provide the applicant with actionable keyword improvements for specific jobs. (Summer ‘25)
PROFESSIONAL EXPERIENCE
 Student Researcher | UCO, Philosophy Department | Sept 2024 – June 2025
Designed a Qualtrics survey aimed at answering the key research questions, navigated the IRB approval process, collected data from participants, and authored an R Markdown script to perform statistical analysis and visualization.
Presented findings in a formal IMRAD-style report, providing data-driven recommendations that informed curriculum improvements.
LEADERSHIP & ACTIVITIES
President, Cybersecurity Club: Organized bi-weekly technical workshops and professional speaker events for 30+ members, increasing enrollment by 60% over 18 months.
Global Leadership Ambassador: Hosted weekly meetings providing information on how to study abroad and providing assistance with visa applications.

            </Typography>
        </Container>
    );
}