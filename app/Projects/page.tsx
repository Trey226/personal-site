import { Metadata } from "next";
import ProjectCard from "@/components/ProjectCard";
export const metadata: Metadata = {
    title: "Projects",
    description: "My projects",
  };


export default function Projects() {
    return (

        //this page I want to be a collection of cards that link to different projects I have. I think making a card component would be a good idea
        //I think the card component should have at least a title, an image, a description, and a link to the project
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            <ProjectCard />
        </div>
    );
}