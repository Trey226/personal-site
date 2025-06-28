import { Metadata } from "next";
import styles from "./resume.css";

export const metadata: Metadata = {
    title: "Resume",
    description: "My resume",
  };

export default function Resume() {
    return (
        <div className="flex justify-center">
            <div id="paper-setup" className="flex-row w-[45dvw] h-[87dvh] mt-6 px-3 py-3 outline-0 bg-neutral-300 text-black rounded-2xl">
                <div className="Title">
                    <h1>Title Section</h1>
                </div>
                <div className="Education">
                    Education Section
                </div>
                <div className="Technical">
                    Technical Skills Section
                </div>
                <div className="Projects">
                    Projects Section
                </div>
                <div className="Experience">
                    Experience Section
                </div>
                <div className="Clubs">
                    Clubs/ Activities Section
                </div>
            </div>
        </div>
    );
}