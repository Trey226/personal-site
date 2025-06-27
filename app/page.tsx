import { Metadata } from "next";
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
