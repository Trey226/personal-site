import { Metadata } from "next";
import ProjectCard from "@/components/ProjectCard";
import { Grid } from "@mui/material";

export const metadata: Metadata = {
    title: "Projects",
    description: "My projects",
};


export default function Projects() {
    return (

        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", padding: "20px" }}>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {projects.map((project, index) => (
                    <Grid key={index} size={{ xs: 2, sm: 4, md: 4 }}>
                        <ProjectCard title={project.title} description={project.description} image={project.image} link={project.link} outsideLink={project.outsideLink} />
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}

const projects = [
    {
        title: "Beat the ATS",
        description: "This is a tool written in python that takes your resume and a specific job description and analyzes the most important keywords to include in your resume to get reccomended by ATS software.",
        image: "/keyword.png",
        link: "/Keyword-optimizer",
        outsideLink: false
    },
    {
        title: "Ctrl-C Ctrl-Eat",
        description: "This was my senior capstone project. It is a fully featured digital recipe book that allows users to create, edit, and share recipes with others. It was built using ASP.NET Core, Entity Framework, and a MySQL Server.",
        image: "/CtrlC.jpg",
        link: "https://github.com/ctrl-c-ctrl-eat/ctrl-c-ctrl-eat",
        outsideLink: true
    },
    {
        title: "OnTime",
        description: "This was a project I did for a Software Engineering course. It is a FireBase app that allows creating managing and notification of tasks. It was built using FireBase, JavaScript, and using a Firestore database.",
        image: "/ontimeLogo.png",
        link: "https://ontime.josiahscott.dev",
        outsideLink: true
    }
]