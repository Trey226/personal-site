import MapPageClient from "./MapPageClient"
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "My Pics",
    description: "world map of my pictures",
};

export default function PictureMap() {
    return <MapPageClient />;
}