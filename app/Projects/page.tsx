import { Metadata } from "next";
import ProjectGrid from "@/components/ProjectGrid";
import { projects } from "@/_data/projects";

export const metadata: Metadata = {
    title: "Projects",
    description: "My projects",
};


export default function Projects() {
    return (
        <div style={{ display: "flex-grow", flexDirection: "column", alignItems: "center", paddingTop: "112px", paddingLeft: "20px", paddingRight: "20px", minHeight: "100vh"}}>
            <ProjectGrid projects={projects} />
        </div>
    );
}