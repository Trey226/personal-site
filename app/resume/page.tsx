import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Resume",
    description: "My resume",
  };

export default function Resume() {
    return (

        //I already have my resume I just want a centered box with some styling to display the raw text of it
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh" }}>
            <code>This will be my resume</code>
        </div>
    );
}