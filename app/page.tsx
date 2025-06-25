import Image from "next/image";
import { Metadata } from "next";
import { Grid } from "@mui/material";

export const metadata: Metadata = {
    title: "Home",
    description: "Home",
  };

export default function Home() {
  return (
    // I want to have my picture, an about me section, and a linkedin, github, and discord icon that when clicked will link to my profiles
    // come up with a good layout for this page that incorporates those elements
    <div className="flex flex-col h-screen">
      <Grid container spacing={2} className="h-full">
        <Grid size={6} className="flex flex-col items-center justify-center h-full">
          <p>Hello, I'm Trey</p>
        </Grid>
        <Grid size={6} className="flex flex-col items-center justify-center h-full"> 
          <p>pic here</p>
        </Grid>
        
      </Grid>
    </div>
  );
}
