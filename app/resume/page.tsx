import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Resume",
    description: "My resume",
  };

export default function Resume() {
    return (
        <div id="main-page-container" className="flex h-100 justify-center">
            <div className="flex items-center">
                The thought of the required css to make this look good makes me want to shut the site down.
            </div>
        </div>
    );
}