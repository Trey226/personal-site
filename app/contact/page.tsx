import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact",
    description: "Contact me",
  };


export default function Contact() {
    return (
        //this page may be unnecessary
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            <h1>Congrats you found a deprecated page!</h1>
        </div>
    );
}