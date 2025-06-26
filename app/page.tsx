import Image from "next/image";
import { Metadata } from "next";
import { Grid, Typography } from "@mui/material";
import AboutMe from "@/components/AboutMe";

export const metadata: Metadata = {
    title: "Home",
    description: "Home",
  };

export default function Home() {
  return (
    <div>
      <AboutMe />
    </div>
  );
}
