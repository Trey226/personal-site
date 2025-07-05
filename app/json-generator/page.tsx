import { Metadata } from "next";
import { pic } from "@/_data/pic";
import JsonPageClient from "./JsonPageClient"
import "./json.css"

export const metadata: Metadata = {
    title: "JSON Generator",
    description: "JSON Generator",
};

const { ExifImage } = require('exif').ExifImage;
const { lookUp } = require("geojson-places");


 

export default function JsonGenerator() {




    return (
        <main>
            <JsonPageClient />
        </main>
    );
}