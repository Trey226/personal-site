import * as React from "react";
import WorldMap from "react-svg-worldmap";
import { Metadata } from "next";
import MapDisplay from "@/components/WorldMap";
import { datas } from "@/_data/map";
import "./map.css"


export const metadata: Metadata = {
    title: "My Pics",
    description: "world map of my pictures",
};

export default function PictureMap() {
    return (
        <main>
            <div className="content-area-map">
                <h1 className="map-title">Around The World with Trey</h1>
                <br />
                <p className="general-text-map">
                    This map highlights all of the countries that I have been to. When you hover over each country it will tell you the number of days that I have spent in that country.
                    When you click on *most* of the countries it will pop up my favorite pictures I have taken there.
                </p>
                <MapDisplay data={datas} />
            </div>
        </main>
    );
}