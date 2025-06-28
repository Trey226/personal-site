import "./resume.css";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Resume",
    description: "My resume",
  };

export default function Resume() {
    return (
        <div className="flex justify-center">
            <div id="paper-setup" className="flex-row w-[45dvw] h-[87dvh] mt-6 px-3 py-3 outline-0 bg-neutral-300 text-black rounded-2xl">
                <div id="title" className="title">
                    <h1>Title div</h1>
                </div>
                <div id="education" className="education">
                    Education div
                </div>
                <div id="technical" className="technical">
                    Technical Skills div
                </div>
                <div id="projects" className="projects">
                    Projects div
                </div>
                <div id="experience" className="experience">
                    Experience div
                </div>
                <div id="clubs" className="clubs">
                    Clubs/ Activities div
                </div>
            </div>
        </div>
    );
}