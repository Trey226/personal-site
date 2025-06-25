"use client";

import { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/Data/projects";

type ProjectGridProps = {
    projects: typeof projects;
}

export default function ProjectGrid({ projects }: ProjectGridProps) {
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
    }, []);

    if (!hasMounted) {
        return null;
    }

    return (
        <Grid container spacing={{ xs: 2, sm: 3 }} columns={{ xs: 1, sm: 4, md: 12 }}>
            {projects.map((project, index) => (
                <Grid key={index} size={{ xs: 1, sm: 2, md: 4 }}>
                    <ProjectCard
                        title={project.title}
                        description={project.description}
                        image={project.image}
                        link={project.link}
                        outsideLink={project.outsideLink}
                    />
                </Grid>
            ))}
        </Grid>
    );
} 