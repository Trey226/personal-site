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
                    <div className="name flex justify-center">
                        <h1>Trey Gilliam</h1>
                    </div>
                    <div className="contact-info flex justify-center">
                        <a href="mailto:treygilliam1@gmail.com" className="underline">Treygilliam1@gmail.com</a>
                        <a href="Treymakesthings.com" className="ml-1">| Treymakesthings.com</a>
                    </div>
                </div>
                <hr />
                <div id="education" className="education">
                    <h2>Education</h2>
                    <div id="school-name- dates" className="flex justify-between">
                        <h3>University of Central Oklahoma</h3>
                        <h3>2021 - 2025</h3>
                    </div>
                    <div id="degree-specifics">
                        <p>B.S. Software engineering</p>
                        <p>Economics Minor</p>
                    </div>
                </div>
                <hr />
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