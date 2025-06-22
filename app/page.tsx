import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Home",
    description: "Home",
  };

export default function Home() {
  return (
    // I want to have my picture, an about me section, and a linkedin, github, and discord icon that when clicked will link to my profiles
    // come up with a good layout for this page that incorporates those elements
    <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "100vh"}}>
      <h1>Work in progress</h1>
    </div>
  );
}
