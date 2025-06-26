import Image from "next/image";
import { Metadata } from "next";
import { Grid, Typography } from "@mui/material";

export const metadata: Metadata = {
    title: "Home",
    description: "Home",
  };

export default function Home() {
  return (
    <div className="flex h-screen justify-center items-center">
      <p>Hello, I'm Trey</p>
    </div>
  );
}
