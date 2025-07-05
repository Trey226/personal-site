import { Metadata } from "next";
import { pic } from "@/_data/pic";
import JsonPageClient from "./JsonPageClient"

export const metadata: Metadata = {
    title: "JSON Generator",
    description: "JSON Generator",
};
 

export default function JsonCreator() {




    return (
        <main>
            <JsonPageClient />
        </main>
    );
}