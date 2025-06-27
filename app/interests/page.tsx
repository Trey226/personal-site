import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Interests",
    description: "My interests",
  };


export default function Interests() {
    return (

        //this page I dont know exactly how I want it laid out but I want to have a section for 
        <div id="main-page-container" className="flex h-100 justify-center">
            <div className="flex items-center mx-10">
                This is where I will put links to stuff I like.
            </div>
            <div className="flex items-center mx-10">
                This is another thing I like
            </div>
            <div className="flex items-center mx-10">
                This is even more stuff I like.
            </div>
        </div>
    );
}