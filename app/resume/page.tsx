import { Metadata } from "next";
import DynamicResume from "@/components/DynamicResume";
export const metadata: Metadata = {
    title: "Resume",
    description: "My resume",
  };

export default function Resume() {
    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "85vh" }}>
            resume
        </div>
    );
}