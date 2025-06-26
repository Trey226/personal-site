import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Interests",
    description: "My interests",
  };


export default function Interests() {
    return (

        //this page I dont know exactly how I want it laid out but I want to have a section for 
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh" }}>
            <h1>This will be links to random things I like</h1>
        </div>
    );
}