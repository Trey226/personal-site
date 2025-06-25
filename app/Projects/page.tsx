import { Metadata } from "next";
import ProjectGrid from "@/components/ProjectGrid";
import { projects } from "@/Data/projects";

export const metadata: Metadata = {
    title: "Projects",
    description: "My projects",
};


export default function Projects() {
    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", padding: "20px", }}>
            <ProjectGrid projects={projects} />
        </div>
    );
}