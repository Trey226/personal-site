import { Metadata } from "next";
import { projects, Project } from "@/_data/projects";
import  ProjectTile from "@/components/ProjectTile";
import "./projects.css";

export const metadata: Metadata = {
    title: "Projects",
    description: "My projects",
};

export default function Projects() {
    return (
        <main>
            <div className="content-area-projects">
            {projects.map((project: Project) => (
                    <ProjectTile key={project.title} {...project} />
                ))}
            </div>
        </main>
    );
}